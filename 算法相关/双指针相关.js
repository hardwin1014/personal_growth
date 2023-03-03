// 将0后移动
 moveZeroes = function (nums){
    // 去除nums中的所有的0，返回不包含0的数组an
    let p = removeElement(nums, 0)

    // 然后给后面的 赋值为0
    for(;p < nums.length;p++){
        nums[p] = 0
    }
}
function removeElement(nums, val){
    let fast = 0, slow = 0;
    while (fast < nums.length){
        if(nums[fast] !== val){
            // 先给nums[slow]赋值，然后再给slow++
            // 这样可以保证 nums[0..slow-1] 是不包含值为 val 的元素的
            // 最后的结果数组长度就是 slow
            nums[slow] = nums[fast]
            slow++
        }
        fast++
    }
    return slow
}

// 左右指针的常用算法
function binarySearch(nums, target) {
    let left = 0, right = nums.length - 1;
    while(left <= right){
        let mid = left + (right - left) >> 1
        if(nums[mid] === target){
            return mid
        } else if(nums[mid] < target){
            left = mid + 1
        } else if(nums[mid] > target){
            right = mid - 1
        }
    }
    return -1
}


// 两数之和
// 只要数组有序，就应该想到双指针技巧，有点类似二分查找，通过调节left和right，就可以调整sum大小
function twoSum(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        let sun = nums[left] + nums[right]
        if (sum === target) {
            return [left + 1, right + 1]
        } else if (sum > target) {
            left++
        } else if (sum < right) {
            right--
        }
    }
}
