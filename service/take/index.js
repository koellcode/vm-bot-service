module.exports = (datasource = {}) => {
  const vmlist = datasource.get('vm-list')

  const take = (vm, username) => {
    const found = vmlist.filter(entry => entry.name === vm)

    if(found.length) {
      found[0].setStatus('acquired')
      found[0].setUserName(username)
    }

    return found[0]
  }
  return {
    take,
  }
}
