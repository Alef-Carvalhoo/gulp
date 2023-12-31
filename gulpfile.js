const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimirImagens () {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

function comprimirJavascript () {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilarSass () {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

exports.default = function () {
    gulp.watch('./source/styles/main.scss', {ignoreInitial: false}, gulp.series(compilarSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimirJavascript));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimirImagens));
}