// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

//$(function () {
//
//    var current_page = $('.smooth_scroll_pages'); //Window object
//    var $window = $(window);
//
//    var scrollTime = 1; //Scroll time
//    var scrollDistance = 400; //Distance. Use smaller value for shorter scroll and greater value for longer scroll
//
//    current_page.on("mousewheel DOMMouseScroll", function (event) {
//
//        event.preventDefault();
//        //        event.stopPropagation();
//
//        var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
//        var scrollTop = $window.scrollTop();
//        var finalScroll = scrollTop - parseInt(delta * scrollDistance);
//
//        TweenMax.to($window, scrollTime, {
//            scrollTo: {
//                y: finalScroll,
//                autoKill: true
//            },
//            ease: Power1.easeOut, //For more easing functions see https://api.greensock.com/js/com/greensock/easing/package-detail.html
//            autoKill: true,
//            overwrite: 5
//        });
//
//    });
//
//});