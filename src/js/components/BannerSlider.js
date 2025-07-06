import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { min1024 } from '../utils';

export default class BannerSlider {
  constructor() {
    this.setDomMap();
    this.bindEvents();
  }

  setDomMap() {}

  bindEvents() {
    const mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        // dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      modules: [Navigation, Pagination, Autoplay],
      // Autoplay
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      speed: 2000,
      // effect: 'fade',
      // fadeEffect: {
      //   crossFade: true,
      // },
    });
  }
}
