var  Questionaire = require('../lib/mongo').Questionaire

module.exports = {
    save: function (questionaire) {
        return Questionaire
            .create(questionaire)
    },
    all: function () {
        return Questionaire
            .find()
            .exec()
    },
    one: function (id) {
        return Questionaire
            .find({_id: id})
            .exec()
    },
    submit: function (id, feedback) {
        return Questionaire
            .update(
                {_id: id},
                {$push: {feedbackes: feedback}} 
            )        
    },
    getAllByUser: function (id) {
        return Questionaire
            .find({ower: id})
            .exec()
    },
    delete: function (idArr) {
        return Questionaire
            .remove({
                _id: {$in: idArr}
            })
    },
    update: function(id, newQuestionnaire){
        return Questionaire
        .update(
            {_id: id},
            newQuestionnaire
        )
    },
}