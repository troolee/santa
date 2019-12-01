import * as Bulma from 'bloomer';
import * as React from 'react';

import './NavBar.css';

interface IProps {
  onLogout: () => Promise<void>;
}

interface IState {
  isExiting: boolean;
}

export class NavBar extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      isExiting: false,
    }
  }

  public render () {
    const exit = () => {
      this.setState({isExiting: true});
      this.props.onLogout();
    }

    return (
      <Bulma.Navbar>
        <Bulma.Container>
          <Bulma.NavbarBrand>
            <a href="/" className="navbar-item">ADM</a>
          </Bulma.NavbarBrand>

          <Bulma.NavbarMenu>
            <Bulma.NavbarEnd>
              <Bulma.NavbarItem>
                <div className="buttons">
                  <Bulma.Button
                    isLoading={this.state.isExiting}
                    onClick={exit}
                    className="exit-button"
                  >
                    <span>Logout</span>
                  </Bulma.Button>
                </div>
              </Bulma.NavbarItem>
            </Bulma.NavbarEnd>
          </Bulma.NavbarMenu>
        </Bulma.Container>
      </Bulma.Navbar>
    )
  }
};
