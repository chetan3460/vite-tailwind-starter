/**
 * Global error handler with user-friendly messages
 */

import logger from './logger.js';

class ErrorHandler {
  constructor() {
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    // Handle uncaught errors
    window.addEventListener('error', event => {
      this.handleError(event.error || new Error(event.message));
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', event => {
      this.handleError(
        new Error(`Unhandled Promise Rejection: ${event.reason}`)
      );
    });
  }

  handleError(error, context = {}) {
    // Log to console in development
    logger.error('Application Error:', error, context);

    // In production, you could send to error tracking service
    if (import.meta.env.PROD && import.meta.env.VITE_ENABLE_ERROR_TRACKING) {
      this.reportToService(error, context);
    }

    // Show user-friendly message if needed
    if (context.showToUser) {
      this.showUserMessage(
        context.userMessage || 'An error occurred. Please try again.'
      );
    }

    return error;
  }

  reportToService(error, context) {
    // TODO: Integrate with error tracking service (e.g., Sentry, LogRocket)
    logger.info('Would report to error tracking service:', {
      error,
      context,
    });
  }

  showUserMessage(message) {
    // Simple user notification - can be enhanced with a toast library
    if (window.confirm(`${message}\n\nWould you like to reload the page?`)) {
      window.location.reload();
    }
  }
}

// Create singleton instance
const errorHandler = new ErrorHandler();

export default errorHandler;

// Helper function for manual error handling
export const handleError = (error, context) =>
  errorHandler.handleError(error, context);
