import React from 'react';
import { IParty, IUser } from '../../interfaces';
import { Button } from '..';

interface IProps {
  party: IParty;
  user: IUser;
  onFinish: (party: IParty) => Promise<any>;
}

const HostContent: React.SFC<IProps> = ({party, user, onFinish}) => {
  const participantCount = party.participantCount === 1
    ? <>Currently only you are participating in the party. But don't worry, it's just the beginning...</>
    : <>Currently {party.participantCount} nice people are participating in this, including you!</>;
  const finishParty = async () => await onFinish(party);
  return (
    <>
      <p>Hey, {user.name}! That's so awesome you're gathering the {party.name}!<br /></p>
      <p>{participantCount}</p>
      {party.participantCount! > 1 && <p>Here's a full list: {party.participants!.join(', ')}.</p>}
      <p>If you feel you're ready to Go then Go! Go ahead and press a button bellow. Have fun!</p>

      {!party.isClosed && <p style={{margin: '2em 0'}} className="has-text-centered-touch">
        <Button isColor="primary" onClick={finishParty}>&#x1F643; OK, Let's roll the dice!</Button>
      </p>}
    </>
  );
}

export default HostContent;
