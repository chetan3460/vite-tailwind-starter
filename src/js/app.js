// src/js/app.js
import './helpers/jquery';
import { injectVersion } from './utils';

import '@iconscout/unicons/css/line.css'; // or solid.css, thinline.css
import '../css/app.css';
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

  bindEvents = () => {};

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
})();
