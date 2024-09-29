const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();
const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function uploadToCloudinary(buffer, mimetype, FOLDER) {
  try {
    const base64EncodedImage = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${mimetype};base64,${base64EncodedImage}`;
    const result = await cloudinaryV2.uploader.upload(dataUri, {
      folder: FOLDER,
    });
    return result?.secure_url;
  } catch (error) {
    throw new Error(error);
  }
}

async function destroyFromCloudinary(url, FOLDER) {
  try {
    const publicId = url?.split("/").reverse()[0].split(".")[0];
    await cloudinaryV2.uploader.destroy(
      FOLDER + "/" + publicId,
      (error, result) => {
        if (error) {
          console.error("Error deleting asset from Cloudinary:", error); // Log any errors
        } else {
          console.log("Successfully deleted asset:", result); // Log successful deletion
        }
      }
    );
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { uploadToCloudinary, destroyFromCloudinary };
