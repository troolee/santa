import * as React from 'react';
import { connect } from 'react-redux';
import { userSignOut } from '../../reducers/auth';
import { IState } from '../../reducers/interfaces';
import { Api } from '../../utils/api';

import './MainContainer.css';
import { IndexPage } from '../../pages';

interface IProps {
  onLogout: () => Promise<void>;
}

class MainContainer extends React.Component<IProps> {
  public render() {
    return (
      <IndexPage />
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
