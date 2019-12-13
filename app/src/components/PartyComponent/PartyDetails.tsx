import * as Bulma from 'bloomer';
import React from 'react';
import { SyncLoader } from 'react-spinners';
import { IParty, IUser } from '../../interfaces';
import { GnomeSays } from '../GnomeSays';
import { UnsplashCredit } from '../UnsplashCredit';
import { Footer } from '..';
import GuestContent from './GuestContent';
import HostContent from './HostContent';

import './PartyDetails.css';

interface IProps {
  party: IParty;
  user: IUser;
  onLogout: () => void;
  onLeave: (party: IParty) => Promise<any>;
  onFinish: (party: IParty) => Promise<any>;
}

const PartyDetails: React.SFC<IProps> = ({party, user, onLogout, onLeave, onFinish}) => {
  React.useEffect(() => {
    const className = 'party-details-page';

    document.body.classList.add(className);
    return () => document.body.classList.remove(className);
  });

  return (
    <>
      <Bulma.Hero isFullHeight={true}>
        <Bulma.HeroBody>
          <Bulma.Container>
            <Bulma.Columns isVCentered={true}>
              <Bulma.Column isSize={1} isHidden="touch">&nbsp;</Bulma.Column>
              <Bulma.Column>
                <Bulma.Content className="has-text-justified has-text-left-touch">
                  {party.isHost ? <HostContent {...{party, user, onFinish}} /> : <GuestContent {...{party, user, onLeave}} />}
                </Bulma.Content>
              </Bulma.Column>
              <Bulma.Column isSize={5} hasTextAlign="centered">
                <GnomeSays>
                  <SyncLoader color="#4a4a4a" size={10} />
                  {/* You're a Secret Ded Moroz for <strong>Pavel Reznikov</strong> */}
                </GnomeSays>
              </Bulma.Column>
            </Bulma.Columns>
          </Bulma.Container>
        </Bulma.HeroBody>
        <Bulma.HeroFooter>
          <Footer onLogout={onLogout}>
            <UnsplashCredit nickname="joannakosinska" name="Joanna Kosinska" />
          </Footer>
        </Bulma.HeroFooter>
      </Bulma.Hero>
    </>
  );
}

export default PartyDetails;
