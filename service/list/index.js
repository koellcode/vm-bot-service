module.exports = (datasource = {}) => {
  const vmlist = datasource.get('vm-list')

  const list = () => {
    return {
      list: vmlist
    }
  }
  return {
    list,
  }
}
