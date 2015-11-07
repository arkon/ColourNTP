'use strict';

////////////////////////////////////////////////////////////////////////////////
// Dependencies                                                               //
////////////////////////////////////////////////////////////////////////////////

var babel       = require('babelify'),
    browserify  = require('browserify'),
    buffer      = require('vinyl-buffer'),
    del         = require('del'),
    es          = require('event-stream'),
    glob        = require('glob'),
    gulp        = require('gulp'),
    minifyCss   = require('gulp-minify-css'),
    runSequence = require('run-sequence'),
    sass        = require('gulp-sass'),
    source      = require('vinyl-source-stream'),
    transform   = require('vinyl-transform'),
    uglify      = require('gulp-uglify');


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
    src_bundles     : 'app/scripts/bundles/*.js',

    dest            : 'build',
    dest_temp       : 'build/temp',
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

// Process JS files
gulp.task('js', function (done) {
    glob(paths.src_bundles, function (err, files) {
        if (err) { done(err); }

        var tasks = files.map(function (entry) {
            var filename = entry.substring(entry.lastIndexOf('/') + 1).replace('.js', '');

            return browserify(entry)
                .transform(babel)
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
