var express = require('express')
var router = express.Router()
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
var HeroUseSkill = require('./models/heroUseSkill')//使用技巧

var StrategyBannerNew = require('./models/strategyBannerNew')//策略轮播图片信息
var StrategyVideoList = require('./models/strategyVideoList')//策略视频列表信息
var StrategyDataList = require('./models/strategyDataList')//策略图文策略
var VideoPlayDataList = require('./models/videoPlayDataList')//策略视频信息

var GameNewsList = require('./models/gameNewsList')//赛事信息
//路由决定了由谁去响应客户端请求，在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST请求
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
//保存使用技巧信息
router.post('/saveHeroUseSkill', (req, res, next) => {
    HeroUseSkill
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
//根据英雄名称获取使用技巧
router.get('/getHeroUseSkillByName', (req, res, next) => {
    var name = req.query.name
    HeroUseSkill
        .getHeroUseSkillByName(name)
        .then((data) => {
            res.json({
                code: 0,
                heroUseSkill: data
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})
//删除使用技巧
router.get('/deleteAllHeroUseSkill', (req, res, next) => {
    HeroUseSkill
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

//保存策略轮播图片信息
router.post('/saveStrategyBannerNew', (req, res, next) => {
    StrategyBannerNew
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
//获取策略轮播图片信息
router.get('/getStrategyBannerNew', (req, res, next) => {
    StrategyBannerNew
    .all()
    .then((list) => {
        res.json({
          code: 0,
          strategyBannerNew: list
        })
    })
    .catch(() => {
        res.json({
          code: 1
        })
    })
})

//保存策略视频列表信息
router.post('/saveStrategyVideoList', (req, res, next) => {
    StrategyVideoList
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
//获取策略视频列表信息
router.get('/getStrategyVideoList', (req, res, next) => {
    StrategyVideoList
    .all()
    .then((list) => {
        res.json({
          code: 0,
          strategyVideoList: list
        })
    })
    .catch(() => {
        res.json({
          code: 1
        })
    })
})

//TODO 保存策略图文策略信息
router.post('/saveStrategyDataList', (req, res, next) => {
    StrategyDataList
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
//获取策略图文策略信息
router.get('/getStrategyDataList', (req, res, next) => {
    StrategyDataList
    .all()
    .then((list) => {
        res.json({
          code: 0,
          strategyDataList: list
        })
    })
    .catch(() => {
        res.json({
          code: 1
        })
    })
})

//TODO 保存视频信息
router.post('/saveVideoPlayDataList', (req, res, next) => {
    VideoPlayDataList
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
//TODO 根据index获取视频信息
router.get('/getVideoPlayDataListByIndex', (req, res, next) => {
    var index = req.query.index
    VideoPlayDataList
        .getVideoPlayDataListByIndex(index)
        .then((data) => {
            res.json({
                code: 0,
                videoPlayData: data
            })
        })
        .catch(() => {
            res.json({
                code: 1
            })
        })
})
//TODO 删除所有视频信息
router.get('/deleteAllVideoPlayDataList', (req, res, next) => {
    VideoPlayDataList
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

//TODO 保存赛事信息
router.post('/saveGameNewsList', (req, res, next) => {
    GameNewsList
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
//TODO 获取赛事信息
router.get('/getGameNewsList', (req, res, next) => {
    GameNewsList
    .all()
    .then((list) => {
        res.json({
          code: 0,
          gameNewsList: list
        })
    })
    .catch(() => {
        res.json({
          code: 1
        })
    })
})
module.exports = router
