"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 检查解决方案
function checkArray (array) {
  const length = array.length;
  const marks = new Array(length);
  marks.fill(true);
  for (let i = 0; i < length; i++) {
    const v = array[i];
    // 是否有效 0判断
    if (!v) {
      marks[i] = false;
      continue;
    }
    // 是否有重复
    for (let j = i + 1; j < length; j++) {
      if (v === array[j]) {
        marks[i] = marks[j] = false;
      }
    }
  }
  return marks;
}
const toolkit_1 = require("./toolkit");
//输入用户完成的数独数据 9*9，对这个matrix进行行列宫检查
class Checker {
  constructor(matrix) {
    this._matrix = matrix;
    this._matrixMarks = toolkit_1.default.matrix.makeMatrix(true); // 9*9的true
  }
  get matrixMarks () {
    return this._matrixMarks;
  }
  get isSuccess () {
    return this._success;
  }
  check () {
    this.checkRow();
    this.checkCol();
    this.checkBoxes();
    //检查所以是否为true
    this._success = this._matrixMarks.every(row => row.every(mark => mark));
    return this._success;
  }
  checkRow () {
    for (let rowindex; rowindex < 9; rowindex++) {
      const row = this._matrix[rowindex];
      const marks = checkArray(row);
      for (let colindex = 0; colindex < marks.length; colindex++) {
        if (!marks[colindex]) {
          this._matrixMarks[rowindex][colindex] = false;
        }
      }
    }
  }
  checkCol () {
    for (let colindex = 0; colindex < 9; colindex++) {
      const cols = [];
      for (let rowindex = 0; rowindex < 9; rowindex++) {
        cols[rowindex] = this._matrix[rowindex][colindex];
      }
      const marks = checkArray(cols);
      for (let rowindex = 0; rowindex < marks.length; rowindex++) {
        if (!marks[rowindex]) {
          this._matrixMarks[rowindex][colindex] = false;
        }
      }
    }
  }
  checkBoxes () {
    for (let boxindex = 0; boxindex < 9; boxindex++) {
      const boxes = toolkit_1.default.box.getBoxCells(this._matrix, boxindex);
      const marks = checkArray(boxes);
      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        if (!marks[cellIndex]) {
          const { rowIndex, colIndex } = toolkit_1.default.box.convertFromBoxIndex(boxindex, cellIndex);
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }
}
exports.Checker = Checker;
exports.default = Checker;
