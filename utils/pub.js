// 只能放工具类方法 不能包含this方法
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
  netErr: netErr,
}