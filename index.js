const http = require('http');
const fs = require('fs');
const path = require('path');
const { run, retrieve } = require('./connect');

const server = http.createServer(async (req, res) => {
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
    res.end(JSON.stringify(results));
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

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-cache',
  });

  fileStream.pipe(res);
}

const port = 3000;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});









// const http = require('http');
// const fs = require('fs');
// const {run,upload,retrieve,clearCollection} = require('./connect');

// const server = http.createServer( async (req, res) => {
// const urlPath = req.url;

// if (urlPath === '/'){
//   fs.readFile("./index.html", "UTF-8", function(err, html){
//       res.writeHead(200, {"Content-Type": "text/html"});
//       res.end(html);
//   });
// } else if (urlPath === '/api') {
//     await run();
//     // await upload();
//     // await clearCollection();
//     results = await retrieve();
//     res.end(JSON.stringify(results));
// } else {
//   res.end('404 Not Found');
// }
//   console.log(`${req.method} request received for ${req.url}`);
// });

// const port = 3000;

// server.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
