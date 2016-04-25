var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    imageMin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    sass = require('gulp-ruby-sass'),
    watch = require('gulp-watch'),
    gulpSequence = require('gulp-sequence');

gulp.task('css', function () {
    return gulp.src('public/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('sass', function () {
    return sass('public/sass/*.scss')
        .on('error', sass.logError)
        // .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('./public/sass/*.scss', ['sass']);
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

gulp.task('default',gulpSequence('clean',['sass', 'js', 'images','html','libs'], 'watch'));