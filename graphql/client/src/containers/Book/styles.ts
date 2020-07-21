const styles = theme => ({
  root: {
    padding: 30,
  },
  card: {
    maxWidth: 400,
    boxShadow: 'none',
  },
  imagesContainer: {
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  data: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  comments: {
    width: 500,
    marginLeft: 40,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  comment: {
    padding: 5,
    cursor: 'default',
    marginBottom: 20,
    transition: '.3s',
    '&:hover': {
      opacity: 0.8,
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

export default styles
