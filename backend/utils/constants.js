// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
};

// Subscription Limits
export const PLAN_LIMITS = {
  free: {
    storageGB: 2,
    videoMinutes: 30,
    aiProcesses: 5,
    downloadsPerDay: 3,
    maxVideoLength: 300, // 5 minutes
  },
  pro: {
    storageGB: 100,
    videoMinutes: 500,
    aiProcesses: 100,
    downloadsPerDay: 50,
    maxVideoLength: 3600, // 60 minutes
  },
  enterprise: {
    storageGB: 1000,
    videoMinutes: 5000,
    aiProcesses: 'unlimited',
    downloadsPerDay: 'unlimited',
    maxVideoLength: 'unlimited',
  },
};

// Video Processing Status
export const PROCESSING_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

// AI Job Types
export const AI_JOB_TYPES = {
  AUTO_EDIT: 'auto_edit',
  VIDEO_ENHANCEMENT: 'video_enhancement',
  COLOR_CORRECTION: 'color_correction',
  AUDIO_ENHANCEMENT: 'audio_enhancement',
  NOISE_REMOVAL: 'noise_removal',
  SUBTITLE_GENERATION: 'subtitle_generation',
  CAPTION_GENERATION: 'caption_generation',
  THUMBNAIL_GENERATION: 'thumbnail_generation',
  TITLE_GENERATOR: 'title_generator',
  DESCRIPTION_GENERATOR: 'description_generator',
  HASHTAG_GENERATOR: 'hashtag_generator',
  HIGHLIGHT_DETECTION: 'highlight_detection',
  VIRAL_CLIP_DETECTION: 'viral_clip_detection',
  SCENE_DETECTION: 'scene_detection',
  FACE_TRACKING: 'face_tracking',
  AUTO_CROP: 'auto_crop',
  SMART_ZOOM: 'smart_zoom',
  SILENCE_REMOVAL: 'silence_removal',
  SPEAKER_DETECTION: 'speaker_detection',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// File Upload Constraints
export const FILE_CONSTRAINTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024 * 1024, // 5GB
  MAX_AVATAR_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_VIDEO_FORMATS: ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv'],
  ALLOWED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  ALLOWED_AUDIO_FORMATS: ['mp3', 'wav', 'aac', 'flac', 'm4a'],
};

// Email Templates
export const EMAIL_TEMPLATES = {
  VERIFICATION: 'verification',
  PASSWORD_RESET: 'password_reset',
  WELCOME: 'welcome',
  SUBSCRIPTION_CONFIRMATION: 'subscription_confirmation',
  PROCESSING_COMPLETE: 'processing_complete',
  PROCESSING_FAILED: 'processing_failed',
};

// Cache TTL (Time To Live) in seconds
export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 3600, // 1 hour
  LONG: 86400, // 24 hours
};

// Rate Limiting
export const RATE_LIMITS = {
  AUTH: { windowMs: 15 * 60 * 1000, max: 5 }, // 5 requests per 15 minutes
  UPLOAD: { windowMs: 60 * 60 * 1000, max: 20 }, // 20 requests per hour
  API: { windowMs: 60 * 1000, max: 100 }, // 100 requests per minute
  GENERAL: { windowMs: 15 * 60 * 1000, max: 100 }, // 100 requests per 15 minutes
};
