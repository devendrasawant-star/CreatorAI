import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },
    subscription: {
      plan: {
        type: String,
        enum: ['free', 'pro', 'enterprise'],
        default: 'free',
      },
      stripeCustomerId: String,
      stripeSubscriptionId: String,
      status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'inactive',
      },
      renewalDate: Date,
      cancelledAt: Date,
    },
    credits: {
      available: { type: Number, default: 100 },
      used: { type: Number, default: 0 },
      totalEarned: { type: Number, default: 100 },
    },
    storage: {
      used: { type: Number, default: 0 }, // in bytes
      limit: { type: Number, default: 2147483648 }, // 2GB for free tier
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    refreshTokens: [
      {
        token: String,
        createdAt: {
          type: Date,
          default: Date.now,
          expires: 2592000, // 30 days
        },
      },
    ],
    loginHistory: [
      {
        ip: String,
        userAgent: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: String,
    socialAccounts: {
      google: String,
      github: String,
    },
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
      privateAccount: { type: Boolean, default: false },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
    deletedAt: Date,
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get user profile (exclude sensitive data)
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.passwordResetToken;
  delete user.passwordResetTokenExpires;
  delete user.verificationToken;
  delete user.verificationTokenExpires;
  delete user.twoFactorSecret;
  delete user.refreshTokens;
  return user;
};

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ 'subscription.stripeCustomerId': 1 });
userSchema.index({ createdAt: -1 });

export default mongoose.model('User', userSchema);
