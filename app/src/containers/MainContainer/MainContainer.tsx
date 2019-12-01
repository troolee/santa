import * as React from 'react';
import { connect } from 'react-redux';
import { NavBar } from '../../components/NavBar';
import { userSignOut } from '../../reducers/auth';
import { IState } from '../../reducers/interfaces';
import { Api } from '../../utils/api';

import './MainContainer.css';

interface IProps {
  onLogout: () => Promise<void>;
}

class MainContainer extends React.Component<IProps> {
  public render() {
    return (
      <div className="main-container">
        <NavBar onLogout={this.props.onLogout} />
      </div>
    );
  }
}

export default connect(
  (state: IState) => ({

  }),
  dispatch => ({
    onLogout: async () => {
      dispatch(userSignOut());
      await Api.signOut();
    },
  }),
)(MainContainer);
