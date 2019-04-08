module.exports = function(input, map) {
    var callback = this.async();
    callback(null, input, map);
};
