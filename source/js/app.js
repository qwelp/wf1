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