import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';

const _App: React.FC = () => {
  return (
    <div>
      <div>App</div>
    </div>
  );
};

const App = withAuthenticator(_App, { includeGreetings: true });

export { App };
