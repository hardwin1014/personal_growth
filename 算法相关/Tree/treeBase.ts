class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
function preorderTraversal(root: TreeNode | null): number[] {
  const WHITE = 0;
  const GRAY = 1;
  let res: number[] = [];
  let stack: [number, TreeNode | null][] = [[WHITE, root]];
  while (stack.length > 0) {
    const [color, node] = stack.pop() as [number, TreeNode];
    if (node === null) continue;
    if (color === WHITE) {
      stack.push([WHITE, node.right]);
      stack.push([WHITE, node.left]);
      stack.push([GRAY, node]);
    } else {
      res.push(node.val);
    }
  }
  return res;
}


