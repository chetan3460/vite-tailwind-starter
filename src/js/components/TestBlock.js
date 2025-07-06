import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default class TestBlock {
  constructor() {
    this.setDomMap();
    this.bindEvents();
  }

  setDomMap() {}

  bindEvents() {
    const mySwiper = new Swiper('.swiper-upgrade1', {
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
      breakpoints: {
        1920: {
          slidesPerView: 3.2,
          spaceBetween: 30,
        },
        1028: {
          slidesPerView: 3.2,
          spaceBetween: 30,
        },
        767: {
          slidesPerView: 2.2,
          spaceBetween: 30,
        },
        480: {
          slidesPerView: 1.4,
          spaceBetween: 0,
        },
      },
      // effect: 'fade',
      // fadeEffect: {
      //   crossFade: true,
      // },
    });
  }
}
