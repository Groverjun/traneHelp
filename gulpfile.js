var gulp = require('gulp'),
    del = require('del'),                   // 删除插件
    rev = require('gulp-rev'),              // 给文件增加md5后缀
    revCollector = require('gulp-rev-collector'),// 根据rev替换文件名
    htmlmin = require('gulp-htmlmin'),      // html压缩
    uglify = require('gulp-uglify'),        // js混淆压缩
    csso = require('gulp-csso'),            // 压缩Css
    cache = require('gulp-cache'),          // 缓存插件，使图片仅更新缓存中不一样的图片
    imagemin = require('gulp-imagemin'),    // 压缩图片
    runSequence = require('run-sequence'),  // 改变任务优先级
    browserSync = require("browser-sync"),//引入browser-sync自动刷新模块
    sass = require("gulp-sass");//编译sass

gulp.task('hello', function(){//测试
  console.log('Hello World!');
});

// js压缩，替换为md5文件名　                                 

gulp.task('jsmin', function() {
    return gulp.src('app/**/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/app'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});


// css压缩，替换为md5文件名　
gulp.task('cssmin', function() {
    return gulp.src('app/**/*.css')
        .pipe(csso())
        .pipe(rev())
        .pipe(gulp.dest('dist/app'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});


// 替换html里的js和css链接，压缩html
gulp.task('rev',function(){
  return gulp.src(['rev/**/*.json','*.html'])
    .pipe(revCollector())
    .pipe(htmlmin({
      removeComments: true,        // 去除注释
      collapseWhitespace: true,    // 去除空格 
      minifyJS: true,              // 优化行内JS
      minifyCSS: true             // 优化行内样式
    }))
    .pipe(gulp.dest('dist'));
});


// 图片压缩优化
gulp.task('imgmin', function() {
    return gulp.src('app/img/**/*.{png,jpg,gif,ico,svg}')
        .pipe(cache(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        })))
        .pipe(gulp.dest('dist/app/img'));
});



// 删除dist里除了图片以外的资源
gulp.task('clean', function(callback) {
    del(['dist/**/*', '!dist/app','!dist/app/img','!dist/app/img/**/*.{jpg,png,gif,ico,svg}'],callback);
});
// 清除dist所有资源
gulp.task('cleanAll', function(callback) {
    del('dist')
    return cache.clearAll(callback);
});


//--------------------------------------
gulp.task("sass",function(){
	return gulp.src("app/scss/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({
	      stream: true//每次css改变自动刷新浏览器
	    }))
})
//-----------------------------------------------------------------
gulp.task('watch',['browserSync', 'sass'], function(){//实时监听文件变化
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Other watchers
  gulp.watch('*.html', browserSync.reload);
  //
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

//-------------------------------------------------------


gulp.task('browserSync', function() {//告知根目录
browserSync({
    server: {
      baseDir: './'
    },
})
})