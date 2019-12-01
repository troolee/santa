import * as Bulma from 'bloomer';
import * as React from 'react';
import { MessageBoxProvider } from '.';
import { IMessageBoxContentProps } from './MessageBoxContent';

const DEFAULT_WIDTH = 800;

interface IButtonDescriptor {
  id?: string;
  caption: string;
  className?: string;
  position?: 'left' | 'right';
  onClick?: (props: IMessageBoxContentProps, id: string) => Promise<void>;

  disabled?: boolean;
  visible?: boolean;
}

type ButtonAbbr = 'cancel' | 'close' | 'dismiss' | 'continue';
type ButtonDef = ButtonAbbr | IButtonDescriptor;
type Button = ButtonDef | ((props: IMessageBoxContentProps) => ButtonDef);

export interface IButtonProps {
  disabled?: boolean;
  visible?: boolean;
}

export interface IMessageBoxProps {
  title?: string;
  width?: number;
  content: string | React.ReactNode | ((props: IMessageBoxContentProps) => React.ReactNode);
  buttons?: Button[] | ((props: IMessageBoxContentProps) => Button[]);
}

export interface IMessageBoxStateBase {
  title?: string;
  width?: number;
}

type ButtonsState = {[id: string]: IButtonProps};

export interface IMessageBoxState extends IMessageBoxStateBase {
  contentRef: React.RefObject<any>;
  buttons: IButtonDescriptor[];
  busyButton: string | null;
  buttonsState: ButtonsState;
}

export interface IMessageBox {
  canClose: () => Promise<Boolean>;
  messageBoxState: IMessageBoxStateBase;
  setMessageBoxState: (state: IMessageBoxStateBase) => void;
  cancel: () => Promise<void>;
  dismiss: () => Promise<void>;
  setButtonsState: (state: ButtonsState) => void;
}

export default class MessageBox extends React.Component<IMessageBoxProps, IMessageBoxState> implements IMessageBox {
  public static showMessageBox(options: IMessageBoxProps, replace = false) {
    MessageBoxProvider.pushMessageBox(options, replace);
  }

  public constructor(props: IMessageBoxProps) {
    super(props);
    const buttons = this.prepareButtons();
    this.state = {
      title: props.title,
      width: props.width,
      contentRef: React.createRef<any>(),
      buttons,
      busyButton: null,
      buttonsState: buttons.reduce<any>(
        (obj, btn) => {
          obj[btn.id!] = { disabled: btn.disabled, visible: btn.visible};
          return obj;
        },
        {}
      ),
    };
  }

  public render() {
    const renderedContent = typeof this.props.content === 'function'
      ? this.props.content({messageBox: this, ref: this.state.contentRef})
      : this.props.content;

      const mkButton = (b: IButtonDescriptor) => {
        const btnState = this.state.buttonsState[b.id!];
        const visible = btnState.visible !== undefined ? btnState.visible : true;
        const onClick = () => this.onButtonClick(b);
        return (
          <React.Fragment key={b.id}>
            {visible && <Bulma.Button
              className={b.className || ''}
              onClick={onClick}
              isLoading={b.id === this.state.busyButton}
              disabled={this.state.busyButton !== null || btnState.disabled}
            >
              {b.caption}
            </Bulma.Button>}
          </React.Fragment>
        );
      };

      const leftButtons = this.state.buttons.filter(b => b.position === 'left').map(mkButton);
      const rightButtons = this.state.buttons.filter(b => b.position === 'right').map(mkButton);

    return (<>
      <Bulma.ModalCard style={{width: this.state.width || DEFAULT_WIDTH}}>
        {this.state.title &&
          <Bulma.ModalCardHeader>
            <Bulma.ModalCardTitle>
              {this.state.title}
            </Bulma.ModalCardTitle>
          </Bulma.ModalCardHeader>
        }

        <Bulma.ModalCardBody>
          <Bulma.Content>
            {renderedContent}
          </Bulma.Content>
        </Bulma.ModalCardBody>

        {(leftButtons.length || rightButtons.length) ?
          <Bulma.ModalCardFooter>
            <Bulma.Level>
              <Bulma.LevelLeft>
                <Bulma.LevelItem>
                  {leftButtons}
                </Bulma.LevelItem>
              </Bulma.LevelLeft>
              <Bulma.LevelRight>
                <Bulma.LevelItem>
                  {rightButtons}
                </Bulma.LevelItem>
              </Bulma.LevelRight>
            </Bulma.Level>
          </Bulma.ModalCardFooter>
          : <></>
        }
      </Bulma.ModalCard>
    </>);
  }

  public async canClose() {
    if (this.state.contentRef.current === null) {
      return true;
    }

    return await this.state.contentRef.current.canClose();
  }

  public get messageBoxState() {
    return this.state;
  }

  public setMessageBoxState(state: IMessageBoxStateBase) {
    this.setState(state);
  }

  public async cancel() {
    if (await this.canClose()) {
      await this.dismiss();
    }
  }

  public async dismiss() {
    MessageBoxProvider.popMessageBox();
  }

  public setButtonsState(state: ButtonsState) {
    const buttonsState = this.state.buttonsState;
    this.setState({
      buttonsState: {
        ...buttonsState,
        ...state,
      },
    });
  }

  protected prepareButtons(): IButtonDescriptor[] {
    const res: IButtonDescriptor[] = [];
    if (this.props.buttons) {
      const buttons = typeof this.props.buttons === 'function'
        ? this.props.buttons({messageBox: this, ref: this.state.contentRef})
        : this.props.buttons;
      buttons.forEach((b, i) => {
        var buttonDef: IButtonDescriptor;
        if (typeof b === 'string') {
          buttonDef = {
            caption: {
              'cancel': 'Cancel',
              'close': 'Close',
              'dismiss': 'Dismiss',
              'continue': 'Coninue',
            }[b as ButtonAbbr],
          };
          if (b === 'dismiss') {
            buttonDef.onClick = this.dismiss.bind(this);
          }
          else if (["cancel", "close"].indexOf(b) >= 0) {
            buttonDef.onClick = this.cancel.bind(this);
          }
          if (b === 'continue') {
            buttonDef.className = 'is-primary';
          }
      }
        else {
          buttonDef = b as IButtonDescriptor;
        }

        if (!buttonDef.id) {
          buttonDef.id = `mb-${i}`;
        }
        buttonDef.position = buttonDef.position || 'right';
        res.push(buttonDef);
      });
    }
    return res;
  }

  protected async onButtonClick(btn: IButtonDescriptor) {
    this.setState({busyButton: btn.id!});
    if (btn.onClick) {
      await btn.onClick({messageBox: this, ref: this.state.contentRef}, btn.id!);
    }
    else if (this.state.contentRef.current !== null) {
      await this.state.contentRef.current.onButtonClick({messageBox: this, ref: this.state.contentRef}, btn.id!);
    }
    this.setState({busyButton: null});
  }
}
