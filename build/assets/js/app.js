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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRtb2R1bGUucmVhZHkoKTtcblxuXG5cdGlmKCQoJy5tZW51JykubGVuZ3RoKXtcblx0XHRzY3JvbGxNZW51LmluaXQoKTtcblxuXHRcdCQoXCIud3JhcC1tZW51X190YWJsZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dmFyIG1lbnUgPSAkKFwiLndyYXAtbWVudVwiKSxcblx0XHRcdFx0bmV3cyA9ICQoXCIubC1ibG9nX19jb2xfcmlnaHRcIik7XG5cdFx0XHRpZihtZW51LmNzcyhcImxlZnRcIikgPT0gXCIwcHhcIil7XG5cdFx0XHRcdG1lbnUuYW5pbWF0ZSh7XCJsZWZ0XCI6IFwiLTgxJVwifSwgMzAwKTtcblx0XHRcdFx0bmV3cy5hbmltYXRlKHtcImxlZnRcIjogMH0sIDMwMCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtZW51LmFuaW1hdGUoe1wibGVmdFwiOiAnMCd9LCAzMDApO1xuXHRcdFx0XHRuZXdzLmFuaW1hdGUoe1wibGVmdFwiOiBcIjg2JVwifSwgMzAwKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHByZWxvYWRlci5pbml0KCk7XG5cblxuXHRjaXJjbGUuaW5pdCgpO1xuXG59KTtcblxudmFyIGNpcmNsZSA9IChmdW5jdGlvbiAoKSB7XG5cblx0dmFyIHJhZGl1cyA9IDQ1O1xuXG5cdHZhciBwcm9jZW50MTAwID0gZnVuY3Rpb24oc3VtbSkge1xuXHRcdHJldHVybiAyICogc3VtbSAqIDMuMTQxNTtcblx0fTtcblx0dmFyIHByb2NlbnQgPSBmdW5jdGlvbihwLCBzdW1tKSB7XG5cdFx0cmV0dXJuIHByb2NlbnQxMDAoc3VtbSkgKiAoMTAwLXApIC8gMTAwO1xuXHR9O1xuXG5cdHZhciBhbmltYXRlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0JChcIi5zZWN0b3JcIikuY3NzKHtcblx0XHRcdFwic3Ryb2tlLWRhc2hhcnJheVwiOiBwcm9jZW50MTAwKHJhZGl1cyksXG5cdFx0XHRcInN0cm9rZS1kYXNob2Zmc2V0XCI6IHByb2NlbnQxMDAocmFkaXVzKVxuXHRcdH0pO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0JChcIi5zZWN0b3JcIikuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0LmF0dHIoJ2RhdGEtcHJvY2VudCcsICQodGhpcykuZGF0YSgncHJvY2VudCcpKVxuXHRcdFx0XHRcdC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgcHJvY2VudDEwMChyYWRpdXMpKVxuXHRcdFx0XHRcdC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIHByb2NlbnQxMDAocmFkaXVzKSlcblx0XHRcdFx0XHQuY3NzKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgcHJvY2VudCgkKHRoaXMpLmRhdGEoJ3Byb2NlbnQnKSwgcmFkaXVzKSlcblx0XHRcdFx0XHQuY3NzKCdzdHJva2UnLCAnIzc0YTE2MycpXG5cdFx0XHRcdFx0LmNzcygnb3BhY2l0eScsICcuJyArICQodGhpcykuZGF0YSgncHJvY2VudCcpKTtcblx0XHRcdH0pO1xuXHRcdH0sIDMwMCk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRpbml0IDogZnVuY3Rpb24gKCkge1xuXHRcdFx0YW5pbWF0ZSgpO1xuXHRcdH1cblx0fVxufSgpKTtcblxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG5cdG1vZHVsZS5yZXNpemUoKTtcblxuXHRpZigkKCcubWVudScpLmxlbmd0aCl7XG5cdFx0aWYod2luZG93LmlubmVyV2lkdGggPj0gNzY4KSB7XG5cdFx0XHQkKFwiLmwtYmxvZ19fY29sX3JpZ2h0XCIpLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcblx0XHRcdCQoXCIud3JhcC1tZW51XCIpLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcblx0XHR9XG5cdH1cbn0pO1xuXG52YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uKCl7XG5cblx0dmFyIHBlcmNlbnRzVG90YWwgPSAwO1xuXHR2YXIgcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xuXG5cdHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XG5cblx0XHR2YXIgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyk7XG5cdFx0dmFyIGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyk7XG5cdFx0dmFyIHBhdGggPSAnJztcblxuXHRcdGlmKGJhY2tncm91bmQgIT0gJ25vbmUnKXtcblx0XHRcdHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XG5cdFx0fVxuXG5cdFx0aWYoaXNJbWcpe1xuXHRcdFx0cGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XG5cdFx0fVxuXG5cdFx0aWYocGF0aCkgcmV0dXJuIHBhdGg7XG5cdH0pO1xuXG5cdHZhciBzZXRQcmVjZW50cyA9IGZ1bmN0aW9uICh0b3RhbCwgY3VycmVudCkge1xuXHRcdHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xuXG5cdFx0JCgnLnByZWxvYWRlcl9fdGV4dCcpLnRleHQocGVyY2VudHMgKyAnJScpO1xuXG5cdFx0aWYocGVyY2VudHMgPj0gMTAwKXtcblx0XHRcdHByZWxvYWRlci5mYWRlT3V0KCk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlcykge1xuXHRcdGlmKCFpbWFnZXMpIHByZWxvYWRlci5mYWRlT3V0KCk7XG5cblx0XHRpbWFnZXMuZm9yRWFjaChmdW5jdGlvbiAoaW1nLCBpLCBpbWFnZXMpIHtcblxuXHRcdFx0dmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+Jywge1xuXHRcdFx0XHRhdHRyIDoge1xuXHRcdFx0XHRcdHNyYyA6IGltZ1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0ZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRwZXJjZW50c1RvdGFsKys7XG5cdFx0XHRcdHNldFByZWNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQgOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcblx0XHRcdGxvYWRJbWFnZXMoaW1ncyk7XG5cdFx0fVxuXHR9XG59KCkpO1xuXG52YXIgbW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgZmxpcEF1dCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgZmxpcENvbnRhaW5lciA9ICQoXCIuZmxpcC1jb250YWluZXJcIiksXG5cdFx0XHRsaW5rRmxpcCA9ICQoXCIjanMtYXV0LWZsaXBcIik7XG5cblx0XHRpZiAoZmxpcENvbnRhaW5lci5pcyhcIi5ob3ZlclwiKSkge1xuXHRcdFx0ZmxpcENvbnRhaW5lci5yZW1vdmVDbGFzcyhcImhvdmVyXCIpO1xuXHRcdFx0bGlua0ZsaXAuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmbGlwQ29udGFpbmVyLmFkZENsYXNzKFwiaG92ZXJcIik7XG5cdFx0XHRsaW5rRmxpcC5yZW1vdmVDbGFzcyhcInZpc2libGVcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBibHVyRmVlZGJhY2sgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubC1mZWVkYmFja1wiKSxcblx0XHRcdGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmMtZmVlZGJhY2tcIiksXG5cdFx0XHRmb3JtV2lkdGggPSBmb3JtLm9mZnNldFdpZHRoIC8gMixcblx0XHRcdHBvc1RvcCA9IC1mb3JtLm9mZnNldFRvcCxcblx0XHRcdHBvc0xlZnQgPSAtKGZvcm0ub2Zmc2V0TGVmdCAtIGZvcm1XaWR0aCksXG5cdFx0XHRiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYy1mZWVkYmFja19fYmx1clwiKSxcblx0XHRcdGJnQ1NTID0gYmcuc3R5bGU7XG5cblx0XHRiZ0NTUy50b3AgPSBwb3NUb3AgKyAncHgnO1xuXHRcdGJnQ1NTLmxlZnQgPSBwb3NMZWZ0ICsgJ3B4Jztcblx0XHRiZ0NTUy53aWR0aCA9IHNlY3Rpb24ub2Zmc2V0V2lkdGggKyAncHgnO1xuXHRcdGJnQ1NTLmhlaWdodCA9IHNlY3Rpb24ub2Zmc2V0SGVpZ2h0ICsgJ3B4Jztcblx0fTtcblxuXG5cdHJldHVybiB7XG5cdFx0cmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aWYgKCQoXCIuanMtYXV0LWZsaXBcIikubGVuZ3RoKSB7XG5cdFx0XHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnLmpzLWF1dC1mbGlwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0ZmxpcEF1dCgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXG5cdFx0XHQkKCcjdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCgnI292ZXJsYXknKS50b2dnbGVDbGFzcygnb3BlbicpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICgkKFwiLmwtZmVlZGJhY2tcIikubGVuZ3RoKSB7XG5cdFx0XHRcdGJsdXJGZWVkYmFjaygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVzaXplOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoJChcIi5sLWZlZWRiYWNrXCIpLmxlbmd0aCkge1xuXHRcdFx0XHRibHVyRmVlZGJhY2soKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0oKSk7XG5cblxudmFyIHNjcm9sbE1lbnUgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgJG5ld3MgPSAkKCcubmV3cycpLFxuXHRcdCRpdGVtID0gJCgnLm1lbnVfX2l0ZW0nKSxcblx0XHQkd3JhcE1lbnUgPSAkKCcud3JhcC1tZW51JyksXG5cdFx0Ym9keSA9IGRvY3VtZW50LmJvZHksXG5cdFx0aXNQb3NpdGlvbkFydGljbGUgPSBbXSxcblx0XHRvZmZzZXRIZWlnaHQgPSAyMDAsXG5cblx0XHRwb3NpdGlvbkFydGljbGUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0dmFyIGxlbiA9IGVsZW1lbnQubGVuZ3RoO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRpc1Bvc2l0aW9uQXJ0aWNsZVtpXSA9IHt9O1xuXHRcdFx0XHRpc1Bvc2l0aW9uQXJ0aWNsZVtpXS50b3AgPSBlbGVtZW50XG5cdFx0XHRcdFx0XHQuZXEoaSlcblx0XHRcdFx0XHRcdC5vZmZzZXQoKVxuXHRcdFx0XHRcdFx0LnRvcCAtIG9mZnNldEhlaWdodDtcblx0XHRcdFx0aXNQb3NpdGlvbkFydGljbGVbaV0uYm90dG9tID0gaXNQb3NpdGlvbkFydGljbGVbaV0udG9wICsgZWxlbWVudFxuXHRcdFx0XHRcdFx0LmVxKGkpXG5cdFx0XHRcdFx0XHQuaW5uZXJIZWlnaHQoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c2Nyb2xsUGFnZUZpeE1lbnUgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIHNjcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblx0XHRcdGlmIChzY3JvbGwgPCAkbmV3cy5vZmZzZXQoKS50b3ApIHtcblx0XHRcdFx0JHdyYXBNZW51LnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcblx0XHRcdFx0XHQkd3JhcE1lbnUuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cod2luZG93LmlubmVyV2lkdGgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCR3cmFwTWVudS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzY3JvbGxQYWdlID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdHZhciBzY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGlzUG9zaXRpb25BcnRpY2xlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChzY3JvbGwgPj0gaXNQb3NpdGlvbkFydGljbGVbaV0udG9wICYmIHNjcm9sbCA8PSBpc1Bvc2l0aW9uQXJ0aWNsZVtpXS5ib3R0b20pIHtcblx0XHRcdFx0XHQkaXRlbVxuXHRcdFx0XHRcdFx0LmVxKGkpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ21lbnVfX2l0ZW0tLWFjdGl2ZScpXG5cdFx0XHRcdFx0XHQuc2libGluZ3MoKVxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdtZW51X19pdGVtLS1hY3RpdmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRjbGlja09uTWVudSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgaW5kZXggPSAkKGUudGFyZ2V0KS5pbmRleCgpO1xuXHRcdFx0dmFyIHNlY3Rpb25PZmZzZXQgPSAkbmV3c1xuXHRcdFx0XHQuZXEoaW5kZXgpXG5cdFx0XHRcdC5vZmZzZXQoKVxuXHRcdFx0XHQudG9wO1xuXHRcdFx0JChkb2N1bWVudCkub2ZmKCdzY3JvbGwnLCBzY3JvbGxQYWdlKTtcblx0XHRcdCQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtcblx0XHRcdFx0J3Njcm9sbFRvcCc6IHNlY3Rpb25PZmZzZXRcblx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JChlLnRhcmdldClcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ21lbnVfX2l0ZW0tLWFjdGl2ZScpXG5cdFx0XHRcdFx0LnNpYmxpbmdzKClcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ21lbnVfX2l0ZW0tLWFjdGl2ZScpO1xuXHRcdFx0XHQkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgc2Nyb2xsUGFnZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYod2luZG93LmlubmVyV2lkdGggPD0gNzY4KSB7XG5cdFx0XHRcdHZhciBtZW51ID0gJChcIi53cmFwLW1lbnVcIiksXG5cdFx0XHRcdFx0bmV3cyA9ICQoXCIubC1ibG9nX19jb2xfcmlnaHRcIik7XG5cblx0XHRcdFx0bWVudS5hbmltYXRlKHtcImxlZnRcIjogXCItODElXCJ9LCAzMDApO1xuXHRcdFx0XHRuZXdzLmFuaW1hdGUoe1wibGVmdFwiOiAwfSwgMzAwKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YWRkTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKCcubWVudScpLm9uKCdjbGljaycsIGNsaWNrT25NZW51KTtcblxuXHRcdFx0JChkb2N1bWVudCkub24oJ3Njcm9sbCcsIHNjcm9sbFBhZ2UpO1xuXHRcdFx0JChkb2N1bWVudCkub24oJ3Njcm9sbCcsIHNjcm9sbFBhZ2VGaXhNZW51KTtcblxuXHRcdFx0JCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cG9zaXRpb25BcnRpY2xlKCRuZXdzKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHBvc2l0aW9uQXJ0aWNsZSgkbmV3cyk7XG5cdFx0XHR9KVxuXHRcdH07XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBhZGRMaXN0ZW5lclxuXHR9XG59KSgpOyJdfQ==
