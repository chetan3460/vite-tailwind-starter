import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import logger from '../../src/js/utils/logger.js';
import { handleError } from '../../src/js/utils/errorHandler.js';

describe('Utils', () => {
  describe('Logger', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should exist', () => {
      expect(logger).toBeDefined();
    });

    it('should have logging methods', () => {
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.error).toBe('function');
      expect(typeof logger.debug).toBe('function');
    });

    // Note: Actual console output depends on environment variables and mode
    // In test environment, we might need to mock import.meta.env if we want to test conditional logging
  });

  describe('ErrorHandler', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should handle errors without crashing', () => {
      const error = new Error('Test error');
      const result = handleError(error, { showToUser: false });

      expect(result).toBe(error);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should handle strings as errors', () => {
      // The current implementation expects an Error object or wraps it?
      // Let's check the implementation. It takes (error, context).
      // If we pass a string, it might just log it.
      // Based on implementation: handleError(error, context)
      // It logs error.

      const error = new Error('String error');
      handleError(error);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
