export const toRgba = (input: string, alpha: number): string => {
  const m = input.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);

  if (m) {
    const [, r, g, b] = m;

    return `rgba(${r.trim()}, ${g.trim()}, ${b.trim()}, ${alpha})`;
  }

  return input;
};
