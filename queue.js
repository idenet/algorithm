/**
 * 队列相关
 * 题目描述：使用栈实现队列的下列操作：
 * push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。
 */


class MyQueue {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }
  push (x) {
    this.stack1.push(x)
  }
  pop () {
    // stack2 为空的时候才需要转移stack1的到stack2
    if (this.stack2.length <= 0) {
      while (this.stack1.length !== 0) {
        this.stack2.push(this.stack1.pop())
      }
    }
    // 为了达到逆序的目的 只从stack2出栈
    return this.stack2.pop()
  }

  peek () {
    if (this.stack2.length <= 0) {
      // 当 stack1 不为空时，出栈
      while (this.stack1.length != 0) {
        // 将 stack1 出栈的元素推入 stack2
        this.stack2.push(this.stack1.pop())
      }
    }
    // 缓存 stack2 的长度
    const stack2Len = this.stack2.length
    return stack2Len && this.stack2[stack2Len - 1]
  }

  empty () {
    // 若 stack1 和 stack2 均为空，那么队列空
    return !this.stack1.length && !this.stack2.length
  }
}

/**
 * 双端队列就是允许在队列的两端进行插入和删除的队列。
 */

const maxSlidingWindow = function (nums, k) {
  // 缓存数组的长度
  const len = nums.length
  // 初始化结果数组
  const res = []
  // 初始化双端队列
  const deque = []

  // 开始遍历数组
  for (let i = 0; i < len; i++) {
    // 当队尾元素小于当前元素时
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      // 将队尾元素（索引）不断出队，直至队尾元素大于等于当前元素
      deque.pop()
    }
    // 入队当前元素索引（注意是索引）
    deque.push(i)
    // 当队头元素的索引已经被排除在滑动窗口之外时
    while (deque.length && deque[0] <= i - k) {
      // 将队头元素索引出队
      deque.shift()
    }
    // 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
    if (i >= k - 1) {
      res.push(nums[deque[0]])
    }
  }
  // 返回结果数组
  return res
}


/**
 * BFS
 * @param {*} root 
 * const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
};
 */
function BFS (root) {
  const queue = [] // 初始化队列queue
  // 根结点首先入队
  queue.push(root)
  // 队列不为空，说明没有遍历完全
  while (queue.length) {
    const top = queue[0] // 取出队头元素  
    // 访问 top
    console.log(top.val)
    // 如果左子树存在，左子树入队
    if (top.left) {
      queue.push(top.left)
    }
    // 如果右子树存在，右子树入队
    if (top.right) {
      queue.push(top.right)
    }
    queue.shift() // 访问完毕，队头元素出队
  }
}