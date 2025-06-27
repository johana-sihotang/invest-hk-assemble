

    $(document).ready(function(){
    $('.panel__section__slider').slick({
        dots: true,
        arrows: false, // dikendalikan manual
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    // Tombol navigasi
    $('.next-slide').click(function(){
    $('.panel__section__slider').slick('slickNext');
});

    $('.prev-slide').click(function(){
    $('.panel__section__slider').slick('slickPrev');
});
});


    type="text/javascript"
        var apiDomain = "https://www1.investhk.gov.hk/api/";
        //var apiDomain = "/api/";
        apiDomain = apiDomain.replace(/^http:/g,'https:');

        var dictionary={"previous":"Previous","next":"Next"};



