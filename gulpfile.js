'use strict';

////////////////////////////////////////////////////////////////////////////////
// Dependencies                                                               //
////////////////////////////////////////////////////////////////////////////////

var browserify  = require('browserify'),
    del         = require('del'),
    gulp        = require('gulp'),
    minifyCss   = require('gulp-minify-css'),
    runSequence = require('run-sequence'),
    sass        = require('gulp-sass'),
    ts          = require('gulp-typescript'),
    uglify      = require('gulp-uglify');


////////////////////////////////////////////////////////////////////////////////
// Misc. configs                                                              //
////////////////////////////////////////////////////////////////////////////////

// TypeScript settings
var tsProject = ts.createProject({
    typescript       : require('typescript'),
    removeComments   : true,
    target           : 'ES5',
    module           : 'commonjs',
    declarationFiles : false,
    jsx              : 'react'
});

// Various source and destination paths
var paths = {
    src_root        : 'app/*',
    src_assets_dir  : 'app/assets',
    src_assets      : 'app/assets/**/*',
    src_styles      : 'app/styles/**/*.scss',
    src_scripts     : 'app/scripts/**/*.{ts,tsx}',
    dest            : 'build',
    dest_assets     : 'build/assets',
    dest_styles     : 'build/styles',
    dest_scripts    : 'build/scripts'
};


////////////////////////////////////////////////////////////////////////////////
// Task configuration                                                         //
////////////////////////////////////////////////////////////////////////////////

// Delete all built files/folders
gulp.task('clean', function () {
    del.sync(paths.dest, { force: true });
});

// Copy font and image assets
gulp.task('copy:assets', function () {
    return gulp.src(paths.src_assets, { base: paths.src_assets_dir })
        .pipe(gulp.dest(paths.dest_assets));
});

// Copy root files such as HTML views and the manifest
gulp.task('copy:root', function () {
    return gulp.src(paths.src_root)
        .pipe(gulp.dest(paths.dest));
});

// Process SCSS files
gulp.task('scss', function () {
    return gulp.src(paths.src_styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.dest_styles));
});

// Process TypeScript files
gulp.task('ts', function () {
    return gulp.src(paths.src_scripts)
        .pipe(ts(tsProject))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest_scripts));
});

////////////////////////////////////////////////////////////////////////////////
// Task definitions                                                           //
////////////////////////////////////////////////////////////////////////////////

// Build project
gulp.task('default', function () {
    runSequence('clean', ['copy:root', 'copy:assets', 'scss', 'ts']);
});

// Watch for changes
gulp.task('watch', ['default'], function () {
    gulp.watch(paths.src_root, ['copy:root']);
    gulp.watch(paths.src_assets, ['copy:assets']);
    gulp.watch(paths.src_styles, ['scss']);
    gulp.watch(paths.src_scripts, ['ts']);
});
