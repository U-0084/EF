import gulp from 'gulp';
import fs from 'fs';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

const browserSyncCreate = browserSync.create();


gulp.task('babel', () => {
	return gulp.src([
			'./public/javascripts/*.js',
			'!./public/javascripts/lib/*.js'
		])
		.pipe(plumber())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./public/javascripts/app'));
});


gulp.task('nodemon', cb => {
	let called = false;

	return nodemon({
		script: './bin/www',
		ext: 'js html',
		ignore: ['./public', 'node_modules']
	})
	.on('start', () => {
		if (!called) {
			called = true;
			cb();
		}
	})
	.on('restart', () => {
			setTimeout(() => {
				browserSyncCreate.reload();
			}, 500);
	});
});


gulp.task('browser-sync', ['nodemon', 'babel'], () => {
	browserSyncCreate.init({
		proxy: {
			target: 'http://localhost:3000',
			ws: true
		},
		port: 35729
	});
});


gulp.task('bs-reload', () => {
	browserSyncCreate.reload();
});


gulp.task('watch', () => {
	gulp.watch(['./public/javascripts/*.js'], ['babel','bs-reload']);
});


gulp.task('default', ['browser-sync', 'babel', 'watch']);