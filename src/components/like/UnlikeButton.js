import React, { useRef } from 'react';

// Components
import CustomButton from '../../util/CustomButton';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';

// Redux
import { connect } from 'react-redux';
import { getUnlikePost } from '../../redux/actions/dataActions';

/** View component for displaying an icon to unlike a post
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 * @param {any} props.getUnlikePost
 * @param {object} props.UI
 */
export const UnlikeButtonView = ({ postId, getUnlikePost, UI = {} }) => {
  const makeCall = useRef(false);
  const unlikePost = () => {
    if (!!makeCall.current) return;
    makeCall.current = true;
    getUnlikePost(postId);
    setTimeout(() => {
      makeCall.current = false;
    }, 3000);
  };

  return (
    <CustomButton
      tip='Undo like'
      onClick={unlikePost}
      disabled={!!UI.isLoading || !!makeCall.current}
    >
      <FavoriteIcon color='primary' />
    </CustomButton>
  );
};

const mapStateToProps = ({ UI }) => ({ UI });

export const UnlikeButton = connect(
  mapStateToProps,
  { getUnlikePost }
)(UnlikeButtonView);

/**
 * @typedef IUnlikeButtonComponentProps
 * @param {string} postId
 * @param {any} getUnlikePost
 * @param {object} UI
 */
