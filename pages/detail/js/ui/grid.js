// 生成九宫格页面

// import Toolkit from '../core/toolkit'
// const Generator = require('../core/generator')
// import Generator from '../core/generator'
import Sudoku from '../core/sudoku'
import Checker from '../core/checker'

class Grid {
  build () {
    const sudoku = new Sudoku()
    sudoku.make()
    return sudoku.puzzleMatrix
  }

  /**
   * 检查用户解密结果
  */
  check (data) {
    // 获取需要检查的数据.children()
    const checker = new Checker(data)
    if (checker.check()) {
      return true
    }else{
      return checker.matrixMarks
    }
    // 检查不成功，进行标记
    // const marks = checker.matrixMarks
    // return marks
  }
}

export default Grid