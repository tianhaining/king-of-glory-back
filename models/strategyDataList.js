var StrategyDataList = require('../lib/mongo').StrategyDataList

module.exports = {
  save: (val) => {
    return StrategyDataList.create(val);
  },
  all: () => {
    return StrategyDataList.find().exec();
  },
  deleteAll: () => {
    return StrategyDataList.remove();
  }
}
