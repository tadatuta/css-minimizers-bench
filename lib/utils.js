var fs = require('fs');

/**
 * Makes directories
 * @param {Array} - list of paths
 */
function mkdir(path) {
    try {
        fs.mkdirSync(path);
    }
    catch(err) {
        if (err && err.code !== 'EEXIST') throw err;
    }
}

/**
 * Adds spaces for pretty logging
 * @param {String} - string in the log
 * @param {Number} - interval
 * @returns {String} - string of spaces
 */
function addSpaces(name, interval) {
    return new Array(interval - name.length).join(' ');
}

/**
 * Returns a size of a minimized file and a time of a minimizer's work
 * @param {Object} - required minimizer's module
 * @param {String} - name of minimizer's method
 * @returns {Object}
 */
function minimize(minimizer, minMethod) {
    return function(inputFile, outputFile) {
        var css = fs.readFileSync(inputFile, 'utf-8'),
            res = {};

        start = Date.now();
        min = minimizer[minMethod](css);
        end = Date.now();
        res.time = end - start;

        fs.writeFileSync(outputFile, min);
        res.size = fs.statSync(outputFile).size;

        return res;
    };
}

module.exports = {
    mkdir: mkdir,
    addSpaces: addSpaces,
    minimize: minimize
}
