import React from 'react';
import { MessageBoxContent, MessageBoxProvider } from ".";
import MessageBox, { IMessageBoxEssencialsProps } from "./MessageBox";
import { IMessageBoxContentProps } from "./MessageBoxContent";
import { useHistory } from 'react-router-dom';

interface IBuildComponentProps {
  contextPath: string;
}

const buildComponent = <P extends IMessageBoxContentProps, T extends MessageBoxContent<P>>(
  props: IMessageBoxEssencialsProps & Partial<IBuildComponentProps>
) => {
  return (t: new (p: P) => T) => {
    return (p: P) => {
      const history = useHistory();

      React.useEffect(() => {
        setTimeout(() => {
          MessageBox.showMessageBox({
            ...props,
            content: React.createElement(t, p),
            onDismiss: () => {
              if (!props.contextPath) {
                return;
              }
              history.push(props.contextPath);
            }
          });
        }, 50);

        return () => MessageBoxProvider.dismissAll();
      });
      return <></>;
    };
  };
};

export default buildComponent;
