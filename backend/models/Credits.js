import mongoose from 'mongoose';

const creditsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['purchase', 'earned', 'refund', 'bonus', 'promotion'],
      required: true,
    },
    description: String,
    transactionId: String,
    relatedJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AIJob',
    },
    expiresAt: Date,
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for faster queries
creditsSchema.index({ userId: 1, createdAt: -1 });
creditsSchema.index({ isExpired: 1 });

export default mongoose.model('Credits', creditsSchema);
