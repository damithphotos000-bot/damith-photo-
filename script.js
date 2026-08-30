// MOBILE MENU

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

if(menu){

menu.addEventListener("click", () => {

nav.classList.toggle("open");

});

}


// CLOSE MOBILE MENU WHEN LINK IS CLICKED

document.querySelectorAll("nav a").forEach(link => {

link.addEventListener("click", () => {

nav.classList.remove("open");

});

});


// SCROLL REVEAL ANIMATION

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(

(entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},

{
threshold:0.15
}

);

reveals.forEach(element => {

observer.observe(element);

});


// GOLD CURSOR GLOW

const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "180px";
glow.style.height = "180px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background =
"radial-gradient(circle, rgba(212,175,55,.12), transparent 70%)";
glow.style.transform = "translate(-50%,-50%)";
glow.style.zIndex = "9999";
glow.style.opacity = "0";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

glow.style.left = e.clientX + "px";
glow.style.top = e.clientY + "px";
glow.style.opacity = "1";

});


// BUTTON SHINE EFFECT

document.querySelectorAll(".btn.gold").forEach(button => {

button.addEventListener("mouseenter", () => {

button.style.transform = "translateY(-4px)";

});

button.addEventListener("mouseleave", () => {

button.style.transform = "";

});

});


// PAGE LOAD

window.addEventListener("load", () => {

document.body.classList.add("loaded");

});
