/**
 * 在二叉树中查找目标节点
 * @param {*} root
 * @param {*} n
 * @returns
 */
function search (root, n) {
  if (!root) return
  if (root.val === n) {
    console.log('目标节点：', root)
  } else if (root.val > n) {
    // 当前节点数据大于n，往左查找
    search(root.left, n)
  } else {
    // 当前节点小于n 往右查找
    search(root.right, n)
  }
}

/**
 * 插入节点
 */

function insertIntoBST (root, n) {
  // 若 root 为空，说明当前是一个可以插入的空位
  if (!root) {
    // 用一个值为n的结点占据这个空位
    root = new TreeNode(n)
    return root
  }

  if (root.val > n) {
    // 当前结点数据域大于n，向左查找
    root.left = insertIntoBST(root.left, n)
  } else {
    // 当前结点数据域小于n，向右查找
    root.right = insertIntoBST(root.right, n)
  }

  // 返回插入后二叉搜索树的根结点
  return root
}

/**
 * 删除节点
 */

function deleteNode (root, n) {
  if (!root) return root
  // 定位到目标节点 分情况处理结果
  if (root.val === n) {
    // 如果是叶子节点直接删除
    if (!root.left && !root.right) {
      root = null
    } else if (root.left) {
      // 寻找左子树里最大的节点
      const maxLeft = findMax(root.left)
      // 用这个maxLeft覆盖掉需要删除的节点
      root.val = maxLeft.val
      // 覆盖动作会消耗掉原有的maxleft节点
      root.left = deleteNode(root.left, maxLeft.val)
    } else {
      // 寻找右子树里至最小的节点
      const minRight = findMin(root.right)
      // 用这个minRight覆盖掉需要删除的当前节点
      root.val = minRight.val
      // 覆盖动作会消耗掉原有的minRight节点
      root.right = deleteNode(root.right, minRight.val)
    }
  } else if (root.val > n) {
    // 若当前节点的值 比n大， 则在左子树中继续寻找目标节点
    root.left = deleteNode(root.left, n)
  } else {
    // 若当前的新疆棉值比n小， 则在右子树中查找节点
    root.right = deleteNode(root.right, n)
  }
  return root
}

function findMax (root) {
  while (root.right) {
    root = root.right
  }
  return root
}

function findMin (root) {
  while (root.left) {
    root = root.left
  }
  return root
}

/**
 * 题目描述：给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 */

function isValidBST (root) {
  // 定义递归函数
  function dfs (root, minValue, maxValue) {
    if (!root) return true
    // 若右孩子不大于根节点值，或者左孩子小于根节点值 则不合法
    if (root.val <= minValue || root.val >= maxValue) return false
    // 左右子树必须都符合二叉搜索树的数据域大小关系
    return (
      dfs(root.left, minValue, root.val) && dfs(root.right, root.val, maxValue)
    )
  }
  // 初始化最小值和最大值为极小或极大
  return dfs(root, -Infinity, Infinity)
}

/**
 * 题目描述：将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
 * [-10,-3,0,5,9],
 */

function sortArrayToBST (nums) {
  if (!nums.length) return null
  // root 递归提起来的数组
  const root = buildBST(0, nums.length - 1)

  function buildBST (low, high) {
    // 当 low》high时 意味着当前范围的数字已经被递归处理完了
    if (low > high) {
      return null
    }
    // 二分一下，取出当前子序列的中间元素
    const mid = Math.floor(low + (high - low) / 2)
    // 将中间元素的值作为当前子树的根结点值
    const cur = new TreeNode(nums[mid])
    // 递归构建左子树，范围二分为[low,mid)
    cur.left = buildBST(low, mid - 1)
    // 递归构建左子树，范围二分为为(mid,high]
    cur.right = buildBST(mid + 1, high)
    // 返回当前结点
    return cur
  }
  // 返回根结点
  return root
}

/**
 * 题目描述：给定一个二叉树，判断它是否是高度平衡的二叉树。
 */

function isBalanced (root) {
  // 立一个flag，只要有一个高度差绝对值大于1，这个flag就会被置为false
  let flag = true

  function dfs (root) {
    // 如果是空树，高度记为0；如果flag已经false了，那么就没必要往下走了，直接return
    if (!root || !flag) {
      return 0
    }
    // 计算左子树高度
    const left = dfs(root.left)
    // 计算右子树高度
    const right = dfs(root.right)
    // 如果左右子树的高度差的绝对值大于1， flag定义为false
    if (Math.abs(left - right) > 1) {
      // 后面再发生什么已经不重要了，返回一个不影响回溯计算的值
      flag = false
      return 0
    }
    // 返回当前子树的高度
    return Math.max(left, right) + 1
  }
}

/**
 * 题目描述：给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。
 */

const balanceBST = function (root) {
  // 初始化中序遍历序列数组
  const nums = []
  // 定义中序遍历二叉树，得到有序数组
  function inorder (root) {
    if (!root) {
      return
    }
    inorder(root.left)
    nums.push(root.val)
    inorder(root.right)
  }

  // 这坨代码的逻辑和上一节最后一题的代码一模一样
  function buildAVL (low, high) {
    // 若 low > high，则越界，说明当前索引范围对应的子树已经构建完毕
    if (low > high) {
      return null
    }
    // 取数组的中间值作为根结点值
    const mid = Math.floor(low + (high - low) / 2)
    // 创造当前树的根结点
    const cur = new TreeNode(nums[mid])
    // 构建左子树
    cur.left = buildAVL(low, mid - 1)
    // 构建右子树
    cur.right = buildAVL(mid + 1, high)
    // 返回当前树的根结点
    return cur
  }
  // 调用中序遍历方法，求出 nums
  inorder(root)
  // 基于 nums，构造平衡二叉树
  return buildAVL(0, nums.length - 1)
}
