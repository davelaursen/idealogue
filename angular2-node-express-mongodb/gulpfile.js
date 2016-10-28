var gulp = require('gulp');
var inlineNg2Template = require('gulp-inline-ng2-template');
var inject = require('gulp-inject');

gulp.task('inline-templates', function () {
    return gulp.src('src/**/*.js')
        .pipe(inlineNg2Template({
            base: '/src/client',
            useRelativePaths: false,
            indent: 0,
            removeLineBreaks: true,
            target: 'es5'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('inject-bundle', function () {
    var target = gulp.src('src/client/index.html');
    var sources = gulp.src(['dist/bundle.min.js'], { read: false });

    return target
        .pipe(inject(sources, {ignorePath: 'dist', addRootSlash: false}))
        .pipe(gulp.dest('dist'));
});