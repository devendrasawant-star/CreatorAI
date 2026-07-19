import mongoose from 'mongoose';

const aiJobSchema = new mongoose.Schema(
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
    jobType: {
      type: String,
      enum: [
        'auto_edit',
        'video_enhancement',
        'color_correction',
        'audio_enhancement',
        'noise_removal',
        'subtitle_generation',
        'caption_generation',
        'thumbnail_generation',
        'title_generator',
        'description_generator',
        'hashtag_generator',
        'highlight_detection',
        'viral_clip_detection',
        'scene_detection',
        'face_tracking',
        'auto_crop',
        'smart_zoom',
        'silence_removal',
        'speaker_detection',
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ['queued', 'processing', 'completed', 'failed'],
      default: 'queued',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    inputParams: mongoose.Schema.Types.Mixed,
    output: mongoose.Schema.Types.Mixed,
    error: String,
    credits: {
      required: Number,
      used: Number,
    },
    processing: {
      startedAt: Date,
      completedAt: Date,
      duration: Number, // in seconds
    },
    results: {
      outputUrl: String,
      outputPublicId: String,
      metadata: mongoose.Schema.Types.Mixed,
    },
    aiProvider: {
      type: String,
      enum: ['openai', 'gemini', 'whisper', 'mediapipe', 'ffmpeg'],
    },
    retryCount: { type: Number, default: 0 },
    maxRetries: { type: Number, default: 3 },
  },
  { timestamps: true }
);

// Index for faster queries
aiJobSchema.index({ userId: 1, createdAt: -1 });
aiJobSchema.index({ videoId: 1 });
aiJobSchema.index({ status: 1 });
aiJobSchema.index({ jobType: 1 });

export default mongoose.model('AIJob', aiJobSchema);
