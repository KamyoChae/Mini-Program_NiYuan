// pages/wormhole/wormhole.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oActive: "",
    myHistory: "none",
    myNow: "none",
    mood: [], // 心情 {titile:标题，text:内容，time：时间}
    userInfo:{} // 用户头像 用户名
  },

  toHistory: function() {
    this.setData({
      oActive: "oActive",
      myHistory: "block",
      myNow: "none",
    })
  },
  toNow: function() {
    this.setData({
      oActive: "oActive",
      myHistory: "none",
      myNow: "block",
    })
  },
  toSave: function(e) {
    var date = new Date()
    var stime = ""
    stime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() // 记录当前时间
    var text = e.detail.value.text // 获取内容
    var arr = this.data.mood // 将系统数组存到临时数组里面 操作临时数组 最后赋值给全局数组
    var index = arr.length

    // 解决赋值问题
    arr[index] = {
      text: text,
      time: stime
    }
    this.setData({
      mood: arr
    })

    var that = this
    wx.setStorage({
      /**
       * 将更新后的数据存储全部到本地
       */
      key: 'mood',
      data: that.data.mood,
      success: function() {
        /**
         * 如果存成功了 就获取看一下
         */
        wx.showToast({
          title: '心情记录成功',
          icon:"success",
          success:function(){
            that.toHistory()
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })

    var that = this
    wx.getStorage({
      /**
       * 加载的时候检测一下本地缓存数据 读取一下
       */
      key: 'mood',
      success: function(res) {
        that.setData({
          mood: res.data
        })
      },
      fail: function() {
        // console.log("获取本地缓存mood失败")
      }
    })
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