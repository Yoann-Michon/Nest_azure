import { 
  Injectable, 
  InternalServerErrorException, 
  BadRequestException 
} from '@nestjs/common';
import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class BlobService {
  private readonly containerClient: ContainerClient;

  constructor() {
    const storageAccountName = process.env.STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.STORAGE_ACCOUNT_KEY;
    const containerName = process.env.STORAGE_ACCOUNT_CONTAINER;

    if (!storageAccountName || !accountKey) {
      throw new InternalServerErrorException('Azure account name or key is not defined.');
    }

    if (!containerName) {
      throw new InternalServerErrorException('Azure Storage container name is not defined.');
    }

    const sharedKeyCredential = new StorageSharedKeyCredential(storageAccountName, accountKey);
    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net`,
      sharedKeyCredential,
    );

    this.containerClient = blobServiceClient.getContainerClient(containerName);

  }

  async uploadFile(file: Express.Multer.File, folder?: string): Promise<string> {
    try {
      if (!file) {
        throw new BadRequestException('No file provided');
      }

      const fileExtension = path.extname(file.originalname);
      const uniqueFileName = `${folder ? folder + '/' : ''}${uuidv4()}${fileExtension}`;
      
      const blobClient = this.containerClient.getBlockBlobClient(uniqueFileName);
      
      await blobClient.upload(file.buffer, file.buffer.length, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
      });

      return blobClient.url;
    } catch (error) {
      console.error('File upload error:', error);
      throw new InternalServerErrorException('Failed to upload file');
    }
  }


  async deleteFile(fileUrl: string): Promise<boolean> {
    try {
      const blobName = this.extractBlobNameFromUrl(fileUrl);
      const blobClient = this.containerClient.getBlobClient(blobName);
      await blobClient.delete();
      
      return true;
    } catch (error) {
      console.error('File deletion error:', error);
      return false; 
    }
  }

  private extractBlobNameFromUrl(fileUrl: string): string {
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split('/');
    return pathParts.slice(2).join('/');
  }

  private validateFileType(file: Express.Multer.File, allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif']): void {
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(`File type ${file.mimetype} is not allowed`);
    }
  }
}
