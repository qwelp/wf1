'use strict';

module.exports = function() {
	$.gulp.task('copy:js', function() {
		return $.gulp.src('./source/js/all/**/*.*', { since: $.gulp.lastRun('copy:js') })
			.pipe($.gulp.dest($.config.root + '/assets/js'));
	});
};
