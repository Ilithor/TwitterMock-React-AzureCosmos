import Like from '../models/like.model';

/** Create Like document
 * @param {Request} likeParam
 * @returns {Promise<Like>}
 */
export const create = async likeParam => {
  // Construct needed properties for the document
  const dataForLike = {};
  dataForLike.userHandle = likeParam.user.userHandle;
  dataForLike.postId = likeParam.params.postId;
  const newLike = new Like(dataForLike);

  // Save the like
  await newLike.save();
  return newLike;
};

/** Deletes Like document
 * @param {Request} likeParam
 * @returns {Promise<Like>}
 */
export const remove = likeParam =>
  new Promise((resolve, reject) => {
    const like = Like.findOneAndDelete({
      postId: likeParam.params.postId,
    });
    if (!like) {
      reject({ like: 'Like not found' });
    }
    return like;
  });
