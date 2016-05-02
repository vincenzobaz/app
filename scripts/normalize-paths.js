
var path = require('path');
var fs = require('fs');

var regex = /from (["'])(\.[\w/\.]+)\1/g;

var root = path.join(path.dirname(__dirname), 'app');

if (process.argv[2] == null) {
  console.error("Usage: node normalize-paths.js path/to/file.[js|ts]");
  process.exit(1);
}

var file = path.join(path.dirname(__dirname), process.argv[2]);

if (!fs.existsSync(file)) {
  console.error("`" + file + "` doesn't exists.");
  process.exit(1);
}

var stat = fs.statSync(file);

if (!stat.isFile()) {
  console.error("`" + file + "` is not a file.");
  process.exit(1);
}

console.log("Processing " + file + "...");

var dir = path.dirname(file);

var content = fs.readFileSync(file, 'utf8');

var newContent = content.replace(regex, normalize);

function normalize(match, q1, relPath, q2) {
  var absPath = path.resolve(dir, relPath);
  var normPath = path.relative(root, absPath);

  // console.log(relPath + " => " + normPath);

  return match.replace(relPath, normPath);
}

fs.writeFileSync(file, newContent, 'utf8');

