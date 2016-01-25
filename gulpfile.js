var gulp = require('gulp');
var cache = require('gulp-cache');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'alt',
  'react',
  'react-dom',
  'react-router',
  'underscore'
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', function() {
  return gulp.src([
    'app/bower_components/jquery/dist/jquery.js',
    'app/bower_components/modernizr/modernizr.js',
	'app/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
	'app/bower_components/jquery-ui/jquery-ui.min.js',
	'app/bower_components/moment/min/moment.min.js'

  ]).pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', ['browserify-vendor'], function() {
  return browserify('app/main.js')
    .external(dependencies)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch', ['browserify-vendor'], function() {
  var bundler = watchify(browserify('app/main.js', watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify, { presets: ['es2015', 'react'] })
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/js/'));
  }
});

/*
 |--------------------------------------------------------------------------
 | Compile stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('styles', function() {
  return gulp.src([
	  'app/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
	  'app/bower_components/progressbar.js/css/lib/control/progressbar.css',
	  'app/vendor/emoji/css/minEmoji.css'
	])
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('public/css'));
});

/*
 |--------------------------------------------------------------------------
 | Compile sass & less stylesheets.
 |--------------------------------------------------------------------------
 */
 gulp.task('sass', function() {
  return gulp.src('app/stylesheets/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
//    .pipe(minifycss())
    .pipe(gulp.dest('public/css'));
});


gulp.task('watch', function() {
  gulp.watch('app/stylesheets/**/*.scss', ['sass']);
});

gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
});

//gulp.task('default', ['styles', 'vendor', 'browserify-watch', 'watch']);
gulp.task('build', ['cache:clear','sass','styles', 'vendor', 'browserify']);
