const deepEqual = (a: any, b: any) => {
  // Если значения идентичны, они равны
  if (a === b) {
    return true;
  }

  // Если одно из значений null или не является объектом — они не равны
  if (a == null || typeof a !== 'object' || b == null || typeof b !== 'object') {
    return false;
  }

  // Получаем массивы ключей для каждого объекта
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // Если количество ключей отличается — объекты не равны
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Рекурсивно сравниваем все ключи и их значения
  for (const key of keysA) {
    // Если ключ отсутствует в втором объекте или значения по ключу не равны — объекты не равны
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }

  // Если все проверки пройдены — объекты равны
  return true;
};

export default deepEqual;
