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
    flexGrow: 3,
    flexShrink: 0.9,
    flexBasis: 500,
  },
  commentImage: {
    borderRadius: '50%',
    paddingTop: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  commentImageContainer: {
    flexBasis: 100,
    flexShrink: 1,
    flexGrow: 1,
    padding: '1em 0',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: '20',
    position: 'relative',
  },
});
