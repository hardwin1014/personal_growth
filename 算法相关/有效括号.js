const isVail = (s) => {
    s = s.split('')
    if(s.length % 2) return false

    const stack = []
    const map = new Map([[')','('],[']','['],['}','{']])

    for(let item of s){
        if(map.has(item)){
           if(!stack.length || stack[stack.length-1] !== map.get(item)) return false
           stack.pop()
        } else {
            stack.push(item)
        }
    }
    return !stack.length
}