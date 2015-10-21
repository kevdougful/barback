'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var bwipjs = require('bwip-js');

// Get config JSON
var config = require(process.argv[2]);
// Get tasklist
var tasks = require(process.argv[3]);

var symbology = config.symbology;
// Get base path to save data
var basepath = tasks.basepath;

tasks.tasklist.forEach(function(task) {
	task.list.forEach(function(item) {
		var path = basepath + '/' + task.directory;
		mkdirp(path);
		var filename = path + '/' + item + '.' + config.imagetype;
		console.log(filename);
		bwipjs.toBuffer({
			bcid: symbology,
			text: item
		}, function(err, png) {
			if (err) {
				
			} else {
				fs.writeFile(filename, png, 'base64', function(err) {
					if (err) console.log(err);
				})
			}
		});
	});
});