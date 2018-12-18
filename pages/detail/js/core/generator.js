"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 生成解决方案
const toolkit_1 = require("./toolkit");
class Generator {
    generate() {
        while (!this.internalGenerate()) {
            console.log('try again');
        }
        return this.matrix;
    }
    internalGenerate() {
        // 先生成一个9*9的默认值为0矩阵
        // this.matrix = Toolkit.matrix.makeMatrix();
        // this.orders = Toolkit.matrix.makeMatrix()
        //   .map(row => row.map((v, i) => { return i }))
        //   .map(row => { return Toolkit.matrix.shuffe(row) });
        // Toolkit.matrix.makeRow().every((n, i) => this.fillNumber(i + 1));
        // for (let n = 1; n <= 9; n++) {
        //   if (!this.fillNumber(n)) {
        //     return false;
        //   }
        // }
        // return true
        this.matrix = toolkit_1.default.matrix.makeMatrix();
        this.orders = Array.from({ length: 9 })
            .map(() => Array.from({ length: 9 }, (x, i) => i))
            .map(row => toolkit_1.default.matrix.shuffe(row));
        return Array.from({ length: 9 })
            .every((n, i) => this.fillNumber(i + 1));
    }
    fillNumber(n) {
        return this.fillRow(n, 0);
    }
    fillRow(n, rowIndex) {
        if (rowIndex > 8)
            return true;
        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];
        for (let i = 0; i < orders.length; i++) {
            // const rowIndex = i;
            const colIndex = orders[i];
            // 有值跳过
            if (row[colIndex])
                continue;
            // 检查改行是否可以填写n
            if (!toolkit_1.default.matrix.checkFillable(this.matrix, n, rowIndex, colIndex))
                continue;
            row[colIndex] = n;
            // 当前行填写n成功，递归调用fillRow在下一行填写n
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }
            return true;
        }
        return false;
    }
}
exports.Generator = Generator;
exports.default = Generator;
// const generator = new Generator();
// generator.generate()
// console.log(generator.matrix)
