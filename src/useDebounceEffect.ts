import { DependencyList, useEffect } from "react";

export function useDebounceEffect(
  fn: (...args: any[]) => void, // Ожидаем, что функция может принимать аргументы
  waitTime: number,
  deps: DependencyList = [], // По умолчанию пустой массив
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn(...deps); // Используем spread для передачи аргументов
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps); // Следим за изменениями в deps
}
