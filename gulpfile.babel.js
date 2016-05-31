import gulp from 'gulp';
import fs from 'fs';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import nodemon from 'gulp-nodemon';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import BrowserSync from 'browser-sync';

const browserSync = BrowserSync.create();
const reload = browserSync.reload; 


const path = {
	server: {
		www: './bin/www'
	},
	scss: {
		app: './public/stylesheets/sass/style.scss',
		dist: './public/stylesheets/',
		watch: './public/stylesheets/sass/*.scss'
	},
	js: {
		app: './public/javascripts/app.js',
		dist: './public/javascripts/app/',
		watch: [
			'./public/javascripts/**/*.js'
		],
		lint: './**/.js'
	}
};


gulp.task('eslint', () => {
	return gulp.src(path.js.lint)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(reload({
			stream: true
		}));
});


gulp.task('browserify', () => {
	browserify(path.js.app, {
		debug: true
	})
		.transform(babelify, {
			presets: ['es2015']
		})
		.bundle()
		.on('error', err => {
			console.log(`ERROR: ${err.message}`);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(path.js.dist));
});


gulp.task('sass', () => {
	gulp.src(path.scss.watch)
		.pipe(plumber())
		.pipe(sass())
		.on('error', err => {
			console.log(err.message);
		})
		.pipe(gulp.dest(path.scss.dist));
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
				reload();
			}, 500);
	});
});


gulp.task('browser-sync', ['nodemon'], () => {
	browserSync.init({
		proxy: {
			target: 'http://localhost:3000',
			ws: true
		},
		port: 9000
	});
});


gulp.task('default', ['browser-sync'], () => {
	gulp.watch(path.scss.watch, ['sass'], reload());
	gulp.watch(path.js.watch, ['browserify'], reload());
});