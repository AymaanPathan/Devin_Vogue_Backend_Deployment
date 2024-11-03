const cloudinary = require("../utils/config");

exports.uploadImage = async (req, res) => {
  try {
    // Check if req.file is available
    if (!req.file) {
      return res.status(400).json({
        Status: "Failed",
        Message: "No file uploaded. Please check the form field name.",
      });
    }

    // Use buffer instead of path if deployment platform limits file storage
    const result = await cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, result) => {
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
      })
      .end(req.file.buffer);
  } catch (error) {
    console.error("Unexpected error in uploadImage:", error);
    res.status(500).json({
      Status: "Failed",
      Message: "Unexpected error during image upload.",
    });
  }
};
