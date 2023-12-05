const http = require('http');
const {run,upload,retrieve,clearCollection} = require('./connect');

const server = http.createServer( async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

const urlPath = req.url;

if (urlPath === '/') {
  res.end('Hello, World! This is the root route.');
} else if (urlPath === '/api') {
    await run();
    // await upload();
    // await clearCollection();
    results = await retrieve();
    res.end(JSON.stringify(results));
    // res.end('Hello, World! This is the /api route.');
} else {
  res.end('404 Not Found');
}
  console.log(`${req.method} request received for ${req.url}`);
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
