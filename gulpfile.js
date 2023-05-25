/*	==========================================================================
    Author: Mvishal Shukla
    Updated: --/--/--
    Notes: Hand Coded Gulp JS.
    ========================================================================== */

// for es6 support run below code
// npm install --save-dev gulp-babel @babel/core @babel/preset-env babel-polyfill

// for webp conversion install following packages
// npm install imagemin-webp
// npm install --save-dev gulp-ext-replace

var gulp = require("gulp"),
	babel = require("gulp-babel"),
	config = require("./gulp/gulp.config")(),
	// webp = require("imagemin-webp"),
	// extReplace = require("gulp-ext-replace"),
	browserSync = require("browser-sync"),
	reload = browserSync.reload,
	del = require("del"),
	runSequence = require("run-sequence"),
	gutil = require("gulp-util"),
	$ = require("gulp-load-plugins")({
		lazy: true,
	});

var php2html = require("gulp-php2html");

/*	=========================================================================
    Table of Contents for Styles:
	
    #HelpTask
    #Default Task
    #Clean Task
        *Clean task
        *Clean temp task
        *Clean main.css task
        *Clean Image task
        *Clean Fonts Task
        *Clean Styles Task
        *Clean Scripts
        *Clean Code Task
    #Image Task
    #Fonts Task
    #Html Task
    #Sass Task
    #CSS Task
    #JS Task
    #Watch Task
    #Browser-sync Task
    #Util Functions
        *log
        *clean
    ========================================================================== */

/*	==========================================================================
        #HelpTask
    ========================================================================== */

gulp.task("help", $.taskListing);

/*	==========================================================================
        #Default Task
    ========================================================================== */

gulp.task("default", ["help"]);

/*	==========================================================================
        #Clean Task
    ========================================================================== */

//gulp.task('clean', ['clean-styles', 'clean-scripts', 'clean-fonts', 'clean-images', 'clean-code'], function () {
//	log("All Files Cleaned");
//});

gulp.task(
	"clean",
	["clean-styles", "clean-scripts", "clean-fonts", "clean-code"],
	function () {
		log("All Files Cleaned");
	}
);

gulp.task("clean-styles", function () {
	clean(config.css_dest);
});

gulp.task("clean-scripts", function () {
	clean(config.js_dest);
});

gulp.task("clean-fonts", function () {
	clean(config.font_dest);
});

gulp.task("clean-images", function () {
	clean(config.image_dest);
});

gulp.task("clean-code", function () {
	log("html need to be cleaned");
});

/*	==========================================================================
        #Image Task
    ========================================================================== */

gulp.task("images", function () {
	log("Compressing and copying images");
	return (
		gulp
			.src(config.image_source)
			.pipe(
				$.plumber({
					handleError: function (err) {
						console.log(err);
						this.emit("end");
					},
				})
			)
			.pipe($.newer(config.image_dest))
			.pipe(
				$.imagemin({
					progressive: true,
					optimizationLevel: 4,
				})
			)
			.pipe(
				$.size({
					showFiles: true,
				})
			)
			.pipe(gulp.dest(config.image_dest))
			//.pipe(reload({stream: true}))
			.pipe($.notify("#Images task finished"))
	);
});

/*	==========================================================================
        #image to webP task
    ========================================================================== */
// gulp.task("exportWebP", function () {
//     log('converting images to webP');

//     var src = "img/**/*.*";
//     var dest = "webp/img";

//     return gulp.src(src)
//         .pipe(imagemin([
//             webp({
//                 quality: 75
//             })
//         ]))
//         .pipe(extReplace(".webp"))
//         .pipe(gulp.dest(dest));
// });

/*	==========================================================================
        #Fonts Task
    ========================================================================== */

gulp.task("fonts", function () {
	log("Copying fonts");
	return (
		gulp
			.src(config.font_source)
			.pipe($.newer(config.font_dest))
			.pipe(gulp.dest(config.font_dest))
			//.pipe(reload({stream: true}))
			.pipe($.notify("#Fonts task finished"))
	);
});

/*	==========================================================================
        #Html Task
    ========================================================================== */

gulp.task("html", function () {
	return gulp.src(config.html_source).pipe(
		reload({
			stream: true,
		})
	);
	//.pipe($.notify('#Html task finished'));
});

/*	==========================================================================
        #Sass Task
    ========================================================================== */

