//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力

    // 在加载的同时 获取logs 如果没有logs，则把logs置空数组
    var logs = wx.getStorageSync('logs') || [] 

    // 将当前启动时间添加到日志最顶端
    logs.unshift(Date.now())

    // 将同步覆盖原来的logs
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({

      // 登录成功 同success:function(res){...}
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户当前的授权状态
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    comicArr:[],
    appUrl : "showapi_appid=72331&&showapi_sign=e1825c1e5db6424b985601f3b498d370"
  },

})