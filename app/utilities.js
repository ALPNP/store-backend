var utilities = {
    newUserValidator: function(user) {
        if (!user.userName || !user.password || !user.email) {
            return false;
        } else {
            return true;
        }
    }
};

module.exports = utilities;
