
/* --------------------------------------------------------------------------
    -SIDE NAVIGATION SCRIPTS-

    Name: gold.shop.js
    Project: Quadra
    Written By: Goldeyes Themes - https://themeforest.net/user/goldeyes
    Version: 1.0.0

    Shop templates for Quadra Multi Concept HTML5 Theme
    Special for Quadra users.
-------------------------------------------------------------------------- */    
    
    //Shop scripts start

    //When document ready
    $(document).ready(function(){
        'use strict';
        
        var cart = $(".cart"),
            cartTrigger = $(".cart-trigger"),
            cartCloser = $(".cart-closer"),
            backdrop = $(".cart-backdrop");


            $(cartTrigger).on("click", function(){
                if (cart.hasClass("active")) {
                    $(".cart, .cart-backdrop").removeClass("active");
                    return false;
                } else{
                    $(".cart, .cart-backdrop").addClass("active");
                    return false;
                }
            });

            $(".cart-closer, .cart-backdrop").on("click", function(){
                $(".cart, .cart-backdrop").removeClass("active");
                return false;
            });

    });
    //End functions































