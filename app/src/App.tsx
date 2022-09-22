import React from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { AppLoading } from 'src/components';
import { MainContainer } from 'src/containers/MainContainer';
import ImagesPreloader from 'src/containers/ImagesPreloader';
import { initializeApp, appImagesPreloaded } from 'src/reducers/app';
import { IState } from 'src/reducers/interfaces';
import store from 'src/store';
import config from 'src/config';

import 'src/App.css';

import img1 from 'src/components/LoginBox/garage-door.jpg';
import img2 from 'src/components/PartyComponent/background.jpg';
import img3 from 'src/components/PartyComponent/garage-door.jpg';
import img4 from 'src/components/PartyComponent/not-found.jpg';
import img5 from 'src/pages/Welcome/Welcome.jpg';

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
