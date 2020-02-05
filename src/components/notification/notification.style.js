import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  notificationCard: {
    position: 'relative',
    marginBottom: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: 25,
    objectFit: 'cover',
    flexWrap: 'wrap-reverse',
  },
}));
