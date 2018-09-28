var gulp = require('gulp');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');

var publicPath = "front/"

//Scripts and Uglify/Minify task
gulp.task('scripts', function() {
    gulp.src(publicPath + 'library/coffee/*.coffee')
        .pipe(plumber())
        .pipe(coffee({bare: true}))
        .pipe(concat('public/js/app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('_src'))
});
//CSS and Uglify/Minify task
gulp.task('css', function() {
    gulp.src(publicPath + 'library/sass/*.scss')
        .pipe(plumber())
        .pipe(sass({style: 'compressed'}))
        .pipe(concat('public/css/app.css'))
        .pipe(minify())
        .pipe(gulp.dest('_src'))
});
//HTML task
gulp.task('front', function() {
    gulp.src(publicPath + '/pages/*.html')
        .pipe(gulp.dest('_src/front'))
});

//HTML task
gulp.task('front', function() {
    gulp.src(publicPath + '/pages/*.html')
        .pipe(gulp.dest('_src/front'))
});

//LIBRARIES: copy everything inside libraries except /sass and /coffee
gulp.task('libraries', function() {
    gulp.src([publicPath + '/library/**/*', '!' + publicPath + 'library/sass/**/*', '!' + publicPath + 'library/coffee/**/*'])
        .pipe(gulp.dest('_src/public'))
});

//Watch file changes then gulp
gulp.task('watch', function () {
    gulp.watch(publicPath + 'library/coffee/*.coffee', ['scripts']);
    gulp.watch(publicPath + 'library/sass/*.scss', ['css']);
    gulp.watch(publicPath + '/pages/*.html', ['front']);
    gulp.watch(publicPath + '/library/**/*', ['libraries']);
})

gulp.task('default', ['scripts', 'css', 'front', 'libraries','watch']);