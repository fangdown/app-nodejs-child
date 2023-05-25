process.on("message", () => {
  process.send("hello data");
});
