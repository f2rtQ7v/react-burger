export default <T extends unknown[]>(
  f: (...args: T) => void,
  delay: number,
) => {
  let lastCall = -Infinity;

  return (...args: T) => {
    const now = +new Date;
    if (now - lastCall > delay) {
      lastCall = now;
      f(...args);
    }
  };
}
