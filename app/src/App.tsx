import React from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { AppLoading } from './components';
import { MainContainer } from './containers/MainContainer';
import ImagesPreloader from './containers/ImagesPreloader';
import { initializeApp, appImagesPreloaded } from './reducers/app';
import { IState } from './reducers/interfaces';
import store from './store';
import config from './config';

import './App.css';

import img1 from './components/LoginBox/garage-door.jpg';
import img2 from './components/PartyComponent/background.jpg';
import img3 from './components/PartyComponent/garage-door.jpg';
import img4 from './components/PartyComponent/not-found.jpg';
import img5 from './pages/Welcome/Welcome.jpg';

interface IProps {
  state: IState;
  onImagesPreloaded: () => void;
}

class AppComponent extends React.Component<IProps> {
  public componentDidMount() {
    store.dispatch(initializeApp());
  }

  public render() {
    const isLoaded = this.props.state && this.props.state.app.isLoaded && this.props.state.app.isImagesPreloaded;

    return (
      <DocumentMeta title={config.siteTitle}>
        {isLoaded ? <MainContainer state={this.props.state} /> : <AppLoading />}

        <ImagesPreloader
          images={[img1, img2, img3, img4, img5]}
          onLoad={this.props.onImagesPreloaded}
        />
      </DocumentMeta>
    );
  }
}

export default connect(
  (state: IState) => ({state}),
  (dispatch: (x: any) => void) => ({
    onImagesPreloaded: () => dispatch(appImagesPreloaded()),
  })
)(AppComponent);
