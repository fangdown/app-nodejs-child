let cp = require("child_process");
cp.execFile("echo", ["hello", "world"], (err, data) => {
  console.log(data);
});
