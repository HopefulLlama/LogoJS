const childProcess = require('child_process');
const fs = require('fs');

const concat = require('gulp-concat');
const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const jshint = require('gulp-jshint');
const pump = require('pump');
const rename = require('gulp-rename');
const sequence = require('gulp-sequence');
const uglify = require('gulp-uglify-es').default;

const OUTPUT_FILE = 'LogoApp.js';
const OUTPUT_DIR = 'public/bin';

function copyFile(srcFile, destFile) {
  fs.writeFileSync(destFile, fs.readFileSync(srcFile));
}

gulp.task('default', sequence('test', 'build'));
gulp.task('test', sequence('lint', 'unit-test'));
gulp.task('build', sequence('webpack', 'concat', 'compress-logo-app', 'compress-logo-js', 'copy'));

gulp.task('copy', (done) => {
  copyFile('dist/Logo.js', `${OUTPUT_DIR}/Logo.js`);
  copyFile('dist/Logo.min.js', `${OUTPUT_DIR}/Logo.min.js`);
});

gulp.task('webpack', (done) => {
  childProcess.exec('webpack', done);
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
    'logo-app/**/*.js',
    'spec/**/*.js',
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('unit-test', () => {
  return gulp.src('spec/unit/**/*.js')
  .pipe(jasmine());
});