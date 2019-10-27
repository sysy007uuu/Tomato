var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    modalHidden: true,
    toastHidden: true
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '任务记录'
    })
    this.getLogs()
  },
  set: function () {

  },

  getLogs: function () {
    let logs = wx.getStorageSync('logs')
    for(var i = 0; i < logs.length; i++){
      var date = new Date(logs[i].startTime)
      var Y = date.getFullYear() + '年'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = date.getDate() + '日  '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()
      logs[i].startTime = Y + M + D + h + m + s;
    }
    this.setData({
      logs: logs
    })
  },
  onLoad: function () { },
  switchModal: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  hideToast: function () {
    this.setData({
      toastHidden: true
    })
  },
  clearLog: function (e) {
    wx.setStorageSync('logs', [])
    this.switchModal()
    this.setData({
      toastHidden: false
    })
    this.getLogs()
  }
})
