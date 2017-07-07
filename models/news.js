var News = require('../lib/mongo').News

module.exports = {
  save: function (val) {//保存数据用于测试
      return News.create(val)
  },
  all: function(){
    return News.find().exec()
  }
}
