// src/js/app.js
import './helpers/jquery';
import { injectVersion } from './utils';
import '../scss/app.scss';
import DynamicImports from './components/DynamicImports';

console.log('Vite is working!');

export default new (class App {
  constructor() {
    this.setDomMap();
    $(() => {
      this.domReady();
    });
  }

  domReady = () => {
    this.windowResize();
    this.windowScroll();
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
    // Window Events
    this.window.resize(this.windowResize).scroll(this.windowScroll);

    // General Events
    const $container = this.wrapper;
    $container.on('click', '.disabled', () => false);
    // Specific Events
    this.gotoTop.on('click', () => {
      this.htmlNbody.animate({
        scrollTop: 0,
      });
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

    this.header.toggleClass('top', topOffset > 10);
    this.header.toggleClass('sticky-header', topOffset > 80);
    if (topOffset > this.previousScroll || topOffset < 500) {
      this.header.removeClass('sticky-header');
    } else if (topOffset < this.previousScroll) {
      this.header.addClass('sticky-header');
      // Additional checking so the header will not flicker
      if (topOffset > 250) {
        this.header.addClass('sticky-header');
      } else {
        this.header.removeClass('sticky-header');
      }
    }

    this.previousScroll = topOffset;
    this.gotoTop.toggleClass(
      'active',
      this.window.scrollTop() > this.screenHeight / 2
    );
  };
})();
