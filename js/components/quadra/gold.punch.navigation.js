
/* --------------------------------------------------------------------------
    -PUNCH NAVIGATION SCRIPTS-

    Name: gold.punch.navigation.js
    Project: Quadra
    Written By: Goldeyes Themes - https://themeforest.net/user/goldeyes
    Version: 1.0.0

    Animated fullscreen navigation for Quadra Multi Concept HTML5 Theme
    Special for Quadra users.
-------------------------------------------------------------------------- */    
    $(".punch-nav").ready(function(){

        'use strict';

        var punch = $(".punch-nav");

        setTimeout( function(){ $("body").addClass("punch-nav-ready");}, 400);

        //  Punch Navigation Scripts
            //Append backdrop to punch nav
            $(punch).addClass("deactivated").append('<div class="punch-nav-backdrop"></div>');
            //Show Punch navigation script
            $.fn.showPunchNavigation = function() {
                if ($(punch).hasClass("deactivated")) {
                    $('body').addClass('o-hidden');
                    $(punch).addClass('active');
                    $('.animate').each(function() {
                        var item = $(this), animation = item.data('animation'), animationDelay = item.data('animation-delay');
                        if ( !item.hasClass('visible') ) {
                            if ( animationDelay ) { setTimeout(function(){ item.addClass( animation + " visible" ); }, animationDelay); }
                            else { item.addClass( animation + " visible" ); }
                        }
                    });
                    setTimeout( function(){ $(punch).addClass("activated").removeClass("deactivated");}, 2000);
                }
            };
            //Hiding navigation scripts
            $.fn.hidePunchNavigation = function() {
                if ($(punch).hasClass("activated")) {
                    $('body').removeClass('o-hidden');
                    $('.animate').each(function() {
                        var item = $(this), animation = item.data('animation');
                        item.addClass("fading-out");
                        setTimeout( function(){ item.removeClass( animation + " visible fading-out" )}, 800);
                    });
                    setTimeout( function(){ $(punch).removeClass("active");}, 600);
                    setTimeout( function(){ $(punch).removeClass("activated").addClass("deactivated");}, 2000);
                }
            };
            //Call punch nav with ".punch-nav-trigger" class. You can show it with a lot of buttons in the page.
            $('.punch-nav-trigger').on('click', function(){
                $(punch).showPunchNavigation();
                return false;
            });
            //Close with button and click on backdrop
            $(punch).find('.close, .punch-nav-backdrop').on('click', function(){
                $(punch).hidePunchNavigation();
                return false;
            });
            $("body input").focus(function(){punch.addClass("input-typing");});
            $("body input").focusout(function(){punch.removeClass("input-typing");});
            //Open-Close punch nav with "N" and "ESC" keys
            $(document).keyup(function(e) {if (e.keyCode === 78) { if (!$(punch).hasClass('active') && !$(punch).hasClass("input-typing")) { $(punch).showPunchNavigation(); } } });
            $(document).keyup(function(e) {if (e.keyCode === 27) { if ($(punch).hasClass('active')) { $(punch).hidePunchNavigation(); } } });
            //Close the Punch navigation before change the page.
            $(punch).find('a:not([target]):not([href="#"])').on('click', function(){
                var outLink = this.getAttribute('href');
                // Close the navigation
                $(punch).hidePunchNavigation();
                setTimeout( function(){ document.location.href = outLink;}, 1500);
                return false;
             });
        //End punch navigation scripts

    });
