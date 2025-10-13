const http = require("http");

const server = http.createServer((req, res) => {
  // We have to manually parse the URL and method
  const { url, method } = req;

  // Manually handle routing with a giant if/else block
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the homepage!");
  } else if (url === "/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    res.end(JSON.stringify(users)); // Manually stringify JSON
  } else if (url === "/submit" && method === "POST") {
    // Manually handle incoming data "chunks"
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log("Received data:", body);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Data received!");
    });
  } else {
    // Manually handle 404 Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000 with raw Node.js");
});
