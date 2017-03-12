'use strict';

$(document).ready(function () {
	$('#toggle').click(function () {
		$(this).toggleClass('active');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHQkKCcjdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdCQoJyNvdmVybGF5JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblx0fSk7XG5cblx0aWYoJCgnLmMtYXJyb3cnKS5sZW5ndGgpIHtcblx0XHRzcm9sbEVsZW1lbnQuaW5pdCgpO1xuXHR9XG5cblx0aWYoJCgnLmFkbWluLXRhYnMnKS5sZW5ndGgpe1xuXHRcdHRhYnNBZG1pbi5pbml0KCk7XG5cdH1cbn0pO1xuXG52YXIgc3JvbGxFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgZWxlbWVudCA9IGZ1bmN0aW9uIChsaW5rLCBlbGVtZW50KSB7XG5cdFx0JChsaW5rKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogJChlbGVtZW50KS5vZmZzZXQoKS50b3AgfSwgNTAwKTtcblx0XHR9KTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGVsZW1lbnQoJy5jLWFycm93JywgJyNqcy1zY3JvbGwtaW5mbycpO1xuXHRcdH1cblx0fVxufSgpKTtcblxudmFyIHRhYnNBZG1pbiA9IChmdW5jdGlvbigpe1xuXG5cdHZhciB0YWJzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuXHRcdHZhciBpdGVtcyA9ICQoJy5hZG1pbi10YWJzJyksXG5cdFx0XHRpdGVtID0gIGl0ZW1zLmZpbmQoJy5hZG1pbi10YWInKSxcblx0XHRcdG1lbnUgPSAkKCcuYWRtaW4tbWVudV9faXRlbXMnKSxcblx0XHRcdG1lbnVJdGVtID0gbWVudS5maW5kKCcuYWRtaW4tbWVudV9faXRlbScpLFxuXHRcdFx0bmR4ID0gZWxlbWVudC5wYXJlbnQoKS5pbmRleCgpO1xuXG5cdFx0aXRlbS5lcShuZHgpXG5cdFx0XHQuYWRkKG1lbnVJdGVtLmVxKG5keCkpXG5cdFx0XHQuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cdFx0XHQuc2libGluZ3MoKVxuXHRcdFx0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJy5hZG1pbi1tZW51X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0YWJzKCQodGhpcykpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KCkpOyJdfQ==
