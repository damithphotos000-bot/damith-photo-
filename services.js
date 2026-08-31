/* =========================================================
   DAMITH PHOTO
   SERVICES JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const body = document.body;

  const menu = document.querySelector(".service-menu");

  const navigation =
    document.querySelector(".service-navigation");

  const revealItems =
    document.querySelectorAll(".reveal");


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menu && navigation) {

    menu.addEventListener("click", function () {

      const isOpen =
        menu.classList.toggle("open");

      navigation.classList.toggle(
        "open",
        isOpen
      );

      menu.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menu.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

    });


    /* Close menu after clicking a link */

    navigation
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener("click", function () {

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

        });

      });


    /* Close menu when clicking outside */

    document.addEventListener(
      "click",
      function (event) {

        if (
          !navigation.contains(event.target) &&
          !menu.contains(event.target)
        ) {

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

      }
    );

  }


  /* =======================================================
     REVEAL ANIMATION
     
     JS adds .js-ready only after the page has loaded.
     Therefore content NEVER stays hidden if JS fails.
  ======================================================= */

  if (revealItems.length > 0) {

    body.classList.add("js-ready");


    /* If browser supports IntersectionObserver */

    if ("IntersectionObserver" in window) {

      const observer =
        new IntersectionObserver(
          function (entries, obs) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting) {

                entry.target.classList.add(
                  "visible"
                );

                obs.unobserve(
                  entry.target
                );

              }

            });

          },
          {
            threshold:0.12,
            rootMargin:"0px 0px -40px 0px"
          }
        );


      revealItems.forEach(function (item) {

        observer.observe(item);

      });

    }

    else {

      /* Older browser fallback */

      revealItems.forEach(function (item) {

        item.classList.add("visible");

      });

    }

  }


  /* =======================================================
     ESC KEY CLOSES MOBILE MENU
  ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        menu &&
        navigation
      ) {

        menu.classList.remove("open");

        navigation.classList.remove("open");

        menu.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


});
