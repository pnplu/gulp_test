var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-ruby-sass');
var cleanCss = require('gulp-clean-css');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// gulp.task('sass', () =>
// 	sass('style/scss/*.scss')
// 		.on('error', sass.logError)
// 		.pipe(gulp.dest('style/css'))
// );

gulp.task('sass', function () {
  sass('style/scss/*.scss')
		.on('error', sass.logError)
		.pipe(gulp.dest('style/css'))
});

gulp.task('minify-css', function() {
  return gulp.src('style/css/*.css')
  .pipe(cleanCss({compatibility: 'ie8'}))
  .pipe(gulp.dest('style/dist'));
});

gulp.task('default', ['browser-sync', 'sass', 'minify-css'], function() {
  gulp.watch(['**/*.html'], browserSync.reload);
  gulp.watch(['style/css/*.css'], browserSync.reload);

  gulp.watch('style/scss/*.scss', ['sass']);
  gulp.watch('style/css/*.css', ['minify-css']);
});
