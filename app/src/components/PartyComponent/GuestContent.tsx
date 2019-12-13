import React from 'react';
import { IParty, IUser } from '../../interfaces';
import { Button } from '..';

interface IProps {
  party: IParty;
  user: IUser;
  onLeave: (party: IParty) => Promise<any>;
}

const GuestContent: React.SFC<IProps> = ({party, user, onLeave}) => {
  const participants = ['You'];
  if (party.participantCount) {
    if (party.participantCount > 2) {
      participants.push(`and ${party.participantCount - 1} more nice ${party.participantCount - 1 === 1 ? 'person' : 'people'}`);
      if (party.participants) {
        participants.push(participants.pop() + ',');
        const pp = party.participants.slice(0, party.participants.length);
        const onePerson = pp.pop();
        if (pp.length > 0) {
          const persons = [pp.join(', '), onePerson].join(' and ');
          participants.push(`including ${persons}`);
        }
      }
    } else if (party.participants) {
      participants.push(`and ${party.participants[0]}`);
    }
  }

  const leaveParty = async () => await onLeave(party);
  return (
    <>
      <p>Hey, {user.name}! Welcome to the {party.name}!<br /></p>
      {participants.length > 1 ? <p>Good news! {participants.join(' ')} are participating in this.</p> : ""}
      <p>We're currently waiting for everybody else to join the party and then our special elf will do
        some complex math to decide who should give a gift to whom.</p>
      <p>Don't worry, it shouldn't take long. Last year we had whole two days to find and buy the gifts.
        Everything's under control, he knows what he's doing!</p>
      {!party.isClosed && <p style={{margin: '2em 0'}} className="has-text-centered-touch">
        <Button isColor="black" isOutlined={true} onClick={leaveParty}>I changed my mind and wanna quit...</Button>
      </p>}
    </>
  );
}

export default GuestContent;
