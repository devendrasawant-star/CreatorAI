import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { FILE_CONSTRAINTS } from '../utils/constants.js';
import { ValidationError } from '../utils/errorHandler.js';

const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const videoFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase().slice(1);

  if (!FILE_CONSTRAINTS.ALLOWED_VIDEO_FORMATS.includes(ext)) {
    return cb(
      new ValidationError(`Invalid file format. Allowed: ${FILE_CONSTRAINTS.ALLOWED_VIDEO_FORMATS.join(', ')}`)
    );
  }

  if (file.size > FILE_CONSTRAINTS.MAX_FILE_SIZE) {
    return cb(new ValidationError(`File size exceeds limit of ${FILE_CONSTRAINTS.MAX_FILE_SIZE / 1024 / 1024 / 1024}GB`));
  }

  cb(null, true);
};

const avatarFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase().slice(1);

  if (!FILE_CONSTRAINTS.ALLOWED_IMAGE_FORMATS.includes(ext)) {
    return cb(
      new ValidationError(`Invalid image format. Allowed: ${FILE_CONSTRAINTS.ALLOWED_IMAGE_FORMATS.join(', ')}`)
    );
  }

  if (file.size > FILE_CONSTRAINTS.MAX_AVATAR_SIZE) {
    return cb(new ValidationError(`Avatar size exceeds limit of ${FILE_CONSTRAINTS.MAX_AVATAR_SIZE / 1024 / 1024}MB`));
  }

  cb(null, true);
};

export const uploadVideo = multer({
  storage,
  fileFilter: videoFilter,
  limits: {
    fileSize: FILE_CONSTRAINTS.MAX_FILE_SIZE,
  },
}).single('video');

export const uploadAvatar = multer({
  storage,
  fileFilter: avatarFilter,
  limits: {
    fileSize: FILE_CONSTRAINTS.MAX_AVATAR_SIZE,
  },
}).single('avatar');
