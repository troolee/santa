import * as Bulma from 'bloomer';
import * as React from 'react';
import { UnsplashCredit } from '../UnsplashCredit';

import './LoginBox.css';
import { Footer } from '../Footer';

interface IProps {
  onLoginClick: () => Promise<any>;
  isFacebookApiReady: boolean;
}

interface IState {
  isBusy: boolean;
}

export default class LoginBox extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      isBusy: false,
    }
  }

  public render() {
    const onLoginClick = this.onLoginClick.bind(this);

    return (
      <Bulma.Hero isFullHeight={true} className="login-container has-dark-background">
        <Bulma.HeroBody>
          <Bulma.Container hasTextAlign="centered">
            <Bulma.Button
              isLink={true}
              isSize="medium"
              className="is-rounded login-button"
              isLoading={this.state.isBusy}
              onClick={onLoginClick}
              disabled={this.state.isBusy || !this.props.isFacebookApiReady}
              style={{backgroundColor: '#e94e59'}}
            >
              Enter with Facebook account
            </Bulma.Button>
          </Bulma.Container>
        </Bulma.HeroBody>

        <Bulma.HeroFooter>
          <Footer>
            <UnsplashCredit nickname="callmefred" name="Frederick Tubiermont" />
          </Footer>
        </Bulma.HeroFooter>
      </Bulma.Hero>
    );
  }

  private async onLoginClick() {
    this.setState({
      isBusy: true,
    });
    await Promise.all([
      this.props.onLoginClick(),
      new Promise(complete => setTimeout(complete, 800)),
    ]);
    this.setState({
      isBusy: false,
    });
  }
}
