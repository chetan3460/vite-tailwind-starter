import { componentList } from '../componentList';
import { max1200 } from '../utils';

const components = import.meta.glob('./*.js');

export default class DynamicImports {
  constructor() {
    this.window = window;
    this.init();
  }

  init = () => {
    this.bindEvents();
    this.components();
  };

  bindEvents = () => {
    this.window.addEventListener('scroll', this.components);
  };

  components = () => {
    if (!componentList) return;

    componentList.forEach(async ({ selector, className, mobile, config }) => {
      const el = document.querySelector(selector);
      if (!el || el.classList.contains('init')) return;
      if (!mobile && max1200.matches) return;

      const path = `./${className}.js`;

      if (components[path]) {
        const module = await components[path]();
        new module.default(config);
        el.classList.add('init');
      } else {
        console.warn(`[DynamicImport] Component "${className}" not found`);
      }
    });
  };
}
