export const toDataURL = async (url: string): Promise<string> => {
  const response = await fetch(url, { mode: 'cors' });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки изображения: ${response.status}`);
  }

  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
