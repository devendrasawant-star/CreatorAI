import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'video_upload',
        'video_delete',
        'video_download',
        'ai_job_start',
        'ai_job_complete',
        'ai_job_failed',
        'subscription_upgrade',
        'subscription_cancel',
        'payment_made',
        'account_update',
        'password_change',
        'avatar_upload',
        'login',
        'logout',
        'project_create',
        'project_delete',
        'short_generated',
        'file_downloaded',
      ],
    },
    resourceType: {
      type: String,
      enum: ['video', 'project', 'subscription', 'payment', 'ai_job', 'short_video', 'user'],
    },
    resourceId: mongoose.Schema.Types.ObjectId,
    details: mongoose.Schema.Types.Mixed,
    ipAddress: String,
    userAgent: String,
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'success',
    },
    errorMessage: String,
  },
  { timestamps: true }
);

// Index for faster queries
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ action: 1 });
activityLogSchema.index({ resourceType: 1, resourceId: 1 });

// Auto-delete logs older than 90 days
activityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

export default mongoose.model('ActivityLog', activityLogSchema);
