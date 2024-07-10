function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

var getMinimumDifference = function(root) {
  let pre = -1, ans = Number.MAX_SAFE_INTEGER;
  const dfs = (root) => {
    if(root === null) return;

    dfs(root.left)
    if(pre === -1){
      pre = root.val
    }else{
      ans = Math.min(ans, root.val - pre)
      pre = root.val
    }
    dfs(root.right)
  }

  dfs(root)
  return ans;
}