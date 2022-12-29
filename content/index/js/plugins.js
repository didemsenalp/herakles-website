
//*********************************************
//  RESPONSIVE HOME PAGE BEFORE WINDOW LOAD
//*********************************************

    // Check android devices OS system if they are older than 4.4
    var ua = navigator.userAgent;
    if( ua.indexOf("Android") >= 0 ) {
        var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)),
            wHeight = $(window).height();
        if (androidversion < 4.9) {
            $(".home .right-animation").css({"height": wHeight + "px", "width": wHeight + "px"});
        }
    }

// Start Window Load Function
$(window).on('load', function() {

    'use strict';

        $(".svg-slider").on('init', function(){
            var newPath = $(".slick-current .slide-img").attr("data-svg-path");
            $(".svg-mask .desktop-only path").attr("d", newPath);
        }).on('afterChange', function(event, slick, currentSlide){
            var newPath = $(".slick-current .slide-img").attr("data-svg-path");
            $(".svg-mask .desktop-only path").attr("d", newPath);
        }).slick({initialSlide: 0});


        $(".more-trigger").each(function(){
            var item = $(this),
                elem = $(".home-socials a");
            $(window).on('click touchstart touch', function(event){ $(".home-socials .others.active, .more-trigger.active").removeClass('active'); });
            $(item).on('click touch', function(){ $(".home-socials .others, .more-trigger").toggleClass('active'); return false; });
            $(elem).on('click touch touchstart', function(event){ event = event || window.event; event.stopPropagation();});
        });


        $(".contents .articles article").each(function(){
            var article = $(this),
                imgChanger = $("#article-images img.article-image-changer"),
                imgSrc = $(this).find(".article-image").attr("src");
                $("#article-images .article-image-container").append('<div class="'+ $(this).attr("id") +' article-img" style="background-image: url(' + imgSrc + ')"></div>');
                $("#article-images .article-image-container .article-img:first-child").addClass("showing");

            $(article).waypoint(function(direction) {
                if (direction === 'up') {
                    var activeImgClass = $(article).attr("id");
                    $("."+ activeImgClass).addClass("showing");
                    $("#article-images .article-image-container").find(".article-img").not("."+ activeImgClass).removeClass(activeImgClass).removeClass("showing"); 
                }
            }, { offset: '0%' });
            $(article).waypoint(function(direction) {
                if (direction === 'down') {
                    var activeImgClass = $(article).attr("id");
                    $("."+ activeImgClass).addClass("showing");
                    $("#article-images .article-image-container").find(".article-img").not("."+ activeImgClass).removeClass(activeImgClass).removeClass("showing");
                }
            }, { offset: '75%' });
        });

        $(window).on("resize", function(){
            Waypoint.refreshAll();
        });


// End Function
});


(function($, window, document, undefined) {

    'use strict';
    
    //*********************************************
    //  DEMOS
    //*********************************************

        $('#demos').cubeportfolio({
            loadMoreAction: 'click',
            layoutMode: 'grid',
            animationType: 'quicksand',
            gridAdjustment: 'responsive',
            defaultFilter: '*',
            caption: 'none',
            displayType: 'none',
            displayTypeSpeed: 0,
            gapHorizontal: 65,
            gapVertical: 40,
            mediaQueries: [{
                width: 1700,
                cols: 4
            }, {
                width: 1540,
                cols: 3,
                options: {
                    caption: '',
                    gapHorizontal: 70,
                    gapVertical: 50,
                }
            }, {
                width: 1281,
                cols: 3,
                options: {
                    caption: '',
                    gapHorizontal: 55,
                    gapVertical: 25,
                }
            }, {
                width: 993,
                cols: 3,
                options: {
                    caption: '',
                    gapHorizontal: 40,
                    gapVertical: 20,
                }
            }, {
                width: 640,
                cols: 2,
                options: {
                    caption: '',
                    gapHorizontal: 25,
                    gapVertical: 15,
                }
            }, {
                width: 300,
                cols: 1,
                options: {
                    caption: '',
                    gapHorizontal: 25,
                    gapVertical: 15,
                }
            }]
        });

// End Function
})(jQuery, window, document);



