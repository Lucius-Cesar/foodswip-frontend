$(function() {
    "use strict";

    /*index : header animation*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $("header").addClass("fixed-me header-fixed");
        } else {
            $("header").removeClass("fixed-me header-fixed");
        }
    });
    /*end header animation*/

    /*menu toggle button*/
    $('.navbar-icon').on('click', function() {
        $(this).toggleClass('open');
    });
    /*end menu toggle button*/

    /*testimonial slider*/
    $('.client-data').on('click', function(e) {
        e.preventDefault();
        var eleid = $(this).attr('id'),
            descid = eleid + '-desc';

        $('.client-data.active').removeClass('active');
        $(this).addClass('active');

        $('.client-detail.active').fadeOut(500, function() {
            $('.client-detail.active').removeClass('active');
            $('#' + descid).fadeIn(500, function() {
                $('#' + descid).addClass('active');
            });
        });
    });
    /*end testimonial slider*/

    /*index : brand slider*/
    if ($("#brand-slider").length > 0) {
        $("#brand-slider").owlCarousel({
            loop: true,
            autoplay: true,
            dots: true,
            nav: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                420: {
                    items: 2,
                    loop: true,
                    nav: false,
                    dots: true,
                    margin: 0
                },
                575: {
                    items: 3,
                    loop: true,
                    nav: false,
                    dots: true
                },
                767: {
                    items: 4,
                    nav: false,
                    dots: true,
                    margin: 0
                },
                991: {
                    items: 5,
                    loop: true,
                    nav: false,
                    dots: true,
                    margin: 10
                },
                1200: {
                    items: 6,
                    loop: true,
                    nav: false,
                    margin: 0
                },
                1400: {
                    items: 6,
                    loop: true,
                    nav: false,
                    margin: 0
                }
            }
        });
    }
    /*end brand slider*/

    /*index : news slider*/
    if ($("#news-slider").length > 0) {
        $("#news-slider").owlCarousel({
            items: 2,
            loop: true,
            dots: false,
            nav: false,
            margin: 30,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 0,
                    nav: false
                },
                320: {
                    items: 1,
                    loop: true,
                    nav: false,
                    dots: true,
                    margin: 0
                },
                600: {
                    items: 2,
                    nav: false,
                    dots: true,
                    margin: 30
                },
                1000: {
                    items: 2,
                    loop: true,
                    nav: false,
                    dots: true,
                    margin: 30
                },
                1200: {
                    items: 2,
                    loop: true,
                    nav: false,
                    margin: 30
                },
                1400: {
                    items: 2,
                    loop: true,
                    nav: false,
                    margin: 30
                }
            }
        });
    }
    /*end news slider*/

    /*index : progrss bar*/
    // Remove svg.radial-progress .complete inline styling
    $('svg.radial-progress').each(function(index, value) {
        $(this).find($('circle.complete')).removeAttr('style');
    });

    // Activate progress animation on scroll
    $("svg.radial-progress").viewportChecker({
        classToAdd: 'animate',
        offset: 50,
        callbackFunction: function(elem, action) {
            $('svg.radial-progress.animate').each(function(index, value) {
                {
                    // Get percentage of progress
                    var percent = $(value).data('percentage');
                    // Get radius of the svg's circle.complete
                    var radius = $(this).find($('circle.complete')).attr('r');
                    // Get circumference (2πr)
                    var circumference = 2 * Math.PI * radius;
                    // Get stroke-dashoffset value based on the percentage of the circumference
                    // strokeDashOffset = circumference - (((percent * 10) * circumference) / 100);
                    var strokeDashOffset = circumference - (((percent) * circumference) / 100);
                    // Transition progress for 1.25 seconds
                    $(this).find($('circle.complete')).animate({
                        'stroke-dashoffset': strokeDashOffset
                    }, 1250);
                }
            });
        }
    });
    /*end progrss bar*/

    /*click to scroll menu*/
    $('[data-scroll]').on('click', function(event) {
        event.preventDefault();
        var $section = $($(this).attr('href'));
        $('html, body').animate({
            scrollTop: $section.offset().top - 50
        }, 1500);
    });
    /*end scroll menu*/

    /*quote popup*/
    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true,
        mainClass: 'mfp-fade'
    });
    /*quote popup end*/

    /*document ready end*/
});

/*--------preloader-------*/
$(window).on("load", function() {
  "use strict";
  $('#preloader').delay(2000).fadeOut(500);
});
/*------End----------*/