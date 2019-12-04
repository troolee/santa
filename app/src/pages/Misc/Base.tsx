import * as Bulma from 'bloomer';
import React from 'react';
import DocumentMeta from 'react-document-meta';

import './Base.css';
import { Footer, UnsplashCredit } from '../../components';
import { Link } from 'react-router-dom';

interface IProps {
  title?: string;
  img?: string;
}

export const PageContent: React.SFC<IProps> = props => (
  <DocumentMeta title={`${props.title ? props.title + ' | ' : ''}Anonymous Ded Morozes`.trim()}>
    <div className="generic-page">
      <Bulma.Section className="page-content">
        <Bulma.Container>
          <Bulma.Columns>
            <Bulma.Column isSize="1/3" className="meta-column">
              <div className="picture">
                {props.img && <img src={props.img} />}
              </div>

              <Link to="/" className="button is-medium is-fullwidth">&#8592; Jeez, get me out of here</Link>
            </Bulma.Column>
            <Bulma.Column>
              <Bulma.Content>
                {props.title && <h1>{props.title}</h1>}

                <div className="has-text-justified">
                  {props.children}
                </div>
              </Bulma.Content>
            </Bulma.Column>
            <Bulma.Column isSize={1}>
              &nbsp;
            </Bulma.Column>
          </Bulma.Columns>
        </Bulma.Container>
      </Bulma.Section>
      <Bulma.Footer>
        <Bulma.Container>
          <Footer>
            <UnsplashCredit name="erin mckenna" nickname="epw615" />
          </Footer>
        </Bulma.Container>
      </Bulma.Footer>
    </div>
  </DocumentMeta>
);
