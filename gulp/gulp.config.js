module.exports = function() {

	var root = './';
	var dist = root + 'dist/';
	var jscss = require('./gulp_js_css.config');

	var config = {

		/**
		 * Image Config
		 */

		image_source: root + 'src/img/**/*.*',
		image_dest: dist + 'img',

		/**
		 * Fonts Config
		 */

		font_source: root + 'src/fonts/**/*.*',
		font_dest: dist + 'fonts',

		/**
		 * Sass Config
		 */

		sass_source: root + 'src/sass/**/*.scss',
		sass_dest: root + 'src/css',

		/**
		 * Css Config
		 */

		// css_source: root + 'css/**/*.css',
		css_source: jscss.css_path,
		css_dest: dist + 'css',

		/**
		 * JS Config
		 */

		// js_source: [root + 'js/**/*.js'/*, '!' + src + 'js/plugins.js'*/],
		js_source: jscss.js_path,
		js_dest: dist + 'js',

		/**
		 * Html Config
		 */

		html_source: [root + '*.html', root + 'includes/*.html']


	};/** End Config **/

	return config;
	
};