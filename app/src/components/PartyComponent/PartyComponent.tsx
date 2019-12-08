import React from 'react';
import DocumentMeta from 'react-document-meta';
import { IParty, IUser } from '../../interfaces';
import NotFound from './NotFound';
import { GarageDoor } from '..';
import JoinBox from './JoinBox';
import buildTitle from '../../utils/title';
import PartyDetails from './PartyDetails';

interface IProps {
  party: IParty | null;
  user: IUser | null;
  onLogout?: () => void;
  onJoinClick: (user: IUser | null, party: IParty) => Promise<any>;
  onLeave: (party: IParty) => Promise<any>;
}

const PartyComponent: React.SFC<IProps> = ({party, user, onJoinClick, onLogout, onLeave}) => {
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
        <PartyDetails party={party} user={user!} onLogout={onLogout!} onLeave={onLeave} />
      </GarageDoor>
    </DocumentMeta>
  );
};

export default PartyComponent;
