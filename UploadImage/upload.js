const cloudinary = require("../utils/config");

exports.uploadImage = (req, res, next) => {
  try {
    // Check if req.file is available
    if (!req.file) {
      return res.status(400).json({
        Status: "Failed",
        Message: "No file uploaded. Please check the form field name.",
      });
    }

    // Proceed with the upload
    cloudinary.uploader.upload(req.file.path, (result, error) => {
      if (error) {
        console.log("Cloudinary upload error:", error);
        return res.status(500).json({
          Status: "Failed",
          Message: "Error uploading image to Cloudinary.",
        });
      }

      res.status(200).json({
        Status: "Success",
        Message: "Image Uploaded!!!",
        imageUrl: result.secure_url,
      });
    });
  } catch (error) {
    console.error("Unexpected error in uploadImage:", error);
    res.status(500).json({
      Status: "Failed",
      Message: "Unexpected error during image upload.",
    });
  }
};
