import Like from '../models/like.model';

/** Create Like document
 * @param {Request} likeParam
 */
export const create = async likeParam => {
  let dataForLike = {};

  // Construct needed properties for the document
  dataForLike.userHandle = likeParam.user.handle;
  dataForLike.postId = likeParam.params.postId;
  let newLike = new Like(dataForLike);

  // Save the like
  await newLike.save();
  return newLike;
};

/** Deletes Like document
 * @param {Request} likeParam
 */
export const remove = async likeParam => {
  let like = {};
  like = await Like.findOneAndDelete({
    postId: likeParam.params.postId,
  });
  return like;
};
