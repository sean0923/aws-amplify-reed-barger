import React from 'react';
import { Authenticator } from 'aws-amplify-react';
import { Hub, Auth, Logger } from 'aws-amplify';

interface AuthContextProps {
  auth: { username: string };
}
export const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);

const logger = new Logger('My-Logger');

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = React.useState<any>(null);

  React.useEffect(() => {
    const listener = (data: any) => {
      switch (data.payload.event) {
        case 'signIn':
          getUserData();
          break;
        case 'signUp':
          logger.error('user signed up');
          break;
        case 'signOut':
          setAuth(null);
          logger.error('user signed out');
          break;
        case 'signIn_failure':
          logger.error('user sign in failed');
          break;
        case 'configured':
          logger.error('the Auth module is configured');
      }
    };
    getUserData();
    Hub.listen('auth', listener);
  }, []);

  const getUserData = () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('user: ', user);
        if (user) {
          setAuth(user);
        } else {
          setAuth(null);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
        setAuth(null);
      });
  };

  if (!auth) {
    return <Authenticator />;
  }

  return <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>;
};
