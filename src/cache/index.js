const { cache } = require('../../config');

function refreshRes(stats, res) {
  const {
    maxAge,
    expires,
    cacheControl,
    lastModified,
    Etag
  } = cache;

  if(expires) {
    res.setHeader('Expires', new Date( Date.now() + maxAge * 1000).toUTCString());
  }

  if(cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge * 1000}`);
  }

  if(lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString());
  }

  if(Etag) {
    res.setHeader('Etag', `${stats.size} - ${stats.mtime}`);
  }
}

module.exports = function isFresh(stats, req, res){
  refreshRes(stats, res);

  const lastModified = req.headers['last-modified-since'];
  const Etag = req.headers['if-none-match'];

  if(!lastModified && !Etag) {
    return false;
  }

  if(lastModified && lastModified !== res.getHeader('Last-Modified')) {
    return false;
  }

  if(Etag && Etag !== res.getHeader('Etag')) {
    return false;
  }

  return true;
}