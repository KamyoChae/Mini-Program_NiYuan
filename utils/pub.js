
function doRequest(Url) {
  wx.request({
    url: Url,
    success: res => {
      return res
      console.log(res)
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    fail: res => {
     wx.showToast({
       title: '哎呀！网络出现了点问题',
     })
    },
  })
}

function add(){
  console.log("this is add")
}
module.exports = {
  add: add,
  doRequest: doRequest
}