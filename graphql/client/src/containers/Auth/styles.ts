const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    background: '#29b6f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    background: '#fff',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
    padding: '20px 0',
    boxShadow: theme.shadows[21],
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  button: {
    marginTop: 20,
  },
})

export default styles
