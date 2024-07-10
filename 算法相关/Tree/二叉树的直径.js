
 function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
     this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
 }

  const diameterOfBinaryTree = (root) => {
    let res = 0;
    const dfs = (root) => {
        if(!root) return 0;

        const leftDepth = dfs(root.left)
        const rightDepth = dfs(root.right)

        res = Math.max(res, (leftDepth + rightDepth))
        return Math.max(leftDepth, rightDepth) + 1;
    }
    dfs(root)
    return res;
  }