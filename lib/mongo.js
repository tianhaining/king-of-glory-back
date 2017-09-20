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

//资讯列表
var News = new Schema({
	title: String,
	article_url: String,
	summary: String,
	publication_date: String,
	image_url_small: String,
	pv: Number
})
//轮播图片信息
var BannersNews = new Schema({
  title: String,
  image_url_big: String
})
//坦克信息列表
var TanksList = new Schema({
  path: String,
  title: String
})
//战士信息列表
var WarriorList = new Schema({
  path: String,
  title: String
})
//法师信息列表
var WizardList = new Schema({
  path: String,
  title: String
})
//坦克信息列表
var ShooterList = new Schema({
  path: String,
  title: String
})
//刺客信息列表
var AssassinList = new Schema({
  path: String,
  title: String
})
//辅助信息列表
var AssistList = new Schema({
  path: String,
  title: String
})
module.exports.User = mongoose.model('user', User)
module.exports.Questionaire = mongoose.model('questionaire', Questionaire)

module.exports.News = mongoose.model('news', News);
module.exports.BannersNews = mongoose.model('bannersNews', BannersNews);
module.exports.TanksList = mongoose.model('tanksList', TanksList);
module.exports.WarriorList = mongoose.model('warriorList', WarriorList);//战士信息列表
module.exports.WizardList = mongoose.model('wizardList', WizardList);//法师信息列表
module.exports.ShooterList = mongoose.model('shooterList', ShooterList);//射手信息列表
module.exports.AssassinList = mongoose.model('assassinList', AssassinList);//刺客信息列表
module.exports.AssistList = mongoose.model('assistList', AssistList);//辅助信息列表
