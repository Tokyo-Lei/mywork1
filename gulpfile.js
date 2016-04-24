var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    imageMin = require('gulp-imagemin'),
    clean = require('gulp-clean');

gulp.task('css', function () {
    return gulp.src('public/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('clean',function () {
    return gulp.src('dist', {read:false})
        .pipe(clean());
});

gulp.task('js', function () {
    return gulp.src('public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images',function() {
    return gulp.src('./public/img/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('html',function() {
    return gulp.src('./public/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('libs',function() {
    return gulp.src(['./public/libs/**/*'])
        .pipe(gulp.dest('dist/libs'))
});

gulp.task('default',['clean'], function() {
    gulp.start('css', 'js', 'images','html','libs');
});