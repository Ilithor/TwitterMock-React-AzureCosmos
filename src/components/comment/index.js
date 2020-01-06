import React, { Fragment } from 'react';

// Components
import CommentContent from './CommentContent';

// MUI
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

const Comment = ({ classes = {}, comment = {}, index, length }) => {
  const createVisibleSeparator = () => {
    if (index !== length - 1) {
      return <hr className={classes.visibleSeparator} />;
    }
    return <hr className={classes.invisibleSeparator} />;
  };
  return (
    <Grid container>
      <Fragment>
        <Grid item sm={12}>
          <CommentContent classes={classes} comment={comment} />
        </Grid>
        {createVisibleSeparator()}
      </Fragment>
    </Grid>
  );
};

export default withStyles(style)(Comment);
