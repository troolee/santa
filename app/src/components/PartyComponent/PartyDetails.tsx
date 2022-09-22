import * as Bulma from 'bloomer';
import React from 'react';
import Confetti from 'react-confetti';
import { SyncLoader } from 'react-spinners';
import { IParty, IUser } from 'src/interfaces';
import { GnomeSays } from 'src/components/GnomeSays';
import { UnsplashCredit } from 'src/components/UnsplashCredit';
import { Footer } from 'src/components';
import SecretText from 'src/components/SecretText';
import GuestContent from 'src/components/PartyComponent/GuestContent';
import HostContent from 'src/components/PartyComponent/HostContent';
import PartyIsClosedContent from 'src/components/PartyComponent/PartyIsClosedContent';

import 'src/components/PartyComponent/PartyDetails.css';

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
    document.body.classList.add('cupid');
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
                  {
                    party.isClosed
                    ? <PartyIsClosedContent {...{party, user}} />
                    : party.isHost
                    ? <HostContent {...{party, user, onFinish}} />
                    : <GuestContent {...{party, user, onLeave}} />
                  }
                </Bulma.Content>
              </Bulma.Column>
              <Bulma.Column isSize={5} hasTextAlign="centered">
                <GnomeSays>
                  {party.target ? (
                    <>
                      <p className="has-text-left" style={{marginBottom: '0.5em'}}>
                        &mdash; Pssss, kid... Are you alone?.. Wanna hear whom you should get a gift?
                      </p>
                      <p className="has-text-right">
                        <SecretText label="&mdash; Yes, please!">
                          <Confetti
                            recycle={false}
                            numberOfPieces={750}
                            style={{position: 'fixed', top: 0, right: 0, bottom: 0, left: 0}}
                          />

                          <p className="has-text-right" style={{marginBottom: '0.5em'}}>
                            &mdash; Yes, please!
                          </p>
                          <p className="has-text-left">
                            &mdash; This is <strong>{party.target.name}</strong>, but it's a secret...
                            Good luck with your ideas! Happy Holidays!
                          </p>
                        </SecretText>
                      </p>
                    </>
                   ) : <SyncLoader color="#4a4a4a" size={10} />}
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
