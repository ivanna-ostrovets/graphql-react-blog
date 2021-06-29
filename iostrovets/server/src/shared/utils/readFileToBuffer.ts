import { FileUpload } from 'graphql-upload';

export async function readFileToBuffer(file: FileUpload) {
  const { createReadStream } = await file;
  const readStream = await createReadStream();
  const chunks = [];

  for await (const chunk of readStream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}
