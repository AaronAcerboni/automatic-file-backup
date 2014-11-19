var fs    = require('fs'),
	ncp   = require('ncp'),
	slash = require('slash'),
	path  = require('path');

function backup (item) {
	var file       = item['file'],
		location   = item['backup to']     || getSittingDirectory(file),
		overwrite  = item['single backup'] || false;
	
	//slash() normalises slash format between unix and windows

	file     = stripTrailingSlash(slash(file));
	location = stripTrailingSlash(slash(location));

	fs.readdir(location, function (err, files) {
		// See how many backup copies have been made
		var backupNo = 0;

		files.forEach(function (name) {
			if (name.indexOf(getFileName(file) + '.backup') > -1) {
				var split = name.split('.backup');
				if (parseInt(split[split.length-1]) > backupNo) {
					backupNo = parseInt(split[split.length-1]);
				}
			}
		});

		// Keep overwriting backup or create new unique backup
		backupNo = (overwrite) ? 1 : backupNo + 1;

		// Write backup copy
		location = path.join(location, getFileName(file) + '.backup' + backupNo);
		if (fs.lstatSync(file).isDirectory()) {
			ncp(file, location, {clobber: true}, function (err) {
				if (err) {
					return console.error(err);
				}
			});
		} else {
			fs.createReadStream(file).pipe(fs.createWriteStream(location));
		}
	});

}

function getSittingDirectory (file) {
	var split = slash(file).split('/');
	split.pop();
	return split.join('/'); 
}

function getFileName (file) {
	var split = slash(file).split('/');
	return split[split.length-1];
}

function stripTrailingSlash(str) {
    if(str.substr(-1) == '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}

function Watcher (item) {
	this.backupInterval = setInterval(function () {
		backup(item)
	}, item['backup every']);
}

module.exports.Watcher = Watcher;