import * as Bulma from 'bloomer';
import React from 'react';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { Footer } from '../Footer';
import { UnsplashCredit } from '..';

import './NotFound.css';
import buildTitle from '../../utils/title';

const NotFound: React.SFC = () => (
  <DocumentMeta title={buildTitle("Party not found")}>
    <Bulma.Hero isFullHeight={true} className="party-not-found">
      <Bulma.HeroBody>
        <Bulma.Container>
          <Bulma.Content hasTextAlign="centered">
            <h1>&mdash; Houston, we have a problem! There's no party here!<br />I repeat, code FOUR-OH-FOUR... FOXTROT-UNIFORM-CHARLIE-KILO...</h1>
            <p>
              <Link to="/" className="button is-medium is-white is-outlined">Go back to the Earth</Link>
            </p>
          </Bulma.Content>
        </Bulma.Container>
      </Bulma.HeroBody>
      <Bulma.HeroFooter>
        <Footer>
          <UnsplashCredit nickname="nasa" name="NASA" />
        </Footer>
      </Bulma.HeroFooter>
    </Bulma.Hero>
  </DocumentMeta>
);

export default NotFound;
