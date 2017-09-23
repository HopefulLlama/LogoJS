const concat = require('gulp-concat');
const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const jshint = require('gulp-jshint');
const pump = require('pump');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;

const OUTPUT_FILE = 'logo.js';
const OUTPUT_DIR = 'public/bin';

gulp.task('default', ['test', 'build']);
gulp.task('test', ['lint', 'unit-test']);
gulp.task('build', ['concat', 'compress']);

gulp.task('compress', (done) => {
  pump([
    gulp.src(`${OUTPUT_DIR}/${OUTPUT_FILE}`),
    uglify(),
    rename({suffix: '.min'}),
    gulp.dest(OUTPUT_DIR)
  ], done);
});

gulp.task('concat', () => {
  return gulp.src(['src/LogoApp.js', 'src/TurtleFactory.js', 'src/CanvasFactory.js', 'src/LogoController.js'])
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

gulp.task('unit-test', () => {
  return gulp.src('spec/unit/**/*.js')
  .pipe(jasmine());
});