import { AuthorizationError } from '../utils/errorHandler.js';

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AuthorizationError(`Access denied. Required role: ${roles.join(', ')}`);
    }
    next();
  };
};

export const adminOnly = authorize('admin');
export const userOrAdmin = authorize('user', 'admin', 'moderator');
