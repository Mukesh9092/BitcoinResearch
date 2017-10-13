import { gql } from "react-apollo";
import { observable } from "mobx";

import apolloClient from "../graphql/client";

export class Currencies {
  @observable list;

  constructor(initialData) {
    console.log("Currencies#constructor", initialData);

    if (initialData) {
      this.list = initialData.list;
    }
  }

  async load(req) {
    console.log("Currencies#load");

    const query = {
      query: gql`
        query currencies {
          currencies {
            id
            key
            name
            txFee
            minConf
            depositAddress
          }
        }
      `
    };

    const { data: { currencies } } = await apolloClient.query(query);

    console.log("#####", apolloClient.networkInterface);

    this.list = currencies;
  }
}
