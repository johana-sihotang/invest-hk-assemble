$(document).ready(function () {
    function setupHumburgerMenu() {
        $('.humburger-menu').hide();

        $('.humburger-menu-show').on('click', function (e) {
            $('.humburger-menu').css({"display": "flex"});
            $('body').addClass('no-scroll');
        });
        $('.outliner-close').on('click', function (e) {
            $('.humburger-menu').hide();
            $('body').removeClass('no-scroll');
        });
    }

    setupHumburgerMenu();

});

document.addEventListener("DOMContentLoaded", function() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    const threshold = 0.1;

    scrollBtn.style.opacity = "0";
    scrollBtn.style.pointerEvents = "none";
    scrollBtn.style.transition = "opacity 0.3s ease";

    window.addEventListener("scroll", () => {
        const scrollTrigger = document.body.scrollHeight * threshold;

        if (window.scrollY > scrollTrigger) {
            scrollBtn.style.opacity = "1";
            scrollBtn.style.pointerEvents = "auto";
        } else {
            scrollBtn.style.opacity = "0";
            scrollBtn.style.pointerEvents = "none";
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

