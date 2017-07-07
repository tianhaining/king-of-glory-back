var bannersNews = require('../lib/mongo').BannersNews

module.exports = {
  save: function (banner) {
      return bannersNews
          .create(banner)
  },
  all: function(){
    return bannersNews.find().exec()
  }
}
