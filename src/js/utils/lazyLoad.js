/**
 * Enhanced lazy loading with Intersection Observer API
 * Supports images, iframes, and background images
 */

import logger from './logger.js';

class LazyLoader {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01,
      ...options,
    };

    this.observer = null;
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      logger.warn('IntersectionObserver not supported, loading all images');
      this.loadAllImages();
      return;
    }

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    );

    this.observeElements();
  }

  observeElements() {
    // Observe images with data-src
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => this.observer.observe(img));

    // Observe elements with data-bg for background images
    const bgElements = document.querySelectorAll('[data-bg]');
    bgElements.forEach(el => this.observer.observe(el));

    // Observe iframes
    const iframes = document.querySelectorAll('iframe[data-src]');
    iframes.forEach(iframe => this.observer.observe(iframe));

    logger.debug(
      `Observing ${images.length + bgElements.length + iframes.length} lazy-load elements`
    );
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadElement(element) {
    if (element.dataset.src) {
      // Handle img and iframe
      element.src = element.dataset.src;
      delete element.dataset.src;

      // Handle srcset if present
      if (element.dataset.srcset) {
        element.srcset = element.dataset.srcset;
        delete element.dataset.srcset;
      }

      // Add loaded class
      element.classList.add('lazy-loaded');

      logger.debug(`Lazy loaded: ${element.tagName}`, element.src);
    }

    if (element.dataset.bg) {
      // Handle background image
      element.style.backgroundImage = `url(${element.dataset.bg})`;
      delete element.dataset.bg;
      element.classList.add('lazy-loaded');

      logger.debug(`Lazy loaded background:`, element.dataset.bg);
    }
  }

  loadAllImages() {
    // Fallback for browsers without IntersectionObserver
    const elements = document.querySelectorAll('[data-src], [data-bg]');
    elements.forEach(el => this.loadElement(el));
  }

  // Public method to add new elements to observe
  observe(element) {
    if (this.observer) {
      this.observer.observe(element);
    }
  }

  // Public method to disconnect observer
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Create and export singleton instance
const lazyLoader = new LazyLoader();

export default lazyLoader;
