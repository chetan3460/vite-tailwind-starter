import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isInViewport, isInViewportOffset, inVP } from '../../src/js/utils.js';

describe('Legacy Utils', () => {
  let element;

  beforeEach(() => {
    // Mock getBoundingClientRect
    element = document.createElement('div');
    document.body.appendChild(element);

    // Default: element is in viewport
    element.getBoundingClientRect = vi.fn(() => ({
      top: 0,
      bottom: 100,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
    }));

    // Mock window dimensions
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(window, 'innerWidth', {
      value: 1000,
      writable: true,
    });
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe('isInViewport', () => {
    it('should return true when element is in viewport', () => {
      expect(isInViewport(element)).toBe(true);
    });

    it('should return false when element is below viewport', () => {
      element.getBoundingClientRect = vi.fn(() => ({
        top: 1100,
        bottom: 1200,
        left: 0,
        right: 100,
      }));
      expect(isInViewport(element)).toBe(false);
    });

    it('should return false when element is above viewport', () => {
      element.getBoundingClientRect = vi.fn(() => ({
        top: -200,
        bottom: -100,
        left: 0,
        right: 100,
      }));
      expect(isInViewport(element)).toBe(false);
    });
  });

  describe('isInViewportOffset', () => {
    it('should return true when element is near viewport with offset', () => {
      // Element is just below viewport (1100), but offset is 800, so it should be "in viewport"
      // top (1100) - offset (800) = 300 < innerHeight (1000) -> True
      element.getBoundingClientRect = vi.fn(() => ({
        top: 1100,
        bottom: 1200,
        left: 0,
        right: 100,
      }));
      expect(isInViewportOffset(element, 800)).toBe(true);
    });
  });
});
