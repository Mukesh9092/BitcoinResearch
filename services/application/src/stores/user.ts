import gql from 'graphql-tag';
import { observable } from 'mobx';

import apolloClient from '../graphql/client';

export interface IUserStoreProps {
  id: string | null;
  email: string | null;
  username: string | null;
}

export class UserStore {
  @observable id: string | null = null;
  @observable email: string | null = null;
  @observable username: string | null = null;

  constructor(props: IUserStoreProps | void) {
    // console.log('UserStore#constructor', props)

    if (props) {
      this.id = props.id;
      this.email = props.email;
      this.username = props.username;
    }
  }

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

export default new UserStore(undefined);
