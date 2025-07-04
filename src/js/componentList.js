
import $ from 'jquery';

const bannerSlider = $(".banner-area");
const upgradeSlider = $(".upgrade--section");
// Set 'mobile' to false to prevent JS from loading on mobile. Change the media query as desired in DynamicImports.js

export const componentList = [


  {
    element: bannerSlider,
    // File Name
    className: "BannerSlider",
    mobile: true,
  },
  {
    element: upgradeSlider,
    // File Name
    className: "UpgradeSlider",
    mobile: true,
  },
];
