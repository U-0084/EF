import gulp from 'gulp';
import fs from 'fs';
import plumber from 'gulp-plumber';
import BrowserSync from 'browser-sync';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import nodemon from 'gulp-nodemon';

const browserSync = BrowserSync.create();


const path = {
	scss: {
		app: './public/stylesheets/sass/style.scss',
		dest: './public/stylesheets/',
		watch: './public/stylesheets/sass/*.scss'
	},
	js: {
		app: './public/javascripts/main.js',
		dest: './public/javascripts/app/main.js',
		watch: [
			'./public/javascripts/*.js',
			'!./public/javascripts/lib/*.js'
		]
	}
}


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


gulp.task('sass', () => {
	gulp.src([
			'./public/stylesheets/sass/*.scss'
		])
		.pipe(plumber())
		.pipe(sass())
		.on('error', err => {
			console.log(err.message);
		})
		.pipe(gulp.dest('./public/stylesheets/'));
});


gulp.task('nodemon', cb => {
	let called = false;

	return nodemon({
		script: './bin/www',
		ext: 'js html',
		ignore: ['node_modules']
	})
	.on('start', () => {
		if (!called) {
			called = true;
			cb();
		}
	})
	.on('restart', () => {
			setTimeout(() => {
				browserSync.reload();
			}, 500);
	});
});


gulp.task('browser-sync', ['nodemon', 'babel'], () => {
	browserSync.init({
		proxy: {
			target: 'http://localhost:3000',
			ws: true
		},
		port: 9000
	});
});


gulp.task('bs-reload', () => {
	browserSync.reload();
});


gulp.task('watch', () => {
	gulp.watch(['./public/javascripts/*.js'], ['babel', 'nodemon', 'bs-reload']);
});


gulp.task('default', ['browser-sync', 'nodemon', 'babel', 'watch']);