Page({
  data: {
    input: '',
    todos: [],
    leftCount: 0,
    allCompleted: false,
    
  },
  
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '清单'
    })
    this.load();
  },
  save: function(){
    wx.setStorageSync('todo_list', this.data.todos)
  },
  // 加载本地缓存
  load: function() {
    var todos = wx.getStorageSync('todo_list')
   
    if(todos) {
      var leftCount = todos.filter(function(item) {
        return !item.completed
      }).length
      this.setData({leftCount: leftCount})
    }
    this.setData({
      todos: todos? todos:[]
    })
  },
  

  inputChangeHandle: function(e){
    this.setData({input : e.detail.value})
  },
  // 增加任务数量
  addTodoHandle: function(e){
    if (!this.data.input || !this.data.input.trim()) return
    var todos = this.data.todos
    todos.push({name: this.data.input, completed: false})
    this.setData({
      input: '',
      todos: todos,
      leftCount: this.data.leftCount + 1,
    })
    this.save()
  },
   toggleTodoHandle: function(e){
     var index = e.currentTarget.dataset.index
     var todos = this.data.todos
     todos[index].completed = !todos[index].completed
     var app = getApp();
     if(todos[index].name === app.globalData.logName){
       app.globalData.logName = "工作";
     }
     this.setData({
       todos: todos,
       leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
     })
     this.save()
   },

   changeWorkName: function(e){
     var index = e.currentTarget.dataset.index
     var todos = this.data.todos
     var app = getApp()
     app.globalData.logName = todos[index].name
     wx.switchTab({
       url: '../index/index'
     })
   },
  
  
  removeTodoHandle: function(e){
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    var app = getApp();
    if (todos[index].name === app.globalData.logName) {
      app.globalData.logName = "工作";
    }
    var remove = todos.splice(index, 1)[0]
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
    })
    this.save()
  },

  toggleAllHandle: function(e){
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    for(var i = todos.length - 1; i >= 0; i--){
      todos[i].completed = this.data.allCompleted
    }
    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted? 0 : todos.length,
    })
    this.save()
  },
  changeworkName: function(e){
    var app = getApp();
    app.globalData.logName = e.detail.name;
  },
  clearCompletedHandle: function(e) {
    var todos = this.data.todos
    var remains = []
    for(var i = 0; i < todos.length; i++){
      todos[i].completed || remains.push(todos[i])
    }
    this.setData({ todos: remains })
    this.save()
  }
})