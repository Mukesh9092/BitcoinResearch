import { SessionStore } from '../stores/session';
import { UserStore } from '../stores/user';

export interface IApplicationPageProps {
  sessionStore: SessionStore;
  userStore: UserStore;
  pathname: string;
  query: string;
  asPath: string;
}
