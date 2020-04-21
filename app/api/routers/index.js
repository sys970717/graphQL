'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function collectRouters(app) {
  const routerList = ['/components'];
  
  routerList.forEach((v) => {
    const componentsDirPath = path.join(__dirname, `../`, v);

    fs.readDirSync(componentsDirPath).forEach((f) => {
      const routerFilePath = path.join(componentsDirPath, f, 'router.js');
      if (fs.existsSync(routerFilePath) && fs.lstatSync(routerFilePath).isFile()) {
        app.use(path.join(v, f), require(routerFilePath));
      }
    })
  });
}