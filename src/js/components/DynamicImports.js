import { importComponent, max1200 } from '../utils';
import { componentList } from '../componentList';

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
    if (!componentList) {
      return;
    }

    $.each(componentList, (_, { element: el, className, mobile }) => {
      if (!el.length) {
        return;
      }
      if (!mobile && max1200.matches) {
        return;
      }

      importComponent(el, className);
    });
  };
}
