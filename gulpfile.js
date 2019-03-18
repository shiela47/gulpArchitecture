const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch'); // 热更新

gulp.task('default', () => {
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

// 判断当前环境  
// let _task = ['builddev'];
// if (process.env.NODE_ENV == "production") {
//     _task = [];
// }
// gulp.task("default", _task);