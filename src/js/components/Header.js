// import gsap from "gsap";
// import { max767, min1024 } from "../utils";

export default class Header {
  constructor({ header, htmlBody }) {
    this.header = header;
    this.htmlBody = htmlBody;
    this.menuTrigger = this.header.find('.menuToggle');
    this.mainMenu = this.htmlBody.find('.main-menu');
    this.menuMask = this.htmlBody.find('.menu-mask');
    this.menuOverlay = this.htmlBody.find('.menu-overlay');
    this.megaMenuLinks = this.mainMenu.find('a');
    this.searchBox = $('.searchbox');
    this.bindEvents();
  }

  bindEvents = () => {
    const $container = this.htmlBody;

    // $container.on("click", ".menu", this.handleMenu);
  };
}
