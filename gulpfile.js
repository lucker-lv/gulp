var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('js', function(cb) {
    pump([
            gulp.src('Scripts/*.js'),
            uglify(),
            gulp.dest('dist/js')
        ],
        cb
    );
});


var uglifycss = require('gulp-uglifycss');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function(){
    gulp.src('Content/**/**.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('dist/css'));
});


// const imagemin = require('gulp-imagemin');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

gulp.task('image', () =>
    imagemin(['images/*.{jpg,png}'], 'dist/images', {
        plugins: [imageminMozjpeg({quality: 80}), imageminPngquant({quality: 60-80})] //注意quality的值不要用引号，否则这个数值会报一个错
    }).then(files => {
        console.log(files);
    })
);


gulp.task('default', ['js', 'css', 'image']);