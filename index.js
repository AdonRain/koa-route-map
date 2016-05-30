'use strict';

const path = require('path');
const pathToRegexp = require('path-to-regexp');

module.exports = function(controllers) {
    const routers = path.join(controllers, 'index.js');
    return function*() {
        const method = this.method.toLowerCase();
        const routeFile = path.resolve(routers);
        const routeMap = require(routeFile)[method];

        let matchedPath = Object.keys(routeMap).filter((path) => {
            let re = pathToRegexp(path);
            if (re.test(this.path)) return true;
        })[0];

        if (matchedPath) {
            let controller = routeMap[matchedPath];
            let fileAction = controller.split('.');
            let ctrlFile = path.resolve(path.join(controllers, fileAction[0]));
            let action = require(ctrlFile)[fileAction[1]];
            if (action) yield action.apply(this);
        }
    };
};
