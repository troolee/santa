import React from 'react';
import * as Bulma from 'bloomer';
import { connect } from 'react-redux';
import { IState } from '../../reducers/interfaces';
import { IUser } from '../../interfaces';
import { UnsplashCredit, Divider, Footer } from '../../components';
import { userSignOut } from '../../reducers/auth';
import { Api } from '../../utils/api';

import grinchImg from './grinch.png';
import './Welcome.css';

interface IProps {
  user: IUser;
  onLogout: () => void;
  onStartParty: () => void;
  onJoinParty: () => void;
}

const WelcomePageComponent: React.SFC<IProps> = ({user, onLogout, onStartParty, onJoinParty}) => (
  <div className="welcome-page has-dark-background">
    <Bulma.Hero isFullHeight={true} className="hero">
      <Bulma.HeroHeader>
        <Bulma.Container>
          <Bulma.Columns isVCentered={true}>
            <Bulma.Column isHidden="tablet" hasTextAlign="centered">
              <img src={grinchImg} alt="Grinch" width={128} height={128} />
            </Bulma.Column>
            <Bulma.Column isHidden="mobile">&nbsp;</Bulma.Column>
            <Bulma.Column isSize="1/3" className="has-text-right-tablet has-text-centered-mobile">
              <h1>
                Welcome to the Anonymous Ded Morozes Club,<br className="is-hidden-mobile" />&nbsp;{user.name}!
              </h1>
            </Bulma.Column>
            <Bulma.Column isHidden="mobile" isSize="narrow">
              <img src={grinchImg} style={{marginBottom: -40}} alt="Grinch" />
            </Bulma.Column>
          </Bulma.Columns>

        </Bulma.Container>
      </Bulma.HeroHeader>

      <Bulma.HeroBody>
        <Bulma.Container>

          <Bulma.Content hasTextAlign="centered">
            So, what are you up to today?
          </Bulma.Content>

          <Bulma.Columns isVCentered={true}>
            <Bulma.Column isSize={1} isHidden="touch">&nbsp;</Bulma.Column>
            <Bulma.Column className="has-text-right-tablet">
              <a onClick={onStartParty}>
                I wanna start playing this weird game with my soulmates... Let's rock'n'roll!
              </a>
            </Bulma.Column>
            <Bulma.Column isSize="narrow" hasTextAlign="centered" isHidden="mobile">
              <Divider isVertical={true} label="OR" />
            </Bulma.Column>
            <Bulma.Column>
              <a onClick={onJoinParty}>
                One of my crazy friend wrote a secret code on my hand... I wanna play!
              </a>
            </Bulma.Column>
            <Bulma.Column isSize={1} isHidden="touch">&nbsp;</Bulma.Column>
          </Bulma.Columns>

        </Bulma.Container>
      </Bulma.HeroBody>
      <Bulma.HeroFooter>
        <Footer onLogout={onLogout}>
          <UnsplashCredit nickname="joannakosinska" name="Joanna Kosinska" />
        </Footer>
      </Bulma.HeroFooter>
    </Bulma.Hero>
  </div>
);

export const WelcomePage = connect(
  (state: IState) => ({
    user: state.auth.user!,
  }),
  dispatch => ({
    onLogout: async () => {
      dispatch(userSignOut());
      await Api.signOut();
    },
    onStartParty: async () => {
    },
    onJoinParty: async () => {
    },
  })
)(WelcomePageComponent);
