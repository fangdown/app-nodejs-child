const childProcess = require("child_process").fork("./child.js");
childProcess.send("hello");
childProcess.on("message", (data) => {
  console.log(data);
});
