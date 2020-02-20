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
    minWidth: '300px',
    height: '300px',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  settingButton: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
  card: {
    position: 'relative',
    display: 'flex',
    marginTop: 20,
  },
  aboutContent: {
    textAlign: 'justify',
  },
}));
