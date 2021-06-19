import { v2 as cloudinary } from "cloudinary";

export const executeConfig = () => {
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.cloud_api_secret
  });
}