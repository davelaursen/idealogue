'use strict';

//TODO: add task that starts the node server and automatically runs a build & restarts server when a src file is changed
//TODO: add task for prod build that includes minification

var gulp = require('gulp');
var babel = require('gulp-babel'); //babel transpiler for compiling es2015 & JSX to es5 code
var browserify = require('browserify'); //bundles JS into modules
var babelify = require('babelify'); //babel plugin for browserify
var source = require('vinyl-source-stream'); //use conventional text streams with Gulp
var concat = require('gulp-concat'); //concatenates multiple files into a single file
var sass = require('gulp-sass'); //compile sass files to css

var config = {
    paths: {
        serverJs: 'src/server/**/*.js',
        clientJs: 'src/client/main.react.js',
        html: 'src/client/**/*.html',
        styles: [
            'src/client/assets/styles/reset.scss',
            'src/client/assets/styles/app.scss'
        ],
        images: 'src/client/assets/images/*',
        serverDist: 'dist/server',
        clientDist: 'dist/client'
    }
}

// copies all HTML files from src to dist
function copyHtml() {
    return gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.clientDist));
}

// compiles Sass files to css, concatenates then and copies the output to dist
function buildStyles() {
    return gulp.src(config.paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.paths.clientDist + '/styles'));
}

// copies all image files from src to dist
function copyImages() {
    return gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.clientDist + '/images'));
}

// transpiles the Node server src (es2015 -> es5) and copies it to dist
function buildServer() {
    return gulp.src(config.paths.serverJs)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(config.paths.serverDist));
}

// transpiles and bundles the client src (es2015/JSX -> es5) and copies it to dist
function buildClient() {
    return browserify(config.paths.clientJs)
        .transform(babelify.configure({
            presets: ['es2015', 'react', 'stage-1']
        }))
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('app.js'))
        .pipe(gulp.dest(config.paths.clientDist));
}

// TASKS
gulp.task('build-server', buildServer);
gulp.task('build-client', buildClient);
gulp.task('build-styles', buildStyles);
gulp.task('copy-html', copyHtml);
gulp.task('copy-images', copyImages);
gulp.task('build', ['build-server', 'build-client', 'build-styles', 'copy-html', 'copy-images']);
gulp.task('default', ['build']);
