
// 二叉树
function treeNode (val) {
  this.val = val
  this.left = this.right = null
}



// 二叉树
const root = {
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
}

// 先序遍历

function preorder (root) {
  // 递归边界

  if (!root) return

  console.log('输出当前遍历的节点值', root.val)
  // 递归左子树
  preorder(root.left)
  // 递归右子树
  preorder(root.right)
}



// 中序遍历
function inorder (root) {
  if (!root) return
  inorder(root.left)
  console.log('中序遍历', root.val)
  inorder(root.right)
}

// 后序遍历
function postorder (root) {
  // 递归边界，root 为空
  if (!root) {
    return
  }
  // 递归遍历左子树 
  postorder(root.left)
  // 递归遍历右子树  
  postorder(root.right)
  // 输出当前遍历的结点值
  console.log('当前遍历的结点值是：', root.val)
}

postorder(root)

/**
 * 题目描述：给定一个二叉树，返回它的前序（先序）遍历序列。
 *  [1,null,2,3]
 * 输出: [1,2,3]
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 * 
 * 用栈实现
 * 
    将根结点入栈 
    取出栈顶结点，将结点值 push 进结果数组 
    若栈顶结点有右孩子，则将右孩子入栈
    若栈顶结点有左孩子，则将左孩子入栈
 */

function preorderTraversal (root) {
  const res = []
  if (!root) return res
  // 初始化栈结构
  const stack = []
  // 首先将根节点入栈
  stack.push(root)
  // 若栈不为空啧重复出栈、入栈操作
  while (stack.length) {
    // 将栈顶节点记为当前节点
    const cur = stack.pop()
    // 当前节点就是当前子树的根节点，把这个结点放在结果数组的尾部
    res.push(cur.val)
    // 若当前子树根结点有右孩子，则将右孩子入栈
    if (cur.right) {
      stack.push(cur.right)
    }
    // 当前子树节点有左孩子，则将左孩子入栈
    if (cur.left) {
      stack.push(cur.left)
    }
  }
  return res
}

/**
 * 后续遍历
 */

const postorderTraversal = function (root) {
  // 定义结果数组
  const res = []
  // 处理边界条件
  if (!root) {
    return res
  }
  // 初始化栈结构
  const stack = []
  // 首先将根结点入栈
  stack.push(root)
  // 若栈不为空，则重复出栈、入栈操作
  while (stack.length) {
    // 将栈顶结点记为当前结点
    const cur = stack.pop()
    // 当前结点就是当前子树的根结点，把这个结点放在结果数组的头部
    res.unshift(cur.val)
    // 若当前子树根结点有左孩子，则将左孩子入栈
    if (cur.left) {
      stack.push(cur.left)
    }
    // 若当前子树根结点有右孩子，则将右孩子入栈
    if (cur.right) {
      stack.push(cur.right)
    }
  }
  // 返回结果数组
  return res
}

/**
 * 中序遍历
 */

const inorderTraversal = function (root) {
  // 定义结果数组
  const res = []
  // 初始化栈结构
  const stack = []
  // 用一个 cur 结点充当游标
  let cur = root
  // 当 cur 不为空、或者 stack 不为空时，重复以下逻辑
  while (cur || stack.length) {
    // 这个 while 的作用是把寻找最左叶子结点的过程中，途径的所有结点都记录下来 
    while (cur) {
      // 将途径的结点入栈
      stack.push(cur)
      // 继续搜索当前结点的左孩子
      cur = cur.left
    }
    // 取出栈顶元素
    cur = stack.pop()
    // 将栈顶元素入栈
    res.push(cur.val)
    // 尝试读取 cur 结点的右孩子
    cur = cur.right
  }
  // 返回结果数组
  return res
}

/**
 * 题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
 * 二叉树：[3,9,20,null,null,15,7],
 * [
[3],
[9,20],
[15,7]
]
 */

const levelOrder = function (root) {
  // 初始化结果数组
  const res = []
  // 处理边界条件
  if (!root) {
    return res
  }
  // 初始化队列
  const queue = []
  // 队列第一个元素是根结点
  queue.push(root)
  // 当队列不为空时，进行循环
  while (queue.lenth) {
    //用来存储当前层级的节点
    const level = []
    // 缓存长度，长度后面会改变
    len = queue.length
    // 循环遍历当前层级的结点
    for (let i = 0; i < len; i++) {
      // 取出头部元素
      const top = queue.shift()
      // 将头部元素的值推入level数组
      level.push(top.val)
      // 如果当前结点有左孩子，则推入下一层级
      if (top.left) {
        queue.push(top.left)
      }
      // 如果当前结点有右孩子，则推入下一层级
      if (top.right) {
        queue.push(top.right)
      }
    }
    // 将 level 推入结果数组
    res.push(level)
  }
  return res
}

/**
 * 题目描述：翻转一棵二叉树。
 *   4
   /   \
  2     7
 / \   / \
1   3 6   9

输出
     4
   /   \
  7     2
 / \   / \
9   6 3   1
 */

function invertTree (root) {
  // 定义递归边界
  if (!root) return root
  // 递归交换右孩子的子结点
  let right = invertTree(root.right)
  // 遍历交换左孩子的节点
  let left = invertTree(root.left)
  root.left = right
  root.right = left
  return root
}