import { observable } from 'mobx'

import { apolloQueryStoreFactory } from './apollo-query-store-factory'
import { getUser } from '../domain/queries/getUser'

export class ApplicationStore {
  @observable title = 'Application'

  @observable userQuery = apolloQueryStoreFactory({
    query: getUser,
  })
}
