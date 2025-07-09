// src/js/app.js
import './helpers/jquery';
import { injectVersion } from './utils';
// import '../scss/app.scss';
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
    this.windowResize();
    // this.windowScroll();
    this.bindEvents();
    new DynamicImports();
    this.stickyMenu();
    injectVersion();
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
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    document.documentElement.classList.toggle(
      'dark',
      localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
    // Whenever the user explicitly chooses light mode
    localStorage.theme = 'light';
    // Whenever the user explicitly chooses dark mode
    localStorage.theme = 'dark';
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem('theme');

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

  windowResize = () => {
    this.screenWidth = this.window.width();
    this.screenHeight = this.window.height();

    if (this.pushDiv.length) {
      this.footerHeight = this.footer.outerHeight();
      this.wrapper.css('margin-bottom', -this.footerHeight);
      this.pushDiv.height(this.footerHeight);
    }
  };

  //Sticky Menu
  stickyMenu = () => {
    let ticking = false;

    function windowScroll() {
      const navbar = document.getElementById('topnav');
      if (navbar) {
        navbar.classList.toggle('nav-sticky', window.scrollY >= 50);
      }
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          windowScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll);
  };
})();
