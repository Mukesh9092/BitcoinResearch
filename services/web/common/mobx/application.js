import { action, observable } from 'mobx'

import { getAdminUser } from '../domain/queries/getAdminUser'

import { apolloQueryStoreFactory } from './apollo-query-store-factory'
import { UserStore } from './user'

export class ApplicationStore {
  @observable title = 'Application'

  @observable user

  @observable userQuery = apolloQueryStoreFactory({
    query: getAdminUser,
    selector: (x) => x.users[0],
  })

  @action async getUser() {
    await this.userQuery.query()

    this.user = new UserStore(this.userQuery.result)
  }
}
