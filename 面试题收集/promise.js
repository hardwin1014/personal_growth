/*
当面试要求手写 Promise 的时候，你可以按照以下步骤进行思考和实现：

1. 理解 Promise 的基本概念：Promise 是一种用于处理异步操作的对象。它代表了一个异步操作的最终完成或失败，并可以将回调函数与其关联。

2. 创建 Promise 的构造函数：首先，你需要创建一个 Promise 的构造函数。这个构造函数接受一个执行器函数作为参数，该函数有两个参数：resolve 和 reject。resolve 用于将 Promise 标记为成功，并返回结果值，而 reject 用于将 Promise 标记为失败，并返回错误信息。

3. 定义 Promise 的状态和结果：Promise 有三种状态：pending（进行中）、fulfilled（已完成）和 rejected（已拒绝）。你需要在构造函数中定义一个状态变量和一个结果变量，初始状态为 pending。

4. 执行异步操作：在构造函数中，你可以执行你的异步操作。可以是一个定时器、网络请求、读取文件等。在异步操作完成时，调用 resolve 方法将 Promise 标记为成功，并传递结果值；调用 reject 方法将 Promise 标记为失败，并传递错误信息。

5. 处理异步操作结果：在构造函数中，你可以使用 try-catch 块来捕获可能发生的异常，并在捕获到异常时调用 reject 方法将 Promise 标记为失败。

6. 定义 then 方法：在 Promise 原型上定义 then 方法，用于处理 Promise 的成功和失败状态。then 方法接受两个回调函数作为参数：onFulfilled（处理成功状态的回调）和 onRejected（处理失败状态的回调）。

7. 实现链式调用：在 then 方法中，你可以返回一个新的 Promise 对象，以支持链式调用。在 then 方法中，根据当前 Promise 的状态，调用相应的回调函数，并根据回调函数的返回值决定新 Promise 的状态和结果。

8. 错误处理：在链式调用中，你可以使用 catch 方法来捕获错误，并进行相应的处理。catch 方法实际上是 then 方法的一个特殊形式，只处理 Promise 的失败状态。

9. 完善 Promise 的其他方法：除了 then 和 catch 方法外，Promise 还有一些其他方法，如 finally、all、race 等。你可以根据需要来实现这些方法。

以上是手写 Promise 的基本思路和步骤。在实际编码时，你可以根据这些步骤来逐步实现 Promise 的功能。请注意，这只是一个简单的指导，实际实现可能会更复杂和细致。
*/
