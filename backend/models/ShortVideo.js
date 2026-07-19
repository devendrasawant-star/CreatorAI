import mongoose from 'mongoose';

const shortVideoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Short video title is required'],
      trim: true,
    },
    description: String,
    file: {
      public_id: String,
      url: String,
    },
    thumbnail: {
      public_id: String,
      url: String,
    },
    metadata: {
      duration: Number, // in seconds
      resolution: String, // 1080x1920
      fps: Number,
      hasSubtitles: Boolean,
      subtitleLanguage: String,
    },
    timestamps: {
      startTime: Number, // in seconds
      endTime: Number, // in seconds
    },
    processing: {
      cropType: {
        type: String,
        enum: ['auto_crop', 'manual', 'smart_zoom'],
        default: 'auto_crop',
      },
      subtitlesBurned: { type: Boolean, default: false },
      status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending',
      },
      errorMessage: String,
    },
    stats: {
      views: { type: Number, default: 0 },
      downloads: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

// Index for faster queries
shortVideoSchema.index({ userId: 1, createdAt: -1 });
shortVideoSchema.index({ videoId: 1 });
shortVideoSchema.index({ status: 1 });

export default mongoose.model('ShortVideo', shortVideoSchema);
