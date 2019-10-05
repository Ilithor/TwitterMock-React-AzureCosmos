const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

/**Creates a temporary storage to hold a user's uploaded
 * image to be later processed into base64
 */
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dUri = new Datauri();

/**Converts provided image into base64 */
const dataUri = req => {
  const file = dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
  return file;
};

module.exports = {
  multerUploads,
  dataUri
};
