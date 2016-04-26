import gulp from 'gulp';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';

const bsReload = browserSync.reload;


gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			proxy: './htdocs/'
		}
	})
});


gulp.task('babel', () => {
	return gulp.src('./htdocs/**/.js')
		.pipe(plumber())
		.pipe(babel({
			preset: ['es2015']
		}))
		.pipe(gulp.dest('./app/js/'))
});


gulp.task('default', ['browser-sync', 'babel'], () => {
	gulp.watch(['./htdocs/js/**/.*js', './htdocs/**/*.css'], ['browser-sync', 'babel']);
	gulp.watch('./htdocs/**', () => {
		bsReload();
	});
});