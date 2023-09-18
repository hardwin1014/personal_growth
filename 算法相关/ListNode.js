/**
 * Initialize your data structure here.
 */
var MyLinkedList = function () {
    this.head = null;
    this.length = 0;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
    if (index < 0 || index >= this.length) return -1;
    let current = this.head,
        count = 0;
    if (index === 0) return current.val;
    else {
        while (count < index) {
            current = current.next;
            count++;
        }
        return current.val;
    }
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    if (!this.head) this.head = { val, next: null };
    else {
        //若存在头节点
        let node = { val, next: this.head };
        this.head = node;
    }
    this.length++;
};

/**
 * Append a node of value val to the last element of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    let node = { val, next: null };
    if (!this.head) this.head = node;
    else {
        let current = this.head;
        //遍历到尾部进行添加
        while (current.next) {
            //当current.next为null说明current就是最后一个节点
            current = current.next;
        }
        current.next = node;
    }
    this.length++;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    if (index < 0 || index > this.length) return; //边界情况，超出链表长度直接return
    let node = { val, next: null };
    let current = this.head,
        previous,
        count = 0;
    if (index === 0) {
        return this.addAtHead(val); //index为0， 头部插入
    } else if (index === this.length) {
        return this.addAtTail(val); //index = length，在末尾进行追加
    } else {
        while (count <= index - 1) {
            //找到index位置的前一个节点
            previous = current;
            current = current.next;
            count++;
        }
        previous.next = node;
        node.next = current;
    }
    this.length++;
};

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (index < 0 || index >= this.length) return;
    let current = this.head,
        previous,
        countIndex = 0;
    if (index === 0) this.head = current.next;
    //删除头部的情况
    else {
        while (countIndex++ < index) {
            //找到删除位置的前一个节点
            previous = current;
            current = current.next;
        }
        if (current) {
            //直接链接到删除位置的下一个节点
            previous.next = current.next;
        } else {
            previous.next = null;
        }
    }
    this.length--;
};
