var ShooterList = require('../lib/mongo').ShooterList

module.exports = {
  save: (val) => {
    return ShooterList.create(val);
  },
  all: () => {
    return ShooterList.find().exec();
  }
}
