// import gsap from "gsap";
// import { max767, min1024 } from "../utils";

export default class Header {
  constructor({ header, htmlBody }) {
    this.header = header;
    this.htmlBody = htmlBody;

    this.bindEvents();
  }

  bindEvents = () => {
    const toggleBtn = document.getElementById('isToggle');
    const nav = document.getElementById('navigation');

    toggleBtn?.addEventListener('click', () => {
      toggleBtn.classList.toggle('open');
      nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
  };
}
