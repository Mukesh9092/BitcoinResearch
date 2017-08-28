import sessionStore from "../../stores/session";

export default () => !!sessionStore.userId;
