const cluster = require("cluster");
const { log } = require("console");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });

  Object.keys(cluster.workers).forEach(function (id) {
    cluster.workers[id].on("message", function (msg) {
      console.log("[master] " + "received msg:" + msg + "from worker" + id);
    });
  });
  var i = 0;
  setTimeout(function () {
    Object.keys(cluster.workers).forEach(function (id) {
      const worker = cluster.workers[id];
      worker.send("[master] " + "send msg " + i + " to worker" + worker.id);
    });
  }, 3000);
} else {
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是一个 HTTP 服务器。
  process.on("message", function (msg) {
    console.log("[worker] worker" + cluster.worker.id + " received msg:" + msg);
    process.send("[worker] send msg " + cluster.worker.id + " to master.");
  });

  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("你好世界\n");
    })
    .listen(8000);

  console.log(`工作进程 ${process.pid} 已启动`);
}
