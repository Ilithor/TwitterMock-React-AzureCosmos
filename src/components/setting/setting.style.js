import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  textField: {
    margin: '10px auto 10px auto',
  },
  cancelButton: {
    flexGrow: 2,
  },
  submitButton: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  break: {
    flexBasis: '100%',
    height: 0,
  },
  deleteAccount: {
    alignSelf: 'center',
  },
}));
