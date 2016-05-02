var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    watch = require('gulp-watch'),
    minifyCSS = require('gulp-minify-css'),
    imageMin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    gulpSequence = require('gulp-sequence');


gulp.task('js', function () {
    return gulp.src('public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
    return sass('public/sass/*.scss')
        .on('error', sass.logError)
       .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
    gulp.watch('public/sass/*.scss', ['sass']);
    gulp.watch('public/js/*.js', ['js']);
});


gulp.task('image', function () {
    gulp.src('public/img/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('html', function() {
    return gulp.src('public/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('libs', function() {
    return gulp.src('public/libs/**/*')
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('default',gulpSequence('clean', ['sass', 'watch','js','image','html','libs']));








