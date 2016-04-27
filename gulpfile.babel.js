import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import babel from 'gulp-babel';

const browserSyncCreate = browserSync.create();
const reload = browserSyncCreate.reload;

gulp.task('browser-sync', () => {
	browserSyncCreate.init(null, {
		proxy: ''
	})
});


gulp.task('babel', () => {
	return gulp.src([
			'./htdocs/js/*.js',
			'!./htdocs/js/lib/*.js'
		])
		.pipe(plumber())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./app/js'));
});


gulp.task('watch', () => {
	gulp.watch(['./htdocs/js/*.js'], ['babel'], reload);
});


gulp.task('default', ['browser-sync', 'babel', 'watch']);