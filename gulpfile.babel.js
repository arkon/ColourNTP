import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import del from 'del';
import glob from 'glob';
import gulp from 'gulp';
import gulpZip from 'gulp-zip';
import merge2 from 'merge2';
import nano from 'gulp-cssnano';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import transform from 'vinyl-transform';
import uglify from 'gulp-uglify';


// ========================================================================== //
// Configuration                                                              //
// ========================================================================== //

const paths = {
  root           : './',

  src_root       : 'src/*',
  src_assets_dir : 'src/assets',
  src_assets     : 'src/assets/**/*',
  src_styles     : 'src/styles/**/*.scss',
  src_scripts    : 'src/scripts/**/*.js',
  src_bundles    : 'src/scripts/*.js',

  dest           : 'build',
  dest_files     : 'build/**/*',
  dest_temp      : 'build/temp',
  dest_assets    : 'build/assets',
  dest_styles    : 'build/styles',
  dest_scripts   : 'build/scripts',
  dest_zip       : 'colourntp.zip'
};


// ========================================================================== //
// Gulp configuration                                                         //
// ========================================================================== //

// Delete all built files/folders
const clean = () => del(paths.dest, { force: true });
export { clean };

// Delete ZIP of built files
const clean_zip = () => del(paths.dest_zip, { force: true });
export { clean_zip };

// Copy root files such as HTML views and the manifest
export function copy_root () {
  return gulp.src(paths.src_root)
    .pipe(gulp.dest(paths.dest));
}

// Copy font and image assets
export function copy_assets () {
  return gulp.src(paths.src_assets, { base: paths.src_assets_dir })
    .pipe(gulp.dest(paths.dest_assets));
}

// Process SCSS files
export function scss () {
  return gulp.src(paths.src_styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(nano())
    .pipe(gulp.dest(paths.dest_styles));
}

const function prod () {
  process.env.NODE_ENV = 'production';
}

// Process JS files
export function js (done) {
  glob(paths.src_bundles, (err, files) => {
    if (err) { done(err); }

    const stream = merge2(files.map((entry) => {
      return browserify(entry)
        .transform(babelify, {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties', 'transform-decorators-legacy']
        })
        .bundle()
        .pipe(source(`${entry.substring(entry.lastIndexOf('/') + 1).replace('.js', '')}.bundle.js`))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest_scripts));
    }));

    stream.on('queueDrain', done);
  });
}

// Build project
const build = gulp.series(clean, gulp.parallel(copy_root, copy_assets, scss, js));
export { build };

// Watch for changes
const watch = gulp.series(build, () => {
  gulp.watch(paths.src_root, copy_root);
  gulp.watch(paths.src_assets, copy_assets);
  gulp.watch(paths.src_styles, scss);
  gulp.watch(paths.src_scripts, js);
});
export { watch };

// ZIPs up built files for submitting to the Chrome Web Store
const zip = gulp.series(clean_zip, prod, build, () => {
  return gulp.src(paths.dest_files)
    .pipe(gulpZip(paths.dest_zip))
    .pipe(gulp.dest(paths.root));
});
export { zip };

export default build;
