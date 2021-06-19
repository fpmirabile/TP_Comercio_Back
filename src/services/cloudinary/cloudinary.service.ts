import { v2 } from "cloudinary";
import { executeConfig as configCloudinary } from "../../config/cloudinary";

export default class CloudinaryService {
  private static instance: CloudinaryService;

  private constructor() {
    this.config();
  }

  public static getInstance(): CloudinaryService {
    return this.instance;
  }

  private config() {
    configCloudinary();
  }

  // imageData => Base64 Image || Image Url 
  // Max size 60MB due base 64 (62,910,000 chars)
  // Image URL anda para HTTP, HTTPS, FTP
  public async uploadImage(imageData: string): Promise<string | undefined> {
    try {
      const imgUpload = await v2.uploader.upload(imageData, { folder: 'products', unique_filename: true, use_filename: true, access_mode: 'public' });
      const productUrl = imgUpload.url;
      return productUrl;
    } catch {
      // For some reason we couldn't upload the image, we will return a null value.
      return undefined;
    }
  }
}