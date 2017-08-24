//import gulp
const gulp = require('gulp')

//import gulp plugins
const rename = require('gulp-rename')
const autoPrefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const imageMin = require('gulp-imagemin')
const cleanCSS = require('gulp-clean-css')
const jshint = require('gulp-jshint')


//copy html from src -> dist
gulp.task('copyHtml',() => 
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
)

// prefix and minify the css
gulp.task('prefix-min-css',() => 
    gulp.src('src/css/*.css')
        .pipe(autoPrefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
)

// lint the js
gulp.task('lint-js',() => 
    gulp.src(['src/js/*.js', '!src/js/*.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
)

// minify the js 
gulp.task('minify',() => 
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
)

// compress the images
gulp.task('min-image',() => 
    gulp.src('src/img/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
)

//watcher for linting js
gulp.task('watch',() => 
    gulp.watch('src/js/*.js',['lint-js'])
)


// default task
gulp.task('default',['copyHtml','prefix-min-css','lint-js','minify','min-image'])