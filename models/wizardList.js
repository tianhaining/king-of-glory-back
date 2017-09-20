var WizardList = require('../lib/mongo').WizardList

module.exports = {
  save: (val) => {
    return WizardList.create(val);
  },
  all: () => {
    return WizardList.find().exec();
  }
}
