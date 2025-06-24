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