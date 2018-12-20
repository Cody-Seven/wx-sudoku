// 生成九宫格页面

// import Toolkit from '../core/toolkit'
// const Generator = require('../core/generator')
// import Generator from '../core/generator'
import Sudoku from '../core/sudoku'
import Checker from '../core/checker'
const $ = wx.createSelectorQuery()

class Grid {
  constructor(container) {
    this._$container = container
  }
  build () {
    const sudoku = new Sudoku()
    sudoku.make()
    return sudoku.puzzleMatrix
  }

  layout () {
    const width = $('span:first', this._$container).width()
    $('span', this._$container)
      .height(width)
      .css({
        'line-height': `${width}px`,
        'font-size': width < 32 ? `${width / 2}px` : ''
      })
  }
  /**
   * 检查用户解密结果
  */
  check (data) {
    // 获取需要检查的数据.children()
    const checker = new Checker(data)
    if (checker.check()) {
      return true
    }
    // 检查不成功，进行标记
    const marks = checker.matrixMarks
    return marks
  }

  rebuild () {
    this._$container.empty()
    this.build()
    this.layout()
  }
}

export default Grid