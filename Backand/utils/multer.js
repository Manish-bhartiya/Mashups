const multer = require('multer');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    req.fileValidationError = 'Invalid file type';
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
}).single('audio');

module.exports = upload;
