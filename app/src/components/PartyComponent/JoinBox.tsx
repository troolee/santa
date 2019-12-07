import * as Bulma from 'bloomer';
import * as React from 'react';
import { UnsplashCredit } from '../UnsplashCredit';
import { Footer } from '../Footer';
import { IUser, IParty } from '../../interfaces';
import { Button } from '..';

import './JoinBox.css';

interface IProps {
  user: IUser | null;
  party: IParty;
  onJoinClick: () => Promise<any>;
  onLogout?: () => void;
}

const JoinBox: React.SFC<IProps> = ({party, user, onJoinClick, onLogout}) => {
  return (
    <Bulma.Hero isFullHeight={true} className="join-container">
      <Bulma.HeroBody>
        <Bulma.Container hasTextAlign="centered">
          <h2>{user && <>Howdy, {user.name}!<br /></>} Welcome to the {party.name}!</h2>
          <Button
            isLink={true}
            isSize="medium"
            className="is-rounded login-button"
            isColor="warning"
            onClick={onJoinClick}
          >
            &#x1F973;&nbsp;{user ? "Join the party!" : "Sign in & Join the party!"}
          </Button>
        </Bulma.Container>
      </Bulma.HeroBody>

      <Bulma.HeroFooter>
        <Footer onLogout={onLogout}>
          <UnsplashCredit nickname="ninjason" name="Jason Leung" />
        </Footer>
      </Bulma.HeroFooter>
    </Bulma.Hero>
  );
}

export default JoinBox;
