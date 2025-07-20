import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Register Swiper modules
Swiper.use([Navigation, Pagination, Autoplay]);

export default class SliderBlock {
  constructor() {
    this.initSliders();
  }

  initSliders() {
    const carousels = document.querySelectorAll('.swiper-container');

    carousels.forEach((slider1, i) => {
      slider1.classList.add('swiper-container-' + i);

      // Create navigation & pagination elements
      const controls = document.createElement('div');
      controls.className = 'swiper-controls';

      const pagi = document.createElement('div');
      pagi.className = 'swiper-pagination';

      const navi = document.createElement('div');
      navi.className = 'swiper-navigation';

      const prev = document.createElement('div');
      prev.className = 'swiper-button swiper-button-prev';

      const next = document.createElement('div');
      next.className = 'swiper-button swiper-button-next';

      slider1.appendChild(controls);
      controls.appendChild(navi);
      navi.appendChild(prev);
      navi.appendChild(next);
      controls.appendChild(pagi);

      // Responsive config
      let slidesPerViewInit, breakpointsInit;
      if (slider1.getAttribute('data-items-auto') === 'true') {
        slidesPerViewInit = 'auto';
        breakpointsInit = null;
      } else {
        const items = (key, fallback) =>
          Number(slider1.getAttribute(key)) || fallback;

        const sliderItemsXs = items('data-items-xs', 1);
        const sliderItemsSm = items('data-items-sm', sliderItemsXs);
        const sliderItemsMd = items('data-items-md', sliderItemsSm);
        const sliderItemsLg = items('data-items-lg', sliderItemsMd);
        const sliderItemsXl = items('data-items-xl', sliderItemsLg);
        const sliderItemsXxl = items('data-items-xxl', sliderItemsXl);

        slidesPerViewInit = items('data-items', 3);

        breakpointsInit = {
          0: { slidesPerView: sliderItemsXs },
          576: { slidesPerView: sliderItemsSm },
          768: { slidesPerView: sliderItemsMd },
          992: { slidesPerView: sliderItemsLg },
          1200: { slidesPerView: sliderItemsXl },
          1400: { slidesPerView: sliderItemsXxl },
        };
      }

      // Config values
      const sliderEffect = slider1.getAttribute('data-effect') || 'slide';
      const sliderSpeed = Number(slider1.getAttribute('data-speed')) || 500;
      const sliderAutoPlay = slider1.getAttribute('data-autoplay') !== 'false';
      const sliderAutoPlayTime =
        Number(slider1.getAttribute('data-autoplaytime')) || 5000;
      const sliderAutoHeight =
        slider1.getAttribute('data-autoheight') === 'false';
      const sliderResizeUpdate =
        slider1.getAttribute('data-resizeupdate') !== 'false';
      const sliderAllowTouchMove =
        slider1.getAttribute('data-drag') !== 'false';
      const sliderReverseDirection =
        slider1.getAttribute('data-reverse') === 'true';
      const sliderMargin = Number(slider1.getAttribute('data-margin')) || 10;
      const sliderLoop = slider1.getAttribute('data-loop') === 'false';
      const sliderCentered = slider1.getAttribute('data-centered') === 'true';

      const swiper = slider1.querySelector('.swiper:not(.swiper-thumbs)');
      const swiperTh = slider1.querySelector('.swiper-thumbs');

      if (!swiper) return;

      let sliderTh = null;
      if (swiperTh) {
        sliderTh = new Swiper(swiperTh, {
          slidesPerView: 5,
          spaceBetween: 10,
          loop: false,
          threshold: 2,
          slideToClickedSlide: true,
        });
      }

      if (slider1.getAttribute('data-thumbs') === 'true' && sliderTh) {
        const swiperMain = document.createElement('div');
        swiperMain.className = 'swiper-main';
        swiper.parentNode.insertBefore(swiperMain, swiper);
        swiperMain.appendChild(swiper);
        slider1.removeChild(controls);
        swiperMain.appendChild(controls);
      }

      new Swiper(swiper, {
        on: {
          beforeInit: function () {
            if (
              slider1.getAttribute('data-nav') !== 'true' &&
              slider1.getAttribute('data-dots') !== 'true'
            ) {
              controls.remove();
            }
            if (slider1.getAttribute('data-dots') !== 'true') {
              pagi.remove();
            }
            if (slider1.getAttribute('data-nav') !== 'true') {
              navi.remove();
            }
          },
          init: function () {
            if (
              slider1.getAttribute('data-autoplay') !== 'true' &&
              this.autoplay &&
              typeof this.autoplay.stop === 'function'
            ) {
              this.autoplay.stop();
            }
            this.update();
          },
        },
        autoplay: sliderAutoPlay
          ? {
              delay: sliderAutoPlayTime,
              disableOnInteraction: false,
              reverseDirection: sliderReverseDirection,
              pauseOnMouseEnter: false,
            }
          : false,
        allowTouchMove: sliderAllowTouchMove,
        speed: sliderSpeed,
        slidesPerView: slidesPerViewInit,
        loop: sliderLoop,
        centeredSlides: sliderCentered,
        spaceBetween: sliderMargin,
        effect: sliderEffect,
        autoHeight: sliderAutoHeight,
        grabCursor: true,
        resizeObserver: false,
        updateOnWindowResize: sliderResizeUpdate,
        breakpoints: breakpointsInit,
        slidesPerGroup: 1,
        pagination: {
          el: slider1.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
          prevEl: slider1.querySelector('.swiper-button-prev'),
          nextEl: slider1.querySelector('.swiper-button-next'),
        },
        thumbs: {
          swiper: sliderTh || null,
        },
      });
    });
  }
}
