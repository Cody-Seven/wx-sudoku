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
    buttonTexts: [
      { text: '检查', func: 'check'},
      { text: '重置', func: 'reset'},
      { text: '清理', func: 'clear'},
      { text: '重建', func: 'rebuild'}
    ],
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
    let gridData = grid.build()
    this.setData({
      gridData: gridData,
      originData: gridData
    })
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
  popUp: function (e) {
    let fixed = e.currentTarget.dataset.fixed
    let i = e.currentTarget.dataset.i
    let j = e.currentTarget.dataset.j
    if (!fixed){
      this.setData({
        'currentPosition.i': i,
        'currentPosition.j': j,
        showPop: !this.data.showPop
      })
    }
  },
  chooseNumber (e) {
    let value = e.currentTarget.dataset.value
    let position = 'gridData[' + this.data.currentPosition.i + '][' + this.data.currentPosition.j + ']'
    this.setData({
      [position]: value,
      showPop: !this.data.showPop
    })
  },
  check: function () {
    grid.check()
  },
  reset: function () {
    grid.reset()
  },
  clear: function () {
    grid.clear()
  },
  rebuild: function () {
    grid.rebuild()
  }
})