const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch'); // 热更新
const rollup = require("gulp-rollup");  // 流清洗
const replace = require("rollup-plugin-replace");   // 替换字符串
const gulpSequence = require('gulp-sequence');    //  按顺按序运行任务
const eslint = require("gulp-eslint");

gulp.task('builddev', () => {
    return watch('./src/nodeui/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeui/**/*.js')
            .pipe(babel({
                // presets: ['@babel/env']    // 不需要转成es5
                babelrc: false, // 关闭外面的，外面的babelrc留给web去用
                "plugins": ["transform-es2015-modules-commonjs"]
            }))
            .pipe(gulp.dest('build'))
    })
});

gulp.task('buildprod', () => {
    gulp.src('./src/nodeui/**/*.js')
            .pipe(babel({
                babelrc: false, // 关闭外面的babelrc，外面的babelrc留给web去用
                ignore:['./src/nodeui/config/*.js'],    // 忽略
                "plugins": ["transform-es2015-modules-commonjs"]
            }))
            .pipe(gulp.dest('build'))
});

// 清洗配置config下的index.js
gulp.task('configclean', function() {
    gulp.src('./src/nodeui/**/*.js')
      .pipe(rollup({
        output:{ 
            format:"cjs"        // commonJS的规则
        },
        input: './src/nodeui/config/index.js',  //  入口文件
        plugins: [
            replace({
              "process.env.NODE_ENV": JSON.stringify('production')
            })
          ]
      }))
      .pipe(gulp.dest('./build'));
  });

  gulp.task('lint',function(){
    gulp.src('./src/nodeui/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  })

// 判断当前环境  
let _task = ['builddev'];
if (process.env.NODE_ENV == "production") {
    _task = gulpSequence("buildprod","configclean");     // "lint",先走lint进行语法检查
}
if (process.env.NODE_ENV == "lint") {
    _task = ["lint"];
}
gulp.task('default', _task);