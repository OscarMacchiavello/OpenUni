const { src, dest, watch, series } = require('gulp')
// const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps')

// const imagemin = require('gulp-imagemin');
const glob = require('glob');

// Ruta de tus archivos CSS
const paths = {
    css: {
      src: [
        './src/css/client/variables.css',
        './src/css/client/buscarMaterial.css',
        './src/css/client/index.css'
      ],
      dest: './public/build/css'
    },

    js: {
      src: [
        './src/js/script.js'
      ],
      dest: './public/build/js'
    },
    images: {
      src: './src/imag/**/*.{jpg,jpeg,png,gif,svg}',
      dest: './public/build/img'
    }
  };

// Minimizar y mover archivos CSS
function css() {
    return src(paths.css.src)
      .pipe(sourcemaps.init())
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(paths.css.dest));
  }

// Minimizar y mover archivos JS
function js() {

  return src(paths.js.src)
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(paths.js.dest));
}  

// Tarea para optimizar y mover archivos de imágenes
// function images() {
//   const files = sync(paths.images.src);
//   //console.log('Archivos de imágenes encontrados:', files);

//   return src(files)
//       .pipe(imagemin())
//       .pipe(dest(paths.images.dest));
// }

function watching() {
  watch(paths.css.src, css);
  watch(paths.js.src, js);
  // watch(paths.images.src, images);
}
  
  exports.css = css;
  exports.js = js;
  // exports.images= images;
  exports.watch= watching;
  exports.default = series(css, watching, js );