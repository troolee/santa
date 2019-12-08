import React from 'react';
import { MessageBox, MessageBoxContent } from '../MessageBox';
import { IButtonDescriptor } from '../MessageBox/MessageBox';

import './ConfirmLeaving.css';

export default class ConfirmLeaving extends MessageBoxContent {
  public static async showMessageBox(): Promise<boolean> {
    return await MessageBox.showMessageBox({
      title: 'Ouch... Not funny :(',
      content: props => <ConfirmLeaving {...props} />,
      width: 600,
      buttons: [
        {caption: "That was an accident...", action: 'dismiss'} as IButtonDescriptor,
        {caption: <>&#x1F44B; Bye-e-e!</>, action: 'confirm', className: 'is-primary'},
      ],
      className: 'party-box confirm-leaving-box',
    });
  }

  public render = () => (
    <>
      <p>Sorry to see you're leaving...</p>
      <p>But we understand, fun is not for everyone... If you change your mind again (it happened to me once) feel free
        to join the party again (while it's open)</p>
      <p>Enjoy your holidays! Bye!</p>
    </>
  )
}
