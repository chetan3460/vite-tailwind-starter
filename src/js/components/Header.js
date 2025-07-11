// import gsap from "gsap";
// import { max767, min1024 } from "../utils";

export default class Header {
  constructor({ header, htmlBody }) {
    this.header = header;
    this.htmlBody = htmlBody;

    this.bindEvents();
    this.stickyMenu();
    this.toggleMenu();
    this.activateMenu();
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

  activateMenu = () => {
    var menuItems = document.getElementsByClassName('sub-menu-item');
    if (menuItems) {
      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add('active');

        var immediateParent = getClosest(matchingMenuItem, 'li');

        if (immediateParent) {
          immediateParent.classList.add('active');
        }

        var parent = getClosest(immediateParent, '.child-menu-item');
        if (parent) {
          parent.classList.add('active');
        }

        var parent = getClosest(parent || immediateParent, '.parent-menu-item');

        if (parent) {
          parent.classList.add('active');

          var parentMenuitem = parent.querySelector('.menu-item');
          if (parentMenuitem) {
            parentMenuitem.classList.add('active');
          }

          var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
          if (parentOfParent) {
            parentOfParent.classList.add('active');
          }
        } else {
          var parentOfParent = getClosest(
            matchingMenuItem,
            '.parent-parent-menu-item'
          );
          if (parentOfParent) {
            parentOfParent.classList.add('active');
          }
        }
      }
    }
  };
}
