import './helpers/jquery';
import { injectVersion } from './utils';

console.log('Vite is working!');

import '../scss/app.scss';
import Header from './components/Header';
import DynamicImports from './components/DynamicImports';
import { inVP } from './utils';

export default new (class App {
  constructor() {
    this.setDomMap();
    this.previousScroll = 0;

    $(() => {
      this.domReady();
    });
  }

  domReady = () => {
    if (navigator.appVersion.indexOf('Win') !== -1) {
      this.scrollSmoother?.();
    }
    this.initComponents();
    this.windowResize();
    this.bindEvents();
    // ✅ Inject the version into the DOM
    injectVersion();
  };

  initComponents = () => {
    new Header({
      header: this.header,
      htmlBody: this.htmlBody,
    });

    new DynamicImports();
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
    this.window.resize(this.windowResize).scroll(this.windowScroll);

    const $container = this.wrapper;
    $container.on('click', '.disabled', () => false);

    this.gotoTop.on('click', () => {
      this.htmlNbody.animate({ scrollTop: 0 });
    });
    console.log('App Version:', __APP_VERSION__);

    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('version');
      if (el) {
        el.textContent = `v${__APP_VERSION__}`;
      }
    });


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

  windowScroll = () => {
    const topOffset = this.window.scrollTop();

    this.header.toggleClass('top', topOffset > 300);
    this.header.toggleClass('sticky', topOffset > 600);
    if (topOffset > this.previousScroll || topOffset < 500) {
      this.header.removeClass('sticky');
    } else {
      this.header.addClass('sticky');
      if (topOffset > 250) {
        this.header.addClass('sticky');
      } else {
        this.header.removeClass('sticky');
      }
    }

    this.previousScroll = topOffset;
    this.gotoTop.toggleClass('active', topOffset > this.screenHeight / 2);
  };
})();
