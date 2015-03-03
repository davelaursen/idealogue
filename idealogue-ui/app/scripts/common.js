(function($) {
    $.resizeTextArea = function(element) {
        var $this = $(element);

        while($this.outerHeight() >= element.scrollHeight
                + parseFloat($this.css("borderTopWidth"))
                + parseFloat($this.css("borderBottomWidth"))) {
            $this.height($this.height()-1);
        }

        while($this.outerHeight() < element.scrollHeight
                + parseFloat($this.css("borderTopWidth"))
                + parseFloat($this.css("borderBottomWidth"))) {
            $this.height($this.height()+1);
        }
    }

    $.fn.autoSize = function() {
        return this.filter('textarea').each(function() {
            $(this).css('overflow', 'hidden');
            $(this).keyup(function() {$.resizeTextArea(this)});
        });
    };
})(jQuery);