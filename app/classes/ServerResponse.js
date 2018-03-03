function ServerResponse(obj) {
    this.obj = obj;
}

ServerResponse.prototype.error = function () {
    return this.obj;
};

ServerResponse.prototype.success = function () {
    return this.obj;
};

module.exports = ServerResponse;
