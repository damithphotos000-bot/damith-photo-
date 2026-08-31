/* =========================================================
   DAMITH PHOTO
   PHOTOGRAPHY PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const photoMenu =
    document.querySelector(".photo-menu");

  const photoNavigation =
    document.querySelector(".photo-navigation");


  if (photoMenu && photoNavigation) {

    /* OPEN / CLOSE MENU */

    photoMenu.addEventListener("click", (event) => {

      event.stopPropagation();

      const isOpen =
        photoNavigation.classList.toggle("open");

      photoMenu.classList.toggle(
        "open",
        isOpen
      );

      photoMenu.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      photoMenu.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

    });


    /* CLOSE MENU AFTER CLICKING A LINK */

    const navigationLinks =
      photoNavigation.querySelectorAll("a");


    navigationLinks.forEach(link => {

      link.addEventListener("click", () => {

        photoNavigation.classList.remove("open");

        photoMenu.classList.remove("open");

        photoMenu.setAttribute(
          "aria-expanded",
          "false"
        );

        photoMenu.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

      });

    });


    /* CLOSE WHEN CLICKING OUTSIDE */

    document.addEventListener("click", (event) => {

      const clickedInsideMenu =
        photoMenu.contains(event.target);

      const clickedInsideNavigation =
        photoNavigation.contains(event.target);


      if (
        !clickedInsideMenu &&
        !clickedInsideNavigation
      ) {

        photoNavigation.classList.remove("open");

        photoMenu.classList.remove("open");

        photoMenu.setAttribute(
          "aria-expanded",
          "false"
        );

        photoMenu.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

      }

    });


    /* ESC KEY */

    document.addEventListener("keydown", (event) => {

      if (event.key !== "Escape") {
        return;
      }


      photoNavigation.classList.remove("open");

      photoMenu.classList.remove("open");

      photoMenu.setAttribute(
        "aria-expanded",
        "false"
      );

      photoMenu.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

    });

  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const photoReveals =
    document.querySelectorAll(".reveal");


  if (
    photoReveals.length &&
    "IntersectionObserver" in window
  ) {

    const photoObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    photoReveals.forEach(element => {

      photoObserver.observe(element);

    });

  } else {

    photoReveals.forEach(element => {

      element.classList.add("visible");

    });

  }


  /* =======================================================
     PAGE READY
  ======================================================= */

  document.body.classList.add(
    "page-ready"
  );

});
