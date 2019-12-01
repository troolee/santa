import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import './GarageDoor.css';

interface IProps {
  isLocked: boolean;
  renderDoor?: () => React.ReactNode;
}

interface IState {
  isShut: boolean;
}

export default class GarageDoor extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      isShut: props.isLocked,
    };
  }

  public render() {
    const isLocked = this.props.isLocked;
    const isShut = this.state.isShut;
    const renderDoor = this.props.renderDoor || (() => <div />);

    const variants = {
      closed: {
        top: 0,
      },
      open: {
        top: '-105vh',
      },
    };

    const onUpdate = ({top}: any) => {
      this.setState({isShut: top === 0});
    };

    return (
      <>
        <AnimatePresence>
          {isLocked && (
            <motion.div
              className="garage-door"
              variants={variants}
              initial={isShut ? "closed" : "open"}
              animate={isLocked ? "closed" : "open"}
              exit="open"
              transition={{ duration: 1 }}
              onUpdate={onUpdate}
            >
              {renderDoor()}
            </motion.div>
          )}
        </AnimatePresence>
        {!isShut && <div className="garage-door-content">{this.props.children}</div>}
      </>
    );
  }
}
