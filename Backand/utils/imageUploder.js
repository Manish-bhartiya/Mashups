const cloudinary = require('../config/cloudynery');

const cloudinaryUploader = async (req) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto', // 'auto' handles different types of files
    });
    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
};

module.exports = cloudinaryUploader;
