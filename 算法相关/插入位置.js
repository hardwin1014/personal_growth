const searchInsert = (nums, target) => {
    let left = 0, right = nums.length - 1;
    while(left <= right){
        const mid = ((right-left)>>1) + left
        if(target < nums[mid]){
            right = mid - 1
        } else if(target > nums[mid]){
            left = mid + 1
        }else if(target === nums[mid]){
            return mid
        }
    }
    return left
}

const reverse = (head) => {
    let cur = head, pre = null
    while(cur !== null){
        const temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    return head
}

const reverse2 = (head) => {
    if(head===null || head.next === null) return head

    const res = reverse2(head.next)

    head.next.next = head

    head.next = null

    return res
}

const sumTwo = (nums, target) => {
    const map = new Map()

    for(let i = 0; i < nums.length; i++){
        let res = target - nums[i]

        if(Map.has(res)){
           return [i, map.get(res)]
        }
        map.set(i, nums[i])
    }
}

// 反转链表前n个节点
const reverseList2 = (head, n) => {
    if(!head || !head.next || n <= 1) return head

    let prev = null
    let curr = head
    let count = 0

    while(curr && count < n){
        let next = curr.next
        curr.next = prev
        prev = curr
        curr = next
        count++
    
    }

    head.next = curr
    return prev
}

var reverseN = function(head, n) {
    if (!head || !head.next || n <= 1) {
        return head;
    }
    
    let successor = null;
    
    const reverse = function(node, count) {
        if (count === n) {
            successor = node.next;
            return node;
        }
        
        let newHead = reverse(node.next, count + 1);
        node.next.next = node;
        node.next = successor;
        
        return newHead;
    };
    
    return reverse(head, 1);
};

// 反转链表的一部分

const reverseBetween = (head, m, n) => {
    if(!head || !head.next || m === n) return head

    let dummy = new ListNode(0)
    dummy.next = head
    let prev = dummy

    // 移动到反转起始位置的前一个节点
    for(let i = 1; i < m; i++){
        prev = prev.next
    }

    let curr = prev.next

    for(let i = m; i < n; i++){
        let next = curr.next
        curr.next = next.next
        next.next = prev.next
        prev.next = next
    }

    return dummy.next
}