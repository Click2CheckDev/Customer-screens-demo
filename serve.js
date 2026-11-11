// Opens the side-by-side demo of the customer screens on this PC: node serve.js, then http://localhost:3014
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname, port = Number(process.argv[2] || 3014);
const types = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html; charset=utf-8", ".png": "image/png", ".txt": "text/plain" };
http.createServer((req, res) => {
  let f = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (f.endsWith(path.sep) || f === root) f = path.join(f, "index.html");
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end("Not found"); }
  res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(port, "127.0.0.1", () => console.log("Customer screens demo: http://localhost:" + port + "  (Ctrl+C to stop)"));
