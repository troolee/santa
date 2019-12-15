import * as Bulma from 'bloomer';
import React from 'react';

interface IProps {
  label?: string;
}

const SecretText: React.SFC<IProps> = ({label, children}) => {
  const [isRevealed, setIsRevealed] = React.useState(false);
  const onReveal = () => setIsRevealed(true);
  return (
    isRevealed ? <>{children}</> : <Bulma.Button onClick={onReveal}>{label || 'Reveal'}</Bulma.Button>
  );
};

export default SecretText;
