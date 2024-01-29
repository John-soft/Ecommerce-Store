const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImage = async (fileToUpload) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  f;
  try {
    const result = await cloudinary.uploader.upload(fileToUpload, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

module.exports = cloudinaryUploadImage;
