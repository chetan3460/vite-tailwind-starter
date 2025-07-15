export default class Header {
  constructor({ header, htmlBody }) {
    this.header = header;
    this.htmlBody = htmlBody;
    this.bindEvents();
    this.stickyMenu();
    this.toggleMenu();
    this.addActivateMenu();
    this.submenuToggle();
  }

  bindEvents = () => {};

  //Sticky Menu
  stickyMenu = () => {
    let ticking = false;

    function windowScroll() {
      const navbar = document.getElementById('topnav');
      if (navbar) {
        navbar.classList.toggle('nav-sticky', window.scrollY >= 50);
      }
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          windowScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll);
  };

  /* Toggle Menu */
  toggleMenu = () => {
    const toggleBtn = document.getElementById('isToggle');
    const nav = document.getElementById('navigation');

    if (toggleBtn && nav) {
      toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('open');

        const isCurrentlyVisible =
          window.getComputedStyle(nav).display === 'block';
        nav.style.display = isCurrentlyVisible ? 'none' : 'block';
      });
    }
  };
  // Add 'active' class to the current menu item based on the URL
  // This helps in highlighting the current page in the navigation menu
  addActivateMenu = () => {
    const menuItems = document.querySelectorAll('.sub-menu-item');
    if (!menuItems.length) return;

    const currentPage =
      window.location.pathname.split('/').pop() || 'index.html';

    menuItems.forEach(item => {
      const linkPage = item.getAttribute('href')?.split('/').pop();
      if (linkPage === currentPage) {
        item.classList.add('active');

        const li = this.getClosest(item, 'li');
        li?.classList.add('active');

        const childMenu = this.getClosest(li, '.child-menu-item');
        childMenu?.classList.add('active');

        const parentMenu = this.getClosest(
          childMenu || li,
          '.parent-menu-item'
        );
        parentMenu?.classList.add('active');

        const topItem = parentMenu?.querySelector('.menu-item');
        topItem?.classList.add('active');

        const parentOfParent = this.getClosest(
          parentMenu || item,
          '.parent-parent-menu-item'
        );
        parentOfParent?.classList.add('active');
      }
    });
  };
  getClosest = (elem, selector) => {
    while (elem && elem !== document) {
      if (elem.matches(selector)) return elem;
      elem = elem.parentNode;
    }
    return null;
  };

  // Submenu Toggle
  // This function toggles the visibility of submenus when their parent menu item is clicked
  submenuToggle = () => {
    const nav = document.getElementById('navigation');

    if (nav) {
      const toggles = nav.querySelectorAll('a[href="javascript:void(0)"]');

      toggles.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();

          // Find the parent <li>
          const li = link.closest('li');
          if (!li) return;

          // Find the corresponding submenu
          const submenu = li.querySelector('.submenu');
          if (!submenu) return;

          // Close all other submenus first
          const allSubmenus = nav.querySelectorAll('.submenu.open');
          allSubmenus.forEach(menu => {
            if (menu !== submenu) {
              menu.classList.remove('open');
            }
          });

          // Toggle current submenu
          submenu.classList.toggle('open');
        });
      });
    }
  };
}
