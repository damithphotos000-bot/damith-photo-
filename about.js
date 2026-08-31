/* =========================================================
   DAMITH PHOTO
   ABOUT JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  "use strict";


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const menu =
    document.querySelector(".about-menu");

  const navigation =
    document.querySelector(".about-navigation");

  const body =
    document.body;


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function openMenu() {

    if (!menu || !navigation) {
      return;
    }

    menu.classList.add("open");

    navigation.classList.add("open");

    menu.setAttribute(
      "aria-expanded",
      "true"
    );

    menu.setAttribute(
      "aria-label",
      "Close navigation menu"
    );

    body.classList.add("menu-open");
  }


  function closeMenu() {

    if (!menu || !navigation) {
      return;
    }

    menu.classList.remove("open");

    navigation.classList.remove("open");

    menu.setAttribute(
      "aria-expanded",
      "false"
    );

    menu.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    body.classList.remove("menu-open");
  }


  function toggleMenu() {

    if (!menu || !navigation) {
      return;
    }

    const isOpen =
      navigation.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }

  }


  /* MENU BUTTON */

  if (menu && navigation) {

    menu.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

        toggleMenu();

      }
    );


    /* CLOSE AFTER LINK CLICK */

    const links =
      navigation.querySelectorAll("a");

    links.forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          closeMenu();

        }
      );

    });


    /* CLICK OUTSIDE */

    document.addEventListener(
      "click",
      function (event) {

        if (
          navigation.classList.contains("open") &&
          !navigation.contains(event.target) &&
          !menu.contains(event.target)
        ) {

          closeMenu();

        }

      }
    );


    /* ESCAPE KEY */

    document.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Escape") {

          closeMenu();

        }

      }
    );


    /* CLOSE ON RESIZE */

    window.addEventListener(
      "resize",
      function () {

        if (window.innerWidth > 800) {

          closeMenu();

        }

      }
    );

  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".about-story, .about-philosophy, .about-cta"
    );


  if (revealElements.length > 0) {

    revealElements.forEach(function (element) {

      element.classList.add("reveal");

    });


    if (
      "IntersectionObserver" in window
    ) {

      const observer =
        new IntersectionObserver(
          function (entries, obs) {

            entries.forEach(
              function (entry) {

                if (
                  entry.isIntersecting
                ) {

                  entry.target.classList.add(
                    "visible"
                  );

                  obs.unobserve(
                    entry.target
                  );

                }

              }
            );

          },
          {
            threshold: 0.12,

            rootMargin:
              "0px 0px -40px 0px"
          }
        );


      revealElements.forEach(
        function (element) {

          observer.observe(element);

        }
      );

    } else {

      revealElements.forEach(
        function (element) {

          element.classList.add(
            "visible"
          );

        }
      );

    }

  }


  /* =======================================================
     PREVENT HASH JUMP GLITCH
  ======================================================= */

  window.addEventListener(
    "pageshow",
    function () {

      if (
        navigation &&
        navigation.classList.contains("open")
      ) {

        closeMenu();

      }

    }
  );


});
