'use strict';

const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const image = require('gulp-image');
const del = require('del');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/',
        },
    });
}
function scripts() {
    return src(['app/js/**/*.js', '!app/js/main.min.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}
function styles() {
    return src('app/scss/**/*.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 10 version'],
                grid: true,
            })
        )
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}
function images() {
    return src('app/images/**/*')
        .pipe(
            image({
                pngquant: true,
                optipng: false,
                zopflipng: true,
                jpegRecompress: false,
                mozjpeg: true,
                gifsicle: true,
                svgo: true,
                concurrent: 10,
                quiet: true,
            })
        )
        .pipe(dest('dist/images'));
}
function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}
function build() {
    return src(
        [
            'app/css/style.min.css',
            'app/js/main.min.js',
            'app/fonts/**/*',
            'app/*.html',
        ],
        { base: 'app' }
    ).pipe(dest('dist'));
}
function cleanDist() {
    return del('dist');
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watching = watching;
exports.browsersync = browsersync;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);
