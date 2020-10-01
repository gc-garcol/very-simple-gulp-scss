'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

// sass.compiler = require('node-sass');

gulp.task('build-css', () => {
    return gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError)) 
        .pipe(sass())
        .pipe(gulp.dest('css'))
});

gulp.task('delete-css', () => {
    return del([
        'css/main.css'
    ]);
});

gulp.task('default', 
    gulp.series(['delete-css', 'build-css'])
);

gulp.task('watch', () => {
    gulp.watch('sass/**/*.scss', (done) => {
        gulp.series(['default'])(done);
    });
});