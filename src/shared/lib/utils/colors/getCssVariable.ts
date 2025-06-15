export default function getCssVariable(variableName: string): string {
  const computedStyle = getComputedStyle(document.documentElement);
  const value = computedStyle.getPropertyValue(variableName).trim();

  return value;
}
