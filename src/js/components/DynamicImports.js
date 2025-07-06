// src/components/DynamicImports.js
import { componentList } from '../componentList';
import { max1200 } from '../utils';

const components = import.meta.glob('./*.js');

export default class DynamicImports {
  constructor() {
    this.window = $(window);
    this.init();
  }

  init = () => {
    this.bindEvents();
    this.components();
  };

  bindEvents = () => {
    this.window.on('scroll', this.components);
  };

  components = () => {
    if (!componentList) return;

    componentList.forEach(
      async ({ element: el, className, mobile, config }) => {
        if (!el.length || el.hasClass('init')) return;
        if (!mobile && max1200.matches) return;

        const path = `./${className}.js`;

        if (components[path]) {
          const module = await components[path]();
          new module.default(config);
          el.addClass('init');
        } else {
          console.warn(`[DynamicImport] Component "${className}" not found`);
        }
      }
    );
  };
}
