var HeroInfo = require('../lib/mongo').HeroInfo

module.exports = {
  save: (val) => {
    return HeroInfo.create(val);
  },
  all: () => {
    return HeroInfo.find().exec();
  },
  getHeroInfo: (nameStr) => {
    return HeroInfo.find({name: nameStr}).exec()
  },
  deleteAll: () => {
    return HeroInfo.remove();
  }
}
