function cartesianProduct(arrays) {
    return arrays.reduce((a, b) => {
        return a.flatMap(x => b.map(y => [...x, y]));
    }, [[]]);
}

const result = cartesianProduct([[1, 2], ['a', 'b'], ['x', 'y']]);
console.log(result);
