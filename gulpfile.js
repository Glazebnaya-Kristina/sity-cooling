'use strict';

const gulp = require( 'gulp' );
const posthtml = require( 'gulp-posthtml' );
const include = require( 'posthtml-include' );
const scss = require( 'gulp-sass' );
const sourcemaps = require( 'gulp-sourcemaps' );
const autoprefixer = require( 'gulp-autoprefixer' );
const csscomb = require( 'gulp-csscomb' );
const csso = require( 'gulp-csso' );
const criticalCss = require( 'gulp-critical-css' );
const imagemin = require( 'gulp-imagemin' );
const imageminMozjpeg = require( 'imagemin-mozjpeg' );
const webp = require( 'imagemin-webp' );
const svgSprite = require( 'gulp-svg-sprite' );
const svgstore = require('gulp-svgstore');
const svgmin = require( 'gulp-svgmin' );
const ttf2woff = require( 'gulp-ttf2woff' );
const ttf2woff2 = require( 'gulp-ttf2woff2' );
const plumber = require( 'gulp-plumber' );
const debug = require( 'gulp-debug' );
const notify = require( 'gulp-notify' );
const rename = require( 'gulp-rename' );
const newer = require( 'gulp-newer' );
const uglify = require( 'gulp-uglify' );
const concat = require( 'gulp-concat' );
const gulpIf = require( 'gulp-if' );
const del = require( 'del' );
const browserSync = require( 'browser-sync' ).create();

const root = {
  src: 'src/',
  build: 'build/'
};

const path = {
  src: {
    php: root.src + '*.php',
    html: root.src + '*.html',
    css: root.src + 'scss/*.scss',
    js: root.src + 'js/**/*.js',
    img: root.src + 'theme/img/',
    font: root.src + 'theme/fonts/**/*.ttf',
    ico: root.src + 'theme/icons/**/*.svg',
    vid: root.src + 'theme/video/**/*.mp4',
    ven: root.src + 'js/plugins/*.js'
  },
  build: {
    php: root.build,
    html: root.build,
    css: root.build + 'css/',
    js: root.build + 'js/',
    img: root.build + 'img/',
    font: root.build + 'fonts/',
    ico: root.build + 'icons/',
    vid: root.build + 'videos/',
    ven: root.build + 'plugins/'
  },
  watch: {
    php: root.src + '*.php',
    html: [
      root.src + 'templates/**/*.html',
      root.src + '*.html',
      root.src + 'sections/**/*.html'
    ],
    css: [
      // root.src + 'scss/blocks/**/*.scss',
      // root.src + 'scss/common/**/*.scss',
      // root.src + 'scss/helpers/**/*.scss'
      // root.src + '*.scss'
      root.src
    ],
    js: root.src + 'js/**/*.js',
    img: root.src + 'theme/img/',
    font: root.src + 'theme/fonts/**/*.ttf',
    ico: root.src + 'theme/icons/**/*.svg',
    vid: root.src + 'theme/video/**/*.mp4',
    ven: root.src + 'js/plugins/*.js'
  }
};


// CLEAN ============================

function cleanDirectory() {

  return del(['build']);

}


// PHP ============================

function compilePHP() {

  return gulp.src( path.src.php )
    .pipe( gulp.dest( path.build.php ) )
    .pipe( browserSync.stream() );

}


// HTML ============================

function compileHTML() {

  return gulp.src( path.src.html )
    .pipe( plumber( {
      errorHandler: notify.onError( {
        title: "Ошибка в HTML",
        message: "Error: <%= error.message %>"
      } )
    } ) )
    .pipe( posthtml([
      include()
    ]) )
    .pipe( gulp.dest( path.build.html ) )
    .pipe( browserSync.stream() );

}


// CSS ============================

function compileCSS() {

  return gulp.src( path.src.css )
    .pipe( plumber( {
      errorHandler: notify.onError( {
        title: "Ошибка в CSS",
        message: "Error: <%= error.message %>"
      } )
    } ) )
    .pipe( scss() )
    .pipe( autoprefixer({
      cascade: false
    } ) )
    .pipe( csscomb() )
    .pipe( csso({
      comments: false
    } ) )
    .pipe( rename({
      // basename: '',
      dirname: '',
      suffix: '.min'
    } ) )
    .pipe( gulp.dest( path.build.css ) )
    .pipe( browserSync.stream() );

}


// JS ============================

function compileJS() {

  return gulp.src( path.src.js )
    .pipe( plumber( {
      errorHandler: notify.onError( {
        title: "Ошибка в JS",
        message: "Error: <%= error.message %>"
      } )
    } ) )
    .pipe( concat('script.js') )
    .pipe( uglify() )
    .pipe( rename({
      suffix: '.min'
    }) )
    .pipe( gulp.dest( path.build.js ) )
    .pipe( browserSync.stream() );

}

function assemblyVendor() {

  return gulp.src( path.src.ven )
    .pipe(newer( path.build.ven ) )
    .pipe(gulp.dest( path.build.ven ) )
    .pipe( browserSync.stream() );
}


// FONT ============================

function convertTTFtoWOFF() {

  return gulp.src( path.src.font )
    .pipe(newer( path.build.font ) )
    .pipe( ttf2woff() )
    .pipe( gulp.dest(path.build.font) )
    .pipe( browserSync.stream() );

}

