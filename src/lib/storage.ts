export function uploadVideoToStorage(file: File): Promise<string> {
  const url = `https://your-storage-service.com/upload/${file.name}`;
  return Promise.resolve(url);
}
