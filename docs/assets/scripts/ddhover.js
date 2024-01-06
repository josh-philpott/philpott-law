jQuery('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    jQuery(this).parent().siblings().removeClass('open');
    jQuery(this).parent().toggleClass('open');
});
jQuery('ul.nav li.dropdown').mouseenter(function () {
    if (jQuery(window).width() >= 768) {
        jQuery('>.dropdown-menu', this).stop().slideDown(200);
    }
});
jQuery('ul.nav li.dropdown').mouseleave(function () {
    if (jQuery(window).width() >= 768) {
        jQuery('>.dropdown-menu', this).stop().slideUp(200);
    }
});