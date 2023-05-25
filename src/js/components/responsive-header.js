var navbarMenu = document.getElementById("menu");
var burgerMenu = document.getElementById("burger");
var bgOverlay = document.getElementById("overlay");

// Show Menu when Click the Burger
// Hide Menu when Click the Overlay
if (burgerMenu && navbarMenu && bgOverlay) {
  burgerMenu.addEventListener("click", function () {
    navbarMenu.classList.toggle("is-active");
    bgOverlay.classList.toggle("is-active");
    burgerMenu.classList.toggle("burgerMenuChange");
  });

  bgOverlay.addEventListener("click", function () {
    navbarMenu.classList.toggle("is-active");
    bgOverlay.classList.toggle("is-active");
  });
}

// Hide Menu when Click the Links
document.querySelectorAll(".menu-link").forEach(function (link) {
  link.addEventListener("click", function () {
    navbarMenu.classList.remove("is-active");
    bgOverlay.classList.remove("is-active");
  });
});
