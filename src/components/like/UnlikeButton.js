import React, { useRef } from 'react';

// Components
import { CustomButton } from '../../util/CustomButton';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { usePostData } from '../post/postContext';
import { useLikeData } from './likeContext';

/** View component for displaying an icon to unlike a post
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 */
export const UnlikeButton = ({ postId }) => {
  const { refreshPostList } = usePostData();
  const { refreshLikeList, unlikePost } = useLikeData();
  const makeCall = useRef(false);
  const onClick = () => {
    unlikePost(postId).then(() => {
      Promise.all([refreshPostList(), refreshLikeList()]);
    });
  };

  return (
    <CustomButton tip='Undo like' onClick={onClick} disabled={makeCall.current}>
      <Icon.Favorite color='primary' />
    </CustomButton>
  );
};

/**
 * @typedef IUnlikeButtonComponentProps
 * @param {string} postId
 */
