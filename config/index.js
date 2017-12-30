module.exports = {
  root: process.cwd(),
  port: 9999,
  hostname: 'localhost',
  host: '127.0.0.1',
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    Etag: true
  }
}