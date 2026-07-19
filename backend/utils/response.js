export class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export const sendSuccess = (res, statusCode, data, message = 'Success') => {
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
};

export const sendError = (res, statusCode, message = 'Error') => {
  return res.status(statusCode).json({
    statusCode,
    message,
    success: false,
  });
};
