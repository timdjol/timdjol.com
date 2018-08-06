$(function() {
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

	$(".left").animated("fadeInLeft", "fadeOutDown");
	$(".right").animated("fadeInRight", "fadeOutDown");

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

	//lazy load
	var lazyLoadInstances = [];
	var lazyLazy = new LazyLoad({
		elements_selector: ".portfolio_item, .modal-box-content",
		callback_set: function(el) {
			var oneLL = new LazyLoad({
				container: el
			});
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

	//send email
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
				src: '<div class="footsuccess"><h3>Спасибо за вашу заявку!</h3></div>',
				type: 'inline'
			}
		});
		setTimeout(function() {
		// Done Functions
		th.trigger("reset");
	}, 3000);
	});
	return false;
});

	$("#callback").submit(function() { //Change
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


	//browser
	var is_chrome = !!window.chrome && !is_opera;
	var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !isEdge;
	var is_firefox = typeof window.InstallTrigger !== 'undefined';
	var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	if (is_safari){
		$('.parallax-window').removeAttr('data-image-src');
		$('.parallax-window').removeAttr('data-parallax');
		$('.parallax-window').removeAttr('data-natural-width');
		$('.parallax-window').removeAttr('data-natural-height');
		$('.parallax-window').removeAttr('data-speed');
		$('.parallax-window').addClass('bg');
	}

	//animate
	$(".numbers").waypoint(function() {
		$({blurRadius: 5}).animate({blurRadius: 0}, {
			duration: 3200,
			easing: 'swing',
			step: function() {
				$(".num-item h3 span").css({
					"-webkit-filter": "blur("+this.blurRadius+"px)",
					"filter": "blur("+this.blurRadius+"px)"
				});
			}
		});
		var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
		$(".num-item h3 span").each(function() {
			var tcount = $(this).data("count");
			$(this).animateNumber({ number: tcount,
				easing: 'easeInQuad',
				"font-size": "3.7125em",
				numberStep: comma_separator_number_step},
				3200);
		});
	}, {
		offset: '70%'
	});


	//social popup
	$('.call-button').click(function() {
		$('.soc-list').toggle('slow').toggleClass('active');
	});

});


