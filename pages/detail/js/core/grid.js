// 生成九宫格页面

import Sudoku from './sudoku'
import Checker from './checker'

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
    const checker = new Checker(data)
    if (checker.check()) {
      return true
    }else{
      return checker.matrixMarks
    }
  }
}

export default Grid