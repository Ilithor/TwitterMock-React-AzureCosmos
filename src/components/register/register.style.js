import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  textField: {
    margin: '10px auto 10px auto',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  button: {
    marginTop: '20',
    position: 'relative',
  },
  progress: {
    position: 'absolute',
  },
}));
