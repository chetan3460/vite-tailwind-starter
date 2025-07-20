export const isInViewport = element => {
  if (element.length) {
    let flag = false;
    element.each((_, el) => {
      const elementTop = $(el).offset().top;
      const elementBottom = elementTop + $(el).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        flag = true;
      }
    });
    return flag;
  }
};

export const isInViewportOffset = element => {
  if (element.length) {
    let flag = false;
    element.each((_, el) => {
      const elementTop = $(el).offset().top - 800;
      const elementBottom = elementTop + $(el).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        flag = true;
      }
    });
    return flag;
  }
};

export const inVP = elm => isInViewport(elm) || isInViewportOffset(elm);

// Media Queries
export const min1024 = window.matchMedia('(min-width: 1024px)');
export const min991 = window.matchMedia('(min-width: 991px)');
export const max1200 = window.matchMedia('(max-width: 1200px)');
export const max767 = window.matchMedia('(max-width: 767px)');
export const max375 = window.matchMedia('(max-width: 375px)');

// Version Injector
// export const injectVersion = async () => {
//   try {
//     const res = await fetch('/version.json');
//     const { version, date } = await res.json();

//     const el = document.getElementById('version-text');
//     if (el) {
//       const formatted = new Date(date).toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       });

//       el.textContent = `v${version} – Last updated: ${formatted}`;
//     }
//   } catch (e) {
//     console.warn('Failed to load version.json');
//   }
// };
