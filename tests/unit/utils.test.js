import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';

// Import the utils (we'll test actual utility functions when they exist)
describe('Utils', () => {
  describe('DOM utilities', () => {
    it('should create a DOM element', () => {
      const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
      expect(dom.window.document.querySelector('p').textContent).toBe(
        'Hello world'
      );
    });

    it('should handle querySelector correctly', () => {
      const dom = new JSDOM('<!DOCTYPE html><div class="test">Test</div>');
      const element = dom.window.document.querySelector('.test');
      expect(element).toBeTruthy();
      expect(element.textContent).toBe('Test');
    });
  });

  describe('String utilities', () => {
    it('should trim strings correctly', () => {
      expect('  hello  '.trim()).toBe('hello');
    });

    it('should split strings correctly', () => {
      const result = 'one,two,three'.split(',');
      expect(result).toEqual(['one', 'two', 'three']);
      expect(result.length).toBe(3);
    });
  });

  describe('Array utilities', () => {
    it('should filter arrays correctly', () => {
      const numbers = [1, 2, 3, 4, 5];
      const evens = numbers.filter(n => n % 2 === 0);
      expect(evens).toEqual([2, 4]);
    });

    it('should map arrays correctly', () => {
      const numbers = [1, 2, 3];
      const doubled = numbers.map(n => n * 2);
      expect(doubled).toEqual([2, 4, 6]);
    });
  });
});
