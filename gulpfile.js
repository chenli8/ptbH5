/**
 * Created by Kirk liu on 2017/6/27.
 */
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var vsftp = require('gulp-vsftp');
var zip = require('gulp-zip');
var GulpSSH = require('gulp-ssh');
var moment = require('moment-kirk');
var webpackFile = require("./config/index");
var packageInfo = require("./package.json");

/* 生成构建时间 存放在 生产目录里*/
gulp.task('buildTime', () =>
    fs.writeFile(path.resolve(webpackFile.build.assetsRoot) + "/buildTime.txt", moment(new Date()).format('YYYY-MM-DD HH:mm:ss') +' '+ packageInfo.version , function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!",path.resolve());
    })
);
/* 打包生产目录 */
gulp.task('zip', () =>
    gulp.src(path.resolve(webpackFile.build.assetsRoot + '/**'))
        .pipe(zip('h5-[' + packageInfo.version +']-['+ moment(new Date()).format('YYYY-MM-DD HH-mm-ss')+'].zip'))
        .pipe(gulp.dest('backup'))
);
/* 上传生产目录到test http://test.pintuibao.cn  */
gulp.task('test', function () {
  console.log('test start');
    return gulp.src(webpackFile.build.assetsRoot+'/**')
        .pipe(vsftp({
            host: '192.168.5.12',
            user: 'developer',
            pass: 'ptb-qwesdf',
            cleanFiles: true,
            remotePath: '/docker-developer-test/modules/www/static/h5/',
        }));
});
/* 上传生产目录到hera http://hera.pintuibao.cn  */
gulp.task('hera', function () {
  console.log('hera start');
  return gulp.src(webpackFile.build.assetsRoot+'/**')
        .pipe(vsftp({
            host: '192.168.5.14',
            user: 'developer',
            pass: 'ptb-qwesdf',
            cleanFiles: true,
            remotePath: '/data1/docker-developer-test/modules/web/h5/',
        }));
});

/*var config = {
    host: '114.113.237.130',
    port: 41222,
    username: 'developer',
    password:'BV2otBI5kTXmyyRa7qnWtlTt0XcbZtqR'
};
var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
});
gulp.task('heraExec', function () {
    return gulpSSH
        .shell(['ssh developer@192.168.200.11'])
        .pipe(gulp.dest('appConfig/gulp/logs'))
});*/

//ssh developer@192.168.200.11','test-oma-console','1','1','2','ga1
