import store from "../../../common/database/store";

export default function userById(obj: Object, options: { id: string }) {
  return store
    .getMapper("user")
    .find(options.id);
}
