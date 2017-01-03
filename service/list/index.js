module.exports = (datasource = {}) => {
  const vmlist = datasource.get('vm-list')

  return {
    list: vmlist,
  }
}
