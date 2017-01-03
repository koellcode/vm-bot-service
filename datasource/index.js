const rawlist = require('./list')

class ListEntry {
  constructor(vm, user, status) {
    this.name = vm
    this.user = user
    this.status = status
  }

  setStatus(status) {
    this.status = status
  }

  setUserName(username) {
    this.user = username
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
