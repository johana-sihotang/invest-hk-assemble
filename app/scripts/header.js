$(document).ready(function() {
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
