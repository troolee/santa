import * as Bulma from 'bloomer';
import React from 'react';
import { IUser } from '../../interfaces';
import { Footer, UnsplashCredit } from '../../components';

import './Profile.css';
import { Link } from 'react-router-dom';

interface IProps {
  user: IUser;
  onLogout: () => void;
}

const ProfilePage: React.SFC<IProps> = ({user, onLogout}) => {
  return (
    <div className="profile-page">
      <Bulma.Hero isFullHeight={true} className="profile-page">
        <Bulma.HeroHeader>
          <Bulma.Navbar>
            <Bulma.Container>
              <Bulma.NavbarBrand>
                <Link to="/" className="navbar-item">
                  <Bulma.Image isSize="48x48" src={user.picture} />
                  Howdy, Anonymous Ded Moroz!
                </Link>
              </Bulma.NavbarBrand>
              <Bulma.NavbarMenu>
                <Bulma.NavbarEnd>
                  <Bulma.NavbarItem>
                    <div className="buttons">
                      <Bulma.Button onClick={onLogout}>Sign Out</Bulma.Button>
                    </div>
                  </Bulma.NavbarItem>
                </Bulma.NavbarEnd>
              </Bulma.NavbarMenu>
            </Bulma.Container>
          </Bulma.Navbar>
        </Bulma.HeroHeader>
        <Bulma.HeroBody>
          &nbsp;
        </Bulma.HeroBody>
        <Bulma.HeroFooter>
          <Footer>
            <UnsplashCredit nickname="melipoole" name="Mel Poole" />
          </Footer>
        </Bulma.HeroFooter>
      </Bulma.Hero>
    </div>
  );
};

export default ProfilePage;
