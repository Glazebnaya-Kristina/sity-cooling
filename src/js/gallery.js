$(document).ready(function () {
  $('[data-fancybox="gallery"]').fancybox({
    toolbar  : false,
    smallBtn : false,
    arrows   : false,
    idleTime : false,
    infobar: false,
    loop     : true,
    imageScale: false,
    afterLoad : function(instance, slide) {
      $('<a title="Close" class="fancybox-item fancybox-close" href="javascript:;" data-fancybox-close></a> <a title="Previous" class="fancybox-item fancybox-nav fancybox-prev" href="javascript:;" data-fancybox-prev><i class="icon-angle-left"></i></a> <a title="Next" class="fancybox-item fancybox-nav fancybox-next" href="javascript:;" data-fancybox-next><i class="icon-angle-right"></i></a>').appendTo( slide.$content );
    },
    hideOnOverlayClick: true,
    enableEscapeButton: true
  });
});
