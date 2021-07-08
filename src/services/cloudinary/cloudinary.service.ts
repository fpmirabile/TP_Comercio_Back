import { v2 } from 'cloudinary'
import { executeConfig as configCloudinary } from '../../service-config/cloudinary'

export default class CloudinaryService {
  private static instance: CloudinaryService

  private constructor() {
    this.config()
  }

  public static getInstance(): CloudinaryService {
    if (!this.instance) {
      this.instance = new CloudinaryService()
    }

    return this.instance
  }

  private config() {
    configCloudinary()
  }

  // imageData => Base64 Image || Image Url
  // Max size 60MB due base 64 (62,910,000 chars)
  // Image URL anda para HTTP, HTTPS, FTP
  public async uploadImage(imageData: string): Promise<string> {
    try {
      const imgUpload = await v2.uploader.upload(imageData, {
        folder: 'products',
        unique_filename: true,
        use_filename: true,
        access_mode: 'public',
      })
      const productUrl = imgUpload.url
      return productUrl
    } catch (e) {
      console.log(e)
      throw 'EXTERNAL_SERVICE_ERROR_CLOUDIFY'
    }
  }
}
