import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  closeButtonPostDialog: {
    position: 'absolute',
    left: '90%',
  },
  dialogContent: {
    padding: 20,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  separator: {
    border: 'none',
    margin: 4,
  },
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
  createButton: {
    position: 'relative',
    left: '33%',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  submitButton: {
    position: 'relative',
  },
  progressSpinner: {
    position: 'absolute',
  },
}));
