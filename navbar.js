const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.background = "rgba(5,8,22,.92)";
        navbar.style.backdropFilter = "blur(18px)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.25)";

    } else {

        navbar.style.background = "rgba(10,15,30,.55)";
        navbar.style.boxShadow = "none";

    }

});