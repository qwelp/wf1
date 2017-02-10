'use strict';

module.exports = function () {
  $.gulp.task('sprite:png', function () {
    var spriteData = $.gulp.src('./source/icons/*.{png,gif}').pipe($.gp.spritesmith({
      imgName: 'sprite.png', // итоговый спрайт
      cssName: 'sprite.css', // файл стилей
      algorithm: 'left-right',
      padding: 20
    }));
    var imgStream = spriteData.img
      .pipe($.gulp.dest($.config.root + '/assets/img')); // путь куда записываем спрайт

    var cssStream = spriteData.css
      .pipe($.gulp.dest($.config.root + '/assets/css')); // путь куда записываем файл стилей для спрайта

      console.log($.config.root + '/assets/css');

    return $.merge(imgStream, cssStream);
  });

};