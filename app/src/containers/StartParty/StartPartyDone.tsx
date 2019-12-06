import * as Bulma from 'bloomer';
import React from 'react';
import { MessageBoxContent, MessageBox } from '../MessageBox';
import { IMessageBoxContentProps } from '../MessageBox/MessageBoxContent';
import { IParty } from '../../interfaces';
import history from '../../utils/history';

interface IProps extends IMessageBoxContentProps {
  party: IParty,
}

export default class StartPartyDone extends MessageBoxContent<IProps> {
  public static showMessage(party: IParty) {
    MessageBox.showMessageBox({
      title: "Congratz!",
      width: 500,
      content: props => <StartPartyDone {...props} party={party} />,
      className: "congratz-box party-box",
    })
  }

  public render() {
    const onClick = () => {
      history.push(`/p/${this.props.party.code}`);
    };

    return (<>
      <Bulma.Content>
        <p>
          We have successfully created your party "{this.props.party.name}"!
        </p>
        <p>Here's your party's secret code:</p>
        <h1>{this.props.party.code}</h1>
        <Bulma.Button isColor="warning" isSize="large" className="is-rounded" onClick={onClick}>&#x1F973; Yahooooooo!</Bulma.Button>
      </Bulma.Content>
    </>);
  }
};
