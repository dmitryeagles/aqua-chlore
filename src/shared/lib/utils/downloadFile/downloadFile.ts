const minioUrl = import.meta.env.VITE_MINIO_URL;

const downloadFile = async (path: string, fileName: string) => {
  try {
    const response = await fetch(`${minioUrl}/${path}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('File download failed:', error);
  }
};

export default downloadFile;
