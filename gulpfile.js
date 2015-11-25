var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var  minifycss = require('gulp-minify-css');
var  eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


var config = {
  entryFile: 'src/scripts/index.js',
  outputDir: 'public/js/',
  outputFile: 'main.js'
};

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

var bundler;

function getBundler() {
  if (!bundler) {
    var bundler = browserify('./src/scripts/index.js', { debug: true, extensions: ['.js', '.json', '.es6'] }).transform(babelify.configure({extensions: ['.js', '.json', '.es6']}))
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('build-persistent', ['clean'], function() {
  return bundle();
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('watch', ['build-persistent'], function() {

  browserSync({
    server: {
      baseDir: './'
    }
  });

  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
});

// WEB SERVER
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});


gulp.task('sass', function () {
  gulp.src('./src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/styles/*.scss', ['sass']);
});




