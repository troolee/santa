import React from 'react';
import { MessageBoxContent, MessageBox, buildComponent } from "../MessageBox";

const messageBoxEssencials = {
  title: "Join a party",
  width: 600,
  buttons: [
    {caption: 'Hah, nevermind'},
    {caption: "Rock'n'Roll!", className: 'is-primary'}
  ],
}

export default class JoinParty extends MessageBoxContent {
  public static showMessageBox() {
    MessageBox.showMessageBox({
      ...messageBoxEssencials,
      content: props => <JoinParty {...props} />,
    })
  }

  public render() {
    return <>Hello people of the Earth!</>;
  }
};

export const JoinPartyComponent = buildComponent(messageBoxEssencials)(JoinParty);