function convertTTFtoWOFF2() {

  return gulp.src( path.src.font )
    .pipe( newer( path.build.font ) )
    .pipe( ttf2woff2() )
    .pipe( gulp.dest( path.build.font ) )
    .pipe( browserSync.stream() );

}


// IMG ============================

function optimizeImages() {

  return gulp.src( path.src.img + '**/*.{jpg,png,svg}' )
    .pipe( newer( path.build.img ) )
    .pipe( imagemin([
      imagemin.optipng(),
      imagemin.svgo( {
        plugins: [
          {removeViewBox: false},
          {removeTitle: true},
          {cleanupNumericValues:
              {floatPrecision: 0}
          }
        ]
      } ),
      imageminMozjpeg({
        quality: 80
      } )
    ] ) )
    .pipe( gulp.dest( path.build.img) )
    .pipe( browserSync.stream() );

}

function convertImagesToWebp() {

  return gulp.src( path.src.img + '**/*.{jpg,png}' )
    .pipe( newer( path.build.img ) )
    .pipe( imagemin([
      webp({
        quality: 80
      } )
    ] ) )
    .pipe( rename({
      extname: '.webp'
    } ) )
    .pipe( gulp.dest( path.build.img ) )
    .pipe( browserSync.stream() );

}


// ICO ============================

// function assemblySvgSprites() {
//
//   return gulp.src( path.src.ico )
//     .pipe( svgMinify() )
//     .pipe( gulp.dest( path.build.ico ) )
//     .pipe( svgSprite({
//       mode: {
//         css: {
//           dest: '.',
//           bust: false,
//           sprite: '../icons/sprite.svg',
//           layout: 'vertical',
//           prefix: '%-svg-',
//           dimensions: true,
//           render: {
//             scss: {
//               dest: '_sprite.scss'
//             }
//           }
//         }
//       }
//     }))
//     .pipe( gulpIf( '*.scss', gulp.dest( root.src + 'scss/helpers'), gulp.dest( path.build.ico ) ) )
//     .pipe( browserSync.stream() );
//
// }

// Оптимизация SVG
function optimizeSvg() {
   return gulp.src( path.src.ico )
      .pipe( imagemin([
         imagemin.svgo( {
            plugins: [
               {removeViewBox: false},
               {removeTitle: true},
               {cleanupNumericValues: {
                     floatPrecision: 0
                  }}
            ]
         } )
      ] ) )
      .pipe( rename({dirname: ''} ) )
      .pipe( gulp.dest( path.build.ico ) )
      .pipe( browserSync.stream() );
}


// Генерация SVG-спрайта
function generateSvgSprite() {
   return gulp.src( path.src.ico )
      .pipe( svgmin(function () {
         return { plugins: [ {
               cleanupIDs: {
                  minify: true
               }
            } ] }
      } ) )
      .pipe( svgstore({
         inlineSvg: true
      } ) )
      .pipe( rename( {
         basename: 'sprite',
         extname: '.svg'
      } ) )
      .pipe( gulp.dest( path.build.ico ) )
      .pipe( browserSync.stream() );
}
// exports.generateSvgSprite = generateSvgSprite;


// VIDEO ============================

function optimizeVideos() {

  return gulp.src( path.src.vid )
    .pipe( newer( path.build.vid ) )
    .pipe( gulp.dest( path.build.vid ) )
    .pipe( browserSync.stream());

}


// BUILD ============================

exports.cleanDirectory = cleanDirectory;

const build = gulp.series(cleanDirectory, gulp.parallel(
  compilePHP,
  compileHTML,
  compileCSS,
  compileJS,
  assemblyVendor,
  convertTTFtoWOFF,
  convertTTFtoWOFF2,
  optimizeImages,
  convertImagesToWebp,
  // assemblySvgSprites,
   generateSvgSprite,
   optimizeSvg,
  optimizeVideos
));

exports.build = build;


// SERVER ============================

function runServer() {

  browserSync.init( {
    server: root.build,
    cors: true,
    notify: false
  } );

  browserSync.watch( root.src + '**/*.*' ).on( 'change', browserSync.reload );

}


// WATCH ============================

function watchFiles() {
  gulp.watch( path.watch.php, compilePHP );
  gulp.watch( path.watch.html, compileHTML );
  gulp.watch( path.watch.css, compileCSS );
  gulp.watch( path.watch.js, compileJS );
  gulp.watch( path.watch.ven, assemblyVendor );
  gulp.watch( path.watch.font, convertTTFtoWOFF );
  gulp.watch( path.watch.font, convertTTFtoWOFF2 );
  gulp.watch( path.watch.img + '**/*.{jpg,png,svg}', optimizeImages );
  gulp.watch( path.watch.img + '**/*.{jpg,png}', convertImagesToWebp );
  gulp.watch( path.watch.ico, optimizeSvg );
  gulp.watch( path.watch.ico, generateSvgSprite );
  gulp.watch( path.watch.vid, optimizeVideos );
}


// DEVELOPMENT ============================

exports.start = gulp.series( build, gulp.parallel( runServer, watchFiles ) );
