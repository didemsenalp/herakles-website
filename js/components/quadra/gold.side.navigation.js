
/* --------------------------------------------------------------------------
    -SIDE NAVIGATION SCRIPTS-

    Name: gold.side.navigation.js
    Project: Quadra
    Written By: Goldeyes Themes - https://themeforest.net/user/goldeyes
    Version: 1.0.0

    Side navigation for Quadra Multi Concept HTML5 Theme
    Special for Quadra users.
-------------------------------------------------------------------------- */    
    
    //Side nav scripts start

    //Side nav class name
    var sideNav = $(".side-nav");

    //Side nav is ready
    $(sideNav).ready(function(){
        'use strict';
        //Add ready class to sidenav after 300ms
        var timer = 0;
        setTimeout( function(){ $(sideNav).addClass("readyToUse"); }, 300); 
        $(window).on("resize", function(){
            $(sideNav).removeClass("readyToUse");
            clearTimeout(timer);
            timer = setTimeout( function(){ $(sideNav).addClass("readyToUse"); clearTimeout(timer); }, 300);
        });

        //Add class to body
        if (sideNav.length > 0) {$("body").addClass("has-side-nav");}

        //Side navigation dropdowns
        $(sideNav).find(".dd-toggle").each(function(){
            var $this = $(this), $item = $(this).find('>.dropdown-menu');
            $($this).find(">.nav-link").on("click", function(event){
                //Remove Showing classes from inactive menus
                $(sideNav).find('.dd-toggle').not($this).not($this.parents('.dd-toggle')).not($this.find('.dd-toggle')).find('.dropdown-menu').stop(true,true).slideUp(350, "easeInOutQuart").removeClass("showing").parents().removeClass("showing");
                //Remove active class from inactive links
                $(sideNav).find('.dd-toggle').not($this.parents('.dd-toggle')).find(">a").removeClass("active");
                //Close-open according to click areas.
                if ($item.hasClass("showing")) {
                    $($item).stop(true,true).slideUp(350, "easeInOutQuart").removeClass("showing");
                    $($item).find(".dropdown-menu").stop(true,true).slideUp(350, "easeInOutQuart").removeClass("showing");
                } else{
                    $($item).stop(true,true).slideDown(350, "easeInOutQuart").addClass("showing");
                    $this.find(">a").addClass("active");
                }
                event.preventDefault();
            });
        });
        //Mobile navigation open
        $(".side-nav-trigger").on("click", function(){
            if ($(window).width() <= 992 || mobile === true) {
                if (sideNav.hasClass("active")) {
                    $(sideNav).removeClass("active");
                    $(".mobile-side-nav-backdrop").delay("300").fadeOut(300);
                } else {
                    $(".mobile-side-nav-backdrop").fadeIn("slow");
                    setTimeout( function(){ $(sideNav).addClass("active"); }, 300); 
                }
            }
            return false;
        });
        //Mobile navigation Close
        $(".mobile-side-nav-backdrop").on("click", function(){
            $(this).delay("300").fadeOut(300);
            $(sideNav).removeClass("active");
        });
    });
    //End side nav scripts start




    //*********************************************
    //  Mini Side Nav Scripts
    //*********************************************

    //Mini side nav class name
    var miniSideNav = $(".mini-side-nav");

    //Mini side nav scripts start
    $(miniSideNav).ready(function(){
        'use strict';
        
        //Add class to body
        if (miniSideNav.not(".bg-transparent").length > 0) {$("body").addClass("has-mini-side-nav");}
        //Hover Effect
        $(miniSideNav).on("mouseenter mousemove", function(){
            $(".mini-side-nav-backdrop").stop().fadeIn("slow");
        });
        //Mobile navigation Close
        $(miniSideNav).on("mouseleave", function(){
            $(".mini-side-nav-backdrop").stop().fadeOut("slow");
        });
        $(".mini-side-nav-backdrop, .popover").on("mouseenter", function(){
            $(".mini-side-nav-backdrop").stop().fadeOut("slow");
        });


        if (mobile === true) {
            //Hover Effect
            var timer = 0;
            $(miniSideNav).on("click touch", function(){
                clearTimeout(timer);
                timer = setTimeout( function(){ $(".mini-side-nav-backdrop").stop().fadeOut("slow"); $('[data-bs-toggle="popover"]').popover("hide"); clearTimeout(timer); },900);
            });
        }
    });
    //End side nav scripts start































