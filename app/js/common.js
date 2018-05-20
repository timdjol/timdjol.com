$(function() {
    //preloader
    $(window).on('load', function() {
    	$('.preloader').delay(1000).fadeOut('slow');
    });
    
    //popup
    $("a[href='#callback']").magnificPopup({
    	mainClass: 'my-mfp-zoom-in',
    	removalDelay: 300,
    	type: 'inline',
    	focus: '#name'
    }); 

    $(".popup_content").magnificPopup({
    	type:"inline",
    	midClick: true
    });

    //top
    $('.top').click(function() {
    	$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });
    $(window).scroll(function() {
    	if ($(this).scrollTop() > $(window).height()) {
    		$('.top').addClass("active");
    	} else {
    		$('.top').removeClass("active");
    	};
    });


    //equal
    function heightses() {
    	$(".name").height('auto').equalHeights();
    }


    //menu
    $(".toggle-mnu").click(function() {
    	$(this).toggleClass("on");
    	$(this).parent().next().next().find(".main-mnu").slideToggle();
    	return false;
    });


    //tabs
    $("#portfolio_grid").mixItUp();

    $(".s_portfolio li").click(function() {
    	$(".s_portfolio li").removeClass("active");
    	$(this).addClass("active");
    });

    $(".portfolio_item").each(function(i) {
    	$(this).find(".port_item_cont a").attr("href", "#work_" + i);
    	$(this).find(".podrt_descr").attr("id", "work_" + i);
    });


    //animate
    $(".top_text h1").animated("fadeInDown", "fadeOutUp");
    $(".top_text p").animated("fadeInUp", "fadeOutDown");
    
    $(".title").animated("fadeInUp", "fadeOutDown");

    $(".animation_1").animated("flipInY", "fadeOutDown");
    $(".animation_3").animated("fadeInRight", "fadeOutDown");

    $(".left .resume_item").animated("fadeInLeft", "fadeOutDown");
    $(".right .resume_item").animated("fadeInRight", "fadeOutDown");

    //validation
    $("input, select, textarea").jqBootstrapValidation();

    //animate scroll
    $(".top_mnu ul a").mPageScroll2id();
    $("a.scroll-mouse").mPageScroll2id();

    //menu
    $(".toggle_mnu").click(function() {
    	$(".sandwich").toggleClass("active");
    });

    $(".top_mnu ul a").click(function() {
    	$(".top_mnu").fadeOut(600);
    	$(".sandwich").toggleClass("active");
    	$(".top_text").css("opacity", "1");
    }).append("<span>");

    $(".toggle_mnu").click(function() {
    	if ($(".top_mnu").is(":visible")) {
    		$(".top_text").css("opacity", "1");
    		$(".top_mnu").fadeOut(600);
    		$(".top_mnu li a").removeClass("fadeInUp animated");
    	} else {
    		$(".top_text").css("opacity", ".1");
    		$(".top_mnu").fadeIn(600);
    		$(".top_mnu li a").addClass("fadeInUp animated");
    	};
    });

    
    //lazy
    var lazyLoadInstances = [];
    // The "lazyLazy" instance of lazyload is used (kinda improperly) 
    // to check when the .horzContainer divs enter the viewport
    var lazyLazy = new LazyLoad({
    	elements_selector: ".portfolio_item, .modal-box-content",
        // When the .horzContainer div enters the viewport...
        callback_set: function(el) {
            // ...instantiate a new LazyLoad on it
            var oneLL = new LazyLoad({
            	container: el
            });
            // Optionally push it in the lazyLoadInstances 
            // array to keep track of the instances
            lazyLoadInstances.push(oneLL);
          }
        });

    //phone
    $("input[name=phone]").inputmask(undefined, {
    	oncleared:function(){
    		$(this).prev().html('');
    	},
    	onKeyValidation:function(result, opts){
    		if ($(this).inputmask("getmetadata")) {
    			var country_name = $(this).inputmask("getmetadata")["name_ru"];
    			var src = '/img/flags/'+$(this).inputmask("getmetadata")["cc"].toLowerCase()+'.png';
    			$(this).prev().html('<img src="'+src+'" /> '+ country_name);
    		}
    	}
    });


    $("#footer").submit(function() { //Change
    	var th = $(this);
    	event.preventDefault();
    	$.ajax({
    		type: "POST",
        url: "mailfooter.php", //Change
        data: th.serialize()
      }).done(function() {
      	$.magnificPopup.open({ 
      		items: {
      			src: '<div class="footsuccess"><h4>Спасибо за вашу заявку!</h4></div>',
      			type: 'inline'
      		}
      	});
      	setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 300000);
      });
      return false;
    });



    $("form").submit(function() { //Change
    	var th = $(this);
    	$.ajax({
    		type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
          }).done(function() {
          	th.find(".successform").addClass("active");
          	setTimeout(function() {
                // Done Functions
                th.find(".successform").removeClass("active");
                th.trigger("reset");
                $.magnificPopup.close();
              }, 3000);
          });
          return false;
        });

    //scroll readable
    $("body").prognroll({
    	height: 3,
    	color: "#FF6347",
    	custom: false
    });

    //typeit
    var instance = new TypeIt('#nameauthor', {
    	strings: ['Темирлан Джолдошев'],
    	speed: 170,
    });

  });
