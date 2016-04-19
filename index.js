module.exports = function(routes, services) {
    return function*() {
        const method = this.method.toLowerCase();
        const routeFile = path.join(__dirname, routes);
        const routeMap = require(routeFile)[method];

        let matchedPath = Object.keys(routeMap).filter((path) => {
            let re = pathToRegexp(path);
            if (re.test(this.path)) return true;
        })[0];

        if (matchedPath) {
            let controller = routeMap[matchedPath];
            let fileAction = controller.split('.');
            let ctrlFile = path.join(__dirname, services, fileAction[0]);
            let action = require(ctrlFile)[fileAction[1]];
            if (action) yield action.apply(this);
        }
    };
};
