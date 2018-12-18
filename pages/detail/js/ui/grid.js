// 生成九宫格页面

// import Toolkit from '../core/toolkit'
// const Generator = require('../core/generator');
// import Generator from '../core/generator'
import Sudoku from '../core/sudoku'
import Checker from '../core/checker'
const $ = wx.createSelectorQuery()

class Grid {
  constructor(container) {
    this._$container = container;
  }
  build () {
    const sudoku = new Sudoku();
    sudoku.make();
    return sudoku.puzzleMatrix;
    const $rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
    const $colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right'];
    // const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
    //   return $('<span>').addClass($colGroupClasses[colIndex % 3]).addClass(cellValue ? 'fixed' : 'empty').text(cellValue)
    // }));
    // const $divArray = $cells.map(($spanArray, rowIndex) => {
    //   return $('<div>').addClass('row').addClass($rowGroupClasses[rowIndex % 3]).append($spanArray);
    // });

    // this._$container.append($divArray);
  }

  layout () {
    const width = $('span:first', this._$container).width();
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
  check () {
    // 获取需要检查的数据.children();
    const data = this._$container.children().map((rowindex, div) => {
      return $(div).children().map((colindex, span) => parseInt($(span).text()) || 0)
    })
      .toArray()
      .map($data => $data.toArray())
    const checker = new Checker(data)
    if (checker.check()) {
      return true;
    }
    // 检查不成功，进行标记
    const marks = checker.matrixMarks;
    this._$container.children().each((rowindex, div) => {
      $(div).children().each((colindex, span) => {
        const $span = $(span);
        // 如果是固定的那就什么都不干
        if ($span.is('.fixed') || marks[rowindex][colindex]) {
          $span.removeClass('error');
        }
        if (!marks[rowindex][colindex]) {
          $(span).addClass('error');
        }
      })
    })
  }
  /**
   * 重置当前迷盘
   */
  reset () {
    // 把fixed部分留下，其余清除
    this._$container.find('span:not(.fixed)').removeClass('error mark1 mark2').addClass('empty').text(0)
  }
  /**
   * 清理错误标记
   */
  clear () {
    this._$container.find('span.error').removeClass('error')
  }

  rebuild () {
    this._$container.empty();
    this.build();
    this.layout();
  }

  bindPopup (popup) {
    this._$container.on('click', 'span', e => {
      const $cell = $(e.target);
      !$(e.target).hasClass('fixed') && popup.popup($cell)
    })
  }
}

export default Grid;