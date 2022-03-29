// 返回一个柯里化后的函数
export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) fn.apply(this, args);
    else
      return function (...args2) {
        curried.apply(this, ...args, ...args2);
      };
  };
}
