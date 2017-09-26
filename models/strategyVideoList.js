var StrategyVideoList = require('../lib/mongo').StrategyVideoList

module.exports = {
  save: (val) => {
    return StrategyVideoList.create(val);
  },
  all: () => {
    return StrategyVideoList.find().exec();
  },
  deleteAll: () => {
    return StrategyVideoList.remove();
  }
}
