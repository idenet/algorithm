/**
 * 题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。
 * 示例：   
输入: [1,2,3]
输出: [
[1,2,3],
[1,3,2],
[2,1,3],
[2,3,1],
[3,1,2],
[3,2,1]
]
 */

function permute (nums) {
  const len = nums.length
  //记录当前的排列内容
  const curr = []
  // 记录所有的排列顺序
  const res = []
  // 用来避免重复使用一个数字
  const visited = {}
  // 定义dfs函数，入参是坑位的索引0
  function dfs (nth) {
    // 边界
    if (nth === len) {
      // 此时前 len 个坑位已经填满，将对应的排列记录下来
      res.push(curr.slice())
      return
    }
    // 检查手里剩下的数字有哪些
    for (let i = 0; i < len; i++) {
      // 若 nums[i] 之前没被其它坑位用过，则可以理解为“这个数字剩下了”
      if (!visited[nums[i]]) {
        // 给 nums[i] 打个“已用过”的标
        visited[nums[i]] = 1
        // 将nums[i]推入当前排列
        curr.push(nums[i])
        // 基于这个排列继续往下一个坑走去
        dfs(nth + 1)
        // nums[i]让出当前坑位
        curr.pop()
        // 下掉“已用过”标识
        visited[nums[i]] = 0
      }
    }
  }
  dfs(0)
  return res
}

/**
 * 题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
说明：解集不能包含重复的子集。

示例: 输入: nums = [1,2,3]
输出:
[
[3],
[1],
[2],
[1,2,3],
[1,3],
[2,3],
[1,2],
[]
]
*/

// 入参是一个数组
const subsets = function (nums) {
  // 初始化结果数组
  const res = []
  // 缓存数组长度
  const len = nums.length
  // 初始化组合数组
  const subset = []
  // 进入 dfs
  dfs(0)

  // 定义 dfs 函数，入参是 nums 中的数字索引
  function dfs (index) {
    // 每次进入，都意味着组合内容更新了一次，故直接推入结果数组
    res.push(subset.slice())
    // 从当前数字的索引开始，遍历 nums
    for (let i = index; i < len; i++) {
      // 这是当前数字存在于组合中的情况
      subset.push(nums[i])
      // 基于当前数字存在于组合中的情况，进一步 dfs
      dfs(i + 1)
      // 这是当前数字不存在与组合中的情况
      subset.pop()
    }
  }
  // 返回结果数组
  return res
}

/**
 * 限定组合
 * 题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * 示例: 输入: n = 4, k = 2
输出:
[
[2,4],
[3,4],
[2,3],
[1,2],
[1,3],
[1,4],
]
 */

const combine = function (n, k) {
  // 初始化结果数组
  const res = []
  // 初始化组合数组
  const subset = []
  // 进入 dfs，起始数字是1
  dfs(1)

  // 定义 dfs 函数，入参是当前遍历到的数字
  function dfs (index) {
    if (subset.length === k) {
      res.push(subset.slice())
      return
    }
    // 从当前数字的值开始，遍历 index-n 之间的所有数字
    for (let i = index; i <= n; i++) {
      // 这是当前数字存在于组合中的情况
      subset.push(i)
      // 基于当前数字存在于组合中的情况，进一步 dfs
      dfs(i + 1)
      // 这是当前数字不存在与组合中的情况
      subset.pop()
    }
  }
  // 返回结果数组
  return res
}