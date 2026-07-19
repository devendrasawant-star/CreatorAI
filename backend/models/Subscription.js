import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: String,
      enum: ['free', 'pro', 'enterprise'],
      required: true,
    },
    stripeCustomerId: {
      type: String,
      unique: true,
      sparse: true,
    },
    stripeSubscriptionId: String,
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'pending'],
      default: 'pending',
    },
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    cancelledAt: Date,
    features: {
      storageGB: Number,
      videoMinutes: Number,
      aiProcesses: mongoose.Schema.Types.Mixed,
      downloadsPerDay: mongoose.Schema.Types.Mixed,
      maxVideoLength: mongoose.Schema.Types.Mixed,
    },
    pricing: {
      amount: Number,
      currency: { type: String, default: 'USD' },
      billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    },
    autoRenewal: {
      type: Boolean,
      default: true,
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for faster queries
subscriptionSchema.index({ userId: 1 });
subscriptionSchema.index({ stripeCustomerId: 1 });
subscriptionSchema.index({ status: 1 });

export default mongoose.model('Subscription', subscriptionSchema);
