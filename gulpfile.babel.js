import gulp from 'gulp';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';

const reload = browserSync.reload();


gulp.task('babel', () => {
	return gulp.src('./htdocs/js/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./app/js'));
});


gulp.task('watch', () => {
	gulp.watch('./htdocs/**/*.js', ['babel']);
});


gulp.task('browser-sync', () => {
	browserSync.init(null, {
		proxy: {
			target: 'http://localhost:3000'
		},
		port: 35729
	});
});


gulp.task('default', ['babel', 'watch', 'browser-sync'], () => {
	gulp.watch('./htdocs/js/**/*.js');
});