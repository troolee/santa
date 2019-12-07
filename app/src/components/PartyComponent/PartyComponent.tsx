import React from 'react';
import DocumentMeta from 'react-document-meta';
import { IParty, IUser } from '../../interfaces';
import NotFound from './NotFound';
import { GarageDoor } from '..';
import JoinBox from './JoinBox';
import buildTitle from '../../utils/title';

interface IProps {
  party: IParty | null;
  user: IUser | null;
  onLogout?: () => void;
  onJoinClick: () => Promise<any>;
}

const PartyComponent: React.SFC<IProps> = ({party, user, onJoinClick, onLogout}) => {
  if (!party) {
    return <NotFound />;
  }

  const isLocked = user === null || !party.isJoined;

  const renderLoginContainer = () => (
    <JoinBox
      user={user}
      party={party}
      onLogout={user !== null ? onLogout : undefined}
      onJoinClick={onJoinClick}
    />
  );

  return (
    <DocumentMeta title={buildTitle(party.name)}>
      <GarageDoor isLocked={isLocked} renderDoor={renderLoginContainer}>
        Party hard!
      </GarageDoor>
    </DocumentMeta>
  );
};

export default PartyComponent;
