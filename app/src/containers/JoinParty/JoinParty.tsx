import React from 'react';
import { MessageBoxContent, MessageBox, buildComponent } from "../MessageBox";
import { IButtonDescriptor } from '../MessageBox/MessageBox';
import DocumentMeta from 'react-document-meta';

const messageBoxEssencials = {
  title: "Join a party!",
  width: 600,
  buttons: [
    {caption: 'Hah, never mind', action: 'dismiss'} as IButtonDescriptor,
    {caption: <>&#x1F389; Rock'n'Roll!</>, className: 'is-primary'},
  ],
  className: 'party-box',
}

export default class JoinParty extends MessageBoxContent {
  public static showMessageBox() {
    MessageBox.showMessageBox({
      ...messageBoxEssencials,
      content: props => <JoinParty {...props} />,
    })
  }

  public render() {
    return (
      <DocumentMeta title="Join a party | Anonymous Ded Morozes">
        <>
          Hello people of the Earth!
        </>
      </DocumentMeta>
    );
  }
};

export const JoinPartyComponent = buildComponent({
  ...messageBoxEssencials,
  contextPath: "/",
})(JoinParty);
