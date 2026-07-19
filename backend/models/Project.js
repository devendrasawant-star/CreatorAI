import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [200, 'Project name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    thumbnail: {
      public_id: String,
      url: String,
    },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    settings: {
      resolution: {
        type: String,
        enum: ['720p', '1080p', '4k'],
        default: '1080p',
      },
      fps: { type: Number, default: 30 },
      aspectRatio: {
        type: String,
        enum: ['16:9', '9:16', '1:1', '4:3'],
        default: '16:9',
      },
    },
    stats: {
      totalDuration: { type: Number, default: 0 }, // in seconds
      totalSize: { type: Number, default: 0 }, // in bytes
      videoCount: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ['draft', 'in_progress', 'completed'],
      default: 'draft',
    },
    collaborators: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        role: String,
        addedAt: Date,
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

// Index for faster queries
projectSchema.index({ userId: 1, createdAt: -1 });
projectSchema.index({ isDeleted: 1 });
projectSchema.index({ isArchived: 1 });

export default mongoose.model('Project', projectSchema);
