// 翻转字符串

const str = 'juejin'

const res = str.split('').reverse().join('')


// 回文字符串

function isPalindrome (str) {
  const reversedStr = str.split('').reverse().join('')
  return reversedStr === str
}

function isPalindrome2 (str) {
  const len = str.length
  // 遍历前半部分 看看是否和后半部分对称
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) return false
    return true
  }
}


// 真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

function valiPalindrome (s) {
  const len = s.length
  // i j 分别为左右指针
  let i = 0, j = len - 1
  // 当左右指针满足对称时，一起向中间前进
  while (i < j && s[i] === s[j]) {
    i++
    j--
  }
  // 尝试判断跳过左指针元素后 字符串是否回文
  if (isPalindrome(i + 1, j)) return true

  if (isPalindrome(i, j - 1)) return true

  // 工具方法，判断是否回文
  function isPalindrome (st, ed) {
    while (st < ed) {
      if (s[st] !== s[ed]) return false
      st++
      ed--
    }
    return true
  }
  return false
}

/**
 * 构造函数
 */
const WordDictionary = function () {
  // 初始化一个对象字面量，承担 Map 的角色
  this.words = {}
}

/**
  添加字符串的方法
 */
WordDictionary.prototype.addWord = function (word) {
  // 若该字符串对应长度的数组已经存在，则只做添加
  if (this.words[word.length]) {
    this.words[word.length].push(word)
  } else {
    // 若该字符串对应长度的数组还不存在，则先创建
    this.words[word.length] = [word]
  }

}

/**
  搜索方法
 */
WordDictionary.prototype.search = function (word) {
  // 若该字符串长度在 Map 中对应的数组根本不存在，则可判断该字符串不存在
  if (!this.words[word.length]) {
    return false
  }
  // 缓存目标字符串的长度
  const len = word.length
  // 如果字符串中不包含‘.’，那么一定是普通字符串
  if (!word.includes('.')) {
    // 定位到和目标字符串长度一致的字符串数组，在其中查找是否存在该字符串
    return this.words[len].includes(word)

  }

  // 否则是正则表达式，要先创建正则表达式对象
  const reg = new RegExp(word)

  // 只要数组中有一个匹配正则表达式的字符串，就返回true
  return this.words[len].some((item) => {
    return reg.test(item)
  })
}


// 入参是一个字符串
const myAtoi = function (str) {
  // 编写正则表达式
  const reg = /\s*([-\+]?[0-9]*).*/
  // 得到捕获组
  const groups = str.match(reg)
  // 计算最大值
  const max = Math.pow(2, 31) - 1
  // 计算最小值
  const min = -max - 1
  // targetNum 用于存储转化出来的数字
  let targetNum = 0
  // 如果匹配成功
  if (groups) {
    // 尝试转化捕获到的结构
    targetNum = +groups[1]
    // 注意，即便成功，也可能出现非数字的情况，比如单一个'+'
    if (isNaN(targetNum)) {
      // 不能进行有效的转换时，请返回 0
      targetNum = 0
    }
  }
  // 卡口判断
  if (targetNum > max) {
    return max
  } else if (targetNum < min) {
    return min
  }
  // 返回转换结果
  return targetNum
}
