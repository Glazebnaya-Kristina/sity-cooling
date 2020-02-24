$(document).ready(function () {
  $('.reviews__carousel').slick({
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    variableWidth: true,
    prevArrow: '<button type="button" class="reviews__arrow reviews__arrow--prev"><svg class="icon"><use xlink:href="icons/sprite.svg#arrow"></use></svg></button>',
    nextArrow: '<button type="button" class="reviews__arrow reviews__arrow--next"><svg class="icon"><use xlink:href="icons/sprite.svg#arrow"></use></svg></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 1,
        },
      }
    ]
  });

});


