let cp = require("child_process");
let cat = cp.spawn("cat", ["input.txt"]);
let sort = cp.spawn("sort");
let uniq = cp.spawn("uniq");

cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);
console.log(process.stdout);
