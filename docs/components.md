# Components Documentation

This guide covers all the JavaScript components available in the starter template.

## Core Components

### Header Component

The header component handles navigation, mobile menu, and sticky behavior.

**Location**: `src/js/components/Header.js`

**Usage**:

```javascript
import Header from './components/Header';
new Header();
```

**Features**:

- Responsive navigation
- Mobile menu toggle
- Sticky header on scroll
- Active link highlighting

### Accordion Component

Accessible accordion implementation with keyboard navigation.

**Usage in HTML**:

```html
<div data-accordion="close">
  <button
    data-accordion-target="#panel-1"
    aria-expanded="false"
    class="w-full text-left"
  >
    <span>Accordion Title</span>
    <i data-accordion-icon class="transition-transform"></i>
  </button>
  <div id="panel-1" class="hidden">
    <p>Accordion content</p>
  </div>
</div>
```

**Attributes**:

- `data-accordion="open"`: Always open mode (multiple panels can be open)
- `data-accordion="close"`: Close mode (only one panel open at a time)
- `data-accordion-target`: ID of the panel to toggle
- `data-accordion-icon`: Icon that rotates when panel is open
- `aria-expanded`: Accessibility attribute for screen readers

**JavaScript API**:

```javascript
const accordion = new Accordion(items, {
  alwaysOpen: false,
  activeClasses: 'bg-gray-50 dark:bg-slate-800 text-indigo-600',
  inactiveClasses: 'text-dark dark:text-white',
  onOpen: (instance, item) => {
    console.log('Panel opened', item);
  },
  onClose: (instance, item) => {
    console.log('Panel closed', item);
  },
  onToggle: (instance, item) => {
    console.log('Panel toggled', item);
  },
});

// Methods
accordion.open('panel-id');
accordion.close('panel-id');
accordion.toggle('panel-id');
```

### Slider Component

Image and content slider using Swiper.js.

**Location**: `src/js/components/SliderBlock.js`

**Usage in HTML**:

```html
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```

**Configuration**:

```javascript
const slider = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
```

### Dark Mode Toggle

Theme switching between light and dark modes.

**Usage in HTML**:

```html
<button id="theme-mode" aria-label="Toggle dark mode">
  <i class="uil uil-moon"></i>
</button>
```

**Features**:

- Saves preference to localStorage
- Automatic theme detection from system preferences (future enhancement)
- Smooth transitions between themes

## Utility Components

### Lazy Loading

Intersection Observer-based lazy loading for images.

**Location**: `src/js/utils/lazyLoad.js`

**Usage in HTML**:

```html
<!-- Regular image -->
<img
  data-src="image.jpg"
  data-srcset="image@2x.jpg 2x"
  alt="Description"
  class="lazy"
/>

<!-- Background image -->
<div data-bg="background.jpg" class="lazy-bg"></div>

<!-- Iframe -->
<iframe data-src="https://example.com" title="Description" class="lazy">
</iframe>
```

**JavaScript API**:

```javascript
import lazyLoader from './utils/lazyLoad';

// Observe new elements
const newImage = document.querySelector('.new-image');
lazyLoader.observe(newImage);

// Disconnect observer
lazyLoader.disconnect();
```

### Logger

Environment-aware logging utility.

**Location**: `src/js/utils/logger.js`

**Usage**:

```javascript
import logger from './utils/logger';

logger.error('Critical error', errorObject);
logger.warn('Warning message', context);
logger.info('Information', data);
logger.debug('Debug message', details);
```

**Log Levels**:

- `ERROR`: Always logged
- `WARN`: Logged in development only
- `INFO`: Logged in development only
- `DEBUG`: Logged in development only

**Configuration**:
Set the log level via environment variable:

```env
VITE_LOG_LEVEL=DEBUG
```

### Error Handler

Global error handling with user-friendly messages.

**Location**: `src/js/utils/errorHandler.js`

**Usage**:

```javascript
import { handleError } from './utils/errorHandler';

try {
  // Your code
} catch (error) {
  handleError(error, {
    showToUser: true,
    userMessage: 'Failed to load data. Please try again.',
  });
}
```

**Features**:

- Catches uncaught errors and promise rejections
- Logs errors in development
- Can integrate with error tracking services (Sentry, LogRocket)
- Shows user-friendly error messages

## Dynamic Imports

Lazy load components for better performance.

**Location**: `src/js/components/DynamicImports.js`

**Usage**:

```javascript
class DynamicImports {
  constructor() {
    // Import heavy components only when needed
    if (document.querySelector('.swiper')) {
      import('./SliderBlock').then(module => {
        new module.default();
      });
    }
  }
}
```

## Creating Custom Components

### Basic Component Structure

```javascript
// src/js/components/MyComponent.js
import logger from '../utils/logger.js';
import { handleError } from '../utils/errorHandler.js';

class MyComponent {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      // Default options
      enabled: true,
      ...options,
    };

    this.init();
  }

  init() {
    try {
      this.setupDOM();
      this.bindEvents();
      logger.info('MyComponent initialized');
    } catch (error) {
      handleError(error, {
        showToUser: false,
      });
    }
  }

  setupDOM() {
    // Set up DOM elements
    this.button = this.element.querySelector('.button');
  }

  bindEvents() {
    // Bind event listeners
    this.button?.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    event.preventDefault();
    // Handle click
    logger.debug('Button clicked');
  }

  // Public API
  destroy() {
    this.button?.removeEventListener('click', this.handleClick);
    logger.info('MyComponent destroyed');
  }
}

export default MyComponent;
```

### Using the Component

```javascript
import MyComponent from './components/MyComponent';

// Initialize
const element = document.querySelector('.my-component');
const component = new MyComponent(element, {
  enabled: true,
});

// Later, clean up
component.destroy();
```

## Accessibility Best Practices

When creating components:

1. **Use semantic HTML**

   ```html
   <button>
     instead of
     <div role="button"></div>
   </button>
   ```

2. **Add ARIA attributes**

   ```html
   <button aria-expanded="false" aria-controls="menu">Menu</button>
   ```

3. **Support keyboard navigation**

   ```javascript
   element.addEventListener('keydown', e => {
     if (e.key === 'Enter' || e.key === ' ') {
       this.toggle();
     }
   });
   ```

4. **Provide focus indicators**
   ```css
   .button:focus-visible {
     outline: 2px solid var(--color-primary);
     outline-offset: 2px;
   }
   ```

## Testing Components

See the [Testing Guide](./testing-guide.md) for detailed information on testing components.

Example component test:

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import MyComponent from '../src/js/components/MyComponent';

describe('MyComponent', () => {
  let container;
  let component;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = '<div class="my-component">...</div>';
    document.body.appendChild(container);

    component = new MyComponent(container.querySelector('.my-component'));
  });

  it('should initialize correctly', () => {
    expect(component).toBeDefined();
    expect(component.element).toBeTruthy();
  });

  it('should handle click events', () => {
    const button = container.querySelector('.button');
    button.click();
    // Assert expected behavior
  });
});
```

## Next Steps

- Learn about [Styling](./styling-guide.md)
- Read the [Testing Guide](./testing-guide.md)
- Check [Build & Deployment](./build-deployment.md)
