export const debounce = (func, delay, initialFn, finalFn) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    initialFn();
    debounceTimer = setTimeout(() => {
      func.apply(context, args);
      finalFn();
    }, delay);
  };
};
