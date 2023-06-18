/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
   let cancel = false;

  const timeout = setTimeout(() => {
    if (!cancel) {
      const result = fn(...args);
      console.log({ time: t, returned: result });
    }
  }, t);

  const cancelFn = () => {
    cancel = true;
    clearTimeout(timeout);
  };

  return cancelFn; 
};

/**
 *  const result = []
 *
 *  const fn = (x) => x * 5
 *  const args = [2], t = 20, cancelT = 50
 *
 *  const log = (...argsArr) => {
 *      result.push(fn(...argsArr))
 *  }
 *       
 *  const cancel = cancellable(fn, args, t);
 *           
 *  setTimeout(() => {
 *     cancel()
 *     console.log(result) // [{"time":20,"returned":10}]
 *  }, cancelT)
 */
