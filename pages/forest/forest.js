// pages/forest/forest.js
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
    forestArr:[],
    forestObj:{},
    loveHate1: "../../icon/love.png",
    loveHate2: "../../icon/love.png",
    loveNum: 0,
    hateNum: 0,
    sawNum: 100,
  },
  doRequest:function(){

    var page = Math.ceil(Math.random() * 29)
    wx.request({
      url: 'https://route.showapi.com/255-1?' + appUrl + '&&type=29&&page=' + page,
      success: res => {
        console.log(res)
        console.log(res.data.showapi_res_body.pagebean.contentlist)
        var that = this
        this.setData({
          forestArr: res.data.showapi_res_body.pagebean.contentlist
        })
        this.setData({
          forestObj: that.data.forestArr[indexNum]
        })
        this.render()
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      fail: res => {
        pub.netErr()
      },
    })
  },
  render: function () {
    wx.pageScrollTo({
      // 
      scrollTop: 0,
      duration: 10
    })

    var that = this
    this.setData({
      forestObj: that.data.forestArr[indexNum]
    })
    indexNum++; // 标记

    if (indexNum == this.data.forestArr.length) {

      // 当索引等于数组长度

      // 重新发起请求
      indexNum = 0;
      this.init()
      this.doRequest()

    }
    var newObj = this.data.forestObj
    console.log(newObj)
    this.randomNum(newObj)
  },
  randomNum: function (obj) {
    var love = Number(obj.love) + Math.ceil(Math.random() * 5000 + 300)
    var hate = Number(obj.hate) + Math.ceil(Math.random() * 5000 + 400)
    var see = Math.ceil((love + hate) * 2)

    this.setData({
      loveNum: love,
      hateNum: hate,
      sawNum: see,
    })
  },
  next: function () {
    this.setData({
      loveHate1: "../../icon/love.png",
      loveHate2: "../../icon/love.png"
    })
    addHandNum = true;
    console.log(indexNum)
    this.render()
  },

  addHand: function (e) {
    console.log(e.target.id)
    var that = this
    if (addHandNum) {
      if (e.target.id == "love") {
        console.log(111)
        this.setData({
          loveNum: +that.data.loveNum + 1,
          loveHate1: "../../icon/love2.png"
        })
      }
      if (e.target.id == "hate") {
        console.log(222)
        this.setData({
          hateNum: +that.data.hateNum + 1,
          loveHate2: "../../icon/love2.png"
        })
      }
      addHandNum = false
    }
  },
  init: function () {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
    this.doRequest()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})