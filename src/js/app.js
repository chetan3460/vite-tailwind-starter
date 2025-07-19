// src/js/app.js
import './helpers/jquery';
import { injectVersion } from './utils';

import '@iconscout/unicons/css/line.css'; // or solid.css, thinline.css
import '../css/app.css';
import feather from 'feather-icons';
import DynamicImports from './components/DynamicImports';

console.log('Vite is working!');
console.log('App JS loaded');

export default new (class App {
  constructor() {
    this.setDomMap();
    $(() => {
      this.domReady();
    });
  }

  domReady = () => {
    this.bindEvents();
    new DynamicImports();
    injectVersion();
    this.darkMode();
    this.addHomeClass();
    this.accordion();
  };

  setDomMap = () => {
    this.window = $(window);
    this.htmlNbody = $('body, html');
    this.html = $('html');
    this.htmlBody = $('body');
    this.header = $('header');
    this.gotoTop = $('#gotoTop');
    this.wrapper = $('.wrapper');
    this.footer = $('footer');
    this.pushDiv = this.wrapper.find('.push');
  };

  bindEvents = () => {
    feather.replace();
  };

  // Dark Mode Toggle
  // This function toggles the dark mode by adding or removing the 'dark' class on the HTML tag
  darkMode = () => {
    try {
      function changeTheme(e) {
        e.preventDefault();
        const htmlTag = document.getElementsByTagName('html')[0];

        if (htmlTag.className.includes('dark')) {
          htmlTag.className = 'light';
        } else {
          htmlTag.className = 'dark';
        }
      }

      const switcher = document.getElementById('theme-mode');
      switcher?.addEventListener('click', changeTheme);

      const chk = document.getElementById('chk');

      chk.addEventListener('change', changeTheme);
    } catch (err) {}
  };

  // Add 'home' class to body for home page and specific classes for other pages
  // This is useful for applying specific styles based on the page type
  addHomeClass = () => {
    const homePaths = ['/', '/index.html', '/vite-tailwind-starter/'];
    const currentPath = window.location.pathname;
    const isHomePage = homePaths.includes(currentPath);
    if (isHomePage) {
      document.body.classList.add('home');
      // console.log("Added class 'home' to the body");
    } else {
      // console.log("Did not add class 'home'");
    }

    const pathSegments = currentPath.split('/').filter(Boolean);
    const fileName = pathSegments[pathSegments.length - 1] || ''; // Get the last segment
    const fileWithoutExtension = fileName.split('.')[0]; // Remove the extension

    // Split by hyphens to get the first word for other pages
    const firstWord = fileWithoutExtension.split('-')[0];

    // Add a class based on the first word, but not for the main page
    if (firstWord && !isHomePage) {
      const className = `${firstWord}-page`;
      document.body.classList.add(className);
      // console.log(`Added class '${className}' to the body`);
    } else {
      // console.log("No valid first word found to add class");
    }
  };

  // Accordion functionality
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
            // show accordion item based on click
            this._items.map(item => {
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
          return this._items.filter(item => item.id === id)[0];
        }

        open(id) {
          const item = this.getItem(id);

          // don't hide other accordions if always open
          if (!this._options.alwaysOpen) {
            this._items.map(i => {
              if (i !== item) {
                i.triggerEl.classList.remove(
                  ...this._options.activeClasses.split(' ')
                );
                i.triggerEl.classList.add(
                  ...this._options.inactiveClasses.split(' ')
                );
                i.targetEl.classList.add('hidden');
                i.triggerEl.setAttribute('aria-expanded', false);
                i.active = false;

                // rotate icon if set
                if (i.iconEl) {
                  i.iconEl.classList.remove('rotate-180');
                }
              }
            });
          }

          // show active item
          item.triggerEl.classList.add(
            ...this._options.activeClasses.split(' ')
          );
          item.triggerEl.classList.remove(
            ...this._options.inactiveClasses.split(' ')
          );
          item.triggerEl.setAttribute('aria-expanded', true);
          item.targetEl.classList.remove('hidden');
          item.active = true;

          // rotate icon if set
          if (item.iconEl) {
            item.iconEl.classList.add('rotate-180');
          }

          // callback function
          this._options.onOpen(this, item);
        }

        toggle(id) {
          const item = this.getItem(id);

          if (item.active) {
            this.close(id);
          } else {
            this.open(id);
          }

          // callback function
          this._options.onToggle(this, item);
        }

        close(id) {
          const item = this.getItem(id);

          item.triggerEl.classList.remove(
            ...this._options.activeClasses.split(' ')
          );
          item.triggerEl.classList.add(
            ...this._options.inactiveClasses.split(' ')
          );
          item.targetEl.classList.add('hidden');
          item.triggerEl.setAttribute('aria-expanded', false);
          item.active = false;

          // rotate icon if set
          if (item.iconEl) {
            item.iconEl.classList.remove('rotate-180');
          }

          // callback function
          this._options.onClose(this, item);
        }
      }

      window.Accordion = Accordion;

      document.querySelectorAll('[data-accordion]').forEach(accordionEl => {
        const alwaysOpen = accordionEl.getAttribute('data-accordion');
        const activeClasses = accordionEl.getAttribute('data-active-classes');
        const inactiveClasses = accordionEl.getAttribute(
          'data-inactive-classes'
        );

        const items = [];
        accordionEl.querySelectorAll('[data-accordion-target]').forEach(el => {
          const item = {
            id: el.getAttribute('data-accordion-target'),
            triggerEl: el,
            targetEl: document.querySelector(
              el.getAttribute('data-accordion-target')
            ),
            iconEl: el.querySelector('[data-accordion-icon]'),
            active: el.getAttribute('aria-expanded') === 'true' ? true : false,
          };
          items.push(item);
        });

        new Accordion(items, {
          alwaysOpen: alwaysOpen === 'open' ? true : false,
          activeClasses: activeClasses ? activeClasses : Default.activeClasses,
          inactiveClasses: inactiveClasses
            ? inactiveClasses
            : Default.inactiveClasses,
        });
      });
    } catch (error) {}
  };
})();
