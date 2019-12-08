import * as Bulma from 'bloomer';
import React from 'react';
import { SyncLoader } from 'react-spinners';
import { IParty, IUser } from '../../interfaces';
import { GnomeSays } from '../GnomeSays';
import { UnsplashCredit } from '../UnsplashCredit';
import { Footer } from '..';

import './PartyDetails.css';

interface IProps {
  party: IParty;
  user: IUser;
  onLogout: () => void;
}

const PartyDetails: React.SFC<IProps> = ({party, user, onLogout}) => {
  React.useEffect(() => {
    const className = 'party-details-page';

    document.body.classList.add(className);
    return () => document.body.classList.remove(className);
  });

  const participants = ['You'];
  if (party.participantCount && party.participantCount > 1) {
    participants.push(`and ${party.participantCount - 1} more nice ${party.participantCount - 1 === 1 ? 'person' : 'people'}`);
    if (party.participants && party.participants.length) {
      participants.push(participants.pop() + ',');
      const pp = party.participants.slice(0, party.participants.length);
      const onePerson = pp.pop();
      const persons = [pp.join(', '), onePerson].join(' and ');
      participants.push(`including ${persons}`);
    }
  }

  return (
    <>
      <Bulma.Hero isFullHeight={true}>
        <Bulma.HeroBody>
          <Bulma.Container>
            <Bulma.Columns isVCentered={true}>
              <Bulma.Column isSize={1} isHidden="touch">&nbsp;</Bulma.Column>
              <Bulma.Column>
                <Bulma.Content className="has-text-justified has-text-left-touch">
                  <p>Hey, {user.name}! Welcome to the {party.name}!<br /></p>
                  {participants.length > 1 ? <p>Good news! {participants.join(' ')} are participating in this.</p> : ""}
                  <p>We're currently waiting for everybody else to join the party and then our special elf will do
                    some complex math to decide who should give a gift to whom.</p>
                  <p>Don't worry, it shouldn't take long. Last year we had whole two days to find and buy the gifts.
                    Everything's under control, he knows what to do!</p>
                  <p style={{margin: '2em 0'}} className="has-text-centered-touch">
                    <Bulma.Button isColor="black" isOutlined={true}>I changed my mind and wanna quit...</Bulma.Button>
                  </p>
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
