var gulp         = require('gulp');
var browserify   = require('gulp-browserify');
var babel        = require('gulp-babel');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var notify       = require('gulp-notify');
var reload       = browserSync.reload;

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

gulp.task('build', function() {
  return gulp.src('assets/js/src/components/*.js')
    .pipe(babel())
    .pipe(browserify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('watch', function() {
  gulp.watch('assets/js/src/**/*.{js,jsx}', ['build']);
});

gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    open: false,
    online: false,
    notify: false,
  });
});

gulp.task('default', ['build', 'browsersync', 'watch']);
