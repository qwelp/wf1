'use strict';

$(document).ready(function(){
	module.ready();
});

$(window).resize(function(){
	module.resize();
});

var module = (function(){

	var flipAut = function(){
		var flipContainer = $(".flip-container"),
			linkFlip = $("#js-aut-flip");

		if(flipContainer.is(".hover")){
			flipContainer.removeClass("hover");
			linkFlip.addClass("visible").removeClass("hidden");
		} else {
			flipContainer.addClass("hover");
			linkFlip.removeClass("visible").addClass("hidden");
		}
	};

	var blurFeedback = function(){

			var section = document.querySelector(".l-feedback"),
				form = document.querySelector(".c-feedback"),
				formWidth = form.offsetWidth / 2,
				posTop = -form.offsetTop,
				posLeft = -(form.offsetLeft-formWidth),
				bg = document.querySelector(".c-feedback__blur"),
				bgCSS = bg.style;

			bgCSS.top = posTop + 'px';
			bgCSS.left = posLeft + 'px';
			bgCSS.width = section.offsetWidth + 'px';
			bgCSS.height = section.offsetHeight + 'px';
	};



	return {
		ready: function(){

			$('body').on('click', '.js-aut-flip', function(e){
				e.preventDefault();
				flipAut();
			});

			$('#toggle').click(function() {
				$(this).toggleClass('active');
				$('#overlay').toggleClass('open');
			});

			if($(".l-feedback").length){
				blurFeedback();
			}
		},
		resize: function(){
			if($(".l-feedback").length){
				blurFeedback();
			}
		}
	}
}());

/*
var parallaxContainer = document.getElementById('parallax'),
	layers = parallaxContainer.children;

window.addEventListener('mousemove', function(e){
	var pageX = e.pageX,
		pageY = e.pageY,
		initialX = (window.innerWidth / 2) - pageX,
		initialY = (window.innerHeight / 2) - pageY;

	[].slice.call(layers).forEach(function (layer, i) {
		var divider = i / 100,
			bottomPosition = (window.innerHeight / 2) * divider,
			positionX = initialX * divider,
			positionY = initialY * divider,
			layerStyle = layer.style,
			transformString = 'translate3d('+positionX+'px,' +positionY+'px, 0)';

		layerStyle.transform = transformString;
		layerStyle.bottom = -bottomPosition + 'px';
	});


	console.log();
});*/
