var express = require('express')
var router = express.Router()
var User = require('./models/user.js')
var Questionaire = require('./models/questionaire.js')
var sha1 = require('sha1')

//TODO king-of-glory
var News = require('./models/news.js')
var BannersNews = require('./models/bannersNews')
var TanksList = require('./models/tanksList')
var WarriorList = require('./models/warriorList')
var WizardList = require('./models/wizardList')
var ShooterList = require('./models/shooterList')
var AssassinList = require('./models/assassinList')
var AssistList = require('./models/assistList')

var HeroInfo = require('./models/heroInfo')//英雄介绍
var SkillPlus = require('./models/skillPlus')//技能加点
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

//TODO king-of-glory

//保存资讯数据
router.post('/saveNews', (req, res, next) => {
    News
      .save(req.body)
      .then(() => {
          res.json({
              code: 0,
              message: '发送成功'
          })
      })
      .catch(() => {
            res.json({
                code: 1,
                message: '发送失败'
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
})
//获取资讯数据
router.get('/getNews', (req, res, next) => {
    News
      .all()
      .then((list) => {
          res.json({
              code: 0,
              news: list
          })
      })
      .catch(() => {
          res.json({
              code: 1
          })
      })
})
//保存坦克列表信息
router.post('/saveTanksList', (req, res, next) => {
    TanksList
      .save(req.body)
      .then((list) => {
          res.json({
              code: 0,
              message: '发送成功'
          })
      })
      .catch(() => {
          res.json({
              code: 1,
              message: '发送失败'
          })
    })
})
//获取坦克列表信息
router.get('/getTanksList', (req, res, next) => {
    TanksList
    .all()
    .then((list) => {
        res.json({
          code: 0,
          tanksList: list
        })
    })
    .catch(() => {
        res.json({
          code: 1
        })
    })
})
//TODO 保存战士列表信息
router.post('/saveWarriorList', (req, res, next) => {
    WarriorList
    .save(req.body)
    .then((list) => {
      res.json({
        code: 0,
        message: '发送成功'
      })
    })
    .catch(() => {
      res.json({
        code: 1,
        message: '发送失败'
      })
    })
})
//TODO 获取战士列表信息
router.get('/getWarriorList', (req, res, next) => {
  WarriorList
  .all()
  .then((list) => {
    res.json({
      code: 0,
      warriorList: list
    })
  })
  .catch(() => {
    res.json({
      code: 1
    })
  })
})
//保存法师列表信息
router.post('/saveWizardList', (req, res, next) => {
    WizardList
      .save(req.body)
      .then((list) => {
          res.json({
              code: 0,
              message: '发送成功'
          })
      })
      .catch(() => {
          res.json({
              code: 1,
              message: '发送失败'
          })
    })
})
//获取法师列表信息
router.get('/getWizardList', (req, res, next) => {
    WizardList
    .all()
    .then((list) => {
        res.json({
          code: 0,
          wizardList: list
        })
    })
    .catch(() => {
        res.json({
          code: 1
        })
    })
})
//保存射手列表信息
router.post('/saveShooterList', (req, res, next) => {
    ShooterList
      .save(req.body)
      .then((list) => {
          res.json({
              code: 0,
              message: '发送成功'
          })
      })
      .catch(() => {
          res.json({
              code: 1,
              message: '发送失败'
          })
    })
})
//获取射手列表信息
router.get('/getShooterList', (req, res, next) => {
    ShooterList
    .all()
    .then((list) => {
        res.json({
          code: 0,
          shooterList: list
        })
    })
    .catch(() => {
        res.json({
          code: 1
        })
    })
})
//保存刺客列表信息
router.post('/saveAssassinList', (req, res, next) => {
    AssassinList
      .save(req.body)
      .then((list) => {
          res.json({
              code: 0,
              message: '发送成功'
          })
      })
      .catch(() => {
          res.json({
              code: 1,
              message: '发送失败'
          })
    })
})
//获取刺客列表信息
router.get('/getAssassinList', (req, res, next) => {
    AssassinList
    .all()
    .then((list) => {
        res.json({
          code: 0,
          assassinList: list
        })
    })
    .catch(() => {
        res.json({
          code: 1
        })
    })
})
//删除刺客信息列表
router.get('/deleteAllAssassinList', (req, res, next) => {
    AssassinList
        .deleteAll()
        .then((data) => {
            res.json({
                code: 0,
                message: '删除成功'
            })
        })
        .catch(() => {
            res.json({
                code: 1,
                message: '删除失败'
            })
        })
})
//保存辅助列表信息
router.post('/saveAssistList', (req, res, next) => {
    AssistList
      .save(req.body)
      .then((list) => {
          res.json({
              code: 0,
              message: '发送成功'
          })
      })
      .catch(() => {
          res.json({
              code: 1,
              message: '发送失败'
          })
    })
})
//获取辅助列表信息
router.get('/getAssistList', (req, res, next) => {
    AssistList
    .all()
    .then((list) => {
        res.json({
          code: 0,
          assistList: list
        })
    })
    .catch(() => {
        res.json({
          code: 1
        })
    })
})
//保存英雄介绍信息
router.post('/saveHeroInfo', (req, res, next) => {
    HeroInfo
      .save(req.body)
      .then((list) => {
          res.json({
              code: 0,
              message: '发送成功'
          })
      })
      .catch(() => {
          res.json({
              code: 1,
              message: '发送失败'
          })
    })
})
//根据英雄名称获取英雄介绍
router.get('/getHeroInfoByName', (req, res, next) => {
    var name = req.query.name
    HeroInfo
        .getHeroInfo(name)
        .then((data) => {
            res.json({
                code: 0,
                heroInfo: data
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})
//删除英雄介绍
router.get('/deleteAllHeroInfo', (req, res, next) => {
    HeroInfo
        .deleteAll()
        .then((data) => {
            res.json({
                code: 0,
                message: '删除成功'
            })
        })
        .catch(() => {
            res.json({
                code: 1,
                message: '删除失败'
            })
        })
})
//保存技能加点信息
router.post('/saveSkillPlus', (req, res, next) => {
    SkillPlus
      .save(req.body)
      .then((list) => {
          res.json({
              code: 0,
              message: '发送成功'
          })
      })
      .catch(() => {
          res.json({
              code: 1,
              message: '发送失败'
          })
    })
})
//根据英雄名称获取技能加点
router.get('/getSkillPlusByName', (req, res, next) => {
    var name = req.query.name
    SkillPlus
        .getSkillPlusByName(name)
        .then((data) => {
            res.json({
                code: 0,
                skillPlus: data
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})
//删除技能加点
router.get('/deleteAllSkillPlus', (req, res, next) => {
    SkillPlus
        .deleteAll()
        .then((data) => {
            res.json({
                code: 0,
                message: '删除成功'
            })
        })
        .catch(() => {
            res.json({
                code: 1,
                message: '删除失败'
            })
        })
})
module.exports = router
