var config = require('../config.js')
var mongoose = require('mongoose')
//schema是mongose里会用到的一种数据模式，可以理解为表结构的定义；每个shema会映射到mongodb中的一个collection,他不具备操作数据库的能力
var Schema = mongoose.Schema//一种以文件形式存储的数据库骨架，不具备数据库的操作能力

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
//英雄介绍信息
var HeroInfo = new Schema({
  name: String,
  imgSrc: String,
	bestPartnerList: [{
		imgSrc: String,
		text: String
	},{
		imgSrc: String,
		text: String
	}],
	beRestrainedList: [{
		imgSrc: String,
		text: String
	},{
		imgSrc: String,
		text: String
	}],
	restrainedList: [{
		imgSrc: String,
		text: String
	},{
		imgSrc: String,
		text: String
	}],
	story: String,
	history: String
})
//英雄技能加点
var SkillPlus = new Schema({
		name: String,
		skill: [{
			name: String,
			imgSrc: String,
			coolingValue: String,
			text: String,
			tip: String
		},{
			name: String,
			imgSrc: String,
			coolingValue: String,
			text: String,
			tip: String
		},{
			name: String,
			imgSrc: String,
			coolingValue: String,
			text: String,
			tip: String
		},{
			name: String,
			imgSrc: String,
			coolingValue: String,
			text: String,
			tip: String
		}],
		lifting: {
			main: {
				imgSrc: String,
				name: String
			},
			vice: {
				imgSrc: String,
				name: String
			}
		},
		summoner: [{
				imgSrc: String,
				name: String
			},{
				imgSrc: String,
				name: String
			}]
})
//英雄使用技巧
var HeroUseSkill = {
	name: String,
	followPack: {
		title: String,
		tip: String,
		packList: [{
			title: String,
			imgSrc: String
		},{
			title: String,
			imgSrc: String
		},{
			title: String,
			imgSrc: String
		},{
			title: String,
			imgSrc: String
		},{
			title: String,
			imgSrc: String
		},{
			title: String,
			imgSrc: String
		}]
	},
	headwindPack: {
		title: String,
		tip: String,
		packList: [{
			title: String,
			imgSrc: String
		},{
			title: String,
			imgSrc: String
		},{
			title: String,
			imgSrc: String
		},{
			title: String,
			imgSrc: String
		},{
			title: String,
			imgSrc: String
		},{
			title: String,
			imgSrc: String
		}]
	},
	inscription: [{
		imgSrc: String,
		text: [Schema.Types.Mixed]
	},{
		imgSrc: String,
		text: [Schema.Types.Mixed]
	},{
		imgSrc: String,
		text: [Schema.Types.Mixed]
	}],
	use: String,
	confront: String,
	team: String
}
//策略图片轮播
var StrategyBannerNew = {
	title: String,
	image_url_big: String,
}
//策略视频信息列表
var StrategyVideoList = {
		index: Number,
		imgSrc: String,
		time: String,
		text: String,
		clickNum: String,
		lastClickTime: String
}
//策略--图文策略
var StrategyDataList = {
	aHref: String,
	imgSrc: String,
	text: String,
	time: String
}
//视频对象
var VideoPlayDataList = {
	index: Number,
	channelName: String,
	video: Schema.Types.Mixed,
	imgSrc: String,
	summary: String,
	number: String,
	fans: String
}
//赛事信息
var GameNewsList = {
	title: String,
	srcStr: String,
	dateStr: String
}

//将Schema发布为Model
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

module.exports.HeroInfo = mongoose.model('heroInfo', HeroInfo);//英雄介绍
module.exports.SkillPlus = mongoose.model('skillPlus', SkillPlus);//技能加点
module.exports.HeroUseSkill = mongoose.model('heroUseSkill', HeroUseSkill);//使用技巧

module.exports.StrategyBannerNew = mongoose.model('strategyBannerNew', StrategyBannerNew);//策略轮播图片信息
module.exports.StrategyVideoList = mongoose.model('strategyVideoList', StrategyVideoList);//策略视频信息列表
module.exports.StrategyDataList = mongoose.model('strategyDataList', StrategyDataList);//策略图文策略
module.exports.VideoPlayDataList = mongoose.model('videoPlayDataList', VideoPlayDataList);//视频播放信息

module.exports.GameNewsList = mongoose.model('gameNewsList', GameNewsList);//赛事信息
