
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable()
export class BlobService {
  private readonly containerClient: ContainerClient;

  constructor() {
    const blob_connection_string = process.env.BLOB_CONNECTION_STRING;
    const blob_container = process.env.BLOB_NAME;

    if (!blob_connection_string) {
      throw new InternalServerErrorException('Azure Storage connection string is not defined.');
    }

    this.containerClient = BlobServiceClient.fromConnectionString(blob_connection_string).getContainerClient(blob_container);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const blobName = `${Date.now()}-${file.originalname}`;
    const blobClient = this.containerClient.getBlockBlobClient(blobName);

    await blobClient.upload(file.buffer, file.buffer.length, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    return blobClient.url;
  }
}
