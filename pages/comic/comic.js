// pages/comic/comic.js
var pub = require("../../utils/pub.js")
const app = getApp()
var appUrl = app.globalData.appUrl
var indexNum = 0,
  once = 0;
var addHandNum = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comicArr: [],
    loveHate1: "../../icon/love.png",
    loveHate2: "../../icon/love.png",
    loveNum: 0,
    hateNum: 0,
    sawNum: 100,
    comicObj: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
    this.render() // 调用渲染页面函数
  },
  render: function() {
    wx.pageScrollTo({
      // 
      scrollTop: 0,
      duration: 10
    })
    // 渲染页面
    var that = this
    if (once == 0) {
      once = 1
      // 默认 indexNum = 0 , 当第一次启动时，将全局的数组存储过来
      this.setData({
        comicArr: app.globalData.comicArr,
      })
    }

    this.setData({
      comicObj: that.data.comicArr[indexNum]
    })
    indexNum++; // 标记

    if (indexNum == this.data.comicArr.length) {

      // 当索引等于数组长度

      // 重新发起请求
      indexNum = 0;
      this.setRequestAgain()

    }
    var newObj = this.data.comicObj
    this.randomNum(newObj)
  },
  randomNum: function(obj) {
    var love = Number(obj.love) + Math.ceil(Math.random() * 5000 + 300)
    var hate = Number(obj.hate) + Math.ceil(Math.random() * 5000 + 400)
    var see = Math.ceil((love + hate) * 2)

    this.setData({
      loveNum: love,
      hateNum: hate,
      sawNum: see,
    })
  },
  next: function() {
    this.setData({
      loveHate1: "../../icon/love.png",
      loveHate2: "../../icon/love.png"
    })
    addHandNum = true;
    this.render()
  },

  addHand: function(e) {
    var that = this
    if (addHandNum) {
      if (e.target.id == "love") {
        this.setData({
          loveNum: +that.data.loveNum + 1,
          loveHate1: "../../icon/love2.png"
        })
      }
      if (e.target.id == "hate") {
        this.setData({
          hateNum: +that.data.hateNum + 1,
          loveHate2: "../../icon/love2.png"
        })
      }
      addHandNum = false
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  setRequestAgain: function() {
    
    var page = Math.ceil(Math.random() * 159)
    wx.request({
      url: 'https://route.showapi.com/255-1?' + appUrl + '&&type=10&&page=' + page,
      success: res => {
        var that = this
        this.setData({
          comicArr: res.data.showapi_res_body.pagebean.contentlist
        })

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      fail: res => {
         pub.netErr()
      },
    })

  },
  init: function() {
    this.data.comicArr = []
    this.data.loveHate1 = "../../icon/love.png"
    this.data.loveHate2 = "../../icon/love.png"
    this.data.loveNum = 0
    this.data.hateNum = 0
    this.data.sawNum = 100
    this.data.comicObj = {}
    indexNum = 0
    once = 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})