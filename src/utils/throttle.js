export default function throttle(f, delay) {
  let lastCall = -Infinity;

  return function() {
    const now = +new Date;
    if (now - lastCall > delay) {
      lastCall = now;
      return f.apply(this, arguments);
    }
  };
}
