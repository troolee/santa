import React from 'react';

import './Footer.css';

interface IProps {
  onLogout?: () => void;
}

export const Footer: React.SFC<IProps> = ({children, onLogout}) => (
  <>
    <div className="has-text-right foot" style={{padding: '0.5rem 1rem'}}>
      <p className="is-size-6 bottom-menu">
        <span>
          <a href="#">Privacy</a> | <a href="#">Terms and Conditions</a>{onLogout && <> | <a onClick={onLogout}>Logout</a></>}
        </span>
      </p>
      <p className="is-size-7">
        Made with ❤ in Canada by <a href="https://uglyunicorn.ca">Ugly Unicorn</a>
      </p>
      {children && <p className="is-size-7">{children}</p>}
    </div>
  </>
);
