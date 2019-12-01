import * as React from 'react';

import './Toasts.css';

export interface IProps {
  position?: 'top' | 'bottom';
  isBlocked?: boolean;
}

const Toasts: React.SFC<IProps> = ({children, position, isBlocked}) => (
  <div className={`toast-container is-${position || 'top'} ${isBlocked ? 'toast-conatiner-blocked' : ''}`.trim()}>
    {children}
  </div>
);

export default Toasts;
