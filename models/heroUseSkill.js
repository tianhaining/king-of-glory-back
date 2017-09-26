var HeroUseSkill = require('../lib/mongo').HeroUseSkill

module.exports = {
  save: (val) => {
    return HeroUseSkill.create(val);
  },
  all: () => {
    return HeroUseSkill.find().exec();
  },
  getHeroUseSkillByName: (nameStr) => {
    return HeroUseSkill.find({name: nameStr}).exec()
  },
  deleteAll: () => {
    return HeroUseSkill.remove();
  }
}