gulp.task("sass", function () {
	log("Compiling SCSS --> CSS");
	return $.rubySass(config.sass_source, {
		style: "expanded",
		lineNumbers: true,
	})
		.on("error", $.rubySass.logError)
		.pipe(
			$.autoprefixer({
				browsers: ["last 9 versions", "> 5%"],
			})
		)
		.pipe(
			$.stripCssComments({
				preserve: /^#/,
			})
		)
		.pipe(
			$.jsbeautifier({
				indent_level: 4,
			})
		)
		.pipe(gulp.dest(config.sass_dest))
		.pipe($.notify("#Sass task finished"));
});

/*	==========================================================================
        #CSS Task
    ========================================================================== */

gulp.task(
	"css",
	/*['sass'],*/ function () {
		return gulp
			.src(config.css_source)
			.pipe($.stripCssComments())
			.pipe($.concat("app.min.css"))
			.pipe($.uglifycss())
			.pipe(
				$.size({
					showFiles: true,
				})
			)
			.pipe(gulp.dest(config.css_dest))
			.pipe(
				reload({
					stream: true,
				})
			)
			.pipe($.notify("#CSS Task Finished"));
	}
);

/*	==========================================================================
        #JS Task
    ========================================================================== */

gulp.task("js", function () {
	return (
		gulp
			.src(config.js_source)
			// .pipe(
			//   babel({
			//     presets: ["@babel/env"],
			//   })
			// )
			.pipe($.plumber())
			.pipe($.concat("app.min.js"))
			.pipe($.uglify())
			.pipe(
				$.size({
					showFiles: true,
				})
			)
			.pipe(gulp.dest(config.js_dest))
			.pipe(
				reload({
					stream: true,
				})
			)
			.pipe($.notify("#JS task finished"))
	);
});

/*	==========================================================================
        #Watch Task
    ========================================================================== */

gulp.task("watch", function () {
	// sass-watcher
	gulp.watch(config.sass_source, ["sass"]);

	// css-watcher
	gulp.watch(config.css_source, ["css"]);

	//js-watcher
	gulp.watch(config.js_source, ["js"]);

	// html-watcher
	gulp.watch(config.html_source, ["html"]);
});

/*	==========================================================================
        #Browser-sync
    ========================================================================== */

gulp.task("serve", function (callback) {
	runSequence(
		"serve-dev",
		"clean",
		"html",
		"fonts",
		"sass",
		"css",
		"js",
		"watch",
		callback
	);
});

gulp.task("serve-dev", function () {
	startBrowserSync();
});

function callback() {
	alert("done");
}

/*	==========================================================================
        #Util Functions
    ========================================================================== */

function startBrowserSync() {
	log("Starting browser-sync...");

	var options = {
		proxy: "127.0.0.1:8000",
		// tunnel: "mvishal"
	};

	$.connectPhp.server({}, function () {
		browserSync(options);
	});

	gulp.watch(["**/*.php", "**/*.html"]).on("change", function () {
		browserSync.reload();
	});
}

function log(msg) {
	if (typeof msg === "object") {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}

function clean(path) {
	log("Cleaning: " + $.util.colors.blue(path));
	del(path).then((paths) => {
		console.log("Deleted files and folders:\n", paths.join("\n"));
	});
}

/*	==========================================================================
        #PHP to HTML Task
    ========================================================================== */
gulp.task("php2html", function () {
	return gulp.src("*.php").pipe(php2html()).pipe(gulp.dest("./build"));
});

/*	==========================================================================
            #copy dist folder to build
        ========================================================================== */
gulp.task("copyDistToBuild", function () {
	return gulp.src(["./dist/**/*"]).pipe(gulp.dest("./build/dist/"));
});

/*	==========================================================================
            #copy img folder to build
        ========================================================================== */
gulp.task("copyImgToBuild", function () {
	return gulp.src(["./img/**/*"]).pipe(gulp.dest("./build/img/"));
});

/*	==========================================================================
            #copy other root to build
        ========================================================================== */
gulp.task("copyRootFilesToBuild", function () {
	return gulp
		.src([".htaccess", "robots.txt", "sitemap.xml", "./*.html"])
		.pipe(gulp.dest("./build/"));
});

gulp.task("serve-prod", function () {
	startBrowserSyncForDeployedSite();
});

function startBrowserSyncForDeployedSite() {
	var options = {
		server: {
			baseDir: "./build",
		},
		// tunnel: "mvishal"
	};

	$.connectPhp.server({}, function () {
		browserSync(options);
	});
}

/*	==========================================================================
            #deploy Task
        ========================================================================== */
gulp.task("build", function (callback) {
	runSequence(
		// "serve-prod",
		"php2html",
		"copyDistToBuild",
		"copyImgToBuild",
		"copyRootFilesToBuild",
		callback
	);
});
