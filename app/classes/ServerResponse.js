/**
 * A class to generate server responses.
 */
function ServerResponse() {
    this.response = {
        success: null,
        message: null,
        code: null,
        content: {}
    };
}

ServerResponse.prototype.setRes = function (success, message, code, content) {
    this.response.success = success;
    this.response.message = message;
    this.response.code = code;

    if (content) {
        this.response.content = content;
    } else {
        delete this.response.content;
    }

    return this;
};

ServerResponse.prototype.send = function () {
    return this.response;
};

module.exports = ServerResponse;
