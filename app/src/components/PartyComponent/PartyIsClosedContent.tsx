import React from 'react';
import { IParty, IUser } from '../../interfaces';
import ConfettiButton from '../ConfettiButton';

interface IProps {
  party: IParty;
  user: IUser;
}

const PartyIsClosedContent: React.SFC<IProps> = ({party, user}) => {
  return (
    <>
      <p>Hey, {user.name}! This is a new stage of the {party.name}! You are officially an Anonymous Ded Moroz! Hooray! &#x1F389;</p>
      <p>{party.participantCount} awesome people are participating in this. Our very special elf finished his
        complex math and you know what? Each of you got one name. This is a person you have to get a gift to.</p>
      <p>Just ask the elf but keep the name in secret, nobody should know what is it. </p>
      <p>Have fun! And Happy Holidays!</p>
      <p style={{marginBottom: 50}}>
        <ConfettiButton isColor="primary">&#x1F929; Yey! Party!</ConfettiButton>
      </p>
    </>
  );
}

export default PartyIsClosedContent;
