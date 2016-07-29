import del from 'del';
import gulp from 'gulp';
import gulpZip from 'gulp-zip';
import htmlmin from 'gulp-htmlmin';
import nano from 'gulp-cssnano';
import sass from 'gulp-sass';
import webpack from 'webpack';

import webpackConfig from './webpack.config';


// ========================================================================== //
// Configuration                                                              //
// ========================================================================== //

const PATHS = {
  root           : './',

  src_root       : 'src/*',
  src_html       : 'src/html/*.html',
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
export const clean = () => del(PATHS.dest, { force: true });

// Delete ZIP of built files
export const clean_zip = () => del(PATHS.dest_zip, { force: true });

// Copy root files such as HTML views and the manifest
export function copy_root () {
  return gulp.src(PATHS.src_root)
    .pipe(gulp.dest(PATHS.dest));
}

// Copy font and image assets
export function copy_assets () {
  return gulp.src(PATHS.src_assets, { base: PATHS.src_assets_dir })
    .pipe(gulp.dest(PATHS.dest_assets));
}

// Process HTML files
export function html () {
  return gulp.src(PATHS.src_html)
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest(PATHS.dest));
}

// Process SCSS files
export function scss () {
  return gulp.src(PATHS.src_styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(nano())
    .pipe(gulp.dest(PATHS.dest_styles));
}

export function prod (done) {
  process.env.NODE_ENV = 'production';
  done();
}

// Process JS files
export function js (done) {
  webpack(webpackConfig, (err, stats) => {
    if (err) { throw new Error('webpack', err); }

    console.log('[webpack]', stats.toString({
      chunkModules: false
    }));

    done();
  });
}

// Build project
export const build = gulp.series(clean, gulp.parallel(copy_root, copy_assets, html, scss, js));

// Watch for changes
export const watch = gulp.series(build, () => {
  gulp.watch(PATHS.src_root, copy_root);
  gulp.watch(PATHS.src_html, html);
  gulp.watch(PATHS.src_assets, copy_assets);
  gulp.watch(PATHS.src_styles, scss);
  gulp.watch(PATHS.src_scripts, js);
});

// ZIPs up built files for submitting to the Chrome Web Store
export const zip = gulp.series(clean_zip, prod, build, () => {
  return gulp.src(PATHS.dest_files)
    .pipe(gulpZip(PATHS.dest_zip))
    .pipe(gulp.dest(PATHS.root));
});

export default build;
