var AssassinList = require('../lib/mongo').AssassinList

module.exports = {
  save: (val) => {
    return AssassinList.create(val);
  },
  all: () => {
    return AssassinList.find().exec();
  }
}
