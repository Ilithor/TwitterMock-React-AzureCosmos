import { Like } from '../models/like.model';

/** Create Like document
 * @param {Request} likeParam
 * @returns {Promise<Like>}
 */
export const create = async likeParam => {
  // Construct needed properties for the document
  const newLike = new Like({
    userHandle: likeParam.user.userHandle,
    postId: likeParam.params.postId,
  });

  // Save the like
  await newLike.save();
  return Promise.resolve(newLike);
};

/** Deletes Like document
 * @param {String} userHandle
 * @param {String} postId
 * @returns {Promise<Like>}
 */
export const remove = async (userHandle, postId) => {
  return await Like.findOneAndDelete({ userHandle, postId }).catch(err => {
    console.error(err);
    return Promise.reject(err);
  });
};
