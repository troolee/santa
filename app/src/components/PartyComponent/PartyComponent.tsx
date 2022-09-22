import React from 'react';
import DocumentMeta from 'react-document-meta';
import { IParty, IUser } from 'src/interfaces';
import NotFound from 'src/components/PartyComponent/NotFound';
import { GarageDoor } from 'src/components';
import JoinBox from 'src/components/PartyComponent/JoinBox';
import buildTitle from 'src/utils/title';
import PartyDetails from 'src/components/PartyComponent/PartyDetails';

interface IProps {
  party: IParty | null;
  user: IUser | null;
  onLogout?: () => void;
  onJoinClick: (user: IUser | null, party: IParty) => Promise<any>;
  onLeave: (party: IParty) => Promise<any>;
  onFinish: (party: IParty) => Promise<any>;
}

const PartyComponent: React.SFC<IProps> = ({party, user, onJoinClick, onLogout, onLeave, onFinish}) => {
  if (!party) {
    return <NotFound />;
  }

  const onJoinClickEvent = async () => await onJoinClick(user, party);

  const isLocked = user === null || !party.isJoined;

  const renderLoginContainer = () => (
    <JoinBox
      user={user}
      party={party}
      onLogout={user !== null ? onLogout : undefined}
      onJoinClick={onJoinClickEvent}
    />
  );

  return (
    <DocumentMeta title={buildTitle(party.name)}>
      <GarageDoor isLocked={isLocked} renderDoor={renderLoginContainer}>
        <PartyDetails user={user!} onLogout={onLogout!} {...{party, onLeave, onFinish}} />
      </GarageDoor>
    </DocumentMeta>
  );
};

export default PartyComponent;
