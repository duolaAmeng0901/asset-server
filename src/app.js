const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const pug = require('pug');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const conf = require('../config');
const router = require('./router/router.js');

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url);
  router(req, res, filePath);

  // fs.stat(filePath, (err, stats) => {
  //   if(err) {
  //     res.statusCode = 404;
  //     res.setHeader('Content-type', 'text/plain');
  //     res.end(`${filePath} is not a directory or file!!`);
  //     return;
  //   }

  //   if(stats.isFile()) {
  //     res.statusCode = 200;
  //     res.setHeader('Content-type', 'text/plain');
  //     fs.createReadStream(filePath).pipe(res);
  //   }else if(stats.isDirectory()) {
  //     fs.readdir(filePath, (err, files) => {
  //       res.statusCode = 200;
  //       res.setHeader('Content-type', 'text/plain');
  //       res.end(files.join(','));
  //     })
  //   }
  // })
})



server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.log(`Server start at ${chalk.green(addr)}`)
});