var config = require('../config.js')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

//链接数据库
mongoose.connect(config.mongodb)

var User = new Schema({
    username: String,
    password: String
})

var Questionaire = new Schema({
    ower: Schema.Types.ObjectId,
    createTime: String,
    deadTime: String,
    edit: Number,
    questionaire: Schema.Types.Mixed,
    feedbackes: [Schema.Types.Mixed]
})

var News = new Schema({
    test: String
})

var BannersNews = new Schema({
  title: String,
  image_url_big: String
})
module.exports.User = mongoose.model('user', User)
module.exports.Questionaire = mongoose.model('questionaire', Questionaire)
module.exports.News = mongoose.model('news', News);
module.exports.BannersNews = mongoose.model('bannersNews', BannersNews);
