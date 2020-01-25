import React, { useRef } from 'react';

// Components
import CustomButton from '../../util/CustomButton';

// Icons
import { FavoriteBorder } from '@material-ui/icons';

// Redux
import { connect } from 'react-redux';
import { getLikePost } from '../../redux/actions/dataActions';

/** View component for displaying an icon to like a post
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 * @param {any} props.getLikePost
 * @param {object} props.UI
 */
export const LikeButtonView = ({ postId, getLikePost, UI = {} }) => {
  const makeCall = useRef(false);
  const likePost = () => {
    if (!!makeCall.current) return;
    makeCall.current = true;
    getLikePost(postId);
    setTimeout(() => {
      makeCall.current = false;
    }, 3000);
  };

  return (
    <CustomButton
      tip='Like'
      onClick={likePost}
      disabled={!!UI.isLoading || !!makeCall.current}
    >
      <FavoriteBorder color='primary' />
    </CustomButton>
  );
};

const mapStateToProps = ({ UI }) => ({ UI });

export const LikeButton = connect(
  mapStateToProps,
  { getLikePost }
)(LikeButtonView);

/**
 * @typedef ILikeButtonComponentProps
 * @param {string} postId
 * @param {any} getLikePost
 * @param {object} UI
 */
