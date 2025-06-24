$(document).ready(function () {
    function setupFooter() {
        if ($(window).width() < 1000) {
            // Sembunyikan semua kecuali yang memiliki class no-hide
            $('.footer__container-section:not(.no-hide) > ul, .footer__container-section-link-columns').hide();

            $('.footer__container-section-title').off('click').on('click', function () {
                var targetSection = $(this).closest('.footer__container-section');
                var isActive = targetSection.find('> ul:visible, > .footer__container-section-link-columns:visible').length > 0;

                // Tutup semua kecuali no-hide
                $('.footer__container-section:not(.no-hide) > ul, .footer__container-section-link-columns').slideUp();
                $('.footer__container-section-title i').removeClass('fa-angle-down').addClass('fa-angle-up');

                if (!isActive) {
                    targetSection.find('> ul, > .footer__container-section-link-columns').slideDown();
                    $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
                }
            });
        } else {
            $('.footer__container-section > ul, .footer__container-section-link-columns').show();
            $('.footer__container-section-title').off('click');
        }
    }

    setupFooter();

    var resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupFooter, 250);
    });
});
$(document).ready(function () {
    function setupHeader() {
        if ($(window).width() < 1000) {
            $('.icon-hide').stop(true, true).slideUp();
        } else {
            $('.icon-hide').stop(true, true).slideDown();
        }
    }

    setupHeader();

    var resizeTimer;
    $(window).on('resize', setupHeader);
});
$(document).ready(function () {
    function setupHumburgerMenu() {
        $('.humburger-menu').hide();

        $('.humburger-menu-show').on('click', function (e) {
            $('.humburger-menu').css({ "display": "flex" });
            $('body').addClass('no-scroll');
        });
        $('.outliner-close').on('click', function (e) {
            $('.humburger-menu').hide();
            $('body').removeClass('no-scroll');
        });
    }

    setupHumburgerMenu();
});

document.addEventListener("DOMContentLoaded", function () {
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
$(document).ready(function () {
    const $carouselContainer = $('.carousel__container');
    const $sections = $('.carousel__container__section');
    const $dots = $('.carousel__btn-scroll__dot');
    let currentIndex = 0;

    function updateCarousel(index) {
        const section = $sections.eq(index);
        if (section.length) {
            const left = section.position().left + $carouselContainer.scrollLeft();
            $carouselContainer.animate({ scrollLeft: left }, 500);
            currentIndex = index;
            updateDots();
        }
    }

    function updateDots() {
        $dots.css({
            width: '10px',
            backgroundColor: '#ccc'
        });

        $dots.eq(currentIndex).css({
            width: '20px',
            backgroundColor: '#dc281e'
        });
    }

    $('.fa-arrow-right').on('click', function () {
        if (currentIndex < $sections.length - 1) {
            updateCarousel(currentIndex + 1);
        }
    });

    $('.fa-arrow-left').on('click', function () {
        if (currentIndex > 0) {
            updateCarousel(currentIndex - 1);
        }
    });

    // Optional: sync active index on scroll
    $carouselContainer.on('scroll', function () {
        let closestIndex = 0;
        let minDistance = Infinity;
        $sections.each(function (index) {
            const offset = $(this).offset().left - $carouselContainer.offset().left;
            const distance = Math.abs(offset);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });
        if (currentIndex !== closestIndex) {
            currentIndex = closestIndex;
            updateDots();
        }
    });

    // Inisialisasi awal
    updateDots();
});