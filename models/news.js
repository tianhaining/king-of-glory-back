var News = require('../lib/mongo').News

module.exports = {
  all: function(){
    return News.find().exec()
  }
}
