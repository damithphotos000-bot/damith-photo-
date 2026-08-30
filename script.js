/* =========================================================
   DAMITH PHOTO
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menu = document.querySelector(".menu");
const nav = document.querySelector("#main-navigation");


if (menu && nav) {


  menu.addEventListener("click", function () {


    const isOpen =
      nav.classList.toggle("open");


    menu.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );


    menu.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );


  });


}


/* =========================================================
   CLOSE MENU WHEN LINK IS CLICKED
========================================================= */

if (nav) {


  const navLinks =
    nav.querySelectorAll("a");


  navLinks.forEach(function(link) {


    link.addEventListener(
      "click",
      function () {


        nav.classList.remove("open");


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


      }
    );


  });


}


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
  "click",
  function(event) {


    if (!nav || !menu) {
      return;
    }


    const clickedInsideNav =
      nav.contains(event.target);


    const clickedMenu =
      menu.contains(event.target);


    if (
      !clickedInsideNav &&
      !clickedMenu
    ) {


      nav.classList.remove("open");


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


/* =========================================================
   SCROLL REVEAL
========================================================= */

const reveals =
  document.querySelectorAll(".reveal");


if (
  "IntersectionObserver"
  in window
) {


  const observer =
    new IntersectionObserver(

      function(entries) {


        entries.forEach(
          function(entry) {


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
        threshold:0.12
      }

    );


  reveals.forEach(
    function(element) {

      observer.observe(element);

    }
  );


} else {


  /* Fallback */

  reveals.forEach(
    function(element) {

      element.classList.add(
        "visible"
      );

    }
  );


}


/* =========================================================
   GOLD CURSOR GLOW
   DESKTOP ONLY
========================================================= */

const finePointer =
  window.matchMedia(
    "(pointer:fine)"
  );


if (finePointer.matches) {


  const glow =
    document.createElement("div");


  glow.className =
    "cursor-glow";


  document.body.appendChild(
    glow
  );


  document.addEventListener(
    "mousemove",
    function(event) {


      glow.style.left =
        event.clientX + "px";


      glow.style.top =
        event.clientY + "px";


    }
  );


}


/* =========================================================
   BUTTON EFFECT
========================================================= */

const goldButtons =
  document.querySelectorAll(
    ".btn.gold"
  );


goldButtons.forEach(
  function(button) {


    button.addEventListener(
      "mouseenter",
      function() {

        button.style.transform =
          "translateY(-4px)";

      }
    );


    button.addEventListener(
      "mouseleave",
      function() {

        button.style.transform =
          "";

      }
    );


  }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
  "load",
  function() {

    document.body.classList.add(
      "loaded"
    );

  }
);
