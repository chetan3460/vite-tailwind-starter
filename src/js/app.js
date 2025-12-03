// src/js/app.js - Modernized without jQuery
import '@iconscout/unicons/css/line.css';
import '../css/app.css';
import feather from 'feather-icons';
import DynamicImports from './components/DynamicImports';
import logger from './utils/logger.js';
import './utils/errorHandler.js'; // Initialize global error handler
import lazyLoader from './utils/lazyLoad.js';

export default new (class App {
  constructor() {
    this.setDomMap();

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.domReady());
    } else {
      this.domReady();
    }
  }

  domReady = () => {
    logger.info('App initializing...');

    try {
      this.bindEvents();
      new DynamicImports();
      this.darkMode();
      this.addHomeClass();
      this.accordion();
      this.initLazyLoading();

      logger.info('App initialized successfully');
    } catch (error) {
      logger.error('Error during app initialization:', error);
    }
  };

  setDomMap = () => {
    this.window = window;
    this.html = document.documentElement;
    this.htmlBody = document.body;
    this.header = document.querySelector('header');
    this.gotoTop = document.getElementById('gotoTop');
    this.wrapper = document.querySelector('.wrapper');
    this.footer = document.querySelector('footer');

    if (this.wrapper) {
      this.pushDiv = this.wrapper.querySelector('.push');
    }
  };

  bindEvents = () => {
    feather.replace();

    // Scroll to top button
    if (this.gotoTop) {
      window.addEventListener('scroll', this.handleScroll);
      this.gotoTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  handleScroll = () => {
    if (this.gotoTop) {
      if (window.pageYOffset > 100) {
        this.gotoTop.classList.add('visible');
      } else {
        this.gotoTop.classList.remove('visible');
      }
    }
  };

  /**
   * Dark Mode Toggle
   * Toggles between light and dark modes
   */
  darkMode = () => {
    try {
      const changeTheme = e => {
        if (e) {
          e.preventDefault();
        }

        const htmlTag = document.documentElement;
        const isDark = htmlTag.className.includes('dark');

        htmlTag.className = isDark ? 'light' : 'dark';

        // Save preference to localStorage
        localStorage.setItem('theme', isDark ? 'light' : 'dark');

        logger.debug(`Theme changed to: ${isDark ? 'light' : 'dark'}`);
      };

      // Load saved theme preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        document.documentElement.className = savedTheme;
      }

      // Theme switcher button
      const switcher = document.getElementById('theme-mode');
      if (switcher) {
        switcher.addEventListener('click', changeTheme);
      }

      // Theme toggle checkbox
      const chk = document.getElementById('chk');
      if (chk) {
        chk.addEventListener('change', changeTheme);
      }
    } catch (err) {
      logger.error('Error setting up dark mode:', err);
    }
  };

  /**
   * Add page-specific classes to body
   * Useful for applying specific styles based on the page type
   */
  addHomeClass = () => {
    const homePaths = ['/', '/index.html', '/vite-tailwind-starter/'];
    const currentPath = window.location.pathname;
    const isHomePage = homePaths.includes(currentPath);

    if (isHomePage) {
      document.body.classList.add('home');
      logger.debug("Added class 'home' to the body");
    }

    const pathSegments = currentPath.split('/').filter(Boolean);
    const fileName = pathSegments[pathSegments.length - 1] || '';
    const fileWithoutExtension = fileName.split('.')[0];
    const firstWord = fileWithoutExtension.split('-')[0];

    if (firstWord && !isHomePage) {
      const className = `${firstWord}-page`;
      document.body.classList.add(className);
      logger.debug(`Added class '${className}' to the body`);
    }
  };

  /**
   * Accordion functionality
   * Implements accessible accordion component
   */
  accordion = () => {
    try {
      const Default = {
        alwaysOpen: false,
        activeClasses: 'bg-gray-50 dark:bg-slate-800 text-indigo-600',
        inactiveClasses: 'text-dark dark:text-white',
        onOpen: () => {},
        onClose: () => {},
        onToggle: () => {},
      };

      class Accordion {
        constructor(items = [], options = {}) {
          this._items = items;
          this._options = { ...Default, ...options };
          this._init();
        }

        _init() {
          if (this._items.length) {
            this._items.forEach(item => {
              if (item.active) {
                this.open(item.id);
              }

              item.triggerEl.addEventListener('click', () => {
                this.toggle(item.id);
              });
            });
          }
        }

        getItem(id) {
          return this._items.find(item => item.id === id);
        }

        open(id) {
          const item = this.getItem(id);

          if (!this._options.alwaysOpen) {
            this._items.forEach(i => {
              if (i !== item) {
                this._deactivateItem(i);
              }
            });
          }

          this._activateItem(item);
          this._options.onOpen(this, item);
        }

        close(id) {
          const item = this.getItem(id);
          this._deactivateItem(item);
          this._options.onClose(this, item);
        }

        toggle(id) {
          const item = this.getItem(id);

          if (item.active) {
            this.close(id);
          } else {
            this.open(id);
          }

          this._options.onToggle(this, item);
        }

        _activateItem(item) {
          item.triggerEl.classList.add(
            ...this._options.activeClasses.split(' ')
          );
          item.triggerEl.classList.remove(
            ...this._options.inactiveClasses.split(' ')
          );
          item.triggerEl.setAttribute('aria-expanded', 'true');
          item.targetEl.classList.remove('hidden');
          item.active = true;

          if (item.iconEl) {
            item.iconEl.classList.add('rotate-180');
          }
        }

        _deactivateItem(item) {
          item.triggerEl.classList.remove(
            ...this._options.activeClasses.split(' ')
          );
          item.triggerEl.classList.add(
            ...this._options.inactiveClasses.split(' ')
          );
          item.targetEl.classList.add('hidden');
          item.triggerEl.setAttribute('aria-expanded', 'false');
          item.active = false;

          if (item.iconEl) {
            item.iconEl.classList.remove('rotate-180');
          }
        }
      }

      // Make Accordion available globally for external usage
      window.Accordion = Accordion;

      // Initialize all accordions on the page
      document.querySelectorAll('[data-accordion]').forEach(accordionEl => {
        const alwaysOpen = accordionEl.getAttribute('data-accordion');
        const activeClasses = accordionEl.getAttribute('data-active-classes');
        const inactiveClasses = accordionEl.getAttribute(
          'data-inactive-classes'
        );

        const items = [];
        accordionEl.querySelectorAll('[data-accordion-target]').forEach(el => {
          const targetSelector = el.getAttribute('data-accordion-target');
          const item = {
            id: targetSelector,
            triggerEl: el,
            targetEl: document.querySelector(targetSelector),
            iconEl: el.querySelector('[data-accordion-icon]'),
            active: el.getAttribute('aria-expanded') === 'true',
          };
          items.push(item);
        });

        new Accordion(items, {
          alwaysOpen: alwaysOpen === 'open',
          activeClasses: activeClasses || Default.activeClasses,
          inactiveClasses: inactiveClasses || Default.inactiveClasses,
        });
      });
    } catch (error) {
      logger.error('Error initializing accordion:', error);
    }
  };

  /**
   * Initialize lazy loading for images
   */
  initLazyLoading = () => {
    try {
      // LazyLoader is already initialized as singleton
      // Just log that it's active
      logger.debug('Lazy loading initialized');
    } catch (error) {
      logger.error('Error initializing lazy loading:', error);
    }
  };
})();
