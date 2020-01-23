const style = theme => ({
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
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: '20',
    position: 'relative',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progress: {
    position: 'absolute',
  },
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
  buttonEdit: {
    float: 'right',
  },
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  imageUser: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
  submitButton: {
    position: 'relative',
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
  createButton: {
    position: 'relative',
    left: '35%',
    marginBottom: 20,
  },
  separator: {
    border: 'none',
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  closeButtonPostDialog: {
    position: 'absolute',
    left: '90%',
  },
  commentImage: {
    minWidth: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
    marginLeft: 10,
    marginTop: 25,
  },
  commentContent: {
    marginLeft: 20,
  },
  commentCard: {
    display: 'flex',
    flexDirection: 'row',
    width: 600,
    border: '1px solid rgba(0, 0, 0, 0.5)',
    marginBottom: 1,
  },
  cornerIcon: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
  notificationCard: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
});

export default style;
