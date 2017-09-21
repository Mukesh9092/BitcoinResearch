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

  constructor() {
    if (process.browser) {
      this.loadFromBrowser();
    } else {
      this.loadFromServer();
    }
  }

  async load(req) {
    const userId = sessionStore.userId;

    console.log('User#load userId', userId)

    const query = {
      query: gql`
        query userById($id: String!) {
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

    console.log('User#load query', query)

    const result = await apolloClient.query(query)

    console.log('User#load result', result)

    // this.loaded = true;
  }

  async loadFromBrowser() {
    await this.load();
  }

  async loadFromServer(req) {
    await this.load(req);
  }
}

const store = new User();

if (process.browser) {
  window.userStore = store;
}

export default store;
export { User };
