/*
 * @Author: 苍南 914067438@qq.com
 * @Date: 2023-08-17 23:43:32
 * @LastEditors: 苍南 914067438@qq.com
 * @LastEditTime: 2024-07-10 15:58:10
 * @FilePath: /personal_growth/算法相关/双指针相关.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 将0后移动
const moveZeroes = function (nums) {
  // 去除nums中的所有的0，返回不包含0的数组an
  let p = removeElement(nums, 0);

  // 然后给后面的 赋值为0
  for (; p < nums.length; p++) {
    nums[p] = 0;
  }
};

function removeElement(nums, val) {
  let fast = 0,
    slow = 0;
  while (fast < nums.length) {
    if (nums[fast] !== val) {
      // 先给nums[slow]赋值，然后再给slow++
      // 这样可以保证 nums[0..slow-1] 是不包含值为 val 的元素的
      // 最后的结果数组长度就是 slow
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }
  return slow;
}

// 左右指针的常用算法
function binarySearch(nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = (left + (right - left)) >> 1;
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  return -1;
}

// 两数之和
// 只要数组有序，就应该想到双指针技巧，有点类似二分查找，通过调节left和right，就可以调整sum大小
function twoSum(nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    let sun = nums[left] + nums[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum > target) {
      left++;
    } else if (sum < right) {
      right--;
    }
  }
}

// 数组的反转
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left++] = arr[right];
    arr[right--] = temp;
  }
  return arr;
}

// 合并两个有序数组
// 思路：丛后往前遍历两个数组，并将值大的排在数组总长度num1的最后面,最后如果num2还有值，将它们放在num1前面
const merge = function (nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }

  while (p2 >= 0) {
    nums1[p] = nums2[p2];
    p2--;
    p--;
  }
};

// 双指针倒叙
const merge2 = function(nums1, m, nums2, n) {
  let p1 = m - 1, p2 = n - 1, p = m + n - 1;
  while (p2 >= 0) { // nums2 还有要合并的元素
      // 如果 p1 < 0，那么走 else 分支，把 nums2 合并到 nums1 中
      if (p1 >= 0 && nums1[p1] > nums2[p2]) {
          nums1[p--] = nums1[p1--]; // 填入 nums1[p1]
      } else {
          nums1[p--] = nums2[p2--]; // 填入 nums2[p1]
      }
  }
};

// 移除元素. 原地移除
const removeElement = (nums, val) => {
    let left = 0
    let n = nums.length
    for(let right = 0; right < n; right++){
      if(nums[right] !== val){
        nums[left] = nums[right]
        left++
      }
    }
    return left;
}

// 删除有序数组中的重复项
const removeDuplicates = (nums) => {
  if(nums === null || nums.length === 0) return 0;
  
  let slow = 0, fast = 1;
  while(fast < nums.length){
    if(nums[slow] !== nums[fast]){
      // 指针替换
      nums[slow + 1] = nums[fast]
      // 移动慢指针
      slow++
    }
    // 移动快指针
    fast++;
  }
  return slow + 1;
}

// 删除排序数组中重复项2
const removeDuplicates2 = (nums) => {
  const n = nums.length;
  if(n < 2) return n;
  
  let slow = 2, fast = 2;
  while(fast < n){
    if(nums[slow - 2] !== nums[fast]){
      nums[slow] = nums[fast]
      ++slow
    }
    ++fast
  }
  return slow;
}