var express = require('express')
var router = express.Router()
var User = require('./models/user.js')
var Questionaire = require('./models/questionaire.js')
var News = require('./models/news.js')
var BannersNews = require('./models/bannersNews')
var sha1 = require('sha1')
//路由决定了由谁去响应客户端请求，在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST请求
// 注册
router.post('/register', (req, res, next) => {
    User.save({username: req.body.registerName, password: sha1(req.body.registerPassword)})
        .then((data) => {
            res.json({
                code: 0,
                id: data._id
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})

// 登录
router.post('/login', (req, res, next) => {
    User.findOne(req.body.loginName)
        .then((data) => {
            // 用户名不存在  直接返回
            if (!data) {
                res.json({
                    code: 1
                })
            }
            if (sha1(req.body.loginPassword) === data.password) {
                res.json({
                    code: 0,
                    id: data.id
                })
            } else {
                res.json({
                    code: 1
                })
            }
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})

// 保存问卷
router.post('/save', (req, res, next) => {
    Questionaire
        .save(req.body)
        .then(() => {
            res.json({
                code: 0
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})

// 更新问卷
router.post('/update', (req, res, next) => {
    Questionaire
        .update(req.body.id, req.body.newQuestionaire)
        .then(() => {
            res.json({
                code: 0
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})

// 返回所有未过期问卷
router.get('/all', (req, res, next) => {
    var arr = []
    Questionaire
        .all()
        .then((list) => {
            list.forEach((item) => {
                if (Number(item.deadTime) > new Date().getTime() && !item.edit) {
                    arr.push({
                        id: item._id,
                        createTime: item.createTime,
                        title: item.questionaire.title
                    })
                }
            })
            res.json({
                code: 0,
                questionaires: arr
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})

// 返回指定问卷
router.get('/questionaire/:id', (req, res, next) => {
    var id = req.params.id
    Questionaire
        .one(id)
        .then((data) => {
            res.json({
                code: 0,
                questionaire: data[0].questionaire
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})

// 返回回答数据
router.get('/data/:id', (req, res, next) => {
    var id = req.params.id
    var finalData = {
        title: '',
        questionData: []
    }
    Questionaire
        .one(id)
        .then((data) => {
            data = data[0]
            finalData.title = data.questionaire.title
            // 建立映射
            data.questionaire.questions.forEach((question) => {
                var temp = {
                    title: question.content.title,
                    optionNum: []
                }
                switch (question.type) {
                    case 'single':
                        question.content.options.forEach(() => {
                            temp.optionNum.push(0)
                        })
                        break
                    case 'multiple':
                        question.content.options.forEach(() => {
                            temp.optionNum.push(0)
                        })
                        break
                    case 'txt':
                        temp.optionNum = [0, 0]
                }
                finalData.questionData.push(temp)
            })
            // add Number
            data.feedbackes.forEach((feedBack) => {
                feedBack.forEach((item, index) => {
                    switch (item.type) {
                        case 'single':
                            finalData.questionData[index].optionNum[Number(item.option.slice(6))]++
                            break
                        case 'multiple':
                            for (var i = 0; i < item.option.length; i++) {
                                finalData.questionData[index].optionNum[Number(item.option[i].slice(6))]++
                            }
                            break
                        case 'txt':
                            if (item.option) {
                                finalData.questionData[index].optionNum[0]++
                            } else {
                                finalData.questionData[index].optionNum[1]++
                            }
                    }
                })
            })
            console.log(finalData)
            res.json({
                code: 0,
                finalData: finalData
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})

// 提交问卷
router.post('/submit', (req, res, next) => {
    var id = req.body.id
    var data = req.body.data
    Questionaire
        .submit(id, data)
        .then(() => {
            res.json({
                code: 0,
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})
//
// 获取用户的问卷
router.get('/getAllByUser', (req, res, next) => {
    var id = req.query.id
    var items = []
    Questionaire
        .getAllByUser(id)
        .then((data) => {
            data.forEach((item) => {
                items.push({
                    id: item._id,
                    createTime: item.createTime,
                    deadTime: item.deadTime,
                    edit: item.edit,
                    title: item.questionaire.title
                })
            })
            res.json({
                code: 0,
                items: items
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})
// 删除问卷
router.post('/delete', (req, res, next) => {
    var idArr = req.body.idArr
    Questionaire
        .delete(idArr)
        .then(() => {
            res.json({
                code: 0
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})
//获取资讯轮播图片数据
router.get('/getBannersNews', (req, res, next) => {
  BannersNews
      .all()
      .then((list) => {
          res.json({
              code: 0,
              bannersNews: list
          })
      })
      .catch(() => {
          res.json({
              code: 1
          })
      })
  // res.json([{
  //   id: 1,
  // 	title: "我们一起赢",
  // 	image_url_big: "http://ossweb-img.qq.com/upload/adw/image/1499222131/1499222131.jpg?_r=1499222132",
  // }, {
  //   id: 2,
  // 	title: "王者决战",
  // 	image_url_big: "http://ossweb-img.qq.com/upload/adw/image/1499073753/1499073753.jpg?_r=1499222132",
  // },{
  //   id: 3,
  // 	title: "明星赛直播",
  // 	image_url_big: "http://ossweb-img.qq.com/upload/adw/image/1499221833/1499221833.jpg?_r=1499222132",
  // }]);
})
module.exports = router
