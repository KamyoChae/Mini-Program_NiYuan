// pages/comic/comic.js
 //var pub = require("../../utils/pub.js")
const app = getApp()
var indexNum = 0
var addHandNum = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comicArr:[],
    loveHate1 : "../../icon/love.png",
    loveHate2 : "../../icon/love.png",
    loveNum:0,
    hateNum:0,
    sawNum:100,
    comicObj: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.render() // 调用渲染页面函数
  },
  render:function(){

    
    wx.pageScrollTo({
      // 
      scrollTop: 0,
      duration: 10
    })
    // 渲染页面
    var that = this
    this.setData({
      comicArr: app.globalData.comicArr,
    })
    this.setData({
      comicObj: that.data.comicArr[indexNum]
    })
    indexNum ++; // 标记
    
    if (indexNum == this.data.comicArr.length){

      // 重新发起请求
      indexNum = 0;
      this.setRequestAgain()

    }
    console.log(this.data.comicObj)
    var newObj = this.data.comicObj
    this.randomNum(newObj)
  },
  randomNum:function(obj){
    var love = Number(obj.love) + Math.ceil(Math.random() * 5000 + 300)
    var hate = Number(obj.hate) + Math.ceil(Math.random() * 5000 + 400)
    var see =Math.ceil((love + hate) * 1.2)
   
    this.setData({
      loveNum: love,
      hateNum: hate,
      sawNum: see,
    })
  },
  next:function(){
    this.setData({
     loveHate1 : "../../icon/love.png",
     loveHate2 : "../../icon/love.png"
    })
    addHandNum = true;
    this.render()

  },

  addHand:function(e){
    console.log(e.target.id)
    var that = this
    if (addHandNum){
      if(e.target.id == "love"){
        console.log(111)
        this.setData({
          loveNum: + that.data.loveNum + 1,
          loveHate1: "../../icon/love2.png"
        })
      }
      if(e.target.id == "hate"){
        console.log(222)
        this.setData({
          hateNum: + that.data.hateNum + 1,
          loveHate2: "../../icon/love2.png"
        })
      }
      addHandNum = false
      console.log()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  setRequestAgain:function(){
      var page = Math.ceil(Math.random() * 159)
      wx.request({
        url: 'https://route.showapi.com/255-1?' + appUrl + '&&type=10&&page=' + page,
        success: res => {
          console.log(res.data.showapi_res_body.pagebean.contentlist)
          var that = this
          this.setData({
            comicArr : res.data.showapi_res_body.pagebean.contentlist
          })
          
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        fail: res => {
        // pub.netErr()
        },
      })
    
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