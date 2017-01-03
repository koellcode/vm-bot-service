module.exports = (datasource = {}) => {
  const vmlist = datasource.get('vm-list')

  const free = (vm) => {
    const found = vmlist.filter(entry => entry.name === vm)

    if(found.length) {
      found[0].setStatus(undefined)
      found[0].setUserName(undefined)
    }

    return found[0]
  }
  return {
    free,
  }
}
