import * as React from 'react';
import { IMessageBox } from './MessageBox';

export interface IMessageBoxContentProps {
  readonly messageBox?: IMessageBox;
  readonly ref?: React.RefObject<any>;
}

export interface IMessageBoxContent {
  canClose: () => Promise<Boolean>;
  onButtonClick: (props: IMessageBoxContentProps, id: string) => Promise<void>;
}

export default abstract class MessageBoxContent<P extends IMessageBoxContentProps = IMessageBoxContentProps, S = {}>
      extends React.Component<P, S> implements IMessageBoxContent {

  public constructor(props: P) {
    super(props);
  }

  public async canClose() {
    return true;
  }

  public async onButtonClick(props: IMessageBoxContentProps, id: string) {
  }
}
