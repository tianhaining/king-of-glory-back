var TanksList = require('../lib/mongo').TanksList

module.exports = {
  save: (val) => {
    return TanksList.create(val);
  },
  all: () => {
    return TanksList.find().exec();
  }
}
