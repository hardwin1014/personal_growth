const preorderTraversal = function (root, res = []) {
    if (!root) res;
    const stack = [root]
    let cur = null

    while (stack.length) {
        cur = stack.pop()
        res.push(cur.val)
        cur.right && stack.push(cur.right)
        cur.left && stack.push(cur.left)
    }
    return res
}

const inorderTraversal = function (root, res = []){
    const stack = []
    let cur = root
    while (stack.length || cur){
        if(cur){
            stack.push(cur)
            cur = cur.left
        } else {
            cur = stack.pop()
            res.push(cur.val)
            cur = cur.right
        }
    }
    return res
}


const postorderTraversal = function (root,res = []){
    if(!root) return res
    const stack = [root]
    let cur = null

    do{
        cur = stack.pop()
        res.push(cur.val)
        cur.left && stack.push(cur.left)
        cur.right && stack.push(cur.right)
    }while (stack.length)
    return res.reverse()
}


// 统一迭代的写法

// 前序遍历：中左右
// 压栈顺序：右左中
const preorderTraversal2 = function (root,res = []){
    const stack = [];
    if(root) stack.push(root)
    while (stack.length){
        const node = stack.pop()
        if(!node){
            res.push(stack.pop().val)
            continue;
        }
        if(node.right) stack.push(node.right); // 右
        if(node.left) stack.push(node.left) // 左
        stack.push(node) // 中
        stack.push(null) // 空指针标记
    }
    return res;
}

const inorderTraversal2 = function (root, res = []){
    const stack = []
    if(root) stack.push(root)
    while(stack.length){
        const node = stack.pop()
        if(!node) {
            res.push(stack.pop().val)
            continue;
        }
        if(node.right) stack.push(node.right)
        stack.push(node)
        stack.push(null)
        if(node.left) stack.push(node.left)
    }
    return res
}

const postorderTraversal = function (root,res = []){
    const stack = []
    if(root) stack.push(root)
    while(stack.length){
        const node = stack.pop()
        if(!node){
            res.push(stack.pop().val)
            continue;
        }
        stack.push(node)
        stack.push(null)
        if(node.right) stack.push(node.right)
        if(node.left) stack.push(node.left)
    }
    return res
}
