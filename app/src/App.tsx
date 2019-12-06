import React from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { AppLoading } from './components';
import { MainContainer } from './containers/MainContainer';
import { initializeApp } from './reducers/app';
import { IState } from './reducers/interfaces';
import store from './store';
import config from './config';

import './App.css';

interface IProps {
  state: IState;
}

class AppComponent extends React.Component<IProps> {
  public componentDidMount() {
    store.dispatch(initializeApp());
  }

  public render() {
    const isLoaded = this.props.state && this.props.state.app.isLoaded;

    return (
      <DocumentMeta title={config.siteTitle}>
        {isLoaded ? <MainContainer state={this.props.state} /> : <AppLoading />}
      </DocumentMeta>
    );
  }
}

export default connect(
  (state: IState) => ({state}),
)(AppComponent);
