automatic-file-backup
=====================

The automatic file backup is a node.js program which allows for:

- Asyncronous backup of files
- Asyncronous backup of directories
- Make a backup every x time passed
- Make an incremental backup every x time passed

Usage
=====================

`git clone git@github.com:AaronAcerboni/automatic-file-backup.git`

`npm install`

Define your backup instructions in `watched.json`.

Run with `node index.js`.

Configuring what to backup
==========================

Backups are configured in the `watched.json` file. 

Use your favourite JSON editor to configure what files or directories you would 
like to backup.

```JSON
[
	{
		"file": "C:\\My Documents\\My Games\\Pacman\\Saves",
		"backup to": "F:\\Backup\\Games\\Saves",
		"backup every": 1200000,
		"single backup": true
	},
	{
		"file": "C:\\My Documents\\Study\\drugs.docx",
		"backup to": "F:\\Backup\\Uni\\Medicine",
		"backup every": 600000,
		"single backup": false
	}
]
```

## watched.json options

Windows and Unix filepath notation is supported. See `watched.sample.json` for an example.

- `file` defines the file or directory you wish to back up

- `backup to` (optional) defines where the file or directory should be copied to. Default same directory.

- `backup every` defines how often in milliseconds a copy should be asynchronously be made. E.g. 3600000 is 1 hour.

- `single backup` (optional) defines whether or not you wish to make multiple back ups or stick to just one back up. Default false.

Single backups will be named like so:

```
notes.txt.backup1
```

Multiple backups will be named like so:

```
notes.txt.backup1
notes.txt.backup2
notes.txt.backup3
```

