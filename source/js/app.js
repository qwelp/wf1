'use strict';

$(document).ready(function () {
	$('#toggle').click(function () {
		$(this).toggleClass('active');
		$("html,body").css("overflow","auto");
		$('#overlay').toggleClass('open');
	});

	if($('.c-arrow').length) {
		srollElement.init();
	}

	if($('.admin-tabs').length){
		tabsAdmin.init();
	}
});

var srollElement = (function () {

	var element = function (link, element) {
		$(link).on("click", function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: $(element).offset().top }, 500);
		});
	};

	return {
		init: function () {
			element('.c-arrow', '#js-scroll-info');
		}
	}
}());

var tabsAdmin = (function(){

	var tabs = function (element) {

		var items = $('.admin-tabs'),
			item =  items.find('.admin-tab'),
			menu = $('.admin-menu__items'),
			menuItem = menu.find('.admin-menu__item'),
			ndx = element.parent().index();

		item.eq(ndx)
			.add(menuItem.eq(ndx))
			.addClass('active')
			.siblings()
			.removeClass('active');
	};

	return {
		init: function () {
			$('.admin-menu__link').on('click', function (e) {
				e.preventDefault();
				tabs($(this));
			});
		}
	}
}());