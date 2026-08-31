/* =========================================================
   DAMITH PHOTO
   SERVICES PAGE JAVASCRIPT
   FINAL VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  "use strict";


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const body = document.body;

  const menu =
    document.querySelector(".service-menu");

  const navigation =
    document.querySelector(".service-navigation");

  const revealItems =
    document.querySelectorAll(".reveal");

  const serviceLinks =
    document.querySelectorAll(".service-link");

  const serviceItems =
    document.querySelectorAll(".service-item");



  /* =======================================================
     PAGE READY
     
     IMPORTANT:
     Add js-ready only after JavaScript is actually running.
     This prevents content from being permanently hidden.
  ======================================================= */

  body.classList.add("js-ready");



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



  /* =======================================================
     MOBILE MENU BUTTON
  ======================================================= */

  if (menu && navigation) {

    menu.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

        toggleMenu();

      }
    );


    /* -----------------------------------------------
       CLOSE AFTER NAVIGATION CLICK
    ------------------------------------------------ */

    navigation
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            closeMenu();

          }
        );

      });


    /* -----------------------------------------------
       CLICK OUTSIDE MENU
    ------------------------------------------------ */

    document.addEventListener(
      "click",
      function (event) {

        if (
          !navigation.contains(event.target) &&
          !menu.contains(event.target)
        ) {

          closeMenu();

        }

      }
    );

  }



  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {

        closeMenu();

      }

    }
  );



  /* =======================================================
     WINDOW RESIZE
     
     If user rotates phone or moves from mobile to desktop,
     automatically close the mobile navigation.
  ======================================================= */

  window.addEventListener(
    "resize",
    function () {

      if (window.innerWidth > 800) {

        closeMenu();

      }

    }
  );



  /* =======================================================
     SERVICE SELECTION
     
     Every service button uses:
     
     contact.html?service=Birthday%20Shoots
     
     This allows the contact page to know which service
     the visitor selected.
  ======================================================= */

  serviceLinks.forEach(
    function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const serviceItem =
            link.closest(".service-item");


          if (!serviceItem) {
            return;
          }


          const serviceName =
            serviceItem.dataset.service;


          if (!serviceName) {
            return;
          }


          /*
             Build the contact URL safely.
          */

          const contactURL =
            new URL(
              "contact.html",
              window.location.href
            );


          contactURL.searchParams.set(
            "service",
            serviceName
          );


          /*
             Keep normal browser navigation.
             This means:
             - back button works
             - open in same tab
             - no popup problems
          */

          event.preventDefault();

          window.location.href =
            contactURL.toString();

        }
      );

    }
  );



  /* =======================================================
     SERVICE CARD KEYBOARD ACCESS
     
     Allows keyboard users to focus/click the service card
     if required.
  ======================================================= */

  serviceItems.forEach(
    function (item) {

      const link =
        item.querySelector(".service-link");


      if (!link) {
        return;
      }


      item.addEventListener(
        "keydown",
        function (event) {

          /*
             Only activate when the card itself has focus.
          */

          if (
            event.target === item &&
            (
              event.key === "Enter" ||
              event.key === " "
            )
          ) {

            event.preventDefault();

            link.click();

          }

        }
      );

    }
  );



  /* =======================================================
     REVEAL ANIMATION
  ======================================================= */

  if (revealItems.length > 0) {


    /*
       IntersectionObserver supported
    */

    if (
      "IntersectionObserver" in window
    ) {

      const revealObserver =
        new IntersectionObserver(
          function (entries, observer) {

            entries.forEach(
              function (entry) {

                if (
                  entry.isIntersecting
                ) {

                  entry.target.classList.add(
                    "visible"
                  );


                  observer.unobserve(
                    entry.target
                  );

                }

              }
            );

          },
          {
            threshold:0.12,

            rootMargin:
              "0px 0px -40px 0px"
          }
        );


      revealItems.forEach(
        function (item) {

          revealObserver.observe(item);

        }
      );

    }


    /*
       Older browser fallback
    */

    else {

      revealItems.forEach(
        function (item) {

          item.classList.add(
            "visible"
          );

        }
      );

    }

  }



  /* =======================================================
     SAFETY FALLBACK
     
     If something prevents IntersectionObserver from
     revealing an item, reveal everything after a short
     delay instead of leaving content invisible.
  ======================================================= */

  window.setTimeout(
    function () {

      revealItems.forEach(
        function (item) {

          item.classList.add(
            "visible"
          );

        }
      );

    },
    2500
  );



  /* =======================================================
     SMOOTH SCROLL FOR INTERNAL HASH LINKS
     
     Example:
     services.html#services
  ======================================================= */

  document
    .querySelectorAll('a[href*="#"]')
    .forEach(
      function (link) {

        link.addEventListener(
          "click",
          function (event) {

            const url =
              new URL(
                link.href,
                window.location.href
              );


            const currentPage =
              window.location.pathname;

            const targetPage =
              url.pathname;


            /*
               Only intercept hash links that point to
               the current page.
            */

            if (
              url.hash &&
              (
                targetPage === currentPage ||
                targetPage === "" ||
                targetPage.endsWith(
                  currentPage.split("/").pop()
                )
              )
            ) {

              const target =
                document.querySelector(
                  url.hash
                );


              if (target) {

                event.preventDefault();

                target.scrollIntoView({
                  behavior:"smooth",
                  block:"start"
                });


                /*
                   Update browser URL without jumping.
                */

                history.pushState(
                  null,
                  "",
                  url.hash
                );

              }

            }

          }
        );

      }
    );



  /* =======================================================
     ACTIVE SERVICE CARD EFFECT
     
     Adds a temporary selected state when a service is
     clicked.
  ======================================================= */

  serviceItems.forEach(
    function (item) {

      const link =
        item.querySelector(
          ".service-link"
        );


      if (!link) {
        return;
      }


      link.addEventListener(
        "mousedown",
        function () {

          serviceItems.forEach(
            function (otherItem) {

              otherItem.classList.remove(
                "selected"
              );

            }
          );


          item.classList.add(
            "selected"
          );

        }
      );

    }
  );



  /* =======================================================
     BOOK A SESSION SUPPORT
     
     Any element using:
     
     .book-session
     
     will automatically go to contact.html.
     
     If it has:
     
     data-service="Wedding"
     
     it will pass that service to the contact page.
  ======================================================= */

  const bookSessionButtons =
    document.querySelectorAll(
      ".book-session"
    );


  bookSessionButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function (event) {

          event.preventDefault();


          const selectedService =
            button.dataset.service || "";


          const contactURL =
            new URL(
              "contact.html",
              window.location.href
            );


          if (selectedService) {

            contactURL.searchParams.set(
              "service",
              selectedService
            );

          }


          window.location.href =
            contactURL.toString();

        }
      );

    }
  );



  /* =======================================================
     PAGE VISIBILITY
     
     If user returns to this page from another tab,
     make sure the page remains usable.
  ======================================================= */

  document.addEventListener(
    "visibilitychange",
    function () {

      if (
        document.visibilityState ===
        "visible"
      ) {

        /*
           Make sure reveal elements are not stuck.
        */

        revealItems.forEach(
          function (item) {

            if (
              item.getBoundingClientRect().top <
              window.innerHeight
            ) {

              item.classList.add(
                "visible"
              );

            }

          }
        );

      }

    }
  );



  /* =======================================================
     FINAL INITIALIZATION
  ======================================================= */

  /*
     Make sure menu starts closed.
  */

  closeMenu();


  /*
     Make sure aria state is correct.
  */

  if (menu) {

    menu.setAttribute(
      "aria-expanded",
      "false"
    );

    menu.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

  }

});
