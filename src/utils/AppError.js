class AppError extends Error {
  constructor(message, code) {
    super();
    this.message = message;
    this.name = 'AppError';
    this.code = code;
  }
}

export default AppError;
