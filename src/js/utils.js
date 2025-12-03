/**
 * Check if an element is in the viewport
 * @param {HTMLElement|NodeList|string} element - Element to check
 * @returns {boolean} - True if element is in viewport
 */
export const isInViewport = element => {
  if (typeof element === 'string') {
    element = document.querySelectorAll(element);
  }

  if (element instanceof NodeList) {
    return Array.from(element).some(el => checkElementInViewport(el));
  }

  return checkElementInViewport(element);
};

const checkElementInViewport = el => {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right > 0
  );
};

/**
 * Check if an element is in the viewport with offset
 * @param {HTMLElement} element - Element to check
 * @param {number} offset - Offset in pixels
 * @returns {boolean}
 */
export const isInViewportOffset = (element, offset = 800) => {
  if (typeof element === 'string') {
    element = document.querySelectorAll(element);
  }

  if (element instanceof NodeList) {
    return Array.from(element).some(el =>
      checkElementInViewportOffset(el, offset)
    );
  }

  return checkElementInViewportOffset(element, offset);
};

const checkElementInViewportOffset = (el, offset) => {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
    rect.top - offset <
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom + offset > 0
  );
};

export const inVP = elm => isInViewport(elm) || isInViewportOffset(elm);

// Media Queries
export const min1024 = window.matchMedia('(min-width: 1024px)');
export const min991 = window.matchMedia('(min-width: 991px)');
export const max1200 = window.matchMedia('(max-width: 1200px)');
export const max767 = window.matchMedia('(max-width: 767px)');
export const max375 = window.matchMedia('(max-width: 375px)');

// Version Injector
export const injectVersion = async () => {
  try {
    const res = await fetch('/version.json');
    if (!res.ok) throw new Error('Failed to fetch version');

    const { version, date } = await res.json();

    const el = document.getElementById('version-text');
    if (el) {
      const formatted = new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      el.textContent = `v${version} – Last updated: ${formatted}`;
    }
  } catch (e) {
    // Silent fail or log debug
    if (import.meta.env.DEV) {
      console.debug('Failed to load version.json', e);
    }
  }
};
