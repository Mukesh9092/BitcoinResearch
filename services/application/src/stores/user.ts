import { Request } from 'express';
import gql from 'graphql-tag';
import { observable } from 'mobx';

import apolloClient from '../graphql/client';

export class User {
  @observable id: number;
  @observable email: string;
  @observable username: string;
  @observable session;

  constructor(session, initialData) {
    // console.log("User#constructor", initialData);

    if (initialData) {
      this.id = initialData.id;
      this.email = initialData.email;
      this.username = initialData.username;
    }

    this.session = session;
  }

  static getBrowserInstance(session, initialData) {
    // console.log("User#getBrowserInstance", session, initialData);

    const instance = new User(session, initialData);

    return instance;
  }

  static async getServerInstance(ctx, session) {
    // console.log("User#getServerInstance", session);

    const instance = new User(session);

    if (session.userId) {
      await instance.load(ctx.req);

      // console.log("User#getServerInstance instance loaded", this.id, this.email, this.username);
    }

    return instance;
  }

  async load(req: Request) {
    // console.log("User#load");

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
        id: this.session.userId
      }
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
