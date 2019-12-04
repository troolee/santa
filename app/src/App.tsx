import React from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { AppLoading, GarageDoor } from './components';
import { LoginBoxContainer } from './containers';
import { MainContainer } from './containers/MainContainer';
import { initializeApp } from './reducers/app';
import { IState } from './reducers/interfaces';
import store from './store';

import './App.css';

interface IProps extends IState {}

class AppComponent extends React.Component<IProps> {
  public componentDidMount() {
    store.dispatch(initializeApp());
  }

  public render() {
    const renderLoginContainer = () => <LoginBoxContainer />;
    const renderMainApp = () => (
      <DocumentMeta title="Anonymous Ded Morozes">
        <GarageDoor isLocked={!this.props.auth.isLoggedIn} renderDoor={renderLoginContainer}>
          <MainContainer />
        </GarageDoor>
      </DocumentMeta>
    );

    return this.props.app.isLoaded ? renderMainApp() : <AppLoading />;
  }
}

export default connect(
  (state: IState) => state,
)(AppComponent);
