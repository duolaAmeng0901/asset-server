const { createGzip, createDeflate } = require('zlib');

module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding'];
  //因为gzip5所以我们需要加上单词边界。
  if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|defale)\b/)) {
    return rs;
  }else if(acceptEncoding.match(/\bgzip\b/)) {
   //gzip的压缩效果好，所以先用gzip
    res.setHeader('Content-Encoding', 'gzip');
    return rs.pipe(createGzip());
  }else if(acceptEncoding.match(/\bdeflate\b/)) {

    res.setHeader('Content-Encoding', 'deflate');
    return rs.pipe(createDeflate());
  }
}