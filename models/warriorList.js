var WarriorList = require('../lib/mongo').WarriorList

module.exports = {
  save: (val) => {
    return WarriorList.create(val);
  },
  all: () => {
    return WarriorList.find().exec();
  }
}
