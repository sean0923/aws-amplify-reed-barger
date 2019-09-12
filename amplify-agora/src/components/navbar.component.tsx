import React from 'react';
import { NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Menu as Nav, Icon, Button } from 'element-react';
import { AuthContext } from '../context/auth/auth.context';

const Navbar = () => {
  const { auth } = React.useContext(AuthContext);
  return (
    <Nav mode="horizontal" theme="dark" defaultActive="1">
      <div className="nav-container">
        <Nav.Item index="1">
          <NavLink to="/" className="nav-link">
            <div className="app-title">
              <img src="http://icon.now.sh/account_balance/f90/32" alt="app-icon" />
              Amplify Agora
            </div>
          </NavLink>
        </Nav.Item>

        <div className="nav-items">
          <Nav.Item index="2">
            <span className="app-user"> Hello, {auth.username}</span>
          </Nav.Item>

          <Nav.Item index="3">
            <NavLink to="/profile" className="nav-link">
              <Icon name="setting" />
              Profile
            </NavLink>
          </Nav.Item>

          <Nav.Item index="4">
            <Button
              type="warning"
              onClick={() => {
                Auth.signOut()
                  .then(() => {
                    console.log('successfully signed out');
                  })
                  .catch((err) => {
                    console.error('err: ', err);
                  });
              }}
            >
              Sign Out
            </Button>
          </Nav.Item>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
