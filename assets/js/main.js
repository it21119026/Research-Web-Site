/**
 * Template Name: Presento - v3.7.0
 * Template URL: https://bootstrapmade.com/presento-bootstrap-corporate-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });
  /**
   * Clients Slider
   */
  new Swiper(".clients-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120,
      },
    },
  });

  /**
   * document isotope and filter
   */
  window.addEventListener("load", () => {
    let documentContainer = select(".document-container");
    if (documentContainer) {
      let documentIsotope = new Isotope(documentContainer, {
        itemSelector: ".document-item",
        layoutMode: "fitRows",
      });

      let documentFilters = select("#document-flters li", true);

      $(document).ready(function (e) {
        documentFilters.forEach(function (el) {
          if (el.classList.length == 1) {
            documentIsotope.arrange({
              filter: el.getAttribute("data-filter"),
            });
            documentIsotope.on("arrangeComplete", function () {
              AOS.refresh();
            });
          }
        });
      });
      
      on(
        "click",
        "#document-flters li",
        function (e) {
          e.preventDefault();
          documentFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          documentIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          documentIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate document lightbox
   */
  const documentLightbox = GLightbox({
    selector: ".document-lightbox",
  });

  /**
   * document details slider
   */
  new Swiper(".document-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

/**
   * presentation isotope and filter
   */
 window.addEventListener("load", () => {
  let presentationContainer = select(".presentation-container");
  if (presentationContainer) {
    let presentationIsotope = new Isotope(presentationContainer, {
      itemSelector: ".presentation-item",
      layoutMode: "fitRows",
    });

    let presentationFilters = select("#presentation-flters li", true);

    $(document).ready(function (e) {
      presentationFilters.forEach(function (el) {
        if (el.classList.length == 1) {
          presentationIsotope.arrange({
            filter: el.getAttribute("data-filter"),
          });
          presentationIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        }
      });
    });

    on(
      "click",
      "#presentation-flters li",
      function (e) {
        e.preventDefault();
        presentationFilters.forEach(function (el) {
          el.classList.remove("filter-active");
        });
        this.classList.add("filter-active");

        presentationIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        });
        presentationIsotope.on("arrangeComplete", function () {
          AOS.refresh();
        });
      },
      true
    );
  }
});

/**
 * Initiate presentation lightbox
 */
const presentationLightbox = GLightbox({
  selector: ".presentation-lightbox",
});

/**
 * presentation details slider
 */
new Swiper(".presentation-details-slider", {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  // nav tab section
  $(".readmore").on("click", function (e) {
    let flag = true;
    let has2 = false;
    const targetId = e.target["dataset"].target;
    const element = document.getElementById(targetId);
    let element2;

    element.classList.forEach((value) => {
      if (value == "collapse") {
        flag = false;
      }
      if (value == "has2") {
        element2 = document.getElementById(targetId + "2");
        has2 = true;
      }
    });

    if (flag) {
      element.classList.add("collapse");
      e.target.classList.remove("btn-warning");
      e.target.classList.add("btn-info");
      element.classList.remove("fade-sec");

      if (has2) {
        element2.classList.add("collapse");
        element.classList.remove("fade-sec");
      }
    } else {
      e.target.classList.remove("btn-info");
      e.target.classList.add("btn-warning");
      element.classList.remove("collapse");
      element.classList.add("fade-sec");

      if (has2) {
        element2.classList.remove("collapse");
        element2.classList.add("fade-sec");
      }
    }
  });
})();
