const express = require("express");
const app = express();
const PORT = 3001;

interface ServerRequest extends Request {
  on: any;
}

interface ServerResponse extends Response {
  setHeader: any;
  flushHeaders: any;
  write: any;
}

// SSE Endpoint
app.get("/sse", (req: ServerRequest, res: ServerResponse) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Send initial event
  res.write("data: " + JSON.stringify({ message: "Connected" }) + "\n\n");

  const intervalId = setInterval(() => {
    res.write("data: " + JSON.stringify({ message: "Keep Alive" }) + "\n\n");
  }, 10000);

  req.on("close", () => {
    clearInterval(intervalId);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
