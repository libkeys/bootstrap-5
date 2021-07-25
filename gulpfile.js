const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync')
const concat = require('gulp-concat')
const minify = require('gulp-minify')
const del = require('del')
const imagemin = require('gulp-imagemin')

function scss() {
    return gulp
        .src('dev/scss/**/*.scss')
        .pipe(sass())
        .pipe(
            autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
                cascade: true
            })
        )
        .pipe(cssnano())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(browserSync.reload({ stream: true }))
}

function js() {
    return gulp
        .src('dev/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(minify())
        .pipe(gulp.dest('public/javascripts'))
        .pipe(browserSync.reload({ stream: true }))
}

function fonts() {
    return gulp
        .src('dev/fonts/**/**')
        .pipe(gulp.dest('public/fonts'))
}

function images() {
    return gulp
        .src('dev/images/**/**')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
}

function clean() {
    return del(__dirname + '/public')
}

function browserSyncFunction() {
    browserSync({
        server: {
            baseDir: __dirname + '/'
        },
        notify: false
    })
}

function watchFiles() {
    gulp.watch(['./dev/scss/**/*.scss'], gulp.series(scss,js))
    gulp.watch(['./dev/js/**/*.js'], js)
    gulp.watch(['./**/*.html'], js)
}

function htmlCopy() {
    return gulp
        .src('dev/**/*.html')
        .pipe(gulp.dest('views'))
}


let build = gulp.series(gulp.parallel(scss, browserSyncFunction))
let watch = gulp.parallel(build, watchFiles, browserSyncFunction)

// let start = gulp.series(gulp.parallel(scss, js, images, fonts, watchFiles, browserSyncFunction))
let start = gulp.series(clean, gulp.parallel(scss, js, images, fonts, watchFiles, browserSyncFunction))
let startNoBrowser = gulp.series(clean, gulp.parallel(scss, js, images, fonts, watchFiles))

exports.htmlCopy = htmlCopy
exports.execute = startNoBrowser
exports.back = startNoBrowser
exports.clean = clean
exports.fonts = fonts
exports.images = images
exports.start = start
exports.js = js
exports.build = build
exports.watch = watch
exports.default = start