import * as Bulma from 'bloomer';
import React from 'react';
import Confetti from 'react-confetti';
import { ButtonProps } from './Button';

const ConfettiButton: React.SFC<ButtonProps> = props => {
  const [isRollling, setIsRolling] = React.useState(false);
  const onClick = () => {
    setIsRolling(true);
  };
  const onConfettiComplete = (confetti: any) => {
    confetti.reset();
    setIsRolling(false);
  }
  return (
    <>
      <Confetti
        recycle={false}
        run={isRollling}
        numberOfPieces={750}
        onConfettiComplete={onConfettiComplete}
        style={{position: 'fixed'}}
      />
      <Bulma.Button {...props} isLoading={isRollling} onClick={onClick}>{props.children}</Bulma.Button>
    </>
  );
};

export default ConfettiButton;
