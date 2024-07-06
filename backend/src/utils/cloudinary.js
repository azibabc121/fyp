import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});
console.log(
  "cloud_name : ",
  process.env.CLOUDINARY_CLOUD_NAME,
  "api_key : ",
  process.env.CLOUDINARY_API_KEY,
  "api_secret",
  process.env.CLOUDINARY_API_SECRET
);
console.log("PORT : ", process.env.PORT);

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log("localfilepath", localFilePath);
    // Upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // File has been uploaded successfully
    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    console.log("Error in uploading on cloudinary : ", error);
    return null;
  }
};

export { uploadOnCloudinary };
