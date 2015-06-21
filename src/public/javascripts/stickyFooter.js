(function(window, undefined) {
    var $footer,
        $content,
        $window;

    function adjustFooter() {
        contentWithFooterHeight = $content.outerHeight() + $content.offset().top;

        if ((contentWithFooterHeight + $footer.outerHeight()) < $window.height()) {
            $footer.addClass('fixed-footer');
        } else {
            $footer.removeClass('fixed-footer');
        }
    }

    $(document).ready(function () {
        $footer = $('footer');
        $content = $('#mainBody');
        $window = $(window);

        adjustFooter();

        $(window).scroll(adjustFooter);
        $(window).resize(adjustFooter);
        $(document).bind('DOMSubtreeModified', adjustFooter);
    });
})(window);