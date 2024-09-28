// const multer = require('multer');

// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('audio/')) {
//     cb(null, true);
//   } else {
//     req.fileValidationError = 'Invalid file type';
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
// }).single('audio');

// module.exports = upload;


const multer = require('multer');
const path = require('path');

// Configure storage to store files with unique names
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter to allow both image and audio files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/')) {
    cb(null, true); // Accept image and audio files
  } else {
    req.fileValidationError = 'Invalid file type, only images and audio are allowed';
    cb(null, false); // Reject files that are not image or audio
  }
};

// Initialize multer with storage and file filter for both image and audio
const upload = multer({
  storage,
  fileFilter,
  // limits: { fileSize: 10 * 1024 * 2048 }, // 10MB file size limit
}).single('file'); // Use 'file' as the field name for either image or audio

module.exports = upload;

