// pages/detail/detail.js
import Grid from './js/ui/grid'

const $ = wx.createSelectorQuery()
const grid = new Grid($.select('#container'))
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPop: false,
    gridData: [],
    originData: [],
    currentPosition: {},
    top: 0,
    left: 0,
    buttonTexts: [
      { text: '检查', func: 'check'},
      { text: '重置', func: 'reset'},
      { text: '清理', func: 'clear'},
      { text: '重建', func: 'rebuild'}
    ],
    errorMarks: [], // 错误标记
    mark1: [],
    numberArray: [
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.build()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  build () {
    let gridData = grid.build()
    this.setData({
      gridData: gridData,
      originData: gridData
    })
    // 初始化errorMarks
    this.setData({
      errorMarks: this.buildArray(),
      mark1: this.buildFalseArray(),
      mark2: this.buildFalseArray()
    })
  },
  popUp: function (e) {
    let fixed = e.currentTarget.dataset.fixed
    let i = e.currentTarget.dataset.i
    let j = e.currentTarget.dataset.j
    let left = e.currentTarget.offsetLeft
    let top = e.currentTarget.offsetTop
    // 控制数据
    if (!fixed){
      this.setData({
        'currentPosition.i': i,
        'currentPosition.j': j,
        showPop: !this.data.showPop
      })
    }
    // 控制弹框位置
    left = left > 245 ? left - 120 : left + 25
    top = top > 251 ? top - 170 - 20 : top + 20
    this.setData({
      top: top,
      left: left
    })
  },
  chooseNumber (e) {
    let value = e.currentTarget.dataset.value
    let position = 'gridData[' + this.data.currentPosition.i + '][' + this.data.currentPosition.j + ']'
    this.setData({
      [position]: value,
      showPop: !this.data.showPop
    })
  },
  doMark1 () {
    let position = 'mark1[' + this.data.currentPosition.i + '][' + this.data.currentPosition.j + ']'
    this.setData({
      [position]: true,
      showPop: !this.data.showPop
    })
  },
  doMark2 () {
    let position = 'mark2[' + this.data.currentPosition.i + '][' + this.data.currentPosition.j + ']'
    this.setData({
      [position]: true,
      showPop: !this.data.showPop
    })
  },
  check: function () {
    // 检查每行 每列 每宫数据
    let result = grid.check(this.data.gridData)
    if (result===true){
      console.log('success')
    }else{
      this.setData({
        errorMarks: result
      })
    }

  },
  reset: function () {
    // 清除错误标记
    this.setData({
      errorMarks: this.buildArray()
    })
    // 数据恢复
    this.setData({
      gridData: this.data.originData
    })
  },
  clear: function () {
    // 清除标记
    this.setData({
      mark1: this.buildFalseArray(),
      mark2: this.buildFalseArray()
    })
  },
  rebuild: function () {
    // 生成新的迷盘
    this.build()
    // 清除标记
  },
  buildFalseArray: function () {
    return Array.from({ length: 9 }).map(() => Array.from({ length: 9 }).map(() => { return false }))

  },
  buildArray: function () {
    return Array.from({ length: 9 }).map(() => Array.from({ length: 9 }).map(() => { return true }))
  }
})