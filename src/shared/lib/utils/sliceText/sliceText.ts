export default function (value: string | number, start = 0, end = 50): string {
  if (typeof value === 'number') {
    value = value.toString();
  }
  const slicedValue = value?.slice(start, end);

  if (slicedValue?.length < value?.length) {
    return `${slicedValue}...`;
  }

  return slicedValue;
}
