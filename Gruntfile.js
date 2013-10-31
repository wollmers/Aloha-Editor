module.exports = function (grunt) {
	'use strict';
	var gruntConfig = {

		pkg: grunt.file.readJSON('package.json'),

		distFileName: '<%= pkg.name %>-<%= pkg.version %>',
		distDir: './dist/<%= distFileName %>',
		dest: '<%= distDir %>/<%= distFileName %>.js',
		src: ['./src/*.js'],

		banner: '/* Aloha Editor <%= pkg.version %>'
		      + ' | Copyright 2011-<%= grunt.template.today("yyyy") %> Gentics Software GmbH'
		      + ' | http://aloha-editor.org/license'
		      + ' */\n',

		'closure-compiler': {
			frontend: {
				cwd: './src',
				js: './*.js',
				jsOutputFile: '<%= dest %>',
				options: {
					common_js_entry_module: 'aloha.js',
					//common_js_module_path_prefix: './src/',
					transform_amd_modules: undefined,
					process_common_js_modules: undefined,
					// compilation_level: 'ADVANCED_OPTIMIZATIONS',
					language_in: 'ECMASCRIPT5_STRICT'
				}
			}
		},
		jshint: {
			files: ['<%= src %>'],
			options: {
				jshintrc: './.jshintrc'
			}
		},
		watch: {
			jshint: {
				files: ['src/**'],
				tasks: ['jshint']
			}
		},
		qunit: {
			all: ['tests/index.html']
		},
		docular: {
			docular_partial_home: 'docs/home.html',
			docular_partial_navigation: 'docs/navigation.html',
			docular_partial_footer: 'docs/footer.html',
			docular_partial_group_index: false,
			docular_webapp_target : "build/docs",
				groups: [
					{
						groupTitle: 'Aloha Editor',
						groupId: 'alohaeditor',
						groupIcon: 'icon-book',
							sections: [
								{
									id: "arrays",
									title: "Arrays API",
									showSource: true,
									scripts: [
										"src/arrays.js"
										]
								},
								{
									id: "boundary-markers",
									title: "BoundaryMarkers API",
									showSource: true,
									scripts: [
										"src/boundary-markers.js"
										]
								},
								{
									id: "browser",
									title: "Browser API",
									showSource: true,
									scripts: [
										"src/browser.js"
										]
								},
								{
									id: "colors",
									title: "Colors API",
									showSource: true,
									scripts: [
										"src/colors.js"
										]
								},
								{
									id: "content",
									title: "Content API",
									showSource: true,
									scripts: [
										"src/content.js"
										]
								},
								{
									id: "cursors",
									title: "Cursor API",
									showSource: true,
									scripts: [
										"src/cursors.js"
										]
								},
								{
									id: "domtoxhtml",
									title: "DOM to XHTML API",
									showSource: true,
									scripts: [
										"src/dom-to-xhtml.js"
										]
								},
								{
									id: "dom",
									title: "DOM API",
									showSource: true,
									scripts: [
										"src/dom.js"
										]
								},
								{
									id: "editing",
									title: "Editing API",
									showSource: true,
									scripts: [
										"src/editing.js"
										]
								},
								{
									id: "ephemera",
									title: "Ephemera API",
									showSource: true,
									scripts: [
										"src/ephemera.js"
										]
								},
								{
									id: "events",
									title: "Events API",
									showSource: true,
									scripts: [
										"src/events.js"
										]
								},
								{
									id: "functions",
									title: "Functions API",
									showSource: true,
									scripts: [
										"src/functions.js"
										]
								},
								{
									id: "html",
									title: "HTML API",
									showSource: true,
									scripts: [
										"src/html.js"
										]
								},
								{
									id: "keys",
									title: "Keys API",
									showSource: true,
									scripts: [
										"src/keys.js"
										]
								},
								{
									id: "maps",
									title: "Maps API",
									showSource: true,
									scripts: [
										"src/maps.js"
										]
								},
								{
									id: "misc",
									title: "Misc API",
									showSource: true,
									scripts: [
										"src/misc.js"
										]
								},
								{
									id: "pubsub",
									title: "PubSub API",
									showSource: true,
									scripts: [
										"src/pubsub.js"
										]
								},
								{
									id: "ranges",
									title: "Ranges API",
									showSource: true,
									scripts: [
										"src/ranges.js"
										]
								},
								{
									id: "requirepronto",
									title: "Require Pronto API",
									showSource: true,
									scripts: [
										"src/require-pronto.js"
										]
								},
								{
									id: "strings",
									title: "String API",
									showSource: true,
									scripts: [
										"src/strings.js"
										]
								},
								{
									id: "traversing",
									title: "Traversing API",
									showSource: true,
									scripts: [
										"src/traversing.js"
										]
								},
								{
									id: "trees",
									title: "Tree API",
									showSource: true,
									scripts: [
										"src/trees.js"
										]
								},
								{
									id: "typing",
									title: "Typing API",
									showSource: true,
									scripts: [
										"src/typing.js"
										]
								}
							]
					},
					{
						groupTitle: 'Aloha Editor Guides',
						groupId: 'guides',
						groupIcon: 'icon-file',
							sections: [
								{
									id: "repositories",
									title: "Using Repositories",
									showSource: false,
									docs: [
										"docs/guides/repositories.doc"
										],
									rank: {}
								},
							]
					}
				],
				discussions: {
					shortName: 'alohaeditor',
					url: 'http://aloha-editor.org',
					dev: false
				}
				//showDocularDocs: true
		}
	};

	grunt.initConfig(gruntConfig);
	grunt.loadNpmTasks('grunt-install-dependencies');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-closure-compiler');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-docular');

	grunt.registerTask(
		'banner',
		'Prepends a license banner to the built file',
		function () {
			var filename = grunt.config('dest');
			grunt.file.write(
				filename,
				grunt.config('banner') + grunt.file.read(filename)
			);
		}
	);

	grunt.registerTask('default', [
		'install-dependencies',
		'jshint',
		'qunit',
		'docular',
		'closure-compiler',
		'banner'
	]);
};
