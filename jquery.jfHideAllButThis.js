// Currently just testing this
var showlist = [];
(function($) {

    $.jfHideAllButThis = function(element, options) {
        var plugin = this;
        var $element = $(element);
        var $parntElmnt;
        var dataatts = $element.data();

        var defaults = {
            parentEl: 'body',
        };
        plugin.settings = {};

        function hideAllBut() {

            $parntElmnt.children().each(function(index, loopEl) {
                if (loopEl === element) {
                   showlist.push(loopEl);
                } else {
                    $(loopEl).hide();
                }
            });

            //-- show loop 
           $.each(showlist,function(index, loopEl) {
                $(loopEl).show();
            });
           showlist = [];
        }
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options, dataatts);
            $parntElmnt = $(plugin.settings.parentEl);
            hideAllBut();
            console.log(showlist);
        };
        plugin.destroy = function() {
            $element.removeData('jfHideAllButThis', plugin);
            plugin = null;
        };

        plugin.init();
    };

    $.fn.jfHideAllButThis = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('jfHideAllButThis')) {
                var plugin = new $.jfHideAllButThis(this, options);
                $(this).data('jfHideAllButThis', plugin);
            }
        });
    };
})(jQuery);