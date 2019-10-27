const app = getApp()
Page({
  data:{
    value:"", //休息时间
    value2:"", //工作时间
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modalHidden: true
  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '设置'
    })
    this.setData({
      value: wx.getStorageSync("restTime"),
      value2: wx.getStorageSync("workTime"),
    	workTime: wx.getStorageSync('workTime'),
    	restTime: wx.getStorageSync('restTime')
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  switchModal: function(){
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  clearLog: function(){
    wx.clearStorage()
    wx.clearStorageSync()
    let workTime = 25
    wx.setStorageSync('workTime',workTime)
    let restTime = 5
    wx.setStorageSync('restTime',restTime)
    this.switchModal()
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeRest: function(e){
    var v = e.detail.value
    this.setData({
      value: v
    })
  },
  changeWork: function (e) {
    var v = e.detail.value
    this.setData({
      value2: v
    })
  },
  changeWorkTime: function(e) {
    wx.setStorage({
      key: 'workTime',
      data: e.detail.value
    })
  },
  changeRestTime: function(e) {
  	wx.setStorage({
  		key: 'restTime',
  		data: e.detail.value
  	})
  }
})
