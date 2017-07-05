var bannersNews = require('../lib/mongo').BannersNews

module.exports = {
  all: function(){
    return bannersNews.find().exec()
  }
}
