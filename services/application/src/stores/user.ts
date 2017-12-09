import { Request } from 'express';
import gql from 'graphql-tag';
import { observable } from 'mobx';

import apolloClient from '../graphql/client';

import { SessionStore } from './session'

export class UserStore {
  @observable id: string | void;
  @observable email: string | void;
  @observable username: string | void;

  async load(userId: string): Promise<void> {
    // console.log("User#load");

    const query = {
      query: gql`
        query userById($userId: String!) {
          userById(id: $userId) {
            id
            email
            username
          }
        }
      `,
      variables: {
        userId,
      },
    };

    const result = await apolloClient.query(query);

    const {
      id,
      email,
      username
    } = result.data.userById;

    this.id = id;
    this.email = email;
    this.username = username;
  }
}

export default new UserStore();
