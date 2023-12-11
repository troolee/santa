import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

import GitHubIcon from '../../imgs/github-mark.svg';
import GitHubIconWhite from '../../imgs/github-mark-white.svg';

interface IProps {
  hasDarkBackground?: boolean;
  onLogout?: () => void;
  noProfile?: boolean;
}

export const Footer: React.SFC<IProps> = ({ children, onLogout, noProfile, hasDarkBackground }) => {
  const onLogoutHandler = (e: any) => {
    e.preventDefault();
    if (onLogout) {
      onLogout();
    }
    return false;
  }
  return (
    <>
      <div className="has-text-right foot" style={{ padding: '0.5rem 1rem' }}>
        <div className="is-size-6">
          <span>
            <Link to="/">Home</Link>
            <> | </><Link to="/privacy">Privacy Policy</Link>
            <> | </><Link to="/terms">Terms and Conditions</Link>
            <> | </><a target="_blank" rel="noopener noreferrer" href="https://status.uglyunicorn.ca">Status</a>
            {onLogout && !noProfile && <><> | </> <Link to="/me">My Profile</Link></>}
            {onLogout && <><> | </> <a onClick={onLogoutHandler} href="/">Logout</a></>}
            <> | </><a target="_blank" rel="noopener noreferrer" href="https://github.com/uglyunicorn-eh/santa">
              <img src={hasDarkBackground ? GitHubIconWhite : GitHubIcon} alt="GitHub" style={{ height: '1rem', width: '1rem' }} />
            </a>
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
