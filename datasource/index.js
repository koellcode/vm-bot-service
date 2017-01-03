const rawlist = require('./list')

class ListEntry {
  constructor(vm, user) {
    this.name = vm
    this.user = user
  }
}

class InMemorySource {
  constructor(initalList = rawlist) {
    this.vmList = initalList.map(vmName => new ListEntry(vmName))
  }

  get() {
    return this.vmList
  }
}

module.exports = new InMemorySource()
