const getMinioLink = (path: string): string => {
  const baseUrl = import.meta.env.VITE_MINIO_URL;

  if (!baseUrl) {
    throw new Error('VITE_MINIO_URL is not defined');
  }

  return `${baseUrl}/${path}`;
};

export default getMinioLink;
