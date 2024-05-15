// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
//ketika ham-menu onclick
document.querySelector("#ham-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

//klik di luar side-bar off ham menu
const ham = document.querySelector("#ham-menu");
document.addEventListener("click", function (e) {
  if (!ham.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
