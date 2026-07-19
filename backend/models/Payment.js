import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
    },
    stripePaymentIntentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    stripeInvoiceId: String,
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'bank_transfer', 'paypal'],
      default: 'card',
    },
    cardDetails: {
      last4: String,
      brand: String,
      expMonth: Number,
      expYear: Number,
    },
    description: String,
    invoiceUrl: String,
    receiptUrl: String,
    refund: {
      status: String,
      amount: Number,
      reason: String,
      date: Date,
    },
    metadata: mongoose.Schema.Types.Mixed,
    failureReason: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for faster queries
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ stripePaymentIntentId: 1 });
paymentSchema.index({ status: 1 });

export default mongoose.model('Payment', paymentSchema);
