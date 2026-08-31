/* =========================================================
   DAMITH PHOTO
   SERVICES JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuButton =
    document.querySelector(".service-menu");

  const navigation =
    document.querySelector(".service-navigation");


  if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

      const isOpen =
        menuButton.classList.toggle("open");

      navigation.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    /* Close menu after clicking a link */

    const navigationLinks =
      navigation.querySelectorAll("a");


    navigationLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        menuButton.classList.remove("open");

        navigation.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }



  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold:0.12
        }
      );


    revealElements.forEach(function (element) {

      observer.observe(element);

    });

  } else {

    revealElements.forEach(function (element) {

      element.classList.add("visible");

    });

  }


});
