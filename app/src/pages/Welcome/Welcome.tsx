import React from 'react';
import * as Bulma from 'bloomer';
import { connect } from 'react-redux';
import { IState } from '../../reducers/interfaces';
import { IUser } from '../../interfaces';
import { UnsplashCredit, Divider } from '../../components';
import { userSignOut } from '../../reducers/auth';
import { Api } from '../../utils/api';

import grinchImg from './grinch.png';
import './Welcome.css';

interface IProps {
  user: IUser;
  onLogout: () => void;
}

const WelcomePageComponent: React.SFC<IProps> = ({user, onLogout}) => (
  <div className="welcome-page is-dark-background">
    <Bulma.Hero isFullHeight={true} className="hero">
      <Bulma.HeroHeader>
        <Bulma.Container>
          <Bulma.Columns isVCentered={true}>
            <Bulma.Column>&nbsp;</Bulma.Column>
            <Bulma.Column isSize="1/3" hasTextAlign="right">
              <h1>
                Welcome to the Anonymous Ded Morozes Club,<br />{user.name}!
              </h1>
            </Bulma.Column>
            <Bulma.Column isSize="narrow">
              <img src={grinchImg} style={{marginBottom: -40}} alt="Grinch" />
            </Bulma.Column>
            </Bulma.Columns>
        </Bulma.Container>
      </Bulma.HeroHeader>

      <Bulma.HeroBody>
        <Bulma.Container>

          <Bulma.Columns isVCentered={true}>
            <Bulma.Column>&nbsp;</Bulma.Column>
            <Bulma.Column isSize="1/3" hasTextAlign="right">
              <a href="#">
                I wanna start playing this weird game with my soulmates!
              </a>
            </Bulma.Column>
            <Bulma.Column isSize="narrow" hasTextAlign="centered">
              <Divider isVertical={true} label="OR" />
            </Bulma.Column>
            <Bulma.Column isSize="1/3">
              <a href="#">
                One of my crazy friend wrote a secret code on my hand...
              </a>
            </Bulma.Column>
            <Bulma.Column>&nbsp;</Bulma.Column>
          </Bulma.Columns>
        </Bulma.Container>

      </Bulma.HeroBody>
      <Bulma.HeroFooter hasTextAlign="right" style={{padding: '0.5rem 1rem'}}>
        <p className="is-size-6 bottom-menu">
          <span>
            <a href="#">Privacy</a> | <a href="#">Terms and Conditions</a> | <a onClick={onLogout}>Logout</a>
          </span>
        </p>
        <p className="is-size-7">
          Made with ❤ in Canada by <a href="https://uglyunicorn.ca">Ugly Unicorn</a>
        </p>
        <p className="is-size-7">
          <UnsplashCredit nickname="joannakosinska" name="Joanna Kosinska" />
        </p>
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
  })
)(WelcomePageComponent);
