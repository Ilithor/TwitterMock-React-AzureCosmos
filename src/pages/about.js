import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

// MUI
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import { useStyles } from './page.style';

// Context
import { useUserListData } from '../components/profile/user/userListContext';

/** Displays the About Us page
 *
 * @returns {React.ReactElement}
 */
export const AboutPage = () => {
  const classes = useStyles();
  const [devList, setDevList] = useState();
  const { userList } = useUserListData();
  useEffect(() => {
    const userData = _(userList)
      .values()
      .filter(user => user.isAdmin)
      .value();
    if (userData) {
      setDevList(userData);
    }
  }, [userList]);
  const UserCard = () => {
    return _.map(devList, user => {
      if (user?.userHandle === 'Daryk') {
        user.about = (
          <big>
            Daryk is a fullstack developer that started development of SocMon in
            August of 2019. He spends his free time hiking, perusing local cafes
            and bakeries or planning his next international trip. You can find
            him on{' '}
            <MuiLink
              href={'https://www.linkedin.com/in/daryk-kohler/'}
              target='_blank'
              rel='noreferrer'
            >
              LinkedIn
            </MuiLink>{' '}
            and the repo for the site on{' '}
            <MuiLink
              href={'https://github.com/Ilithor/SocMon-React-AzureCosmos'}
              target='_blank'
              rel='noreferrer'
            >
              Github
            </MuiLink>
            .
          </big>
        );
      }
      if (user?.userHandle === 'Jefferson') {
        user.about = (
          <big>
            Jefferson helps with infrastructure design and code review. He is a
            fullstack Software Engineer with a decade of experience doing IOT,
            automation, and interface design. When not buried in the latest
            project, he spends spare time mentoring young developers and
            artists, studying the stars, and travelling. You can find him on{' '}
            <MuiLink
              href={'https://www.linkedin.com/in/jefferson-eagley/'}
              target='_blank'
              rel='noreferrer'
            >
              LinkedIn
            </MuiLink>
            .
          </big>
        );
      }
      return (
        <Card key={`dev-${user?.userHandle}`} className={classes?.card}>
          <CreateCardMedia userImage={user?.userImage} />
          <UserContent user={user} />
        </Card>
      );
    });
  };
  const CreateCardMedia = ({ userImage }) => (
    <CardMedia
      image={userImage}
      title='Profile image'
      className={classes?.image}
    />
  );
  const UserContent = ({ user }) => (
    <CardContent className={classes?.content}>
      <Typography
        variant='h5'
        component={Link}
        to={`/u/${user?.userHandle}`}
        color='primary'
      >
        {user?.userHandle}
      </Typography>
      <br />
      <Typography className={classes?.aboutContent}>{user?.about}</Typography>
    </CardContent>
  );
  return (
    <Grid container className={classes?.container}>
      <UserCard />
    </Grid>
  );
};
