import gulp from 'gulp';
import fs from 'fs';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

const browserSyncCreate = browserSync.create();
const reload = browserSyncCreate.reload;


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
				reload();
			}, 500);
	});
});


gulp.task('browser-sync', ['nodemon'], () => {
	browserSyncCreate.init(null, {
		proxy: {
			target: 'http://localhost:3000',
			ws: true
		},
		port: 35729
	});
});


gulp.task('watch', () => {
	gulp.watch(['./public/javascripts/*.js'], ['babel'], reload);
});


gulp.task('default', ['browser-sync', 'babel', 'watch']);