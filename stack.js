/**
 * 栈相关题
 * 后进先出，是对称的，适合做对称题
 */

// 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。


// 用一个 map 来维护左括号和右括号的对应关系
const leftToRight = {
  "(": ")",
  "[": "]",
  "{": "}"
}

const isValid = function (s) {
  // 判断空字符串
  if (!s) return
  // 初始化stack
  const stack = []
  // 缓存字符串长度
  const len = s.length
  // 遍历字符串
  for (let i = 0; i < len; i++) {
    // 缓存单个字符
    const ch = s[i]
    // 判断是否是左括号
    if (ch === '(' || ch === '{' || ch === '[') stack.push(leftToRight[ch])
    else {
      // 如果不是左括号必然是和左括号相对应的有括号，并且和栈顶相对
      if (!stack.length || stack.pop() !== ch) return false
    }
  }
  // 如果全匹配成功，则肯定是空的
  return !stack.length
}

//题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。

/**
 * 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
 */

function dailyTemperatures (T) {
  const len = T.length
  const stack = []

  const res = (new Array(len)).fill(0) // 初始化结果，占位为0

  for (let i = 0; i < len; i++) {
    // 若栈不为0，且存在打破递减趋势的温度
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      // 将栈顶温度值对应的索引出栈
      const top = stack.pop()
      // 计算 当前栈顶温度值与第一个高于它的温度值 的索引差值
      res[top] = i - top
    }
    // 注意栈里面存的不是温度，是索引
    stack.push(i)
  }
  // 返回数组
  return res
}

/**
 * 题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 * pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。
 */

const MinStack = function () {
  this.stack = []
  // 定义辅助栈
  this.stack2 = []
}

MinStack.prototype.push = function (x) {
  this.stack.push(x)
  // 如果入栈的值小鱼当前最小值，则推入栈顶
  if (this.stack2.length == 0 || this.stack2[this.stack2.length - 1] >= x) {
    this.stack2.push(x)
  }
}

MinStack.prototype.pop = function (x) {
  // 若出栈的值和当前最小值相等，那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
  if (this.stack.pop() == this.stack2[this.stack2.length - 1]) {
    this.stack2.pop()
  }
}

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1]
}

MinStack.prototype.getMin = function () {
  return this.stack2[this.stack2.length - 1]
}