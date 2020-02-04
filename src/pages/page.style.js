import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  createButton: {
    position: 'relative',
    textAlign: 'center',
    marginBottom: 20,
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  form: {
    textAlign: 'center',
  },
  image: {
    margin: 'auto',
    width: '76px',
    height: '76px',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
}));
