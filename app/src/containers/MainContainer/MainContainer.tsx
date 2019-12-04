import * as React from 'react';
import { connect } from 'react-redux';
import { userSignOut } from '../../reducers/auth';
import { IState } from '../../reducers/interfaces';
import { Api } from '../../utils/api';
import { IndexPage } from '../../pages';

import './MainContainer.css';

interface IProps {
  onLogout: () => Promise<void>;
}

const MainContainer: React.SFC<IProps> = () => <IndexPage />;

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
