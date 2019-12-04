import * as React from 'react';
import * as Bulma from 'bloomer';
import * as _ from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { default as MessageBox, IMessageBoxProps } from './MessageBox';
import { TransitionDuration, BackgroundVariants, CardVariants } from './consts';

import "./MessageBox.css";

interface IProps {
  className?: string;
  position?: "top" | "center",
  isLight?: boolean,
}

interface IManagedMessageBoxProps extends IMessageBoxProps {
  readonly key: string;
  readonly messageBoxRef: React.RefObject<MessageBox>;
}

interface IState {
  messageBoxes: IManagedMessageBoxProps[];
  isDeployed: boolean;
}

export default class MessageBoxProvider extends React.Component<IProps, IState> {
  public static pushMessageBox(options: IMessageBoxProps, replace: boolean) {
    const mb = {
      ...options,
      key: `mb-${(Math.random() * 1000000).toFixed}`,
      messageBoxRef: React.createRef<MessageBox>(),
    };

    const {messageBoxes} = this.instance.state;
    this.instance.setState({
      isDeployed: true,
      messageBoxes: replace ? [mb] : [mb].concat(messageBoxes),
    });
  }

  public static popMessageBox(): IMessageBoxProps | null {
    const instance = MessageBoxProvider.instance;
    if (instance.state.messageBoxes.length === 0) {
      return null;
    }
    const current = instance.state.messageBoxes[0];
    instance.setState({
      messageBoxes: _.tail(instance.state.messageBoxes),
    });
    return current;
  }

  public static dismissAll() {
    const instance = MessageBoxProvider.instance;
    instance.setState({
      messageBoxes: [],
    });
  }

  private static instance: MessageBoxProvider;

  public constructor(props: any) {
    super(props);

    if (MessageBoxProvider.instance) {
      throw new Error("Only one MessageBoxProvider is allowed. Please install it around the root component.");
    }

    MessageBoxProvider.instance = this;

    this.state = {
      messageBoxes: [],
      isDeployed: false,
    };
  }

  public render() {
    const messageBox = this.state.messageBoxes.length > 0 ? this.state.messageBoxes[0] : null;

    const onUpdate = ({opacity}: any) => {
      if (opacity === 0) {
        setTimeout(() => {
          this.setState({isDeployed: false});
        }, 10);
      }
    };

    const renderMessageBox = () => (
      <Bulma.Modal
        isActive={true}
        className={`
            ${this.props.position === 'top' ? 'modal-position-top' : ''}
            ${this.props.isLight ? 'modal-background-light' : ''}
            ${messageBox ? messageBox.className : ''}
          `.trim()}
      >
        <AnimatePresence>
          {messageBox && <motion.div
            className="modal-background"
            variants={BackgroundVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{duration: TransitionDuration}}
            onUpdate={onUpdate}
          />}
        </AnimatePresence>
        <AnimatePresence>
          {messageBox && <motion.div
            className="modal-card-wrapper"
            variants={CardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{duration: TransitionDuration}}
          >
            <MessageBox key={messageBox.key} ref={messageBox.messageBoxRef} {...messageBox} />
          </motion.div>}
        </AnimatePresence>
      </Bulma.Modal>
    );
    return (
      <>
        {this.state.isDeployed && renderMessageBox()}
        {this.props.children}
      </>
    );
  }
}
