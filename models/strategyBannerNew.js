var StrategyBannerNew = require('../lib/mongo').StrategyBannerNew

module.exports = {
  save: (val) => {
    return StrategyBannerNew.create(val);
  },
  all: () => {
    return StrategyBannerNew.find().exec();
  },
  deleteAll: () => {
    return StrategyBannerNew.remove();
  }
}
