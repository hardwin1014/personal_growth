// 1. 基本的二分搜索
function binarySearch(nums, target) {
    let left = 0,
        right = nums.length - 1 // 取得是数组最后一位

    // 左闭右闭
    while (left <= right){
        let mid = left + (right - left) >> 1
        if(nums[mid] < target){
            left = mid + 1
        } else if(nums[mid] > target){
            right = mid - 1
        } else if(nums[mid] === target){
            return mid
        }
    }
    return -1
}


/*
*   因为我们初始化 right = nums.length
    所以决定了我们的「搜索区间」是 [left, right)
    所以决定了 while (left < right)
    同时也决定了 left = mid + 1 和 right = mid

    因为我们需找到 target 的最左侧索引
    所以当 nums[mid] == target 时不要立即返回
    而要收紧右侧边界以锁定左侧边界
* */

// 2. 寻找左侧边界的二分搜索
function left_bound(nums, target) {
    let left = 0,
        right = nums.length // 这里取的是超出数组边界的值，所以下面循环的时候不相等

    while (left < right){
        let mid = left + (right - left) >> 1
        if(nums[mid] === target){
            right = mid
        } else if(nums[mid] < target){
            left = mid + 1
        } else if(nums[mid] > target){
            right = mid
        }
    }

    // 如果想在找不到 target 的时候返回 -1，那么检查一下 nums[left] 和 target 是否相等即可
    if(left === nums.length) return -1;
    return nums[left] = target ? left : -1
}

function left_bound2(nums,target) {
    let left = 0,
        right = nums.length - 1
    while (left <= right){
        let mid = left + (right - left) >> 1
        // 因为搜索区间是两端都闭的，且现在是搜索左侧边界，所以 left 和 right 的更新逻辑如下：
        if(nums[mid] === target){
            // 因为是找的是左边界，所以收缩右侧边界
            right = mid - 1
        } else if(nums[mid] < target){
            // 搜索区间变为 [mid+1, right]
            left = mid + 1
        } else if(nums[mid] > target){
            // 搜索区间变为 [left, mid-1]
            right = mid - 1
        }
    }

    // 如果想在找不到 target 的时候返回 -1，那么检查一下 nums[left] 和 target 是否相等即可
    if(left === nums.length) return -1;
    return nums[left] === target ? left : -1;
}



// 3. 寻找右侧边界的二分查找
/*
*   因为我们初始化 right = nums.length
    所以决定了我们的「搜索区间」是 [left, right)
    所以决定了 while (left < right)
    同时也决定了 left = mid + 1 和 right = mid

    因为我们需找到 target 的最右侧索引
    所以当 nums[mid] == target 时不要立即返回
    而要收紧左侧边界以锁定右侧边界

    又因为收紧左侧边界时必须 left = mid + 1
    所以最后无论返回 left 还是 right，必须减一
* */
// 左闭右开
function right_bound(nums, target) {
    let left = 0,
        right = nums.length;

    while (left < right){
        let mid = left + (right - left) >> 1
        if(nums[mid] === target){
            // 当 nums[mid] == target 时，不要立即返回，而是增大「搜索区间」的左边界 left，
            // 使得区间不断向右靠拢，达到锁定右侧边界的目的。

            // 这样想: mid = left - 1
            left = mid + 1
        } else if(nums[mid] < target) {
            left = mid + 1
        } else if(nums[mid] > target){
            // while 循环的终止条件是 left == right，所以 left 和 right 是一样的，你非要体现右侧的特点，返回 right - 1 好了。
            // 至于为什么要减一，这是搜索右侧边界的一个特殊点，关键在锁定右边界时的这个条件判断：
            right = mid
        }
    }

    // 判断target是否存在于nums中，此时 left - 1 索引越界
    if(left - 1 < 0) return -1
    // 只要在最后判断一下 nums[left-1] 是不是 target 就行了
    return nums[left - 1] === target ? (left - 1) : -1
}

// 左闭右闭
function right_bound2(nums, target) {
    let left = 0,
        right = nums.length - 1
    while (left <= right){
        let mid = left + (right - left) >>> 1
        if(nums[mid] === target){
            // 这里改成收缩左侧边界即可
            // left 的更新必须是 left = mid + 1，当然是为了把 nums[mid] 排除出搜索区间
            left = mid + 1
        }else if(nums[mid] > target){
            right = mid - 1
        }else if(nums[mid] < target){
            left = mid + 1
        }
    }

    // 判断target是否存在nums中
    // 此时left - 1索引越界
    if(left - 1 < 0) return -1;

    // 判断一下nums[left]是不是target

    // 当然，由于 while 的结束条件为 right == left - 1，
    // 所以你把上述代码中的 left - 1 都改成 right 也没有问题，这样可能更有利于看出来这是在「搜索右侧边界」。
    return nums[left - 1] === target ? (left - 1) : -1;
}


// 如需定义左闭右开的「搜索区间」搜索左右边界，只要在 nums[mid] == target 时做修改即可，搜索右侧时需要减一。
// 如果将「搜索区间」全都统一成两端都闭，好记，只要稍改 nums[mid] == target 条件处的代码和返回的逻辑即可
