import { get } from "lodash";
import { observable } from "mobx";
import { gql } from 'react-apollo';

import apolloClient from '../graphql/client'

import sessionStore from './session'

class User {
  @observable id;
  @observable email;
  @observable username;

  @observable loaded;

  async loadFromBrowser(req) {

  }

  async loadFromServer(req) {
    const userId = sessionStore.userId;

    console.log('User#loadFromServer userId', userId)

    const query = {
      query: gql`
        query currentUser($id: String!) {
          userById(id: $id) {
            id
            email
            username
          }
        }
      `,
      variables: {
        id: userId,
      },
    }

    console.log('User#loadFromServer query', query)

    const result = await apolloClient.query(query)

    console.log('User#loadFromServer result', result)

    // this.loaded = true;
  }
}

const store = new User();

if (process.browser) {
  window.userStore = store;
}

export default store;
export { User };
