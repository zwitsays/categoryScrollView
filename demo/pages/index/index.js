//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    categoryData: [],//分类数组
    pageIndexs: [],// 当前分类当前的页数
    isLastPages: [],// 当前分类是否是尾页
    pageData: [1, 2, 3, 4, 5, 6, 7, 8, 9],//page数据
    activeIndex: 0,
    slideOffsetLeft: 20,
    tabW: 0,
    titleW: 0,
    slideW: 42,
    index: 0,
    toView: 'view0',
    boundsArray: [],
    colorArray: ['lightcoral', 'lightgreen', 'lightskyblue', 'lightsalmon', 'lightyellow','lightseagreen']
  },
  onLoad: function (options) {
    var that = this
    that.loadCategoryData()
  },
  // 获取分类列表
  loadCategoryData: function () {
    var that = this

    that.setData({
      categoryData: [{ 'index': '0', 'categoryName': '分类一' },
      { 'index': '1', 'categoryName': '分类二' },
      { 'index': '2', 'categoryName': '三类' },
      { 'index': '3', 'categoryName': '分类四' },
      { 'index': '4', 'categoryName': '分类五长度' },
      { 'index': '5', 'categoryName': '分类6的长度' },]
    })

    that.getCategoryBounds()

  },

  //获取分类的bounds信息
  getCategoryBounds: function () {
    var that = this
    var boundsArray = []
    for (var i = 0; i < this.data.categoryData.length; i++) {
      var query = wx.createSelectorQuery();
      var idString = '#view' + i
      query.select(idString).boundingClientRect()
      query.exec((res) => {
        boundsArray.push(res[0])
      })
    }

    setTimeout(function () {
      console.log(boundsArray)
      that.setData({
        boundsArray: boundsArray,
        slideW: boundsArray[that.data.activeIndex].width,
        slideOffsetLeft: boundsArray[that.data.activeIndex].left
      })
    }, 500)

  },
  //分类栏点击事件
  tabClick: function (e) {
    console.log(e)
    var that = this;
    var index = 0;
    for (var i = 0; i < this.data.categoryData.length; i++) {
      if (this.data.categoryData[i].index === e.currentTarget.dataset.item.index) {
        index = i
        break
      }
    }
    var bounds = that.data.boundsArray[index]
    that.setData({
      activeIndex: index,
      slideW: bounds.width,
      slideOffsetLeft: bounds.left
    })

    if (index > 0) {
      that.setData({
        toView: 'view' + (index - 1)
      })
    }
  },

  //视图滑动事件
  bindChange: function (e) {
    var that = this
    var current = e.detail.current;
    var bounds = that.data.boundsArray[current];

    this.setData({
      activeIndex: current,
      index: current,
      slideW: bounds.width,
      slideOffsetLeft: bounds.left,
      toView: 'view' + parseInt(current)
    });
  }
})
