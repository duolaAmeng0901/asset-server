const pug = require('pug');
const path = require('path');

const conf = require('../../../config');

const filePath = path.join(__dirname, './dirList.pug');

module.exports = pug.compileFile(filePath, {})
