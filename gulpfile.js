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
        .pipe(gulp.dest('_build'))
});
//CSS and Uglify/Minify task
gulp.task('css', function() {
    gulp.src(publicPath + 'library/sass/*.scss')
        .pipe(plumber())
        .pipe(sass({style: 'compressed'}))
        .pipe(concat('public/css/app.css'))
        .pipe(minify())
        .pipe(gulp.dest('_build'))
});
//HTML task
gulp.task('front', function() {
    gulp.src(publicPath + '/pages/*.html')
        .pipe(gulp.dest('_build/front'))
});

//HTML task
gulp.task('front', function() {
    gulp.src(publicPath + '/pages/*.html')
        .pipe(gulp.dest('_build/front'))
});

//LIBRARIES: copy everything inside libraries except /sass and /coffee
gulp.task('libraries', function() {
    gulp.src([publicPath + '/library/**/*', '!' + publicPath + 'library/sass/**/*', '!' + publicPath + 'library/coffee/**/*'])
        .pipe(gulp.dest('_build/public'))
});

//GET INDEX
gulp.task('index', function() {
    gulp.src('index.html')
        .pipe(gulp.dest('_build/'))
});

//Watch file changes then gulp
gulp.task('watch', function () {
    gulp.watch('index.html', ['index']);
    gulp.watch(publicPath + 'library/coffee/*.coffee', ['scripts']);
    gulp.watch(publicPath + 'library/sass/**/*', ['css']);
    gulp.watch(publicPath + '/pages/*.html', ['front']);
    gulp.watch(publicPath + '/library/**/*', ['libraries']);
})

gulp.task('default', ['scripts', 'css', 'front', 'libraries', 'index' ,'watch']);