
function doRequest(Url) {
  wx.request({
    url: Url,
    success: res => {
      return res
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    fail: res => {
     wx.showToast({
       title: '哎呀！网络出现了点问题',
       icon:"none"
     })
    },
  })
}

function add(){
  console.log("this is add")
}

function netErr(){
  wx.showToast({
    title: '哎呀！网络异常了',
    icon:"none"
  })
}
module.exports = {
  add: add,
  doRequest: doRequest,
  netErr: netErr,
}