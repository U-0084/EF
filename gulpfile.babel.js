import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import babel from 'gulp-babel';

const bsCreate = browserSync.create();


gulp.task('browser-sync', () => {
	bsCreate.init(null, {
		server: {
			baseDir: 'htdocs/'
		}
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
	gulp.watch('./htdocs/js/*.js', ['babel'], () => {
		browserSync.reload();
	});
});


gulp.task('default', ['browser-sync', 'babel', 'watch']);