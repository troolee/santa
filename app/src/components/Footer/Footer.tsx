import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

interface IProps {
  onLogout?: () => void;
  noProfile?: boolean;
}

export const Footer: React.SFC<IProps> = ({children, onLogout, noProfile}) => {
  const onLogoutHandler = (e: any) => {
    e.preventDefault();
    if (onLogout) {
      onLogout();
    }
    return false;
  }
  return (
    <>
      <div className="has-text-right foot" style={{padding: '0.5rem 1rem'}}>
        <div className="is-size-6">
          <span>
            <Link to="/">Home</Link>
            <> | </><Link to="/privacy">Privacy Policy</Link>
            <> | </><Link to="/terms">Terms and Conditions</Link>
            <> | </><a href="https://status.uglyunicorn.ca">Status</a>
            {onLogout && !noProfile && <><> | </> <Link to="/me">My Profile</Link></>}
            {onLogout && <><> | </> <a onClick={onLogoutHandler} href="/">Logout</a></>}
          </span>
        </div>
        <div className="is-size-7">
          Made with ❤ in Canada by <a href="https://uglyunicorn.ca">Ugly Unicorn</a>
        </div>
        {children && <div className="is-size-7">{children}</div>}
      </div>
    </>
  );
};
