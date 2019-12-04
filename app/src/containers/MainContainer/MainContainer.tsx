import * as React from 'react';
import { connect } from 'react-redux';
import { WelcomePage } from '../../pages/Welcome';

import './MainContainer.css';

interface IProps {
}

const MainContainer: React.SFC<IProps> = () => (
  <WelcomePage />
);

export default connect(
)(MainContainer);
