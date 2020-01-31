import Like from '../models/like.model';

/** Create Like document
 * @param {Request} likeParam
 * @return {Promise<Like>}
 */
export const create = async likeParam => {
  const dataForLike = {};

  // Construct needed properties for the document
  dataForLike.userHandle = likeParam.user.handle;
  dataForLike.postId = likeParam.params.postId;
  const newLike = new Like(dataForLike);

  // Save the like
  await newLike.save();
  return newLike;
};

/** Deletes Like document
 * @param {Request} likeParam
 * @return {Promise<Like>}
 */
export const remove = async likeParam => {
  const like = await Like.findOneAndDelete({
    postId: likeParam.params.postId,
  });
  return like;
};
