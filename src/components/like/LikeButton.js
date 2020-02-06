import React, { useRef } from 'react';

// Components
import { CustomButton } from '../../util/CustomButton';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { usePostData } from '../post/postContext';
import { useLikeData } from './likeContext';

/** View component for displaying an icon to like a post
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 */
export const LikeButton = ({ postId }) => {
  const { refreshPostList } = usePostData();
  const { refreshLikeList, likePost } = useLikeData();
  const makeCall = useRef(false);
  const onClick = () => {
    likePost(postId).then(() => {
      Promise.all([refreshPostList(), refreshLikeList()]);
    });
  };

  return (
    <CustomButton tip='Like' onClick={onClick} disabled={makeCall.current}>
      <Icon.FavoriteBorder color='primary' />
    </CustomButton>
  );
};

/**
 * @typedef ILikeButtonComponentProps
 * @param {string} postId
 */
