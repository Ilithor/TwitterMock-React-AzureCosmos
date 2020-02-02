import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  commentCard: {
    display: 'flex',
    flexDirection: 'row',
    width: 'inherit',
    border: '1px solid rgba(0, 0, 0, 0.5)',
    marginBottom: 1,
    justifyContent: 'stretch',
  },
  cardContent: {
    flexGrow: 1,
  },
  commentImage: {
    minWidth: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: '20',
    position: 'relative',
  },
});
