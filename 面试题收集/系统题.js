// 给你一个 Linux 路径,求其最简化的路径,例如(/a/b/.. -> /a,  a/b/./. -> a/b等)
function simplifyPath(path) {
    const stack = [];
    const skip = new Set(["..", ".", ""]);

    const dirs = path.split("/");
    for (let dir of dirs) {
        if (dir === ".." && stack.length !== 0) {
            stack.pop(); // 栈顶抛出
        } else if (!skip.has(dir)) {
            stack.push(dir);
        }
    }

    return "/" + stack.join("/");
}

// 示例用法
const path = "/a/b/..";
const simplifiedPath = simplifyPath(path);
console.log("简化后的路径为：" + simplifiedPath);
