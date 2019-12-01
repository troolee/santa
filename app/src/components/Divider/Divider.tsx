import * as React from 'react';

import './Divider.css';

interface IProps {
  label?: string;
  isVertical?: boolean;
  isLabelInverted?: boolean;
}

const Divider: React.SFC<IProps> = props => (
  <div
    className={`
      ${props.isLabelInverted ? 'is-inverted' : ''}
      ${props.isVertical ? 'is-divider-vertical' : 'is-divider'}
    `.trim()}
    data-content={props.label !== undefined ? props.label : 'or'}
  />
);

export default Divider;
