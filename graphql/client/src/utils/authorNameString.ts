export default props => {
  const authors = props.map(author => `${author.firstname} ${author.lastname}`)
  return authors.join(',')
}
