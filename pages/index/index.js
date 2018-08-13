//index.js
//获取应用实例
const app = getApp()
var arrIndex = 0;

Page({
  data: {
    mottoType: '嗨！，你好呀~，欢迎来到霓远音舍，各位音舍人已经等您很久啦，您需要切换位面才能使用对应的功能，音舍主人还在努力地搭建寒舍，请不要太着急哦，那么现在...，请开启您的时空旅程吧',
    motto: "",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    display:"block",

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 首次登陆，打字效果

  Typing: function(arr) {
    var newArr = arr.split('')
    let that = this;
    var obj = {}
    obj.typeTimer = setInterval(() => {
      if (newArr.length  == arrIndex) {
        // 打字结束 做点别的
        console.log("打字结束")
        clearInterval(obj.typeTimer); // 清除定时器
      } else {
        that.setData({
          motto: that.data.motto + newArr[arrIndex]
        })
        arrIndex++;

        var timer1 = null;
        if (newArr[arrIndex] == "，") {
          arrIndex = arrIndex + 1

          this.data.motto += "\n"
          clearInterval(obj.typeTimer);
          timer1 = setTimeout(() => {
            this.Typing(this.data.mottoType)
          }, 2000)
        }
      }
    }, 100)
  },

  // 页面加载时 触发该函数
  onLoad: function() {
    try{
      var that = this
      wx.getStorage({
        key: 'key',
        success: function (res) { 
          that.setData({
            display:"none"
          })
        },
      })
    }catch(e){
      console.log('不是第一次存储')
    }
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        display:"none",
        hasUserInfo: true
      })
     console.log(5555)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo,
          
          this.setData({
            userInfo: res.userInfo,
       
            hasUserInfo: true
          })
        }
      })
    }
    /*
    wx.request({
      url: 'https://route.showapi.com/213-1?showapi_appid=72331&&showapi_sign=e1825c1e5db6424b985601f3b498d370&&keyword="海阔天空"',
      success: res => {
        console.log(res)
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      fail: res => {
        console.log(res)
      },
    })
    */
  
    this.add()
    console.log(this.data.display)
    this.Typing(this.data.mottoType)
  },

  add: function() {
    console.log("add")
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  setStorageIn:function(){
    wx.setStorage({
      key: "key",
      data: "login"
    })
  }
})