var  User = require('../lib/mongo').User

module.exports = {
    save: function (user) {
        return User
            .create(user)
    },
    findOne: function (username) {
        return User
            .findOne({username: username})
            .exec()
    }
}