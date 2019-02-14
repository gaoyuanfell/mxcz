const gulp = require('gulp')
const less = require('gulp-less')
const runSequence = require('gulp-sequence')
const rename = require('gulp-rename')
const cssFiles = [`**/*.less`, `!node_modules/**`, `!typings/**`] // css文件
const process = require('child_process');

gulp.task('css', () =>
  gulp.src(cssFiles, {
    base: '/'
  })
  .on('error', (error)=> {
    console.error(error)
  })
  .pipe(less())
  .pipe(rename({
    extname: '.wxss'
  }))
  .pipe(gulp.dest('/'))
)

gulp.task('default', cb => {
  runSequence('css')(cb)
})

gulp.task('ts', () => {
  process.exec('tsc -b --verbose', (error, stdout, stderr) => {
    if (error !== null) {
      console.error(error);
    }
  })
})

gulp.task('watch', ['default', 'ts'], () => {
  gulp.watch(['app.less', 'pages/**/*.less'], ['default'])
  gulp.watch(['**/*.ts', '!**/*.d.ts', '!node_modules'], ['ts'])
})
