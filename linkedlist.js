/**
 * 真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。 
 * 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4
 */

function mergeTwoList (l1, l2) {

  // 定义头结点，确保列表可以被访问
  let head = new listNode()
  let cur = head
  // cur 作为指针
  while (li && l2) {
    // 如果l1的节点值魈
    if (l1.val <= l2.val) {
      // 先穿起l1节点
      cur.next = li
      // l1指针向前一步
      li = li.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  // 处理链表不等长
  cur.next == li !== null ? l1 : l2
  return head.next
}

/**
 * 链表节点的删除
 * 真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次
 * 
 */

function deleteDuplicates (head) {
  // 设定指针
  let cur = head
  while (cur != null && cur.next != null) {
    // 若当前节点和它后面的一个节点值想等等
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next
    } else {
      // 若不重复 继续遍历
      cur = cur.next
    }
  }
  return head
}

/**
 * 真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
 */

function deleteDuplicates2 (head) {
  // 边界情况 0个或者1个节点 直接返回
  if (!head || !head.next) {
    return head
  }
  // dummy节点
  let dummy = new listNode()
  // dummy节点永远指向头结点
  dummy.next = head
  // cur 从dummy 节点开始遍历
  let cur = dummy
  // 当 cur的后面至少有两个节点时
  while (cur.next && cur.next.next) {
    // 对cur的后面两个节点进行比较
    if (cur.next.val === cur.next.next.val) {
      // 重复 记下这个值
      let val = cur.next.val
      // 反复地排查后面的元素是否存在多次重复该值的情况
      while (cur.next && cur.next.val === val) {
        // 若有，则删除
        cur.next = cur.next.next
      }
    } else {
      // 若不重复 正常遍历
      cur = cur.next
    }
  }
  return dummy.next
}


/**
 * 真题描述：给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 * 当删除了倒数第二个结点后，链表变为 1->2->3->5.
 */

function removeNthFromEnd (head, n) {
  // 初始化dummy节点
  let dummy = new ListNode()
  // dummy指向 头结点
  dummy.next = head
  // 初始化快慢指针 均指向dummy
  let fast = dummy
  let slow = dummy
  // 快指针走n步
  while (n !== 0) {
    fast = fast.next
    n--
  }
  // 快慢指针一起走
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }

  // 慢指针删除自己的后继节点
  slow.next = slow.next.next
  return dummy.next
}

/**
 * 真题描述：定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。
 * 
 */

function reverseList (head) {
  // 初始化前驱节点为null
  let pre = null
  // 初始化目标节点为头结点
  let cur = head
  // 只要目标节点不为null，遍历就继续
  while (cur !== null) {
    // 记录下一个节点
    let next = cur.next
    // 反转指针
    cur.next = pre
    // pre 和 next 向前一步
    pre = cur
    cur = next
  }
  return pre
}


/**
 * 真题描述：反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
 */

function reverseBetween (head, m, n) {
  // 定义pre、cur，用leftHead来承接整个区间的前驱结点
  let pre, cur, leftHead

  const dummy = new ListNode()

  dummy.next = head

  // p 是一个游标用于遍历，最初指向dummy
  let p = dummy

  // p 走到整个区间的前驱节点
  for (let i = 0; i < m - 1; i++) {
    p = p.next
  }

  // 缓存前驱节点
  leftHead = p
  // start 是反转区间的第一个结点
  let start = leftHead.next
  // pre 指向start
  pre = start
  // cur 指向 start 的下一个结点
  cur = pre.next
  // 开始重复反转动作
  for (let i = m; i < n; i++) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  //  leftHead 的后继结点此时为反转后的区间的第一个结点
  leftHead.next = pre
  // 将区间内反转后的最后一个结点 next 指向 cur
  start.next = cur
  // dummy.next 永远指向链表头结点
  return dummy.next
}

// 判断是否是环形列表，基础成环

function hasCycle (head) {
  // 只要节点存在就继续遍历
  while (head) {
    if (head.flag) return true
    else {
      // 往下走, 里一个flag
      head.flag = true
      head = head.next
    }
  }
  return false
}

// 真题描述：给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null。

function detectCycle (head) {
  while (head) {
    if (head.flag) {
      return head
    } else {
      head.flag = true
      head = head.next
    }
  }
  return null
}