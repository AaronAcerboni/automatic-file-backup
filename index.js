var fs      = require('fs'),
	Watcher = require('./lib/Watcher').Watcher,
	watched = JSON.parse(fs.readFileSync('watched.json'));

watched.forEach(function (watch) {
	new Watcher(watch);
});

console.log("\n");
console.log("Automatic file backup started.\n");
console.log("Setting up " + watched.length + " backup job(s).\n");
console.log("Backups will continue until node process is terminated.");