'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const run = require('gulp-run-command').default;

gulp.task('build-css', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError)) 
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
});

gulp.task('delete-css', () => {
    return del([
        'public/css'
    ]);
});

gulp.task('delete-js', () => {
    return del([
        'public/js'
    ]);
});

gulp.task('copy-js', function () {
    return gulp.src('src/js/**')
        .pipe(gulp.dest('public/js'));
});

gulp.task('run-server', run('node server'));

gulp.task('default', 
    gulp.series(['delete-css', 'delete-js', 'build-css', 'copy-js', 'run-server'])
);

gulp.task('build',
    gulp.series('delete-css', 'delete-js', 'build-css', 'copy-js')
);

gulp.watch('src/**/*.scss', (done) => {
    gulp.series(['delete-css', 'build-css'])(done);
});
gulp.watch('src/**/*.js', (done) => {
    gulp.series(['delete-js', 'copy-js'])(done);
});