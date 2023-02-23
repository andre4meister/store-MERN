export function debounce<T extends any[]>(fn: (...args: T) => void, delay: number) {
  let timerId: NodeJS.Timeout | null = null;
  return function (...args: T) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}
