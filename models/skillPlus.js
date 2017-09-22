var SkillPlus = require('../lib/mongo').SkillPlus

module.exports = {
  save: (val) => {
    return SkillPlus.create(val);
  },
  all: () => {
    return SkillPlus.find().exec();
  },
  getSkillPlusByName: (nameStr) => {
    return SkillPlus.find({name: nameStr}).exec()
  },
  deleteAll: () => {
    return SkillPlus.remove();
  }
}
