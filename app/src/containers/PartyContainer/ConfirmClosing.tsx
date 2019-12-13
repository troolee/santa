import * as Bulma from 'bloomer';
import React from 'react';
import { MessageBox, MessageBoxContent } from '../MessageBox';
import { Button } from '../../components';

import './ConfirmClosing.css';

export default class ConfirmClosing extends MessageBoxContent {
  public static async showMessageBox(): Promise<boolean> {
    return await MessageBox.showMessageBox({
      title: 'Here we GO-O-O-O!!!',
      content: props => <ConfirmClosing {...props} />,
      width: 700,
      className: 'party-box confirm-closing-box',
    });
  }

  public render() {
    const onCancel = () => this.props.messageBox!.done();
    const onClose = () => this.props.messageBox!.done(true);
    return (
      <>
        <Bulma.Content className="confirm-closing-box-content">
          <p>Are you ready to rock'n'roll? Before you continue please note:</p>
          <ul>
            <li>Everybody will receive a random friend's name to give a gift away to</li>
            <li>No new people can join the party after this</li>
            <li>This cannot be undone</li>
          </ul>
          <p>But less talks, let the show begin!</p>
        </Bulma.Content>
        <div className="buttons is-pulled-right">
          <Bulma.Button onClick={onCancel}>Not ready yet...</Bulma.Button>
          <Button isColor="primary" onClick={onClose}>&#x1F92A; Can't wait any longer!</Button>
        </div>
      </>
    );
  }
}
