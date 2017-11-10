import { get } from "lodash";
import { observable } from "mobx";
import { gql } from "react-apollo";

import apolloClient from "../graphql/client";

import { Session } from "./session";

export class User {
  @observable id;
  @observable email;
  @observable username;
  @observable session;

  constructor(session, initialData) {
    console.log("User#constructor", initialData);

    if (initialData) {
      this.id = initialData.id;
      this.email = initialData.email;
      this.username = initialData.username;
    }

    this.session = session;
  }

  static getBrowserInstance(session, initialData) {
    console.log("User#getBrowserInstance", session, initialData);

    const instance = new User(session, initialData);

    return instance;
  }

  static async getServerInstance(ctx, session) {
    console.log("User#getServerInstance", session);

    const instance = new User(session);

    if (session.userId) {
      await instance.load(ctx.req);

      console.log(
        "User#getServerInstance instance loaded",
        this.id,
        this.email,
        this.username
      );
    }

    return instance;
  }

  async load(req) {
    console.log("User#load");

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

    const {
      data: {
        userById: {
          id,
          email,
          username
        }
      }
    } = await apolloClient.query(query);

    this.id = id;
    this.email = email;
    this.username = username;
  }
}
