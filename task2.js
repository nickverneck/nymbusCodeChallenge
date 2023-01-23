const once = (fn) => {
    let hasBeenCalled = false;
    let firstInvocationResult;
    return function() {
        if (!hasBeenCalled) {
            firstInvocationResult = fn.apply(this, arguments);
            hasBeenCalled = true;
        }
        return firstInvocationResult;
    }
}
const sum = (a, b) => a + b;
const onceSum1 = once(sum);
const onceSum2 = once(sum);
console.log(onceSum1(1, 3)); // => 4
console.log(onceSum1(5, 3)); // => 4
console.log(onceSum2(2, 7)); // => 9
console.log(onceSum2(5, 2)); // => 9