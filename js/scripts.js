
    //*********************************************
    //  BEFORE WINDOW LOAD
    //*********************************************

        // Control of the functions exists
        $.fn.exists = function () { return this.length > 0; };

    //*********************************************
    //  MOBILE & BROWSER DETECTERS
    //*********************************************

        // Check the device for mobile or desktop
        var mobile = false;
        function checkTheDevice() {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 992 ) { mobile = true; }
            else{ mobile = false; }
        }
        checkTheDevice();
        window.onresize = function(){checkTheDevice();};
        // Check the browsers
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
            // Firefox 1.0+
            isFirefox = typeof InstallTrigger !== 'undefined',
            // Safari 3.0+ "[object HTMLElementConstructor]"
            isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification),
            // Internet Explorer 6-11
            isIE = /*@cc_on!@*/false || !!document.documentMode,
            // Edge 20+
            isEdge = !isIE && !!window.StyleMedia,
            // Chrome 1+
            isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
            // Blink engine detection
            isBlink = (isChrome || isOpera) && !!window.CSS,
            // Parallax effects for selected browsers
            isParallaxBrowsers =  (isOpera || isFirefox || isBlink || isChrome);

        // Add .ite-browser class if browsing with internet explorer.
        if (isIE){ $("body").addClass("ie-browser"); }

        //Detect window height
        function detectWindowHeightChange(elm, callback){
            var lastHeight = elm.clientHeight, newHeight;
            (function run(){
                newHeight = elm.clientHeight;
                if( lastHeight != newHeight )
                    callback();
                lastHeight = newHeight;
                if( elm.onElementHeightChangeTimer )
                    clearTimeout(elm.onElementHeightChangeTimer);
                elm.onElementHeightChangeTimer = setTimeout(run, 200);
            })();
        }

        // If mobile device - DO ANYTHING FOR ONLY MOBILE
        if (mobile === true) {
            //do something else for mobile devices
        // If not mobile device DO ANYTHING FOR ONLY DESKTOPS
        } else{
            //Ready skrollr effects
            var s = skrollr.init({
                forceHeight: false,
                smoothScrolling: false
            });

            //Set the parallax items
            $('body').addClass('stable');
            $(window).on("scroll", function(){
                if($('body').hasClass('stable')){
                    //Refresh parallax effect
                    setTimeout( function(){ if (isParallaxBrowsers) { s.refresh(); } }, 500);
                    window.dispatchEvent(new Event('resize'));
                    $('body').removeClass('stable');
                }
            });

            //Show and hide extra Navigation
            function showHideExtraNav() {
                if (mobile === false) {
                    var nowPos = $(window).scrollTop();
                    //Extra navigation variations
                    var extranav = $('.extra-nav'), showExNav = extranav.attr('data-showme'), hideExNav = extranav.attr('data-hideme');
                    if ($(hideExNav).exists() && $(showExNav).exists()){
                        var showSection = $(showExNav).offset().top, hideSection =  $(hideExNav).offset().top;
                        if($(window).width() > 700){
                            if(nowPos >= showSection - 60 && nowPos <= hideSection - 60) {$(extranav).slideDown(150).removeClass('hiding'); } else{$(extranav).addClass('hiding').slideUp(150);}
                        }
                    } else {
                        $(extranav).slideDown(150).removeClass('hiding').find('ul.nav').html('<li class="colored d-flex align-items-center">Extra Navigation is here! Please check the data-showme and data-hideme areas. This page does not have these links.</li>');
                    }
                }
            }
            $(window).on("scroll", function(){ showHideExtraNav(); });

            //Detect window height changes and refresh parallax and light gallery for portfolios 
            detectWindowHeightChange(document.body, function(){
                //Animated Items
                Waypoint.refreshAll();
                setTimeout( function(){ if (isParallaxBrowsers) { s.refresh(); } }, 200);
            });

            //Do something else for only large screen devices
        }

    //*********************************************
    //  Detect Retina Screens and use retina logo
    //*********************************************
    //Detect retina screen type
        function isRetina(){
            return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
        }
    //Add .retina-device class to body if the device is retina. And change images for retina screens
        if (isRetina()) {
            $("body").addClass("retina-device");
            $("[data-retina]").each(function(){
                var $this = $(this), $rtnIMG = $(this).attr("data-retina");
                $(this).attr("src", $rtnIMG);
            });
        }
    //Add .has-retina-logo class to body if navigation has retina logo
        if ($(".retina-logo").exists()) { $("body").addClass("has-retina-logo"); }

    //*********************************************
    //  QUADRA SPECIAL EFFECTS AND FEATURES
    //*********************************************

    //Get screen size of device
        $.fn.getDeviceWidth = function() {
            if ($(window).width() > 1200 ) { $('body').not('.device-xl').removeClass("device-lg device-md device-sm device-xs device-xxs").addClass('device-xl'); }
            if ($(window).width() > 992 && $(window).width() < 1200 ) { $('body').not('.device-lg').removeClass("device-xl device-lg device-md device-sm device-xs device-xxs").addClass('device-lg'); }
            if ($(window).width() > 768 && $(window).width() < 992 ) { $('body').not('.device-md').removeClass("device-xl device-lg device-md device-sm device-xs device-xxs").addClass('device-md'); }
            if ($(window).width() > 576 && $(window).width() < 768 ) { $('body').not('.device-sm').removeClass("device-xl device-lg device-md device-sm device-xs device-xxs").addClass('device-sm'); }
            if ($(window).width() > 480 && $(window).width() < 576 ) { $('body').not('.device-xs').removeClass("device-xl device-lg device-md device-sm device-xs device-xxs").addClass('device-xs'); }
            if ($(window).width() < 480 ) { $('body').not('.device-xxs').removeClass("device-xl device-lg device-md device-sm device-xs device-xxs").addClass('device-xxs'); }
        }
        $('body').getDeviceWidth();
    //Put background images to mobile
        if ( mobile === true ) {
            $("[data-bg-mobile]").each(function(){var bgSRC = $(this).data('bg-mobile'); $(this).addClass('bg-mobiled').css({'background-image': 'url(' + bgSRC + ')', 'background-size': 'cover !important'}); });
        }
    //Cookie Modal Classic
        if ($(".cookie").exists() ) {
            $(".cookie").each(function(){
                var elem = $(this), elemName = $(elem).attr("id"),
                    elemClose = elem.find(".close");
                if ($.cookie(elemName) == null) {
                    var expireTime = $(elem).data("expire");
                    $(elemClose).on("click", function(){
                        $.cookie(elemName, 'yes', { expires: expireTime, path: '/' });
                        $("body").addClass(elemName + "-cookie-in-expire-time").removeClass("cookie-activated");
                        elem.fadeOut(300);
                    });
                    if (elem.hasClass('modal')) {
                        setTimeout( function(){ $(elem).modal("show"); },100);
                        $(elem).on("click", function(ev){
                            $.cookie(elemName, 'yes', { expires: expireTime, path: '/' });
                            $(elem).find(".modal-dialog").on("click", function(){event.stopPropagation(ev);});
                        });
                    } else{
                        elem.show().addClass("cookie-active");
                        $("body").addClass("cookie-activated");
                    }
                } else{
                    elem.addClass("cookie-in-expire-time");
                    $("body").addClass(elemName + "-cookie-in-expire-time");
                }
            });
        }
    //Lazyload
        var myLazyLoad = new LazyLoad({
            threshold: 1000,
            elements_selector: "[data-src], [data-bg]:not(.bg-mobiled)",
            callback_loaded: function(element) {Waypoint.refreshAll()}
        });
    //Add text color, background or border colors with data attributtes
        $("[data-color]").each(function(){var clrSRC = $(this).data('color'); $(this).css({'color': clrSRC}); });
        $("[data-bcolor]").each(function(){var clrSRC = $(this).data('bcolor'); $(this).css({'border-color': clrSRC}); });
        $("[data-bgcolor]").not('.tp-bgimg').not('.rev-slidebg').each(function(){var clrSRC = $(this).data('bgcolor'); $(this).css({'background-color': clrSRC}); });
    //Click effect
        $(function(){
            var ink, d, x, y;
            $(".click-effect").on("click", function(e){
                if($(this).find(".ink").length === 0){ $(this).prepend("<span class='ink'></span>"); }
                ink = $(this).find(".ink");
                ink.removeClass("clicked");
                if(!ink.height() && !ink.width()){ d = Math.max($(this).outerWidth(), $(this).outerHeight()); ink.css({height: d, width: d}); }
                x = e.pageX - $(this).offset().left - ink.width()/2;
                y = e.pageY - $(this).offset().top - ink.height()/2;
                ink.css({top: y+'px', left: x+'px'}).addClass("clicked");
            });
        });
    //Header bar collaboration with navigation
        if ($(".modern-nav>.top-bar").exists()) {
            var bar = $(".modern-nav>.top-bar");
            $(".modern-nav").addClass("has-top-bar");
        }
        if ($(".modern-nav>.top-bar.cookie").exists()) {
            var bar = $(".modern-nav>.top-bar.cookie");
            $(".modern-nav").addClass("has-header-cookie-bar");
        }
        $(".modern-nav>.top-bar .close").on("click", function(){
            var barH = $(".modern-nav .top-bar").outerHeight(),
                navH = $(".modern-nav .nav-container").height();
            $(".modern-nav").css({"-webkit-transform":"translateY(-"+ barH + "px" + ")", "transform":"translateY(-" + barH + "px" + ")"});
            if ($(".modern-nav").hasClass("sticky")) {
                $(".modern-nav").parent().addClass("slow-md").css({"height": navH + "px"});
                setTimeout( function(){$(".modern-nav").parent().removeClass("slow-md")}, 420);
            }
            $(".modern-nav:not(.sticky):not(.fixed)").css({"height": navH + barH + "px"});
            setTimeout( function(){
                $(".modern-nav:not(.sticky):not(.fixed)").css({"height": navH + "px"});
            }, 0);
            $(".modern-nav").removeClass("has-top-bar");
            setTimeout( function(){
                $(".modern-nav").removeClass("has-header-cookie-bar").addClass("cookie-closed hiding-cookie");
                $(".modern-nav .top-bar").removeClass("cookie-active").hide();
            }, 500);
            setTimeout( function(){
                $(".modern-nav").removeClass("hiding-cookie");
            }, 520);
        });
    //Hover Cursor
        $(".hover-cursor").each(function(){
            var $wrapper = $(this);
            if($($wrapper).find(".cursor-container").length === 0){ $($wrapper).prepend("<span class='cursor-container'><span class='cursor'><span class='c-inner'></span></span></span>"); }
            var $circle = $wrapper.find('.cursor');
            function moveCircle(e) {
                var valY = e.pageY - $(document).scrollTop();
                $circle.show().stop().removeClass("hiding").css({ "transform": "translate3d("+ e.pageX +"px, "+ valY +"px, 0px) translateZ(0)" });
            }
            var timer = 0;
            $($wrapper).on('mousemove', moveCircle);
            $($wrapper).on("mouseleave", function(){ clearTimeout(timer); $circle.addClass("hiding"); timer = setTimeout( function(){ $circle.hide(); }, 1000); });
            $("a, button, .c-pointer, input, textarea").on("mouseenter", function(){ $circle.addClass("hover");})
            $("a, button, .c-pointer, input, textarea").on("mouseleave", function(){ $circle.removeClass("hover");});
            $(".hide-hover-cursor").on("mouseenter", function(){$circle.addClass("hide-me");})
            $(".hide-hover-cursor").on("mouseleave", function(){$circle.removeClass("hide-me");})
        });
    //Get Background Image
        $("[data-background]").not('.bg-mobiled').each(function () {
            var bgSRC = $(this).data('background');
            var self = $(this);
            $(this).css({'background-image': 'url(' + bgSRC + ')'});
            $(self).ready( function() {
                setTimeout( function(){$(self).addClass('loaded'); }, 50);
            });
        });

    // Parallax backgrounds
        $('.bg-parallax').each(function(){ var $this = $(this); $($this).closest('section, .parallax-container').addClass('o-hidden relative zi-1');});
    //Count To
        $.fn.countTo = function(options) {
            // merge the default plugin settings with the custom options
            options = $.extend({}, $.fn.countTo.defaults, options || {});

            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(options.speed / options.refreshInterval),
                increment = (options.to - options.from) / loops;

            return $(this).each(function() {
                var _this = this,
                    loopCount = 0,
                    value = options.from,
                    interval = setInterval(updateTimer, options.refreshInterval);

                function updateTimer() {
                    value += increment;
                    loopCount++;
                    $(_this).html(value.toFixed(options.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, "."));

                    if (typeof(options.onUpdate) === 'function') {
                        options.onUpdate.call(_this, value);
                    }

                    if (loopCount >= loops) {
                        clearInterval(interval);
                        value = options.to;

                        if (typeof(options.onComplete) === 'function') {
                            options.onComplete.call(_this, value);

                        }
                    }
                }
            });
        };
        $.fn.countTo.defaults = {
            from: 0,  // the number the element should start at
            to: 100,  // the number the element should end at
            speed: 1000,  // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,  // the number of decimal places to show
            onUpdate: null,  // callback method for every time the element is updated,
            onComplete: null,  // callback method for when the element finishes updating
        };
        // Count options
        $('.fact').each(function() {
            $(this).waypoint(function() {
                var dataSource = $(this.element).attr('data-source');
                //Count Factors Options
                $(this.element).find('.factor').countTo({
                    from: 0,
                    to: dataSource,
                    speed: 1600,
                    refreshInterval: 10
                });
                this.destroy();
            }, {offset: '100%'});
        });
        // Digits for numbers (.digits class).
        $.fn.digits = function(){ return this.each(function(){ $(this).text( $(this).text().replace(/\B(?=(\d{3})+(?!\d))/g, ".")) }); }
        $(".digits").digits();


        if ($('[data-end-date]').length > 0){
            $("[data-end-date]").each(function(){
                var $this = $(this),
                    Dtimer = $(this).attr("data-end-date");
                //Countdowns
                CountDownTimer(Dtimer);
                //Countdown Scripts
                function CountDownTimer(dt){
                    var end = new Date(dt), _second = 1000, _minute = _second * 60, _hour = _minute * 60, _day = _hour * 24, _year = _day * 365, timer,
                        cls = $($this);
                    function showRemaining() {
                        var now = new Date();
                        var distance = end - now;
                        //Finished Timer
                        if (distance < 0) {
                            clearInterval(timer);
                            $($this).html('EXPIRED');
                            return;
                        }
                        //Math for times
                        var years = Math.floor(distance / _year),
                            days = Math.floor((distance % _year) / _day),
                            hours = Math.floor((distance % _day) / _hour),
                            minutes = Math.floor((distance % _hour) / _minute),
                            seconds = Math.floor((distance % _minute) / _second);

                        if (String(hours).length < 2){ hours = 0 + String(hours); }
                        if (String(minutes).length < 2){ minutes = 0 + String(minutes); }
                        if (String(seconds).length < 2){ seconds = 0 + String(seconds); }
                        //Add time to html elements
                        $this.find(".time-year").html(years);
                        $this.find(".time-day").html(days);
                        $this.find(".time-hour").html(hours);
                        $this.find(".time-minute").html(minutes);
                        $this.find(".time-second").html(seconds);
                        if (years < 1) {$($this).find(".time-year, .time-year-dot").hide();}
                    } showRemaining(), timer = setInterval(showRemaining, 1000);
                }

            });
         }

    //Play buttons for iframe videos
        if ($(".video-trigger").exists()){
            $('.video-trigger').each(function(){
                var target = $(this).find('iframe'),
                    trigger = $(this).find('.video-play-trigger'),
                    src = $(target).data('video-src');
                $(trigger).on('click', function(ev) {
                    $(this).delay(200).fadeOut(500);
                    $(target).attr('src', src);
                    ev.preventDefault();
                });
            });
        }



    //*********************************************
    //  WHEN WINDOW LOADED
    //*********************************************

