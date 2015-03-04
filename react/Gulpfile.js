
'use strict';

console.error('This Gulpfile doesn\'t work properly. Use "make" instead.');
process.exit(1);

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    filter = require('gulp-filter'),
    sass = require('gulp-sass'),
    react = require('gulp-react'),
    shell = require('gulp-shell');

var appJs   = 'javascripts/app.js',
    jsFiles = [appJs, 'javascripts/lib/**/*.js'],
    noHinting = ['!plugins.js', '!config.js', '!bindings.js'];

var sassFiles = ['stylesheets/*.scss'];

gulp.task('default', ['build:js', 'build:sass']);

gulp.task('lint', function() {
  return gulp.src(jsFiles)
    .pipe(filter(noHinting))
    .pipe(react()).on('error', gutil.log)
    .pipe(jshint('.jshintrc')).on('error', gutil.log)
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', ['watch:js', 'watch:sass']);

gulp.task('watch:js', function() {
  return gulp.watch(jsFiles, ['build:js']);
});

gulp.task('watch:sass', function() {
  return gulp.watch(sassFiles, ['build:sass']);
});

gulp.task('build', ['build:js', 'build:sass']);
gulp.task('build:all', ['build:js', 'build:react', 'build:sass']);

// FIXME: Stupid hack needed because gulp-browserify doesn't
//        seem to handle --require option very well.
gulp.task('build:react', function() {
  return gulp.src('javascripts/app.js')
    .pipe(shell([
      'browserify -r react > build/react.js',
      'uglifyjs build/react.js > build/react.min.js'
    ]));
});

// FIXME: Stupid hack needed because gulp-browserify doesn't
//        seem to handle --external option very well.
gulp.task('build:js', ['lint'], function() {
  return gulp.src('javascripts/app.js')
    .pipe(shell([
      'browserify -x react -t reactify <%= file.path %> > build/app.js',
      'uglifyjs build/app.js > build/app.min.js'
    ]))
    .on('error', gutil.log);

  // return gulp.src(['javascripts/app.js'], {read: false})
  //   .pipe(browserify({
  //     standalone: 'Reminisce',
  //     insertGlobals: false,
  //     transform: ['reactify'],
  //     debug : !gutil.env.production
  //   }))
  //   .on('prebundle', function(bundle) {
  //     bundle.external('react');
  //   })
  //   .pipe(concat('app.js'))
  //   .pipe(gulp.dest('./build/'))
  //   .pipe(rename({suffix: '.min'}))
  //   .pipe(uglify())
  //   .pipe(gulp.dest('./build/'));
});

gulp.task('build:sass', function() {
  return gulp.src(sassFiles)
    .pipe(sass())
    .pipe(gulp.dest('./stylesheets/'));
});

gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task('clean:js', function() {
   return gulp.src(['build/*'], {read: false})
    .pipe(clean());
});

gulp.task('clean:css', function() {
   return gulp.src(['stylesheets/*.css'], {read: false})
    .pipe(clean());
});
