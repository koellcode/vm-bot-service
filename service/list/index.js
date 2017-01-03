module.exports = (datasource = {}) => {
  const vmlist = datasource.get('vm-list')

  const list = () => vmlist
  
  return {
    list,
  }
}
