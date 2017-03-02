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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdG1vZHVsZS5yZWFkeSgpO1xufSk7XG5cbiQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcblx0bW9kdWxlLnJlc2l6ZSgpO1xufSk7XG5cbnZhciBtb2R1bGUgPSAoZnVuY3Rpb24oKXtcblxuXHR2YXIgZmxpcEF1dCA9IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGZsaXBDb250YWluZXIgPSAkKFwiLmZsaXAtY29udGFpbmVyXCIpLFxuXHRcdFx0bGlua0ZsaXAgPSAkKFwiI2pzLWF1dC1mbGlwXCIpO1xuXG5cdFx0aWYoZmxpcENvbnRhaW5lci5pcyhcIi5ob3ZlclwiKSl7XG5cdFx0XHRmbGlwQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwiaG92ZXJcIik7XG5cdFx0XHRsaW5rRmxpcC5hZGRDbGFzcyhcInZpc2libGVcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZsaXBDb250YWluZXIuYWRkQ2xhc3MoXCJob3ZlclwiKTtcblx0XHRcdGxpbmtGbGlwLnJlbW92ZUNsYXNzKFwidmlzaWJsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIGJsdXJGZWVkYmFjayA9IGZ1bmN0aW9uKCl7XG5cblx0XHRcdHZhciBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sLWZlZWRiYWNrXCIpLFxuXHRcdFx0XHRmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jLWZlZWRiYWNrXCIpLFxuXHRcdFx0XHRmb3JtV2lkdGggPSBmb3JtLm9mZnNldFdpZHRoIC8gMixcblx0XHRcdFx0cG9zVG9wID0gLWZvcm0ub2Zmc2V0VG9wLFxuXHRcdFx0XHRwb3NMZWZ0ID0gLShmb3JtLm9mZnNldExlZnQtZm9ybVdpZHRoKSxcblx0XHRcdFx0YmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmMtZmVlZGJhY2tfX2JsdXJcIiksXG5cdFx0XHRcdGJnQ1NTID0gYmcuc3R5bGU7XG5cblx0XHRcdGJnQ1NTLnRvcCA9IHBvc1RvcCArICdweCc7XG5cdFx0XHRiZ0NTUy5sZWZ0ID0gcG9zTGVmdCArICdweCc7XG5cdFx0XHRiZ0NTUy53aWR0aCA9IHNlY3Rpb24ub2Zmc2V0V2lkdGggKyAncHgnO1xuXHRcdFx0YmdDU1MuaGVpZ2h0ID0gc2VjdGlvbi5vZmZzZXRIZWlnaHQgKyAncHgnO1xuXHR9O1xuXG5cblxuXHRyZXR1cm4ge1xuXHRcdHJlYWR5OiBmdW5jdGlvbigpe1xuXG5cdFx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5qcy1hdXQtZmxpcCcsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGZsaXBBdXQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKCcjdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKCcjb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYoJChcIi5sLWZlZWRiYWNrXCIpLmxlbmd0aCl7XG5cdFx0XHRcdGJsdXJGZWVkYmFjaygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVzaXplOiBmdW5jdGlvbigpe1xuXHRcdFx0aWYoJChcIi5sLWZlZWRiYWNrXCIpLmxlbmd0aCl7XG5cdFx0XHRcdGJsdXJGZWVkYmFjaygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSgpKTtcblxuLypcbnZhciBwYXJhbGxheENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJhbGxheCcpLFxuXHRsYXllcnMgPSBwYXJhbGxheENvbnRhaW5lci5jaGlsZHJlbjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xuXHR2YXIgcGFnZVggPSBlLnBhZ2VYLFxuXHRcdHBhZ2VZID0gZS5wYWdlWSxcblx0XHRpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXG5cdFx0aW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcblxuXHRbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcblx0XHR2YXIgZGl2aWRlciA9IGkgLyAxMDAsXG5cdFx0XHRib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXG5cdFx0XHRwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXG5cdFx0XHRwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXG5cdFx0XHRsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXG5cdFx0XHR0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJytwb3NpdGlvblgrJ3B4LCcgK3Bvc2l0aW9uWSsncHgsIDApJztcblxuXHRcdGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuXHRcdGxheWVyU3R5bGUuYm90dG9tID0gLWJvdHRvbVBvc2l0aW9uICsgJ3B4Jztcblx0fSk7XG5cblxuXHRjb25zb2xlLmxvZygpO1xufSk7Ki9cbiJdfQ==
