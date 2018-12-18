"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 矩阵数据工具
 */
class matrixToolkit {
    static makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    }
    static makeMatrix(v = 0) {
        return Array.from({ length: 9 }, () => { return this.makeRow(v); });
    }
    // Fisher-Yates洗牌算法
    static shuffe(array) {
        const endIndex = array.length - 1;
        for (let i = 0; i < endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
        console.log(array);
        return array;
    }
    /**
     * 检查
    */
    static checkFillable(matrix, n, rowIndex, colIndex) {
        // 行
        const row = matrix[rowIndex];
        // 列
        const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
        // 宫 坐标转换为宫坐标
        const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (let i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n)
                return false;
        }
        return true;
    }
}
;
/**
 * 宫坐标系工具
*/
const boxToolkit = {
    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};
class Tookit {
    static get matrix() {
        return matrixToolkit;
    }
    static get box() {
        return boxToolkit;
    }
}
exports.Tookit = Tookit;
;
exports.default = Tookit;
