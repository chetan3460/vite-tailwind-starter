// src/componentList.js
import $ from 'jquery';

export const componentList = [
  {
    element: $('header'),
    className: 'Header',
    mobile: true,
    config: {
      header: $('header'),
      htmlBody: $('body'),
    },
  },
  {
    element: $('.banner-area'),
    className: 'BannerSlider',
    mobile: true,
  },
  {
    element: $('.upgrade--section'),
    className: 'UpgradeSlider',
    mobile: true,
  },
  {
    element: $('.test-block'),
    className: 'TestBlock',
    mobile: true,
  },
];
