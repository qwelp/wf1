'use strict';

$(document).ready(function () {
	$('#toggle').click(function () {
		$(this).toggleClass('active');
		$('#overlay').toggleClass('open');
	});

	srollElement.init();
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
			if($('.c-arrow').length) {
				element('.c-arrow', '#js-scroll-info');
			}
		}
	}
}());
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0JCgnI3RvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQkKCcjb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cdH0pO1xuXG5cdHNyb2xsRWxlbWVudC5pbml0KCk7XG59KTtcblxudmFyIHNyb2xsRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cblx0dmFyIGVsZW1lbnQgPSBmdW5jdGlvbiAobGluaywgZWxlbWVudCkge1xuXHRcdCQobGluaykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQoZWxlbWVudCkub2Zmc2V0KCkudG9wIH0sIDUwMCk7XG5cdFx0fSk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZigkKCcuYy1hcnJvdycpLmxlbmd0aCkge1xuXHRcdFx0XHRlbGVtZW50KCcuYy1hcnJvdycsICcjanMtc2Nyb2xsLWluZm8nKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0oKSk7Il19
