const childProcess = require('child_process');
const fs = require('fs');

const concat = require('gulp-concat');
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const karma = require('gulp-karma-runner');
const pump = require('pump');
const rename = require('gulp-rename');
const sequence = require('gulp-sequence');
const uglify = require('gulp-uglify-es').default;
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');

const OUTPUT_FILE = 'LogoApp.js';
const OUTPUT_DIR = 'public/bin';

function copyFile(srcFile, destFile) {
  fs.writeFileSync(destFile, fs.readFileSync(srcFile));
}

gulp.task('default', sequence('test'));
gulp.task('test', sequence('build', 'unit-test'));
gulp.task('build', sequence('lint', 'webpack', 'compress-logo-js', 'copy'));
gulp.task('build-app', sequence('lint-app', 'concat', 'compress-logo-app'));

gulp.task('copy', () => {
  copyFile('dist/Logo.js', `${OUTPUT_DIR}/Logo.js`);
  copyFile('dist/Logo.min.js', `${OUTPUT_DIR}/Logo.min.js`);
});

gulp.task('webpack', () => {
  return gulp.src('src/Logo.js')
  .pipe(gulpWebpack({
    output: {
      filename: 'Logo.js',
      library: 'LogoJS',
      libraryExport: 'default'
    }
  }, webpack))
  .pipe(gulp.dest('dist/'));
});

gulp.task('compress-logo-app', (done) => {
  pump([
    gulp.src(`${OUTPUT_DIR}/${OUTPUT_FILE}`),
    uglify(),
    rename({suffix: '.min'}),
    gulp.dest(OUTPUT_DIR)
  ], done);
});

gulp.task('compress-logo-js', (done) => {
  pump([
    gulp.src('dist/Logo.js'),
    uglify(),
    rename({suffix: '.min'}),
    gulp.dest('dist')
  ], done);
});

gulp.task('concat', () => {
  return gulp.src([
    'logo-app/LogoApp.js', 
    'logo-app/CanvasFactory.js', 
    'logo-app/LogoController.js'
  ])
  .pipe(concat(OUTPUT_FILE))
  .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('lint', () => {
  return gulp.src([
    'src/**/*.js',
    'spec/**/*.js',
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('lint-app', () => {
  return gulp.src([
    'logo-app/**/*.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('unit-test', () => {
  return gulp.src([
    'dist/Logo.js',
    'spec/unit/**/*Spec.js'
  ], {'read': false})
  .pipe(
    karma.server({
      'singleRun': true,
      'frameworks': ['jasmine'],
      'browsers': ['Chrome']
    })
  );
});