import React from 'react';
import { CardActionArea } from '@material-ui/core';
import { useCommentListData } from './commentContext';
import _ from 'lodash';
import { Comment } from '.';
import { usePostData } from '../post/postContext';
import { useHistory } from 'react-router-dom';

/** @type {React.FunctionComponent<CommentFeedCardProps>} */
const CommentFeedCard = ({ comment }) => {
  const history = useHistory();
  const { postList } = usePostData();
  const post = postList?.[comment.postId];

  const onClick = () =>
    history.push(`/u/${post.userHandle}/post/${post.postId}`);
  return ((
    <CardActionArea onClick={onClick}>
      <Comment comment={comment} />
    </CardActionArea>
  ));
};

/**  @typedef CommentFeedCardProps
 * @property {import('./commentContext').Comment} comment
 */

/** Display for the latest couple comments
 *
 * @type {React.FunctionComponent}
 */
export const RecentCommentFeed = () => {
  const { commentList } = useCommentListData();
  console.log(commentList);

  if (!commentList) {
    return null;
  }

  const result = _(commentList)
    .values()
    .orderBy(c => c.createdAt, 'desc')
    .take(5)
    .map(c => <CommentFeedCard comment={c} />)
    .toArray()
    .value();
  console.log(result);

  return (
    <div>
      <h1>Recent comments</h1>
      {result}
    </div>
  );
};
