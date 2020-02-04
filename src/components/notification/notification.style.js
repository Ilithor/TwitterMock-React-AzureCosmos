import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  notificationCard: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
}));
