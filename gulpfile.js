const gulp = require('gulp');
const babel = require('gulp-babel');
const cleanCss = require('gulp-clean-css');
const del = require('del');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const paths = {
    styles: {
        src: 'resources/styles/app.scss',
        dest: 'public/css/'
    },
    scripts: {
        src: 'resources/scripts/**/*.js',
        dest: 'public/js/'
    }
};

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
}

const build = gulp.series(gulp.parallel(styles, scripts));

exports.build = build
exports.scripts = scripts
exports.styles = styles
exports.watch = watch;
exports.default = build;