const http = require('http');
const fs = require('fs');
const path = require('path');
const { run, retrieve } = require('./connect');

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const urlPath = req.url;
  if (urlPath === '/') {
    fs.readFile('./index.html', 'UTF-8', function (err, html) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    });
  } else if (urlPath === '/api') {
    await run();
    results = await retrieve();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results, null, 2))
  } else if (urlPath.endsWith('.css') || urlPath.endsWith('.js')) {
    serveStaticFile(res, urlPath, 'text/css');
  } else if (urlPath.endsWith('.jpg') || urlPath.endsWith('.png')) {
    serveStaticFile(res, urlPath, `image/${urlPath.endsWith('.jpg') ? 'jpeg' : 'png'}`);
  } else {
    res.end('404 Not Found');
  }

  console.log(`${req.method} request received for ${req.url}`);
});

function serveStaticFile(res, urlPath, contentType) {
  const filePath = path.join(__dirname, urlPath);
  const fileStream = fs.createReadStream(filePath);

  fileStream.on('error', (error) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  });

  res.on('close', () => {
    fileStream.destroy();
  });

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-cache',
  });

  fileStream.pipe(res);
}

const port = 3009;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
