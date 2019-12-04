import React from 'react';
import { MessageBoxContent, MessageBoxProvider } from ".";
import MessageBox, { IMessageBoxEssencialsProps } from "./MessageBox";
import { IMessageBoxContentProps } from "./MessageBoxContent";

const buildComponent = <P extends IMessageBoxContentProps, T extends MessageBoxContent<P>>(props: IMessageBoxEssencialsProps) => {
  return (t: new (p: P) => T) => {
    return (p: P) => {
      React.useEffect(() => {
        setTimeout(() => {
          MessageBox.showMessageBox({
            ...props,
            content: React.createElement(t, p),
          });
        }, 50);

        return () => MessageBoxProvider.dismissAll();
      });
      return <></>;
    };
  };
};

export default buildComponent;
