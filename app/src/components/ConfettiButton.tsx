import * as Bulma from 'bloomer';
import React from 'react';
import Confetti from 'react-confetti';
import { ButtonProps } from 'src/components/Button';

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
        style={{position: 'fixed', top: 0, right: 0, bottom: 0, left: 0}}
      />
      <Bulma.Button {...props} isLoading={isRollling} onClick={onClick}>{props.children}</Bulma.Button>
    </>
  );
};

export default ConfettiButton;
