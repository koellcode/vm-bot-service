const rawlist = require('./list')

class ListEntry {
  constructor(vm, user, status = 'free') {
    this.name = vm
    this.user = user
    this.status = status
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
