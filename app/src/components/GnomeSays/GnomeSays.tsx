import * as Bulma from 'bloomer';
import { Bulma as BulmaHelpers } from 'bloomer/lib/bulma'
import React from 'react';

import './GnomeSays.css';

interface IProps {
  isColor?: string;
}

const GnomeSays: React.SFC<IProps & BulmaHelpers.Helpers> = props => (
  <Bulma.Message className="gnome-says cupid" isColor={props.isColor} {...props}>
    <Bulma.MessageBody>
      {props.children}
    </Bulma.MessageBody>
  </Bulma.Message>
);

export default GnomeSays;
