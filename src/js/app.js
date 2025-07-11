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
    this.windowResize();
    // this.windowScroll();
    this.bindEvents();
    new DynamicImports();
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

    //Menu
    /*********************/
    /* Toggle Menu */
    /*********************/

    /*********************/
    /*    Menu Active    */
    /*********************/
    function getClosest(elem, selector) {
      // Element.matches() polyfill
      if (!Element.prototype.matches) {
        Element.prototype.matches =
          Element.prototype.matchesSelector ||
          Element.prototype.mozMatchesSelector ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.oMatchesSelector ||
          Element.prototype.webkitMatchesSelector ||
          function (s) {
            var matches = (
                this.document || this.ownerDocument
              ).querySelectorAll(s),
              i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
          };
      }

      // Get the closest matching element
      for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
      }
      return null;
    }

    // function activateMenu() {
    //   var menuItems = document.getElementsByClassName('sub-menu-item');
    //   if (menuItems) {
    //     var matchingMenuItem = null;
    //     for (var idx = 0; idx < menuItems.length; idx++) {
    //       if (menuItems[idx].href === window.location.href) {
    //         matchingMenuItem = menuItems[idx];
    //       }
    //     }

    //     if (matchingMenuItem) {
    //       matchingMenuItem.classList.add('active');

    //       var immediateParent = getClosest(matchingMenuItem, 'li');

    //       if (immediateParent) {
    //         immediateParent.classList.add('active');
    //       }

    //       var parent = getClosest(immediateParent, '.child-menu-item');
    //       if (parent) {
    //         parent.classList.add('active');
    //       }

    //       var parent = getClosest(
    //         parent || immediateParent,
    //         '.parent-menu-item'
    //       );

    //       if (parent) {
    //         parent.classList.add('active');

    //         var parentMenuitem = parent.querySelector('.menu-item');
    //         if (parentMenuitem) {
    //           parentMenuitem.classList.add('active');
    //         }

    //         var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
    //         if (parentOfParent) {
    //           parentOfParent.classList.add('active');
    //         }
    //       } else {
    //         var parentOfParent = getClosest(
    //           matchingMenuItem,
    //           '.parent-parent-menu-item'
    //         );
    //         if (parentOfParent) {
    //           parentOfParent.classList.add('active');
    //         }
    //       }
    //     }
    //   }
    // }

    /*********************/
    /*  Clickable manu   */
    /*********************/
    if (document.getElementById('navigation')) {
      var elements = document
        .getElementById('navigation')
        .getElementsByTagName('a');
      for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function (elem) {
          if (elem.target.getAttribute('href') === 'javascript:void(0)') {
            var submenu = elem.target.nextElementSibling.nextElementSibling;
            submenu.classList.toggle('open');
          }
        };
      }
    }
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
})();
