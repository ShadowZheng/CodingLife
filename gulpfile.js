var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    scss = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect');

var path = {
    html: 'index.html',
    img: 'img',
    scss: 'scss/**/*.scss',
    js: 'js/**/*.js'
}
// connect task
gulp.task('connect', function() {
    connect.server({
        root: '',
        port: 8080,
        livereload: true
    })
})
// scss task
gulp.task('scss', function() {
    gulp.src('./scss/app.scss')
        .pipe(scss())
        // .pipe(autoprefix('last 2 version'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
})
// build js
gulp.task('build-js', function() {
    gulp.src('./js/app.js')
        .pipe(browserify({
            transform: ['babelify'],
            insertGlobals: true
        }))
        // .pipe(uglify({
        //     compress: false,
        //     mangle: true
        // }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
})
// browserify task
gulp.task('browserify', function() {
    gulp.src('./js/app.js')
        .pipe(browserify({
            transform: ['babelify'],
            insertGlobals: true
        }))
        .on('error', handleError)
        .pipe(gulp.dest('./dist/js'))
});
// watch task
gulp.task('watch', function() {
    // gulp.watch(path.js, ['build-js']);
    gulp.watch(path.scss, ['scss']);
})

gulp.task('default', ['browserify']);
gulp.task('build', ['build-js', 'scss']);
gulp.task('serve', ['connect','watch']);

function handleError(err) {
    console.log(err.toString());
}
