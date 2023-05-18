import { v2 as cloudinary } from "cloudinary";

import { IStorageService } from "../../interfaces/services/storage-service.interface";
import envConfig from "../../helpers/environment-config.helper";

export class StorageService implements IStorageService {
  constructor() {
    cloudinary.config({
      cloud_name: envConfig.get("CLOUDINARY_CLOUD_NAME") || "dikvqmh3i",
      api_key: envConfig.get("CLOUDINARY_API_KEY") || "724338923291159",
      api_secret: envConfig.get("CLOUDINARY_API_SECRET") || "1K2vYzhUzLiV46NxLkiBJB1G7X8",
    });
  }

  async saveScreenshotImage(appId: string, imageData: Buffer): Promise<string> {
    const fileName = `${appId}_${Date.now()}.png`;

    const base64Image = Buffer.from(imageData).toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        resource_type: "image",
        public_id: fileName,
      }
    );
    return result.secure_url;
  }
}
