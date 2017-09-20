var AssistList = require('../lib/mongo').AssistList

module.exports = {
  save: (val) => {
    return AssistList.create(val);
  },
  all: () => {
    return AssistList.find().exec();
  }
}
