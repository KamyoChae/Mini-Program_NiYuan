// pages/farm/farm.js
var pub = require("../../utils/pub.js")
var val = null;
const app = getApp()
var appUrl = app.globalData.appUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/209382282.m4a?fromtag=46'+"",
    value: "",
    inClass: "",
    focus: false,
    fly: "",
  },

  watchMusic: function(event) {

    // 监听输入字符串 用于搜歌曲
    console.log(event.detail.value)
    val = event.detail.value
  },

  farmMusic: function() {

    // 发起网络请求
    wx.request({
      url: 'https://route.showapi.com/213-1?' + appUrl +'&&keyword="梁祝"',
      success: res => {
        if(res.data.showapi_res_code !== 0){
          pub.netErr()
        }
        console.log(res)
      },
      fail:res=>{
        pub.netErr()
      }

    })
  },



  showInput: function() {

    // 输入框动画
    /**
     * 伸长输入框 飞动搜索按钮到右上角
     * 再次点击搜索按钮会发起搜索请求
     */
    this.setData({
      inClass: "rect-long",
      focus: true,
      fly: "fly",
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.farmMusic()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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