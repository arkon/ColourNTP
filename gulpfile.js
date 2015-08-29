'use strict';

////////////////////////////////////////////////////////////////////////////////
// Dependencies                                                               //
////////////////////////////////////////////////////////////////////////////////

var del          = require('del'),
    gulp         = require('gulp'),
    minifyCss    = require('gulp-minify-css'),
    runSequence  = require('run-sequence'),
    sass         = require('gulp-sass'),
    uglify       = require('gulp-uglify');


////////////////////////////////////////////////////////////////////////////////
// Misc. configs                                                              //
////////////////////////////////////////////////////////////////////////////////

// Various source and destination paths
var paths = {
    src_root        : 'app/*',
    src_assets_dir  : 'app/assets',
    src_assets      : 'app/assets/**/*',
    src_styles      : 'app/styles/**/*.scss',
    src_scripts     : 'app/scripts/**/*.js',
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

// Process JavaScript files
gulp.task('js', function () {
    return gulp.src(paths.src_scripts)
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest_scripts));
});

////////////////////////////////////////////////////////////////////////////////
// Task definitions                                                           //
////////////////////////////////////////////////////////////////////////////////

// Build project
gulp.task('default', function () {
    runSequence('clean', ['copy:root', 'copy:assets', 'scss', 'js']);
});

// Watch for changes
gulp.task('watch', ['default'], function () {
    gulp.watch(paths.src_root, ['copy:root']);
    gulp.watch(paths.src_assets, ['copy:assets']);
    gulp.watch(paths.src_styles, ['scss']);
    gulp.watch(paths.src_scripts, ['js']);
});
