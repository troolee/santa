import * as Bulma from 'bloomer';
import * as React from 'react';
import {Loader} from 'react-feather';

import './AppLoading.css';

export default class AppLoading extends React.Component {
  public render() {
    return <>
      <Bulma.Hero isFullHeight={true}>
        <Bulma.HeroBody>
          <Bulma.Container className="has-text-centered">
            <Bulma.Title className="has-text-grey-lighter is-spin"><Loader /></Bulma.Title>
            <Bulma.Subtitle className="has-text-grey-lighter">Loading</Bulma.Subtitle>
          </Bulma.Container>
        </Bulma.HeroBody>
      </Bulma.Hero>
    </>;
  }
}
