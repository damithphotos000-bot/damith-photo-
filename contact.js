/* =========================================================
   DAMITH PHOTO
   CONTACT PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const contactMenu =
  document.querySelector(".contact-menu");

const contactNavigation =
  document.querySelector(".contact-navigation");


if(contactMenu && contactNavigation){

  contactMenu.addEventListener("click", () => {

    const isOpen =
      contactNavigation.classList.toggle("open");

    contactMenu.classList.toggle(
      "open",
      isOpen
    );

    contactMenu.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    contactMenu.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );

  });


  /* CLOSE AFTER NAVIGATION CLICK */

  contactNavigation
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        contactNavigation.classList.remove("open");

        contactMenu.classList.remove("open");

        contactMenu.setAttribute(
          "aria-expanded",
          "false"
        );

        contactMenu.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

      });

    });

}


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", event => {

  if(
    !contactMenu ||
    !contactNavigation
  ){
    return;
  }


  const clickedMenu =
    contactMenu.contains(event.target);


  const clickedNavigation =
    contactNavigation.contains(event.target);


  if(
    !clickedMenu &&
    !clickedNavigation
  ){

    contactNavigation.classList.remove("open");

    contactMenu.classList.remove("open");

    contactMenu.setAttribute(
      "aria-expanded",
      "false"
    );

    contactMenu.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

  }

});


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener("keydown", event => {

  if(event.key !== "Escape"){
    return;
  }


  if(
    !contactMenu ||
    !contactNavigation
  ){
    return;
  }


  contactNavigation.classList.remove("open");

  contactMenu.classList.remove("open");

  contactMenu.setAttribute(
    "aria-expanded",
    "false"
  );

  contactMenu.setAttribute(
    "aria-label",
    "Open navigation menu"
  );

});


/* =========================================================
   BOOKING FORM
========================================================= */

const contactForm =
  document.getElementById("contact-form");

const formStatus =
  document.getElementById("form-status");


if(contactForm){

  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      /* GET VALUES */

      const name =
        document
          .getElementById("client-name")
          .value
          .trim();


      const service =
        document
          .getElementById("service")
          .value;


      const date =
        document
          .getElementById("date")
          .value;


      const message =
        document
          .getElementById("message")
          .value
          .trim();


      /* VALIDATION */

      if(!name){

        if(formStatus){
          formStatus.textContent =
            "Please enter your name.";
        }

        return;
      }


      if(!service){

        if(formStatus){
          formStatus.textContent =
            "Please select a service.";
        }

        return;
      }


      /* DATE FORMAT */

      let formattedDate =
        "Not specified";


      if(date){

        const selectedDate =
          new Date(
            date + "T00:00:00"
          );


        formattedDate =
          selectedDate.toLocaleDateString(
            "en-GB",
            {
              day:"2-digit",
              month:"long",
              year:"numeric"
            }
          );

      }


      /* WHATSAPP MESSAGE */

      let whatsappMessage =
        "Hello Damith Photo!%0A%0A";


      whatsappMessage +=
        "*Booking Enquiry*%0A";


      whatsappMessage +=
        "--------------------%0A";


      whatsappMessage +=
        "Name: " +
        encodeURIComponent(name) +
        "%0A";


      whatsappMessage +=
        "Service: " +
        encodeURIComponent(service) +
        "%0A";


      whatsappMessage +=
        "Preferred Date: " +
        encodeURIComponent(formattedDate) +
        "%0A";


      if(message){

        whatsappMessage +=
          "Message: " +
          encodeURIComponent(message) +
          "%0A";

      }


      whatsappMessage +=
        "%0AThank you!";


      /* WHATSAPP URL */

      const whatsappURL =
        "https://wa.me/94703803051?text=" +
        whatsappMessage;


      /* STATUS */

      if(formStatus){

        formStatus.textContent =
          "Opening WhatsApp...";

      }


      /* OPEN WHATSAPP */

      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}


/* =========================================================
   PAGE READY
========================================================= */

window.addEventListener("load", () => {

  document.body.classList.add("page-ready");

});
