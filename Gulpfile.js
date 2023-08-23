// Config
const config = require('./config');

// Gulp
const gulp = require('gulp');

// Runtime Utilities
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const shell = require('gulp-shell');

// CSS/SCSS
const sass = require('gulp-sass')(require('node-sass'));
const cssmin = require('gulp-clean-css');

// JS
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Error notifier when Gulp is running
let plumberErrorHandler = {
  errorHandler: notify.onError({
    title: '<%= error.plugin %>',
    message: 'Error: <%= error.message %>',
  }),
};

// CSS task
gulp.task('styles', () => {
  return gulp
    .src(['src/styles/*.scss'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gulp.src('src/styles/*.css'))
    .pipe(plumber(plumberErrorHandler))
    .pipe(cssmin())
    .pipe(gulp.dest('assets/'));
});

// Javascript task
gulp.task('scripts', () => {
  const extJs = ['./node_modules/swiper/swiper-bundle.js']; // Add npm js assets here
  return gulp
    .src(['src/scripts/*.js'].concat(extJs))
    .pipe(plumber(plumberErrorHandler))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('assets/'));
});

// Compile CSS & JS, send updates to /deploy folder
gulp.task('build', gulp.series('styles', 'scripts'));

// Run Shopify CLI; prompts for login as necessary
gulp.task(
  'shopify-cli',
  shell.task([
    `shopify theme dev --store ${config.shopify_url} ${config.additionalCLIArgs}`,
  ])
);

// Watch all local changes in /src
gulp.task(
  'watch',
  gulp.series('build', async function watching() {
    gulp.watch(
      ['src/styles/**/*.scss', 'src/styles/**/*.css'],
      gulp.series('styles')
    );
    gulp.watch(['src/scripts/**/*.js'], gulp.series('scripts'));
  })
);

// Execute this task queue on "gulp" command
gulp.task('default', gulp.series('watch', 'shopify-cli'));
