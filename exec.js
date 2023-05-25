let cp = require("child_process");
cp.exec(" echo hello world", (err, data) => {
  console.log(data);
});