$(window).on('load', function() {

    'use strict';

    //Welcome to home page
    document.body.classList.add("welcome-home");


    //Quadra Alert on page
        $('.qdr-alert-trigger').each(function(){
            var self = $(this),
                target = $(self).data('target'),
                timer;
            $(self).on('click', function(){
                clearTimeout(timer);
                $(target).fadeOut(0).stop().clearQueue();
                setTimeout( function(){$(target).fadeIn(300)},1);
                timer = setTimeout( function(){$(target).fadeOut(300);},3000);
            });
        });

    //QDR moving items
        if ($(".moving-container").exists()){
            $(".moving-container").each(function(){
                var selector = $(this).find('.moving');
                $(this).hover3d({ selector: selector, shine: false, perspective:1500, sensitivity:85, invert:false });
            });
        }
    //Mouse animation for portfolio images
        if ($(".styled-portfolio.parallax").exists()){
            if ($(window).width() > 630) {
                $(".styled-portfolio.parallax .cbp-item").each(function(i, el) {
                    $(this).on("mouseenter", function(e) {
                        var currentX = '', currentY = '',
                        movementConstant = 0.1;
                        var item = $(this);
                        $(item).mousemove(function(e) {
                            if(currentX == '') currentX = e.pageX;
                            var xdiff = e.pageX - currentX;
                            currentX = e.pageX;
                            if(currentY == '') currentY = e.pageY;
                            var ydiff = e.pageY - currentY;
                            currentY = e.pageY;
                            $(item).find('.cbp-caption-defaultWrap').each(function(i, el) {
                                var movement = (i + 1) * (xdiff * movementConstant),
                                movementy = (i + 1) * (ydiff * movementConstant),
                                newX = $(el).position().left + movement,
                                newY = $(el).position().top + movementy;
                                $(el).find('img').css({"-webkit-transform":"translate(" + newX + "px,"+ newY +"px) scale(1.06)"});
                            });
                        });
                    });
                    $(this).on("mouseleave", function(e) {
                        $(this).find('img').css({"-webkit-transform":"translate(0px,0px) scale(1.0)"});
                    });
                });
            }
        }
    //Call fitvids
        if ($(".fitvids").exists()){
            $(".fitvids").fitVids();
        }
    //Call YTPlayer - you should include ytplayer's js and css files to your file.
        if ($("[data-property]").exists()){
            $(".player").YTPlayer();
        }
    //Call masonry plugin - you should add masonry js file to your HTML file - It's not included to jquery.min.js
        if ($("[data-masonry]").exists()){
            $("[data-masonry]").masonry();
        }
    //Progress Bars
        if ($('.progress-bar').exists()){
            $('.progress-bar').each(function(){
                var $this = $(this);
                $($this).waypoint(function(){
                    var dataSource = $($this).attr('data-value');
                    $($this).animate({ "width" : dataSource + "%"}, 300);
                    this.destroy();
                }, {offset: '100%'});
            });
        }
    //Call Tooltip
        $('[data-bs-toggle="tooltip"], .tooltip-item').each(function(){
            var self = $(this),
                prnt = $(self).parent();
            $(self).tooltip({html: true, container: prnt, boundary: 'window' });
        });
    //Active me - you can add this class to active with click and disable with click another area.
    	$(".active-me-with-click").each(function(event){
    		var item = $(this);
            $(item).on('click', function(ev){
                if ($(item).hasClass("stay-active")) {
                    $(item).addClass('active');
                } else{
                    $(item).toggleClass('active');
                    ev.preventDefault();
                }
            });
            $(document).on('click', function(event){ if ($(item).hasClass("disable-with-window-click") && !$(event.target).closest(".active-me-with-click").length) {$(item).removeClass('active');} });
        	$(item).find('.stay-active, .cbp-filter-item').on('click', function(e){ return false; });
    	});
    //add & remove .inview class to .active-inview elements when visible
        $(".active-inview").each(function(){
            var elem = $(this);
            var inview = new Waypoint.Inview({
                element: $(elem)[0],
                enter: function(direction) {
                    elem.addClass("inview");
                },
                exited: function(direction) {
                    elem.removeClass("inview");
                }
            });
        });
    //.waypoint-active class for waypoint items
        if ($('.waypoint').exists()){
            $('.waypoint').each(function() {
                var $this = $(this);
                $($this).waypoint(function() { $($this).addClass('waypoint-active'); }, {offset: '75%'});
            });
        }

   //Popovers
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
             return new bootstrap.Popover(popoverTriggerEl)
        });
    //Call InfoCard
        $('[data-infocard]').each(function(){
            //Variations
            var item = $(this), target = $(this).data('infocard'), timer;
            //MouseEnter
            $(item).on('mouseenter',function(){$(target).addClass('active');clearTimeout(timer); $(".icon-navigation").addClass("passive"); });
            $(target).on('mouseenter',function(){$(target).addClass('active');clearTimeout(timer); $(".icon-navigation").addClass("passive"); });
            //MouseLeave
            $(item).on('mouseleave',function(){ timer = setTimeout( function(){ $(target).removeClass('active'); $(".icon-navigation").removeClass("passive"); },250);  });
            $(target).on('mouseleave',function(){ timer = setTimeout( function(){ $(target).removeClass('active'); $(".icon-navigation").removeClass("passive"); },250);  });
        });
    //Animated Gradient Efffects
        $("[data-gradient-bg]").each(function () {var grSRC = $(this).data('gradient-bg'), grSize = $(this).data('gradient-size');$(this).css({'background': 'linear-gradient(90deg,' + grSRC + ')', 'background-size': grSize + '%' + grSize + '%' }); });
    //Sidebar
        if ($(".sidebar").exists()){
            $('.sidebar').sidebar('attach events', '.sidebar-button', 'show').sidebar('setting', 'transition', 'overlay');
        }
    //Quick Contact Form Scripts
        if ($('.qcf').exists()){
            setTimeout( function(){ $("body").addClass("qcf-ready") },600);
            $(".qcf-backdrop").on('click touchstart touch', function(event){$('.qcf, .qcf-trigger').removeClass('active'); $('body').removeClass('qcf-active');});
            $('.qcf-trigger').on('click touch', function(){ if ($('body').hasClass("qcf-active")) {$('.qcf, .qcf-trigger').removeClass('active'); $('body').removeClass('qcf-active');} else{$('.qcf, .qcf-trigger').addClass('active'); $('body').addClass('qcf-active');}  return false;});
            $('.qcf, .qcf-trigger, .error-message, .error-message button').on('click touch touchstart', function(event){ event = event || window.event; event.stopPropagation();});
        }
    //Fixed Footer Options
        if ($('footer.footer-fixed').exists()){
            var footer = $('footer.footer-fixed'),
                footerH = $(footer).outerHeight();
            $('<div class="fullwidth bg-transparent footer-keeper" style="height:' + footerH + 'px;"></div> ').insertAfter(footer);
            $('body').addClass('footer-fixed-page');
            $(window).resize(function(){
                var footerH = $(footer).outerHeight();
                $('.footer-keeper').height(footerH);
            });
        }
    //Dropdown Effect - get value to button
        $('button.dropdown-toggle + .dropdown-menu').each(function(){
            var target = '#' + $(this).attr('aria-labelledby'), self = $(this);
            $(self).find('li').on('click', function(){
                var cache = $(target).children();
                var detail = $(this).find('div').html();
                $(target).text(detail).append(cache);
            });
        });

        $("[data-bs-toggle^='collapse']").on('click', function(){
             $("[data-bs-toggle]").removeClass("active");
             setTimeout(function () { $("[data-bs-toggle^='collapse'][aria-expanded^='true']").addClass("active"); }, 50);

        });
    // Quantity up-down clicks
        $('.quantity').each(function(){
            var minus = $(this).find('.minus'),
                plus = $(this).find('.plus'),
                numbers = $(this).find('.numbers'),
                min = $(numbers).attr("min"),
                max = $(numbers).attr("max");
            $(plus).on('click', function() {
                if ($(numbers).val() === max) {} else{
                    $(numbers).val( parseInt($(numbers).val(), 10) + 1);
                }
            });
            $(minus).on('click', function() {
                if ($(numbers).val() === min) {} else{
                    $(numbers).val( parseInt($(numbers).val(), 10) - 1);
                }
            });
        });
        if ($('.text-typer').exists()){
            $(".text-typer").each(function(){
                var self = $(this),
                    delay= $(self).data('delay'),
                    speed= $(self).data('speed');
                $(self).typed({
                    // strings: ["Typed.js is a <strong>jQuery</strong> plugin.", "It <em>types</em> out sentences.", "And then deletes them.", "Try it out!"],
                    stringsElement: $(self).find('.text-get'),
                    typeSpeed: speed,
                    backDelay: delay,
                    loop: true,
                    contentType: 'html', // or text
                    // defaults to false for infinite loop
                    loopCount: false,
                    showCursor: true,
                    resetCallback: function() { newTyped(); }
                });
            });
        }

    //Detect window height changes and refresh light gallery for portfolios 
        detectWindowHeightChange(document.body, function(){
            if ($(".cbp-item:last-child").hasClass("cbp-item-loading")) {
                if ($(".lightbox_gallery").exists()) { $(".lightbox_gallery").data('lightGallery').destroy(true); $(window).callLightboxGallery(); }
                if ($(".lightbox_selected").exists()) { $(".lightbox_selected").data('lightGallery').destroy(true); $(window).callLightboxSelected(); }
                if ($(".lightbox").exists()) { $(".lightbox").data('lightGallery').destroy(true); $(window).callLightbox(); }
            }
        });

    //*********************************************
    //  NAVIGATION SCRIPTS
    //*********************************************

        //Get Navigation class names
        var themeNav = $(".modern-nav"),
            stickyNav = $(".modern-nav.sticky"),
            hideByScroll = $(".hide-by-scroll");

        //Call sticky for navigation
        $(stickyNav).sticky({topSpacing:0});

        //Scroll Spy
        if ($(".modern-nav .nav-menu a[href^='#']:not([href='#'])").exists()) {
            var scrollSpy = new bootstrap.ScrollSpy(document.body, { target: ".modern-nav .nav-menu", offset: 150 });
        }
        if ($(".scroll-spy").exists()) {
            var scrollSpy = new bootstrap.ScrollSpy(document.body, { target: ".scroll-spy", offset: 150 });
        }


        //Get class when mouseover
        $(".modern-nav").on("mouseenter", function(){ $(".modern-nav").addClass("mouseover");})
        $(".modern-nav").on("mouseleave", function(){ $(".modern-nav").removeClass("mouseover");});

        //Add scrolled class when scroll down
        function getScrolledClass() {
            if ($(window).scrollTop() > 70) {
                if ($(themeNav).hasClass("sticky") || $(themeNav).hasClass("fixed") ) {
                    $(themeNav).addClass("scrolled");
                    if ($(".modern-nav .top-bar:not(.cookie)").exists() || $(".modern-nav.has-header-cookie-bar .cookie-active").exists() ) {
                        if (mobile === false) {
                            var barH = $(".modern-nav .top-bar").outerHeight();
                            $(themeNav).css({"-webkit-transform":"translateY(-"+ barH + "px" + ")", "transform":"translateY(-" + barH + "px" + ")"});
                        }
                    }
                }
            }
            else {
                $(themeNav).removeClass("scrolled");
                var barH = $(".modern-nav .top-bar").outerHeight();
                $(themeNav).css({"-webkit-transform":"none", "transform":"none"});
            }
        } getScrolledClass();

        var scroll = function () {
            var linkParent =  $(".nav-menu").find("a").parents("li"), linkParentActive = $(".nav-menu").find("a.active").parents("li");
            $(linkParent).removeClass("active");
            $(linkParentActive).addClass("active");
            getScrolledClass();
            if($(window).scrollTop() + $(window).height() === $(document).height()) {
                $(hideByScroll).removeClass('hiding');
            }
        };

        var waiting = false, endScrollHandle;
        $(window).scroll(function () {
            if (waiting) { return; }
            waiting = true;
            // clear previous scheduled endScrollHandle
            clearTimeout(endScrollHandle);
            scroll();
            setTimeout(function () {
                waiting = false;
            }, 50);
            // schedule an extra execution of scroll() after 200ms
            // in case the scrolling stops in next 100ms
            endScrollHandle = setTimeout(function () { scroll(); }, 50);
        });

        //Dropdown styles
        $('.modern-nav .dd-toggle').each(function() {
            var showMobileNav = 992,
                $this = $(this),
                nTimer = null;

            //Element over function work for desktops
            $(this).on('mouseenter', function(){
                if ($(window).width() > showMobileNav) {
                    window.clearTimeout(nTimer);
                    var $this = $(this), $item = $($this).find('>.dropdown-menu');
                    $($item).stop(true,true).addClass("d-flex");
                    $('.modern-nav .dd-toggle').not($this).not($(this).parents('.dd-toggle')).not($(this).find('.dd-toggle')).find('.dropdown-menu').stop(true,true).removeClass("d-flex").parents().removeClass("showing");

                    //Check screen sizes, dropdown width and heights
                    var navTop = $(themeNav).offset().top,
                        navHeight = $(themeNav).outerHeight(),
                        itemTop = ($($item).offset().top - navTop) + navHeight,
                        itemWidth = $($this).outerWidth(),
                        itemHeight = $($item).outerHeight(),
                        wHeight = $(window).outerHeight(),
                        ofRight = ($(window).outerWidth() - ($item.offset().left + $item.outerWidth())),
                        thisRight = ($(window).outerWidth() - ($this.offset().left + $this.outerWidth())),
                        ofBottom = ($(window).outerHeight() - (itemTop + $item.outerHeight()));
                    if (ofRight < 30) {
                        if ($($item).hasClass('mega-menu')) {
                            if ($($item).hasClass('to-center')) { $($item).addClass('to-left centered-lg').removeClass('to-right to-center').css({'right': - thisRight + 10 + 'px' });}
                            if ($($item).hasClass('to-right')) { $($item).addClass('to-left right-lg').removeClass('to-right to-center').css({'right': - thisRight + 10 + 'px' });}
                        }
                        else {$($item).removeClass('to-right to-center').addClass('to-left');}
                    } else{
                        if ($($item).hasClass('centered-lg')) { $($item).addClass('to-center').removeClass('to-right to-left centered-lg').css({'right':'auto' });}
                        if ($($item).hasClass('right-lg')) { $($item).addClass('to-right').removeClass('to-left to-center right-lg').css({'right':'auto' });}
                    }
                    if (ofBottom < 30) {
                        if (!$($item).hasClass('mega-menu')) { $($item).css({'top': (wHeight -  (itemTop + itemHeight)) - 50 + 'px' }) }
                    }
                    // If mega menu
                    if ($($this).find(".mega-menu").length > 0) {
                        var wWidth = $(window).width(), megaElem = $($this).find(">.mega-menu"), elemWidth = megaElem.outerWidth();
                        if (elemWidth >= wWidth - 60) {
                            var colLength = megaElem.find("ul.column").length;
                            megaElem.addClass("too-big");
                        } else{ megaElem.removeClass("too-big"); }
                    }
                }
            });
            //Element leave function work for desktops
            $(this).on('mouseleave',function(){
                var $this = $(this), $item = $($this).find('.dropdown-menu');
                if ($(window).width() > showMobileNav) {
                    nTimer = window.setTimeout( function(){ $($item).removeClass("d-flex"); }, 400);
                }
            });
            // Close dropdown menu when hover another link
            $('.modern-nav .nav-links>li:not(.dd-toggle) a').on('mouseenter', function(){
                if ($(window).width() > showMobileNav) {
                    $('.modern-nav .dropdown-menu').stop().hide(0);
                }
            });
            //work dropdown for mobile devices
            $(this).find(">a:not(.lg)").on("click", function(){
                var elem = $(this);
                if ($(window).width() < showMobileNav) {
                    if (elem.next("ul").length ) { $(elem).attr("href", "#"); }
                    $($this).find('>.dropdown-menu').stop().slideToggle({duration: 400, easing: "easeInOutQuart"}).parent().toggleClass("showing");
                    $('.modern-nav .dd-toggle').not($this).not($(this).parents('.dd-toggle')).not($(this).find('.dd-toggle')).find('.dropdown-menu').stop(true,true).slideUp({duration: 400, easing: "easeInOutQuart"}).parent(".dd-toggle").removeClass("showing");
                    return false;
                }
            });
        });
        // Show/Hide mobile navigation
        $('.mobile-nb').on("click", function(){
            $(".modern-nav .mobile-nav-bg").fadeIn(300);
            $('.modern-nav .nav-menu').addClass("animate");
            setTimeout( function(){ $('.modern-nav, .modern-nav .nav-menu').addClass("active"); }, 300);
            return false;
        });
        $('.mobile-nav-bg').on("click", function(){
            $('.modern-nav, .modern-nav .nav-menu').removeClass("active");
            $(".modern-nav .mobile-nav-bg").fadeOut(300);
            $('.modern-nav li').removeClass("showing");
            $('.modern-nav .dropdown-menu').slideUp(300);
            setTimeout( function(){ $('.modern-nav .nav-menu').removeClass("animate"); }, 500);
            return false;
        });
    //See links inside the page for smooth scroll
        $( "a[href^='#']:not([href='#']):not(.no-scroll):not([data-slide]):not([data-toggle])" ).on('click touch', function(event) {
            var $anchor = $(this), headerOffset = $('.modern-nav').data("offset"), $target = $($anchor).attr('href');
            event.preventDefault();
            if($($target).length){
                if($('.modern-nav').length){
                    $('html, body').stop().animate({
                        scrollTop : $($anchor.attr('href')).offset().top - headerOffset + "px"
                    }, 920, 'easeInOutExpo');
                } else{
                    $('html, body').stop().animate({ scrollTop : $($anchor.attr('href')).offset().top });
                }
            }
        });
    //Back to top
        $( "a[href='#top']" ).on('click', function() {
            $('html, body').stop().animate({ scrollTop : 0 }, 1120, 'easeInOutExpo');
        });
    //Stay Page
        $('.stay').on('click', function(e){ e.preventDefault(); });
        $('.stay-all').on('click', function(){ return false; });
    //Hide with scroll down - Back to top button - hide-on-home elements
        if ( $('.hide-by-scroll').exists() || $('#back-to-top').exists() || $('.hide-on-home').exists()){
            // hide #back-to-top first
            $("#back-to-top, .hide-on-home").hide();
            // show hide subnav depending on scroll direction
            var prevScrollpos = window.pageYOffset;
            window.onscroll = function() {
                var currentScrollPos = window.pageYOffset;
                if (prevScrollpos > currentScrollPos) {
                    $(".hide-by-scroll").removeClass("hiding");
                } else if (currentScrollPos > 700) {
                    $(".hide-by-scroll:not(.modern-nav.active):not(.mouseover)").addClass("hiding");
                }
                prevScrollpos = currentScrollPos;
                // fade in #back-top
                // You can add .hide-on-home class to any fixed item. It will be invisible on home and visible when you scroll down.
                if ($(this).scrollTop() > 500) { document.body.classList.remove("welcome-home"); $('#back-to-top:not(.ready), .hide-on-home:not(.ready)').addClass("fading ready").fadeIn("300", function(){$(this).removeClass("fading");}); }
                else { document.body.classList.add("welcome-home"); $('#back-to-top, .hide-on-home').addClass("fading").fadeOut("300", function(){$(this).removeClass("fading ready");}); }
            }
            $("body").mousemove(function(event) {
              var cursorCoords = event.clientY;
              if ( cursorCoords <= 80 && $(".modern-nav").hasClass("hiding") ) {
                $(".modern-nav").removeClass("hiding");
              }
            });
        }
        $('.hide-by-click').on('click', function(){$(this).fadeOut('slow');});

    //Search Form Fullscreen
        if ($('.fs-searchform').exists()){
            var trigger = $('.search-form-trigger'),
                form = $('.fs-searchform');
            setTimeout( function(){$('body').addClass("fsf-ready");},300);
            $(trigger).on('click touch', function(event){
                $(form).addClass('active');
                setTimeout( function(){$('.fs-searchform input').focus();},900);
                return false;
            });
            $('.form-bg, .fs-searchform .close').on('click', function(){
                $('.fs-searchform').removeClass('active');
            });
            //Close the form with press ESC.
            $(document).keyup(function(e) {if (e.keyCode === 27) {$('.fs-searchform').removeClass('active');} });
            $('.fs-searchform a').on('click', function(){
                var Exlink = this.getAttribute('href');
                // Close the navigation
                $('.fs-searchform').removeClass('active');
                setTimeout( function(){ document.location.href = Exlink;},500);
                return false;
            });
        }


    //*********************************************
    //  CONTACT FORM VALIDATE SCRITPS
    //*********************************************

        //Contact Form Settings
        $('<textarea id="math" style="display:none;"></textarea>').insertAfter("body");
        var rnuma = Math.floor(Math.random() * 5);
        var rnumb = Math.floor(Math.random() * 5);
        var sum = rnuma + rnumb;
        $("#math").html(sum);
        $(".verify-input").each(function(){
            var elem = $(this);
            if (elem.hasClass("label-animation")) {
                elem.next().find("span").html(rnuma + "+" + rnumb + "= ?")
            }else{
                $(".verify-input").attr("placeholder", rnuma + "+" + rnumb + "= ?");
            }
        });
        var validator = $('.validate-me');

        //If contact form is not visible
        $(validator).each(function() {
               var elem = $(this);
               if ($(elem).attr('name') !== 'quick_form' && !$(validator).parents('.modal').length ) {
                    $(elem).waypoint(function(direction) {
                         $( elem ).toggleClass('invisibleForm');
                    }, { offset: '0%' });
               }
        });


   

        //Input Animation
        $(".label-animation .input").each(function(){
            //Focus In
            $(this).focusin(function(){
                $(this).parent().addClass("active");
            });
            //Focus out
            $(this).focusout(function() {
                if ($(this).val().length === 0) {
                    $(this).parent().removeClass('active');
                }
            });
        });

        // Validate Contact Form
        $(validator).each(function(){
            var sendBtn = $(this).find('[type="submit"]'),
                $this = $(this),
                timer,
                error_message = $this.attr("data-error-message"),
                submit_message = $this.attr("data-submit-message");

            // Check for file size on advanced forms
            var maxSize = $this.attr("data-max-file-size"),
                fileSizeError = $this.attr("data-max-file-size-error");
            $.validator.addMethod('filesize', function (value, element, param) {
                var files = $(element)[0].files;
                var totalSize = 0;
                for (var i = 0; i < files.length; i++) {
                    // calculate total size of all files
                    totalSize += files[i].size;
                }
                return this.optional(element) || (totalSize <= param);
            });

            $(sendBtn).on("click", function(){
                if ( $($this).hasClass("invisibleForm") || !$($this).attr("name","quick_form") ) {
                    $('html, body').stop().animate({ scrollTop : $($this).offset().top - 70 }, 700, 'easeInOutExpo');
                }
            });

            // Classic Quadra Validate
            $($this).validate({
                ignore: ".ignore",
                rules: {
                    verify: { equalTo: "#math" },
                    hiddenRecaptcha: {
                        required: function () {
                            if (grecaptcha.getResponse() === '') {
                                $($this).find('.g-recaptcha').addClass('error_warning');
                                return true;
                            } else {
                                $($this).find('.g-recaptcha').removeClass('error_warning');
                                return false;
                            }
                        }
                    },
                    userfile: {
                        required: true,
                        filesize: maxSize, function () {
                            var files = $("#userfile")[0].files;
                            if (files) {
                                var totalSize = 0;
                                for (var i = 0; i < files.length; i++) {
                                    // calculate total size of all files
                                    totalSize += files[i].size;
                                }
                                if (totalSize > maxSize) {
                                    $this.find("span.max-size").html(fileSizeError);
                                } else {
                                    $this.find("span.max-size").empty();
                                }
                            }
                        }
                    }
                 },
                onfocusout: false,
                showErrors: function(map, list, form) {
                    clearTimeout(timer);
                    if ($("div#submit_message")) {$("div#submit_message").fadeOut("fast", function(){$("div#submit_message").remove().stop().clearQueue();});}
                    this.currentElements.removeClass("error_warning");
                    $.each(list, function(index, error) {
                        clearTimeout(timer);
                        $(error.element).addClass("error_warning");
                        if ($("#error_message").length === 0) {
                            $("#error_message, #submit_message").remove().stop().clearQueue();
                            $("body").append('<div id="error_message" class="error-message bg-white t-center bs-lg pt-30"><i class="ti-alert fs-30 block"></i><p class="fs-16 gray8 lh-25 mt-25 px-30 px-15-sm">'+ error_message +'</p><button class="block fullwidth mt-30 py-15 white lh-normal fs-16 bold relative"><span class="timer">5</span><span class="ti-close btn-cls"></span></button></div>').stop().clearQueue();
                            var newMSG = $("#error_message");
                            setTimeout( function(){
                                newMSG.addClass("on").delay(5000).queue(function(){
                                    $(this).removeClass("on").dequeue().delay(400).queue(function(){
                                        $(this).remove().dequeue();
                                    });
                                });
                            }, 10);
                            $(newMSG).find("button").on("click", function(){
                                $(newMSG).removeClass("on").dequeue().delay(400).queue(function(){
                                    $(newMSG).remove().dequeue();
                                });
                            });
                            var counter = 5,
                                interval = setInterval(function() {
                                counter--;
                                if (counter <= 0) { clearInterval(interval); return;
                                }else{ $('#error_message .timer').text(counter);}
                            }, 1000);
                        }
                    });

                },
                submitHandler: function(form) {
                    $(sendBtn).not('.loading').addClass('loading').append( "<span class='loader'></span>" );
                    $.ajax({
                        url: form.action,
                        type: form.method,
                        data: new FormData($(form)[0]),
                        cache: false,
                        contentType: false,
                        processData: false,
                        success : function() {
                            $("#error_message").remove(); $("#submit_message").remove();
                            $("body").append('<div id="submit_message" class="submit-message bg-white t-center bs-lg pt-30"><i class="ti-check fs-30 block"></i><p class="fs-16 gray8 lh-25 mt-25 px-30">'+ submit_message +'</p><button class="block fullwidth mt-30 py-15 white lh-normal fs-16 bold relative"><span class="timer">5</span><span class="ti-close btn-cls"></span></button>').addClass($this.attr("id") + '_sending');
                            var newMSG = $("#submit_message");
                            setTimeout( function(){
                                newMSG.addClass("on").delay(5000).queue(function(){
                                    $(this).removeClass("on").dequeue().delay(400).queue(function(){
                                        $(this).remove().dequeue();
                                    });
                                });
                            }, 10);
                            $(newMSG).find("button").on("click", function(){
                                $(newMSG).removeClass("on").dequeue().delay(400).queue(function(){
                                    $(newMSG).remove().dequeue();
                                });
                            });
                            var counter = 5,
                                interval = setInterval(function() {
                                counter--;
                                if (counter <= 0) { clearInterval(interval); return;
                                }else{ $('#submit_message .timer').text(counter);}
                            }, 1000);
                            $this.find("span.max-size, span.value").empty()
                            //Label animation styles
                            $(".label-animation.active").removeClass("active");
                            $($this).trigger("reset").addClass("reseting done");
                            setTimeout( function(){ $($this).removeClass("reseting").addClass("reset-completed"); $("body").addClass($this.attr("id") + '_sent'); }, 1000);
                            $(sendBtn).removeClass('loading');
                            if ($('body').hasClass("qcf-active")) {$("body").removeClass("qcf-active"); $(".qcf, .qcf-trigger").removeClass("active");}
                        }
                    });
                }
            });

        });

    // Alerts with clicks
        $('.qdr-alert-trigger').each(function(){
            var self = $(this),
                target = $(self).data('target'),
                timer;
            $(self).on('click', function(){
                clearTimeout(timer);
                $(target).fadeOut(0).stop().clearQueue();
                setTimeout( function(){$(target).fadeIn(300)},1);
                timer = setTimeout( function(){$(target).fadeOut(300);},3000);
            });
        });

    //*********************************************
    //  LIGHTBOXES
    //*********************************************
        //Lightbox Gallery Class for containers. All "a" links will work for lightbox with click.
        //Also you can add .no-lightbox claass for no-lightbox links.
        var lightboxGallery = $(".lightbox_gallery");
        $.fn.callLightboxGallery = function() {
            $(lightboxGallery).lightGallery({
                selector: 'a:not(.no-lightbox):not(.cbp-item-off):not(.hide-from-lightbox)',
                download: false,
                speed: 400,
                loop: true,
                controls: true,
                thumbWidth: 100,
                thumbContHeight: 100,
                thumbnail: true,
                thumbMargin: 8,
                share: true,
                cssEasing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
                loadYoutubeThumbnail: true,
                youtubeThumbSize: 'default',
                iframeMaxWidth: '75%',
                loadVimeoThumbnail: true,
                vimeoThumbSize: 'thumbnail_medium',
                youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0, controls: 0 },
                vimeoPlayerParams: { byline : 0, portrait : 0, color : 'A90707' }
            });
            $(lightboxGallery).not(".no-lightbox").addClass('lightboxed');
        }
        if ($(lightboxGallery).exists()) { $(window).callLightboxGallery(); }

        //Only .lightbox_selected classes will work in .lightbox_selected container
        var lightboxSelected = $(".lightbox_selected");
        $.fn.callLightboxSelected = function() {
            $(lightboxSelected).lightGallery({
                selector: 'a.lightbox_item:not(.cbp-item-off):not(.hide-from-lightbox)',
                download: false,
                speed: 500,
                loop: true,
                controls: true,
                thumbWidth: 100,
                thumbContHeight: 100,
                thumbMargin: 8,
                thumbnail: true,
                share: true,
                cssEasing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
                loadYoutubeThumbnail: true,
                youtubeThumbSize: 'default',
                loadVimeoThumbnail: true,
                iframeMaxWidth: '75%',
                vimeoThumbSize: 'thumbnail_medium',
                youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0, controls: 0 },
                vimeoPlayerParams: { byline : 0, portrait : 0, color : 'A90707' }
            });
        }
        if ($(lightboxSelected).exists()) { $(window).callLightboxSelected(); }

        //You can add .lightbox classes to single elements
        var lightboxSingle = $(".lightbox");
        $.fn.callLightbox = function() {
            $(lightboxSingle).lightGallery({
                selector: 'this',
                download: false,
                thumbWidth: 100,
                thumbContHeight: 100,
                thumbnail: true,
                share: true,
                loadYoutubeThumbnail: true,
                youtubeThumbSize: 'default',
                iframeMaxWidth: '100%',
                loadVimeoThumbnail: true,
                youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0, controls: 0 },
                vimeoPlayerParams: { byline : 0, portrait : 0, color : 'A90707' }
            });
        }
        if ($(lightboxSingle).exists()) { $(window).callLightbox(); }

    //*********************************************
    //  SLIDERS
    //*********************************************

        //Custom slider - usable for everything
        if ($(".custom-slider").exists()) {
            $('.custom-slider').each(function(){
                var $this = $(this);
                $($this).slick({
                    //Default Options
                    fade: true,
                    dots: false,
                    arrows: false,
                    autoplay: false,
                    autoplaySpeed: 3000,
                    pauseOnHover: true,
                    lazyLoad: 'ondemand',
                    infinite: true,
                    rtl: false,
                    edgeFriction: 0.35,
                    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
                    touchThreshold: 150,
                    speed: 400,
                    waitForAnimate: true,
                    slidesToShow: 1,
                    initialSlide: 0,
                    draggable: false,
                    adaptiveHeight: true,
                    variableWidth: false,
                    prevArrow: '<div class="slider-prev d-flex align-items-center justify-content-center"></div>',
                    nextArrow: '<div class="slider-next d-flex align-items-center justify-content-center"></div>',
                    centerMode: false,
                    slidesToScroll: 1,
                    setPosition: 1,
                    swipe: true,
                    touchMove: true,
                    rows: 0,
                    responsive: [{
                          breakpoint: 992,
                          settings: { slidesToShow: 1, slidesToScroll: 1 }
                        }, {
                          breakpoint: 600,
                          settings: { slidesToShow: 1, slidesToScroll: 1 }
                        }
                    ]
                }).on('afterChange', function(event, slick, currentSlide, prevSlide){
                    var items = $($this).find('.animate'),
                        current = $($this).find('.slick-current .animate'),
                        nCurrent = $($this).find('.slick-slide:not(.slick-current) .animate');
                    Waypoint.refreshAll();
                    $(current).each(function() {
                        var item = $(this), animation = item.data('animation'), animationDelay = item.data('animation-delay');
                        setTimeout(function(){ item.addClass( animation + " visibleme" ); }, animationDelay);
                    });
                    $(nCurrent).each(function() {
                        var item = $(this), animation = item.data('animation');
                        item.removeClass( animation + "visibleme" );
                    });
                    $('.slick-current video').each(function () {this.play();});
                    $('.slick-slide:not(.slick-current) video').each(function () {this.pause();});
                    $($this).find('.slick-current .zoom-timer').addClass("scaling");
                    document.querySelectorAll(".slick-current animate").forEach(element => {
                        element.beginElement();
                    });
                }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
                    Waypoint.refreshAll();
                    var items = $($this).find('.animate'),
                        nCurrent = $($this).find('.slick-slide:not(.slick-current) .animate');
                    var nCurrent = $($this).find('.slick-slide:not(.slick-current) .animate') ,items = $($this).find('.animate');
                    $(nCurrent).each(function() {
                        var item = $(this), animation = item.data('animation'), animationDelay = item.data('animation-delay');
                        $(item).removeClass( animation + " visibleme" );
                    });
                    $($this).find('.zoom-timer').removeClass("scaling");
                    //Change navigation detail colors with slide
                    var nextItem = $('[data-slick-index=' + nextSlide + ']');
                    if ($(nextItem).hasClass("nav-to--dark")) {$(".modern-nav").removeClass("details-white").addClass("details-dark")}
                    if ($(nextItem).hasClass("nav-to--white")) {$(".modern-nav").removeClass("details-dark").addClass("details-white")}
                });
            });
            //Block drag the .custom-slider when sliding images.
            $('.custom-slider').on('touchstart touchmove touchend', function(){ $('.custom-slider').slick("slickSetOption", "swipe", true);});
            $(".custom-slider").find(".slick-current .zoom-timer").addClass("scaling");
            //Work for window load
            $('.custom-slider .slick-current .animate').each(function() {
                var item = $(this), animation = item.data('animation'), animationDelay = item.data('animation-delay');
                $(item).removeClass(animation);
                setTimeout(function(){ item.addClass( animation + " visibleme" ); }, animationDelay);
            });
            //Next&Prev with external buttons
            $("[data-slider-control]").on("click", function(){
                var sliderName = $(this).attr("data-slider-control");
                if ($(this).data('slider-dir') === 'prev') {
                    $(sliderName).slick('slickPrev');
                } if ($(this).data('slider-dir') === 'next') {
                    $(sliderName).slick('slickNext');
                }
            });
            $('.custom-slider-next').on("click", function(){ $(".custom-slider").slick('slickNext'); });
            $('.custom-slider-prev').on("click", function(){ $(".custom-slider").slick('slickPrev'); });
        }

    //Navigation to .slider-for
        if ($(".nav-to-custom-slider").exists()) {
            $('.nav-to-custom-slider').each(function(){
                var $this = $(this);
                $($this).slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    asNavFor: '.custom-slider',
                    dots: false,
                    touchThreshold: 150,
                    arrows: false,
                    centerMode: false,
                    focusOnSelect: true
                }).on('beforeChange', function(event, slick, currentSlide){
                    setTimeout( function(){
                        $($this).find(".slick-slide .active-me-slick.active").removeClass("active");
                        $($this).find(".slick-current .active-me-slick").addClass("active");
                    }, 50);
                });
            });
        }

    //Background color changer
        if ($('[data-background-color-selector]').exists()){
            $('[data-background-color-selector]').each(function() {
                var $this = $(this), color = $($this).attr('data-background-color-selector');
                $this.waypoint(function(direction){ if (direction === 'down') { $('.bg-changeable').css({"background-color": color}); $('.changeable-border').css({"border-color": color}); } }, { offset: '60%' });
                $this.waypoint(function(direction){ if (direction === 'up') { $('.bg-changeable').css({"background-color": color}); $('.changeable-border').css({"border-color": color}); } }, { offset: '-50%' });
            });
        }

    //*********************************************
    // Refresh parallax effect, lightbox, icon navigation when click portfolio filters and window height changed
    //*********************************************
        $('.cbp-l-loadMore-button, [data-toggle]:not([data-bs-toggle="popover"]),[data-filter], .cbp-filter-item, .cbp-l-loadMore-link').on('click', function(){
            setTimeout( function(){ if (isParallaxBrowsers && mobile === false) {
                var s = skrollr.init({ forceHeight: false }); s.refresh();
                $(".icon-navigation").addClass("slow");
            } Waypoint.refreshAll(); }, 500);
            setTimeout( function(){$(".icon-navigation").removeClass("slow");}, 1400);
        });




    //*********************************************
    //  VIDEO COMPATIBILITY ON SLICK SLIDER
    //*********************************************

        //Slick slider video option
        $(".slick-slider").on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var current = $(this).find(".slick-current iframe");
            setTimeout( function(){current.attr('src', current.attr('src'));}, 1000);
            var dataSettings = $(this).data('slider-options') || {};
        });
        // Visible text positions for category tabs
        if ($(".box-hover-row").exists()){
            $(".box-hover-row").each(function(){
                var item = $(this),
                    visibleItem = item.find(".visible-item"),
                    hiddenItemH = item.find(".hidden-item").height() / 2;
                $(visibleItem).css({
                    "-webkit-transform":"translateY("+ hiddenItemH + "px" + ")",
                    "transform":"translateY(" + hiddenItemH + "px" + ")"
                });
            });
        }

    //*********************************************
    //  WINDOW RESIZE FUNCTION
    //*********************************************

        // Quadra Functions when window resizing.
        $(window).resize(function(){
            //Get device width
            $('body').getDeviceWidth();
            //Animated Items
            $('body').animatedItems();
            //Change background images for large and small screens
            if ( mobile === true || $(window).width() < 992 ) {
                $("[data-bg-mobile]").each(function(){var bgSRC = $(this).data('bg-mobile');$(this).css({'background-image': 'url(' + bgSRC + ')', 'background-size': 'cover !important'}); });
            } else{
                $("[data-background]").each(function () {var bgSRC = $(this).data('background');$(this).removeClass('bg-mobiled').css({'background-image': 'url(' + bgSRC + ')'}); });
                $("[data-bg]").each(function () {var bgSRC = $(this).data('bg');$(this).removeClass('bg-mobiled').css({'background-image': bgSRC}); });
            }
            //do something else
        });
    //Close the page loader
        var $pageloader = $('.page-loader');
        setTimeout(function() {
            $pageloader.addClass("page-loader--fading-out");
        }, 100);
        setTimeout(function() {
            $pageloader.removeClass("page-loader--fading-out").addClass("page-loader--hidden");
        }, 800);
    //Animated Items for desktops
        $.fn.animatedItems = function() {
            if ( mobile === false) {
                $('.animated').each(function() {
                    var item = $(this), animation = item.data('animation'), animationDelay = item.data('animation-delay');
                    $(item).waypoint(function() {
                        if ( !item.hasClass('visible') && animation ) {
                            if ( animationDelay ) { setTimeout(function(){ item.addClass( animation + " visible" ); }, animationDelay); }
                            else { item.addClass( animation + " visible" ); }
                        } else{ item.addClass("visible"); }
                    }, {offset: '93%'});
                });

                $(".animated-container").each(function() {
                     var container = $(this);
                     $(container).find("[data-animation-delay]").each(function() {
                          var item = $(this), animation = $(this).data("animation"), animationDelay = item.data('animation-delay');
                          $(container).waypoint(function() {
                               if ( !item.hasClass('visible') && animation ) {
                                  if ( animationDelay ) { setTimeout(function(){ item.addClass( animation + " visible" ); }, animationDelay); }
                                  else { item.addClass( animation + " visible" ); }
                               } else{ item.addClass("visible"); }
                          }, {offset: '93%'});
                     });
                });
            }
        }
        $("body").animatedItems();
    //Animated Backgrounds for desktops
        $(".bg-animated, .bg-animated-reverse, .bg-animated-vertical").each(function(){ $("<div class='bg-animator'></div>").appendTo(this); });
    //Sticky Items
        if ($(".sticky-item").exists()) {
            $(".sticky-item").each(function(){
                var spacing = $(this).data('top-spacing');
                $(this).sticky({topSpacing:spacing});
            });
        }
    //Sticky elements to containers
        $.fn.stckyCalculating = function () {
            $(".sticky-container").each(function(){
                //Variations
                var $stick = $(this),
                    $container = $($stick).data('fix-container');
                //Screen Positions
                $(window).on("scroll", function () {
                    $.fn.makeSticky = function() {
                        var $width = $($stick).parent().outerWidth(),
                            $contStart = $($container).offset().top,
                            $contEnd = $($container).outerHeight() - $($stick).outerHeight(),
                            $spacing = $($stick).data('top-spacing'),
                            $endValue = $contStart + $($container).outerHeight() - $($stick).outerHeight(),
                            now = $(window).scrollTop() + $spacing;
                        if (now < $contStart ) { $($stick).css({'top': '0px', 'position': 'absolute', 'max-width': $width + 'px' }).addClass('before-cont').removeClass('on-cont after-cont'); }
                        if (now > $contStart && now < $endValue) {$($stick).css({'top': $spacing + 'px', 'position': 'fixed', 'max-width': $width + 'px' }).addClass('on-cont').removeClass('before-cont after-cont'); }
                        if (now >= $endValue ) { $($stick).css({'top': $contEnd + 'px', 'position': 'absolute', 'max-width': $width + 'px' }).addClass('after-cont').removeClass('before-cont on-cont');  }
                    };
                    if ($($container).has($stick) && $(window).width() > 1000 ) {$($stick).makeSticky();}

                });
            });
        };
        if ($(".sticky-container").exists()) { $('.sticky-container').stckyCalculating(); }

    //Call Ajax
        if ($("[data-ajax-load]").exists()) {
            $('[data-ajax-load]').each(function(){
                var value = $(this).data("ajax-load"),
                    $this = $(this);
                $(this).empty().load(value, function(){
                    if ($($this).hasClass('ajax-slider')) {
                        var $sldr = $(this).find('.custom-slider');
                        $sldr.slick();
                    }
                });
            });
        }

    //*********************************************
}); //  END WINDOW LOAD FUNCTION
    //*********************************************
