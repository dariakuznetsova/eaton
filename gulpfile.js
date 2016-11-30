var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rigger = require('gulp-rigger'),
    jade = require('gulp-jade'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    filter = require('gulp-filter'),
    rename = require('gulp-rename'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    svgstore = require('gulp-svgstore'),
    browserSync = require('browser-sync'),
    size = require('gulp-size'),
    reload = browserSync.reload;


// Сервер
gulp.task ('server', function () {
    browserSync ({
        port: 9000,
        server: {
            baseDir: 'site/'
        }
    });
});


// Jade
gulp.task('jade', function () {
    gulp.src('jade/pages/*.jade')
        .pipe(jade({
            pretty: '\t',
        }))
        .pipe(gulp.dest('site/'))
});


//svg-sprites
gulp.task('sprites-svg', function () {
    return gulp.src('site/images/sprites/svg/**.svg')
        .pipe(svgmin(function (file) {
            return {
                plugins: [
                    {
                        cleanupIDs: {
                            minify: true
                        }
                    },
                    {
                        removeViewBox: false
                    }
                ]
            }  
        }))
        .pipe(svgstore({
            inlineSvg: true,
            fileName: 'sprites.svg',
            prefix: 'icon-'
        }))
        .pipe(cheerio({
            run: function ($) {
                $('svg').attr('style',  'display:none');
                $('[fill]').removeAttr('fill');
                $('symbol').attr('fill','currentColor');
                $('svg').children('defs').remove();
            }
        }))
        .pipe(rename("sprites.svg"))
        .pipe(gulp.dest("site/images/sprites/"));
});


// Sprites
// gulp.task('sprite', function () {
//     var spriteData = gulp.src('sprites/*.png').pipe(spritesmith({
//         imgName: 'sprite.png',
//         imgPath: 'site/images/sprite.png',
//         cssName: '_sprite.scss',
//         algorithm: 'alt-diagonal',
//         padding: 40
//     }));
//     spriteData.img.pipe(gulp.dest('./site/images/sprites/'));
//     spriteData.css.pipe(gulp.dest('./style/'));
// });


// Слежка
gulp.task ('watch', function () {
        gulp.watch ([
        'site/*.html',
        'site/js/**/*.js',
        'site/css/*.css'
        ]).on ('change', browserSync.reload);
        // gulp.watch ('style/**/*.scss', ['sass']);
        gulp.watch ('jade/**/*.jade', ['jade']);          
});


// Задача по умолчанию
gulp.task ('default', ['server', 'watch']);


// Сборка - перенос html, css, js в папку dist
gulp.task ('useref', function () {
    return gulp.src('site/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
        .pipe(gulp.dest('dist'));
});


// Очистка
gulp.task ('clean', function () {
    return gulp.src ('dist', { read: false })
});

// Перенос шрифтов
gulp.task('fonts', function () {
    gulp.src('site/fonts/*')
        .pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
        .pipe(gulp.dest('dist/fonts/'))     
});


// Картинки
gulp.task('images', function () {
    return gulp.src('site/images/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'));
});


// Остальные файлы (напр. favicon.io и пр.)
gulp.task('extras', function () {
    return gulp.src([
        'site/*.*',
        '!site/*.html'
    ]).pipe(gulp.dest('dist'));
});


// Собираем папку DIST (только после компиляции Jade)
gulp.task('build', ['clean'], function () {
    gulp.start('dist');
});


// Сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
    return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});


// Проверка, все ли работает
gulp.task ('serverdist', function () {
    browserSync ({
        port: 8050,
        server: {
            baseDir: 'dist'
        }
    });
});