const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const dirList = require('../view/dirList/dirList.js');
const conf = require('../../config');
const mime = require('../mime');
const compress = require('../compress');
const isFresh = require('../cache');

module.exports = async (req, res, filePath) => {

  try {
    const stats = await stat(filePath);

    if(stats.isFile()) {

      if(isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }

      res.statusCode = 200;

      const contentType = mime(filePath);
      res.setHeader('Content-Type', contentType);

      let rs = fs.createReadStream(filePath);

      if(filePath.match(conf.compress)) {
        rs = compress(rs, req, res);
      }

      rs.pipe(res);

    }else if(stats.isDirectory()) {
      const files = await readdir(filePath);
      const dir = path.relative(conf.root, filePath);
      const data = {
        title: 'assets-web-server',
        dir: dir ? `/${dir}` : '',
        files
      }
      // console.log(template);
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      res.end(dirList(data));
    }
  }catch(ex) {
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/plain');
    res.end(`${filePath} is not a directory or file!! \n ${ex.toString()}`);
  }
}