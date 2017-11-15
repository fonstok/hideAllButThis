// Currently just testing this
var showlist = [];
(function($) {

    $.jfHideAllButThis = function(element, options) {
        var plugin = this;
        var $element = $(element);
        var $parntElmnt;
        var targetEl;
        var $targetEl;
        var dataatts = $element.data();

        var defaults = {
            parentEl: 'body',
            targetEl: '#s_10',
        };
        plugin.settings = {};

        function hideAllBut() {
            var testVar1 = null;
            var testVar2 = null;
            targetEl = plugin.settings.targetEl;
            $targetEl = $(targetEl);

            $parntElmnt.children().each(function(index, lElem) {
                $lElem = $(lElem);

                if (plugin.settings.targetEl.charAt(0) == (".")) {
                    console.log("class");
                    testVar1 = $lElem.attr("class");
                    testVar2 = $targetEl.attr("class");
                } else if (plugin.settings.targetEl.charAt(0) == ("#")) {
                    console.log("id");
                    testVar1 = $lElem.attr("id");
                    testVar2 = $targetEl.attr("id");
                } else {
                    console.log("tag");
                    testVar1 = $lElem.prop("tagName");
                    testVar2 = $targetEl.prop("tagName");
                }
                $targetEl = $(plugin.settings.targetEl);

                if (testVar1 != testVar2) {

                    $lElem.hide();
                } else {
                    showlist.push(lElem);

                }
            });
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