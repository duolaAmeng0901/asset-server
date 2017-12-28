const fs = require('fs');

module.exports = async function (req, res, filePath) {
  try {
    const stats = await new Promise(function (resolve, reject) {

      fs.stat(filePath, (err, data) => {
        if(err) throw err;
        reject();
      })

    })

    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');

    if(stats.isFile()) {

      fs.createReadStream(filePath).pipe(res);

    }else if(stats.isDirectory()) {

      try {
        const files = await new Promise(function (resolve, reject) {
          fs.readdir(filePath, (err, data) => {
            if(err) throw err;
            resolve();
          });
        })

        res.end(files.join(','));
      }catch(err) {
        throw err;
      }
    }

  }catch(err) {

    if(err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`${filePath} is not defined!`)
      return;
    }
  }
}