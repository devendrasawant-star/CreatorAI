import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new AuthenticationError('No access token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new AuthenticationError('Access token expired');
        }
        throw new AuthenticationError('Invalid access token');
      }

      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AuthenticationError('Refresh token required');
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        throw new AuthenticationError('Invalid refresh token');
      }

      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      res.json({
        success: true,
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    next(error);
  }
};
