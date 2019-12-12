import * as Bulma from 'bloomer';
import React from 'react';
import { Loader } from 'react-feather';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces';
import { Footer, UnsplashCredit } from '../../components';
import { IProfileState } from '../../reducers/interfaces';

import './Profile.css';

interface IProps {
  user: IUser;
  profile: IProfileState;
  onLogout: () => void;
}

const ProfilePage: React.SFC<IProps> = ({user, profile, onLogout}) => {
  const renderParties = () => {
    if (profile.parties!.length === 0) {
      return <p>No parties found... It's kinda sad :(</p>;
    }
    return (
      <ul style={{listStyle: 'none'}}>
        {profile.parties!.map((party, index) => <li key={index}><Link to={`/p/${party.code}`}>{party.name}</Link></li>)}
      </ul>
    );
  }

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
        <Bulma.HeroBody style={{alignItems: "start"}}>
          <Bulma.Container>
            <Bulma.Content hasTextAlign="centered">
              <p>&mdash; Looking for a list of your parties? Here it is:</p>
              {profile.parties !== null ? renderParties() : <Loader className="is-spin has-text-grey-lighter" />}
            </Bulma.Content>
          </Bulma.Container>
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
