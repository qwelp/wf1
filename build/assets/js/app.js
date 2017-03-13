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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdCQoJyN0b2dnbGUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cdFx0JChcImh0bWwsYm9keVwiKS5jc3MoXCJvdmVyZmxvd1wiLFwiYXV0b1wiKTtcblx0XHQkKCcjb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cdH0pO1xuXG5cdGlmKCQoJy5jLWFycm93JykubGVuZ3RoKSB7XG5cdFx0c3JvbGxFbGVtZW50LmluaXQoKTtcblx0fVxuXG5cdGlmKCQoJy5hZG1pbi10YWJzJykubGVuZ3RoKXtcblx0XHR0YWJzQWRtaW4uaW5pdCgpO1xuXHR9XG59KTtcblxudmFyIHNyb2xsRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cblx0dmFyIGVsZW1lbnQgPSBmdW5jdGlvbiAobGluaywgZWxlbWVudCkge1xuXHRcdCQobGluaykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQoZWxlbWVudCkub2Zmc2V0KCkudG9wIH0sIDUwMCk7XG5cdFx0fSk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRlbGVtZW50KCcuYy1hcnJvdycsICcjanMtc2Nyb2xsLWluZm8nKTtcblx0XHR9XG5cdH1cbn0oKSk7XG5cbnZhciB0YWJzQWRtaW4gPSAoZnVuY3Rpb24oKXtcblxuXHR2YXIgdGFicyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cblx0XHR2YXIgaXRlbXMgPSAkKCcuYWRtaW4tdGFicycpLFxuXHRcdFx0aXRlbSA9ICBpdGVtcy5maW5kKCcuYWRtaW4tdGFiJyksXG5cdFx0XHRtZW51ID0gJCgnLmFkbWluLW1lbnVfX2l0ZW1zJyksXG5cdFx0XHRtZW51SXRlbSA9IG1lbnUuZmluZCgnLmFkbWluLW1lbnVfX2l0ZW0nKSxcblx0XHRcdG5keCA9IGVsZW1lbnQucGFyZW50KCkuaW5kZXgoKTtcblxuXHRcdGl0ZW0uZXEobmR4KVxuXHRcdFx0LmFkZChtZW51SXRlbS5lcShuZHgpKVxuXHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKVxuXHRcdFx0LnNpYmxpbmdzKClcblx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKCcuYWRtaW4tbWVudV9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0dGFicygkKHRoaXMpKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSgpKTsiXX0=
