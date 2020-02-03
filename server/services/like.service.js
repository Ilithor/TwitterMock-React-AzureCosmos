import Like from '../models/like.model';

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
  return newLike;
};

/** Deletes Like document
 * @param {Request} likeParam
 * @returns {Promise<Like>}
 */
export const remove = async likeParam => {
  const like = await Like.findOneAndDelete({
    postId: likeParam.params.postId,
  });
  if (!like) {
    return Promise.reject({ like: 'Like not found' });
  }
  return like;
};
