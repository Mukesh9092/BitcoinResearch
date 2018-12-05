import { observable } from 'mobx'

export class UserStore {
  @observable id = undefined

  @observable name = undefined

  constructor(options) {
    if (options) {
      this.id = options.id
      this.name = options.name
    }
  }
}
