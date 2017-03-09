'use strict';

$(document).ready(function () {
	module.ready();


	if($('.menu').length){
		scrollMenu.init();

		$(".wrap-menu__table").on("click", function(e){
			e.preventDefault();
			var menu = $(".wrap-menu"),
				news = $(".l-blog__col_right");
			if(menu.css("left") == "0px"){
				menu.animate({"left": "-81%"}, 300);
				news.animate({"left": 0}, 300);
			} else {
				menu.animate({"left": '0'}, 300);
				news.animate({"left": "86%"}, 300);
			}
		});
	}

	preloader.init();


	circle.init();

});

var circle = (function () {

	var radius = 45;

	var procent100 = function(summ) {
		return 2 * summ * 3.1415;
	};
	var procent = function(p, summ) {
		return procent100(summ) * (100-p) / 100;
	};

	var animate = function () {

		$(".sector").css({
			"stroke-dasharray": procent100(radius),
			"stroke-dashoffset": procent100(radius)
		});

		setTimeout(function(){
			$(".sector").each(function(){
				$(this)
					.attr('data-procent', $(this).data('procent'))
					.attr('stroke-dasharray', procent100(radius))
					.attr('stroke-dashoffset', procent100(radius))
					.css("stroke-dashoffset", procent($(this).data('procent'), radius))
					.css('stroke', '#74a163')
					.css('opacity', '.' + $(this).data('procent'));
			});
		}, 300);
	};

	return {
		init : function () {
			animate();
		}
	}
}());

$(window).resize(function () {
	module.resize();

	if($('.menu').length){
		if(window.innerWidth >= 768) {
			$(".l-blog__col_right").attr("style", "");
			$(".wrap-menu").attr("style", "");
		}
	}
});

var preloader = (function(){

	var percentsTotal = 0;
	var preloader = $('.preloader');

	var imgPath = $('*').map(function (ndx, element) {

		var background = $(element).css('background-image');
		var isImg = $(element).is('img');
		var path = '';

		if(background != 'none'){
			path = background.replace('url("', '').replace('")', '');
		}

		if(isImg){
			path = $(element).attr('src');
		}

		if(path) return path;
	});

	var setPrecents = function (total, current) {
		var percents = Math.ceil(current / total * 100);

		$('.preloader__text').text(percents + '%');

		if(percents >= 100){
			preloader.fadeOut();
		}
	};

	var loadImages = function (images) {
		if(!images) preloader.fadeOut();

		images.forEach(function (img, i, images) {

			var fakeImage = $('<img>', {
				attr : {
					src : img
				}
			});

			fakeImage.on('load error', function () {
				percentsTotal++;
				setPrecents(images.length, percentsTotal);
			});
		});
	};


	return {
		init : function(){
			var imgs = imgPath.toArray();
			loadImages(imgs);
		}
	}
}());

var module = (function () {

	var flipAut = function () {
		var flipContainer = $(".flip-container"),
			linkFlip = $("#js-aut-flip");

		if (flipContainer.is(".hover")) {
			flipContainer.removeClass("hover");
			linkFlip.addClass("visible").removeClass("hidden");
		} else {
			flipContainer.addClass("hover");
			linkFlip.removeClass("visible").addClass("hidden");
		}
	};

	var blurFeedback = function () {

		var section = document.querySelector(".l-feedback"),
			form = document.querySelector(".c-feedback"),
			formWidth = form.offsetWidth / 2,
			posTop = -form.offsetTop,
			posLeft = -(form.offsetLeft - formWidth),
			bg = document.querySelector(".c-feedback__blur"),
			bgCSS = bg.style;

		bgCSS.top = posTop + 'px';
		bgCSS.left = posLeft + 'px';
		bgCSS.width = section.offsetWidth + 'px';
		bgCSS.height = section.offsetHeight + 'px';
	};


	return {
		ready: function () {

			if ($(".js-aut-flip").length) {
				$('body').on('click', '.js-aut-flip', function (e) {
					e.preventDefault();
					flipAut();
				});
			}


			$('#toggle').click(function () {
				$(this).toggleClass('active');
				$('#overlay').toggleClass('open');
			});

			if ($(".l-feedback").length) {
				blurFeedback();
			}
		},
		resize: function () {
			if ($(".l-feedback").length) {
				blurFeedback();
			}
		}
	}
}());


var scrollMenu = (function () {
	var $news = $('.news'),
		$item = $('.menu__item'),
		$wrapMenu = $('.wrap-menu'),
		body = document.body,
		isPositionArticle = [],
		offsetHeight = 200,

		positionArticle = function (element) {
			var len = element.length;
			for (var i = 0; i < len; i++) {
				isPositionArticle[i] = {};
				isPositionArticle[i].top = element
						.eq(i)
						.offset()
						.top - offsetHeight;
				isPositionArticle[i].bottom = isPositionArticle[i].top + element
						.eq(i)
						.innerHeight();
			}
		},

		scrollPageFixMenu = function (e) {
			var scroll = window.pageYOffset;
			if (scroll < $news.offset().top) {
				$wrapMenu.removeClass('fixed');
			} else {
				if(window.innerWidth > 768) {
					$wrapMenu.addClass('fixed');
					console.log(window.innerWidth);
				} else {
					$wrapMenu.removeClass('fixed');
				}
			}
		},

		scrollPage = function (e) {
			var scroll = window.pageYOffset;
			for (var i = 0; i < isPositionArticle.length; i++) {
				if (scroll >= isPositionArticle[i].top && scroll <= isPositionArticle[i].bottom) {
					$item
						.eq(i)
						.addClass('menu__item--active')
						.siblings()
						.removeClass('menu__item--active');
				}
			}
		},

		clickOnMenu = function (e) {
			var index = $(e.target).index();
			var sectionOffset = $news
				.eq(index)
				.offset()
				.top;
			$(document).off('scroll', scrollPage);
			$('body, html').animate({
				'scrollTop': sectionOffset
			}, function () {
				$(e.target)
					.addClass('menu__item--active')
					.siblings()
					.removeClass('menu__item--active');
				$(document).on('scroll', scrollPage);
			});

			if(window.innerWidth <= 768) {
				var menu = $(".wrap-menu"),
					news = $(".l-blog__col_right");

				menu.animate({"left": "-81%"}, 300);
				news.animate({"left": 0}, 300);
			}
		},

		addListener = function () {
			$('.menu').on('click', clickOnMenu);

			$(document).on('scroll', scrollPage);
			$(document).on('scroll', scrollPageFixMenu);

			$(window).on('load', function (e) {
				positionArticle($news);
			});

			$(window).on('resize', function (e) {
				positionArticle($news);
			})
		};

	return {
		init: addListener
	}
})();