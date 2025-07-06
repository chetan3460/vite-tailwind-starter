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
    this.window.resize(this.windowResize);
    this.gotoTop.on('click', () => {
      this.htmlNbody.animate({ scrollTop: 0 });
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
})();
