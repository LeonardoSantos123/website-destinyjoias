$(document).ready(function () {
    var $desktopCarousel = $('#carousel-desktop');
    var $mobileCarousel = $('#carousel-mobile');
    var interval;

    if ($(window).width() < 768) {
      $desktopCarousel.carousel({
        interval: false
      });
      $mobileCarousel.carousel({
        interval: false
      });
    } else {
      interval = setInterval(function () {
        $desktopCarousel.carousel('next'); 
      }, 5000); 
    }

    $('.carousel-indicators li').click(function () {
      var targetSlide = $(this).data('slide-to');
      $desktopCarousel.carousel(targetSlide);
      $mobileCarousel.carousel(targetSlide);
    });

    $(window).resize(function () {
      if ($(window).width() < 768) {
        $desktopCarousel.carousel({
          interval: false
        });
        $mobileCarousel.carousel({
          interval: false
        });
      } else {
        if (!interval) {
          interval = setInterval(function () {
            $desktopCarousel.carousel('next'); 
          }, 3000); 
        }
      }
    });
  });