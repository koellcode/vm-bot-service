module.exports = (datasource = {}) => {
  const vmlist = datasource.get('vm-list')

  const take = (vm) => {
    
    return {
      name: vm,
      status: 'acquired',
    }
  }
  return {
    take,
  }
}
