const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
// const cssmin = require('gulp-cssmin');
// const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
 
// gulp.task('cssmin', (done) => {
//     src(['./css/*.css', '!./css/*.min.css'])
//         .pipe(cssmin())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(dest('./css'));
//     done();
// });


function bs() {
    serveSass();
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("./*.html").on('change', browserSync.reload);
    watch("./.css/style.css").on('change', browserSync.reload);
    watch("./sass/**/*.sass", serveSass);
    watch("./sass/**/*.scss", serveSass);
    watch("./js/main.js", serveSass);
};

function serveSass() {
    return src("./sass/**/*.sass", "./sass/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest("./css"))
        .pipe(browserSync.stream());
};

exports.serve = bs;