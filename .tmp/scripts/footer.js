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