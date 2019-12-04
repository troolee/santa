import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

interface IProps {
  onLogout?: () => void;
}

export const Footer: React.SFC<IProps> = ({children, onLogout}) => (
  <>
    <div className="has-text-right foot" style={{padding: '0.5rem 1rem'}}>
      <p className="is-size-6 bottom-menu">
        <span>
          <Link to="/">Home</Link>
          <> | </><Link to="/privacy">Privacy Policy</Link>
          <> | </><Link to="/terms">Terms and Conditions</Link>
          {onLogout && <><> | </> <a onClick={onLogout} href="/">Logout</a></>}
        </span>
      </p>
      <p className="is-size-7">
        Made with ❤ in Canada by <a href="https://uglyunicorn.ca">Ugly Unicorn</a>
      </p>
      {children && <p className="is-size-7">{children}</p>}
    </div>
  </>
);
