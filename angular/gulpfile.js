var gulp = require('gulp'),
	jshint = require('gulp-jshint')
	embedTemplates = require('gulp-angular-embed-templates');

//embed templateUrl: references
gulp.task('build-js', function () {
    gulp.src('./src/partials/*.js')
        .pipe(embedTemplates())
        .pipe(gulp.dest('./src/'));
});

// configure the jshint task
const pkg = require('./package');
const jshintConfig = pkg.jshintConfig;
jshintConfig.lookup = false;
gulp.task('jshint', function() {
  return gulp.src('./src/partials/*.js')
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build',['build-js'], function() {
});

gulp.task('watch', function() {
  gulp.watch(['./src/partials/*.js','./src/partials/*.html'], ['build-js']);
  gulp.watch(['./src/partials/*.js'], ['jshint']);
});