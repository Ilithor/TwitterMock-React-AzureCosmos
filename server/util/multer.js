import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';

/**Creates a temporary storage to hold a user's uploaded
 * image to be later processed into base64
 */
const storage = multer.memoryStorage();
export const multerUploads = multer({ storage }).single('image');
const dUri = new Datauri();

/** Converts provided image into base64
 * @param {Request} req
 * @return {Datauri}
 */
export const dataUri = async req => {
  const file = await dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
  return file;
};
