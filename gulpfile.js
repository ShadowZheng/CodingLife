var gulp = require('gulp'),
	open = require('gulp-open'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	livereload = require('gulp-livereload');

// es6 related things
// var babel = require('gulp-babel');

// for sass compile and live reload:
var sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

var paths = {
	html: 	'index.html',
	img: 	'img/**/*',
	scss: 	'scss/**/*.scss',
	js:  	'js/**/*.js',
}
// ---------------------------------------
gulp.task('scss', function() {
    // console.log('-----build main.scss');
  gulp.src('scss/main.scss' )
    .pipe(sass())
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'))
});


// ---------------------------------------
gulp.task('browserify',function(){
	gulp.src('js/index.js')
	// .pipe( babel({
	// 	// optional: ["runtime"],
	// }) )
	.pipe(browserify({
		transform: ['babelify'], // 'babelify' reactify
		insertGlobals : true,
	}))
	.on( "error", handleError)
	.pipe(gulp.dest('build'))
})

gulp.task('build-js',function(){
	gulp.src('js/index.js')
	.pipe(browserify({
		transform: ['babelify'],
		insertGlobals : true,
    debug : false,
	}))
	.pipe(uglify({
		compress:false,
    mangle:true,
	}))
	.pipe(gulp.dest('build'));
})

//launch browser in a port 
gulp.task('open',function(){
	var options  = {
		url:'http://localhost:5000',
	}
	gulp.src('index.html')
	.pipe(open('',options));
})

// watch files for live reload
gulp.task('watch',function(){
	livereload.listen();
	gulp.watch('build/**/*.js').on('change', livereload.changed);
	gulp.watch( paths.html ).on('change', livereload.changed);
	gulp.watch('build/css/**/*.css').on('change', livereload.changed);

	gulp.watch( paths.js ,['browserify']);
	gulp.watch( paths.scss ,['scss']);
});

gulp.task('default',['browserify']);

gulp.task('build',['build-js','scss']);

gulp.task('serve',['browserify','watch']);



// --------- utils ------------
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}