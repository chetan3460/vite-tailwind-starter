import $ from 'jquery';

const bannerSlider = $('.banner-area');
const upgradeSlider = $('.upgrade--section');
const TestBlock = $('.test-block');
// Set 'mobile' to false to prevent JS from loading on mobile. Change the media query as desired in DynamicImports.js

export const componentList = [
  {
    element: bannerSlider,
    // File Name
    className: 'BannerSlider',
    mobile: true,
  },
  {
    element: upgradeSlider,
    // File Name
    className: 'UpgradeSlider',
    mobile: true,
  },
  {
    element: TestBlock,
    // File Name
    className: 'TestBlock',
    mobile: true,
  },
];
