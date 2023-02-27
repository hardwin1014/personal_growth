// 二分查找
let findNumberIn2DArray = function (matrix, target){
    if(matrix === null || matrix.length === 0) return false

    let row = 0;
    let column = matrix[0].length - 1;
    // 行和列的边界，列可以为0
    while (row < matrix.length && column >= 0){
        // 如果找到了，就返回真
        if(matrix[row][column] === target){
            return true
        } else if(matrix[row][column] > target){
            column--
        } else {
            row++
        }
    }
    return false;
}
