/**
 * 给定 nums = [2, 7, 11, 15], target = 9
   因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
 */

function twoSum (nums, target) {
  // 用对象模拟map能力
  const diffs = {}
  // 缓存数组长度
  const len = nums.length
  // 遍历数组
  for (let i = 0; i < len; i++) {
    if (diffs[target - nums[i]] !== undefined) {
      // 若有对应值，答案正确
      return [diffs[target - nums[i]], i]
    }
    // 若没有则保存当前值
    diffs[nums[i]] = i
  }
}

// 使用map编写两数之和
function twoSumMap (nums, target) {
  const map = new Map()
  const len = nums.length
  for (let i = 0; i < len; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i]
    }
    map.set(nums[i], i)
  }
}

const nums = [2, 7, 11, 15]
const target = 9

console.log(twoSumMap(nums, target))


// 合并两个有序数组

/**
 * 输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6], n = 3
输出: [1,2,2,3,5,6]
 */

const merge = function (nums1, m, nums2, n) {
  // 初始化两个指针的指向，初始化 nums1 尾部索引k
  let i = m - 1, j = n - 1, k = m + n - 1
  // 当两个数组都没遍历完时，指针同步移动
  while (i >= 0 && j >= 0) {
    // 取较大的值，从末尾往前填补
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i]
      i--
      k--
    } else {
      nums1[k] = nums2[j]
      j--
      k--
    }
  }

  // nums2 留下的情况，特殊处理一下 
  while (j >= 0) {
    nums1[k] = nums2[j]
    k--
    j--
  }
}

// 三数之和
/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 * 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
 * @param {*} nums 
 */

function threeSum (nums) {
  // 用于存放结果
  let res = []
  // 给nums数组排序
  nums = nums.sort((a, b) => a - b)
  // 缓存数组长度
  const len = nums.length

  // 遍历到倒数第三个数就行。左右指针会遍历后面两个数
  for (let i = 0; i < len - 2; i++) {
    // 左指针
    let j = i + 1
    // 右指针
    let k = len - 1
    // 如果遇到重复的数字跳过
    if (i > 0 && nums[i] === nums[i - 1]) continue
    while (j < k) {
      // 三数之和小于0，左指针前进
      if (nums[i] + nums[j] + nums[k] < 0) {
        j++
        // 处理左指针元素重复的情况
        while (j < k && nums[j] === nums[j - 1]) {
          j++
        }
      } else if (nums[i] + nums[j] + nums[k] > 0) {
        // 三数之和大于0，右指针后退
        k--

        // 处理右指针元素重复的情况
        while (j < k && nums[k] === nums[k + 1]) {
          k--
        }
      } else {
        // 得到目标数字组合，推入结果数组
        res.push([nums[i], nums[j], nums[k]])

        // 左右指针一起前进
        j++
        k--

        // 若左指针元素重复，跳过
        while (j < k && nums[j] === nums[j - 1]) {
          j++
        }

        // 若右指针元素重复，跳过
        while (j < k && nums[k] === nums[k + 1]) {
          k--
        }
      }
    }
  }
  return res
}