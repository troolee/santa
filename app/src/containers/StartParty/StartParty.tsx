import React from 'react';
import { MessageBoxContent, MessageBox, buildComponent } from "../MessageBox";
import { IButtonDescriptor } from '../MessageBox/MessageBox';

const messageBoxEssencials = {
  title: "Let's start a new party!",
  width: 600,
  buttons: [
    {caption: 'Hah, never mind', action: 'dismiss'} as IButtonDescriptor,
    {caption: <>&#x1F389; Rock'n'Roll!</>, className: 'is-primary'}
  ],
  className: 'party-box',
}

export default class StartParty extends MessageBoxContent {
  public static showMessageBox() {
    MessageBox.showMessageBox({
      ...messageBoxEssencials,
      content: props => <StartParty {...props} />,
    })
  }

  public render() {
    return (
      <>
        Hello people of the Earth!
      </>
    );
  }
};

export const StartPartyComponent = buildComponent({
  ...messageBoxEssencials,
  contextPath: "/",
})(StartParty);
