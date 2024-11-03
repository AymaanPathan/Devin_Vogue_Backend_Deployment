const multer = require("multer");

const storage = multer.memoryStorage(); // Change to in-memory storage
const upload = multer({ storage: storage });

module.exports = upload;
