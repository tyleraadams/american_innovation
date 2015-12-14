var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var buffer =  require('vinyl-buffer');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var  minifycss = require('gulp-minify-css');
var  eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');

var config = {
  entryFile: 'src/scripts/index.js',
  outputDir: 'public/js/',
  outputFile: 'main.js'
};



var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', ['nodemon'] , function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
  });
});


gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/images/'));
});

gulp.task('styles', function(){
  gulp.src(['./src/styles/main.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('public/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return browserify('./src/scripts/index.js', {
    debug: true,
    extensions: ['.js', '.json', '.es6'],
    transform: [babelify]
    })
    .bundle()
    // .pipe(plumber({
    //   errorHandler: function (error) {
    //     console.log(error.message);
    //     this.emit('end');
    // }}))
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(source('main.js'))
    .pipe(buffer())
    // .pipe(concat('main.js'))
    // .pipe(babel())
    .pipe(gulp.dest('public/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/styles/**/*.scss", ['styles']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});
// // clean the output directory
// gulp.task('clean', function(cb){
//     rimraf(config.outputDir, cb);
// });

// var bundler;

// function getBundler() {
//   if (!bundler) {
//     var bundler = browserify('./src/scripts/index.js', { debug: true, extensions: ['.js', '.json', '.es6'] }).transform(babelify.configure({extensions: ['.js', '.json', '.es6']}))
//   }
//   return bundler;
// };

// function bundle() {
//   return getBundler()
//     .bundle()
//     .on('error', function(err) { console.log('Error: ' + err.message); })
//     .pipe(source(config.outputFile))
//     .pipe(gulp.dest(config.outputDir))
//     .pipe(reload({ stream: true }));
// }

// gulp.task('build-persistent', ['clean'], function() {
//   return bundle();
// });

// gulp.task('build', ['build-persistent'], function() {
//   process.exit(0);
// });

// gulp.task('watch', ['build-persistent'], function() {



//   getBundler().on('update', function() {
//     gulp.start('build-persistent')
//   });

//    // gulp.watch('./src/styles/*.scss', ['sass']);
// });

// // WEB SERVER
// // gulp.task('serve', function () {
// //   browserSync({
// //     server: {
// //       baseDir: './'
// //     }
// //   });
// // });


// gulp.task('sass', function () {
//   gulp.src('./src/styles/main.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer('last 2 version'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(minifycss())
//     .pipe(gulp.dest('./public/css'));
// });

// gulp.task('sass:watch', function () {
//   gulp.watch('./src/styles/*.scss', ['sass']);
// });



// // gulp.task('watch', function() {
// //   gulp.watch('src/css/*.css', ['styles']);
// //   gulp.watch('src/scripts/*.js', ['scripts']);
// // });


// gulp.task('default', ['build', 'sass', 'clean', 'watch', 'sass:watch']);

