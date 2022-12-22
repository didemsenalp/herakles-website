// Start Window Load Function
$(window).on('load', function() {

    'use strict';







// End Function
});


//*********************************************
//  GALLERY SCRIPTS
//*********************************************



(function($, window, document, undefined) {
   'use strict';
   // init cubeportfolio
   $('#portfolio-items').cubeportfolio({
        mediaQueries: [{
            width: 992,
            cols: 3,
        }, {
            width: 640,
            cols: 2,
        }, {
            width: 480,
            cols: 1,
        }],
        filters: '.filter-tags',
        defaultFilter: '*',
        layoutMode: 'grid',
        gridAdjustment: 'responsive',
        gapHorizontal: 10,
        gapVertical: 10,
        caption: 'none',
        animationType: 'quicksand',
        displayType: 'none',
        displayTypeSpeed: 0,
        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
   });

   //Get .active class for filters
   $(".cbp-filter-item-active").addClass("active");
   $("[data-filter]").on("click", function(){
        $("[data-filter]").removeClass("active");
        $(".cbp-filter-item-active").addClass("active");
   });

})(jQuery, window, document);
