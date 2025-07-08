//write function to upload video to get url from aws s3 or vercel blob

export function uploadVideoToStorage(file: File): Promise<string> {
  const url = `https://your-storage-service.com/upload/${file.name}`;
  return Promise.resolve(url);
}
