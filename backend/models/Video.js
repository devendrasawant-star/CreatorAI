import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    title: {
      type: String,
      required: [true, 'Video title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    originalFile: {
      filename: String,
      mimetype: String,
      size: Number,
      public_id: String,
      url: String,
    },
    processedFile: {
      public_id: String,
      url: String,
      duration: Number, // in seconds
      width: Number,
      height: Number,
      fps: Number,
    },
    thumbnail: {
      public_id: String,
      url: String,
    },
    metadata: {
      duration: Number, // in seconds
      width: Number,
      height: Number,
      fps: Number,
      bitrate: Number,
      codec: String,
      hasAudio: Boolean,
    },
    status: {
      type: String,
      enum: ['uploaded', 'processing', 'ready', 'failed'],
      default: 'uploaded',
    },
    processingError: String,
    tags: [String],
    category: {
      type: String,
      enum: ['tutorial', 'vlog', 'music', 'comedy', 'educational', 'other'],
      default: 'other',
    },
    visibility: {
      type: String,
      enum: ['private', 'public', 'unlisted'],
      default: 'private',
    },
    stats: {
      views: { type: Number, default: 0 },
      downloads: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
    },
    aiJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AIJob',
      },
    ],
    isDraft: {
      type: Boolean,
      default: false,
    },
    draftData: mongoose.Schema.Types.Mixed,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

// Index for faster queries
videoSchema.index({ userId: 1, createdAt: -1 });
videoSchema.index({ projectId: 1 });
videoSchema.index({ status: 1 });
videoSchema.index({ isDeleted: 1 });

export default mongoose.model('Video', videoSchema);
