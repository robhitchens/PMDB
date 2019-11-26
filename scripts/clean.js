const shell = require('shelljs');
shell.echo('Cleaning target folder');
shell.rm('-rf', 'target/');