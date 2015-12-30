'use strict';

////////////////////////////////////////////////////////////////////////////////
// Dependencies                                                               //
////////////////////////////////////////////////////////////////////////////////

var babelify    = require('babelify'),
    browserify  = require('browserify'),
    buffer      = require('vinyl-buffer'),
    del         = require('del'),
    es          = require('event-stream'),
    glob        = require('glob'),
    gulp        = require('gulp'),
    nano        = require('gulp-cssnano'),
    runSequence = require('run-sequence'),
    sass        = require('gulp-sass'),
    source      = require('vinyl-source-stream'),
    transform   = require('vinyl-transform'),
    uglify      = require('gulp-uglify'),
    zip         = require('gulp-zip');


////////////////////////////////////////////////////////////////////////////////
// Misc. configs                                                              //
////////////////////////////////////////////////////////////////////////////////

// Various source and destination paths
var paths = {
    root            : './',

    src_root        : 'src/*',
    src_assets_dir  : 'src/assets',
    src_assets      : 'src/assets/**/*',
    src_styles      : 'src/styles/**/*.scss',
    src_scripts     : 'src/scripts/**/*.js',
    src_bundles     : 'src/scripts/bundles/*.js',

    dest            : 'build',
    dest_files      : 'build/**/*',
    dest_temp       : 'build/temp',
    dest_assets     : 'build/assets',
    dest_styles     : 'build/styles',
    dest_scripts    : 'build/scripts',
    dest_zip        : 'colourntp.zip'
};


////////////////////////////////////////////////////////////////////////////////
// Task configuration                                                         //
////////////////////////////////////////////////////////////////////////////////

// Delete all built files/folders
gulp.task('clean', function () {
    del.sync(paths.dest, { force: true });
});

// Delete ZIP of built files
gulp.task('clean:zip', function () {
    del.sync(paths.dest_zip, { force: true });
});

// Copy root files such as HTML views and the manifest
gulp.task('copy:root', function () {
    return gulp.src(paths.src_root)
        .pipe(gulp.dest(paths.dest));
});

// Copy font and image assets
gulp.task('copy:assets', function () {
    return gulp.src(paths.src_assets, { base: paths.src_assets_dir })
        .pipe(gulp.dest(paths.dest_assets));
});

// Process SCSS files
gulp.task('scss', function () {
    return gulp.src(paths.src_styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(nano())
        .pipe(gulp.dest(paths.dest_styles));
});

// Process JS files
gulp.task('js', function (done) {
    glob(paths.src_bundles, function (err, files) {
        if (err) { done(err); }

        var tasks = files.map(function (entry) {
            var filename = entry.substring(entry.lastIndexOf('/') + 1).replace('.js', '');

            return browserify(entry)
                .transform(babelify, {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-decorators-legacy'],
                })
                .bundle()
                .pipe(source(filename + '.bundle.js'))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(gulp.dest(paths.dest_scripts));
        });

        es.merge(tasks).on('end', done);
    });
});


////////////////////////////////////////////////////////////////////////////////
// Task definitions                                                           //
////////////////////////////////////////////////////////////////////////////////

// Build project
gulp.task('default', function (done) {
    runSequence('clean', ['copy:root', 'copy:assets', 'scss', 'js'], done);
});

// Watch for changes
gulp.task('watch', ['default'], function () {
    gulp.watch(paths.src_root, ['copy:root']);
    gulp.watch(paths.src_assets, ['copy:assets']);
    gulp.watch(paths.src_styles, ['scss']);
    gulp.watch(paths.src_scripts, ['js']);
});

// ZIPs up built files for submitting to the Chrome Web Store
gulp.task('zip', ['clean:zip', 'default'], function () {
    return gulp.src(paths.dest_files)
        .pipe(zip(paths.dest_zip))
        .pipe(gulp.dest(paths.root));
});
