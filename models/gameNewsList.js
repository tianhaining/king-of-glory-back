var GameNewsList = require('../lib/mongo').GameNewsList

module.exports = {
  save: (val) => {
    return GameNewsList.create(val);
  },
  all: () => {
    return GameNewsList.find().exec();
  },
  deleteAll: () => {
    return GameNewsList.remove();
  }
}
