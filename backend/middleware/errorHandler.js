import { ApiError } from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      statusCode: 400,
      message: 'Validation Error',
      errors,
      success: false,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      statusCode: 409,
      message: `${field} already exists`,
      success: false,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Invalid token',
      success: false,
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Token expired',
      success: false,
    });
  }

  // Custom API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      success: false,
    });
  }

  // Default error
  return res.status(500).json({
    statusCode: 500,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    success: false,
  });
};
