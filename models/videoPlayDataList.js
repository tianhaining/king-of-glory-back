var VideoPlayDataList = require('../lib/mongo').VideoPlayDataList

module.exports = {
  save: (val) => {
    return VideoPlayDataList.create(val);
  },
  all: () => {
    return VideoPlayDataList.find().exec();
  },
  getVideoPlayDataListByIndex: (indexStr) => {
    return VideoPlayDataList.find({index: indexStr}).exec()
  },
  deleteAll: () => {
    return VideoPlayDataList.remove();
  }
}
