import * as React from 'react';

export type Kind = "primary" | "link" | "info" | "success" | "warning" | "danger";

interface IProps {
  kind?: Kind;
}

const getBackgroundColor = (kind?: Kind): string => `${kind ? `has-background-${kind}` : 'has-background-white-bis'}`;
const getTextColor = (kind?: Kind): string => kind ? {
  "primary" : "has-text-white",
  "link"    : "has-text-white",
  "info"    : "has-text-white",
  "success" : "has-text-white",
  "warning" : "has-text-dark",
  "danger"  : "has-text-white",
}[kind!] : 'has-text-dark';

const Toast: React.SFC<IProps> = ({children, kind}) => (
  <div role="alert" className={`toast ${getBackgroundColor(kind)} ${getTextColor(kind)}`.trim()}>
    {children}
  </div>
);

export default Toast;
