/**
 * 题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 
 * 1. 要求你给出达成某个目的的解法个数
 * 2. 不要求你给出每一种解法对应的具体路径
 */

// 定义记忆数组 f
const f = []
const climbStairs = function (n) {
  if (n == 1) {
    return 1
  }
  if (n == 2) {
    return 2
  }
  // 若f[n]不存在，则进行计算
  if (f[n] === undefined) f[n] = climbStairs(n - 1) + climbStairs(n - 2)
  // 若f[n]已经求解过，直接返回
  return f[n]
}

/**
 * 动态规划方式
 * 
 */
const climbStairs = function (n) {
  // 初始化状态数组
  const f = []
  // 初始化已知值
  f[1] = 1
  f[2] = 2
  // 动态更新每一层楼梯对应的结果
  for (let i = 3; i <= n; i++) {
    f[i] = f[i - 2] + f[i - 1]
  }
  // 返回目标值
  return f[n]
}

/**
 * 题目描述：给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 */

function coinChange (coins, amount) {
  // 用于保存每个目标总额对应的最小硬币个数
  const f = []
  f[0] = 0
  // 遍历1 - amount的硬币总额
  for (let i = 1; i <= amount; i++) {
    // 求的是最小值，因此我们预设为无穷大，确保它一定会被更小的数更新
    f[i] = Infinity
    // 循环遍历每个可用硬币的面额
    for (let j = 0; j < coins.length; j++) {
      // 若硬币面额小于目标总额，则问题成立
      if (i - coins[j] >= 0) {
        // 状态转移方程
        f[i] = Math.min(f[i], f[i - coins[j]] + 1)
      }
    }
  }
  // 若目标总额对应的解为无穷大，则意味着没有一个符合条件的硬币总数来更新它，本题无解，返回-1
  if (f[amount] === Infinity) {
    return -1
  }
  // 若有解，直接返回解的内容
  return f[amount]
}

/**
 * 背包问题
 * 有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；
 * 每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。现在有一个容量为 c 的背包，
 * 问你如何选取物品放入背包，才能使得背包内的物品总价值最大？
 */
// 入参是物品个数，背包容量上限，以及物品的重量 物品的价值
function knapsack (n, c, w, value) {
  // dp是对台规划的状态保存数组
  const dp = (new Array(c + 1)).fill(0)
  // 所有组合方案中的最大值
  let res = -Infinity
  for (let i = 1; i <= n; i++) {
    for (let v = c; v >= w[i]; v--) {
      // 状态转移方程时
      dp[v] = Math.max(dp[v], dp[v - w[i]] + value[i])
      // 及时更新最大值
      if (dp[v] > res) {
        res = dp[v]
      }
    }
  }
  return res
}

/**
 * 题目描述：给定一个无序的整数数组，找到其中最长上升子序列的长度。
 * 输入: [10,9,2,5,3,7,101,18]
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 */

function lengthOfLIS (nums) {
  // 缓存序列的长度
  const len = nums.length
  // 处理边界条件
  if (!len) {
    return 0
  }
  // 初始化数组里面每一个索引位的状态值
  const dp = new Array(len).fill(1)
  // 初始化最大上升子序列的长度为1
  let maxLen = 1
  // 从第2个元素开始，遍历整个数组
  for (let i = 1; i < len; i++) {
    // 每遍历一个元素都要回头看，看看能不能延长原有的上升子序列
    for (let j = 0; j < i; j++) {
      // 若遇到了一个比当前元素小的值，则意味着遇到了一个可以延长的上升子序列，
      // 故更新当前元素索引位对应的状态
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    // 及时更新上升子序列长度的最大值
    if (dp[i] > maxLen) {
      maxLen = dp[i]
    }
  }
  // 遍历完毕，最后到手的就是最大上升子序列的长度
  return maxLen
}