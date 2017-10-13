const childProcess = require('child_process');
const path = require('path');

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const pump = require('pump');
const rename = require('gulp-rename');
const sequence = require('gulp-sequence');
const uglify = require('gulp-uglify-es').default;
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const tslint = require('gulp-tslint');

gulp.task('default', sequence('test'));
gulp.task('test', sequence('build', 'lint:test', 'unit-test', 'unit-test:min'));
gulp.task('build', sequence('tslint', 'webpack', 'compress:logo-js'));

gulp.task('webpack', () => {
  return gulp.src('src/Logo.ts')
  .pipe(gulpWebpack({
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }]
    },
    resolve: {
      extensions: [ ".tsx", ".ts", ".js" ]
    },
    output: {
      filename: 'Logo.js',
      library: 'LogoJS',
      libraryExport: 'default',
      path: path.resolve(__dirname, 'dist')
    }
  }, webpack))
  .pipe(gulp.dest('dist/'));
});

function compress(src, dest, done) {
  pump([
    gulp.src(src),
    uglify(),
    rename({suffix: '.min'}),
    gulp.dest(dest)
  ], done);
}

gulp.task('compress:logo-js', (done) => {
  compress('dist/Logo.js', 'dist', done);
});

gulp.task('tslint', () => {
  return gulp.src("src/**/*.js")
  .pipe(tslint({
      formatter: "verbose"
  }))
  .pipe(tslint.report());
});

function lint(src) {
  return gulp.src(src)
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
}

gulp.task('lint:test', () => {
  return lint(['spec/**/*.js']);
});

function karma(config) {
  let karma = path.join('node_modules', 'karma', 'bin', 'karma');
  childProcess.execSync(`node ${karma} start ${config} --single-run`, {stdio: [0,1,2]});
}

gulp.task('unit-test', () => {
  karma('');
});

gulp.task('unit-test:min', () => {
  karma('karma-min.conf.js');
});