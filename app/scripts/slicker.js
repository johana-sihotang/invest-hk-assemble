function updateDotsPosition() {
    var currentSlide = $('.indexCarousellTop .slick-current');
    var readMore = currentSlide.find('nav.link a:contains("Read More")');
    var dots = $('.indexCarousellTop .slick-dots');
    var carousel = $('.indexCarousellTop');

    if (readMore.length && dots.length && carousel.length) {
        var readMoreOffset = readMore.offset();
        var carouselOffset = carousel.offset();

        // hitung posisi readMore relatif ke carousel
        var relativeTop = readMoreOffset.top - carouselOffset.top;
        var relativeLeft = readMoreOffset.left - carouselOffset.left;

        var readMoreHeight = readMore.outerHeight();

        dots.css({
            position: 'absolute',
            top: relativeTop + readMoreHeight + 10,
            left: relativeLeft,
            bottom: 'auto',
        });
    }
}

$(function() {

    $('.indexCarousellTop').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: true,
        appendDots: $('.indexCarousellTop'),
        autoplay: false,
        autoplaySpeed: 4000,
    });

    updateDotsPosition();

    $(window).on('resize', function () {
        updateDotsPosition();
    });

    $('.indexCarousellTop').on('afterChange', function(event, slick, currentSlide) {
        updateDotsPosition();
    });
    $(document).on('click', '.slick-prev, .slick-next', function () {
        updateDotsPosition();
    });

    $('.news').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
        autoplay: false,
        autoplaySpeed: 4000,
        adaptiveHeight: true,
    });


    $('.resource_center').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
        autoplay: false,
        autoplaySpeed: 4000,
        adaptiveHeight: true,
    });


    $('.events').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
        autoplay: false,
        autoplaySpeed: 4000,
        adaptiveHeight: true,
    });

    $('#heroSliderContent').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('#heroSliderContent__01-prev'),
        nextArrow: $('#heroSliderContent__01-next'),
        fade: true,
        asNavFor: '#heroSliderImage',
        dots: true,
        appendDots: $('.heroSlider__navigation--dots')
    });

    $('#heroSliderImage').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#heroSliderContent',
        arrows: false,
    });



});
