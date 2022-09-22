import * as Bulma from 'bloomer';
import * as React from 'react';
import { IProps as IToastsProps } from 'src/components/Toast/Toasts';
import { Kind } from 'src/components/Toast/Toast';
import { Toasts, Toast } from 'src/components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const DEFAULT_TIMEOUT = 5000;

type ToastRenderer = () => React.ReactNode;

export interface IToast {
  message: string | ToastRenderer;
  kind?: Kind;
  timeout?: number;
  isBlocked?: boolean;
}

interface IIdToast extends IToast {
  id: string;
}

interface IProps extends IToastsProps {
  timeout?: number;
}

interface IState {
  toasts: IIdToast[];
}

export default class ToastsContainer extends React.Component<IProps, IState> {
  protected static get instance() {
    if (!ToastsContainer._instance) {
      throw Error('You need to insert <ToastsContainer /> before.')
    }
    return ToastsContainer._instance;
  }

  public static displayToast(toast: IToast) {
    ToastsContainer.instance.pushToast(toast);
  }

  public static displaySystemError(message?: string) {
    message = message || ('Oups... A problem occured while handling your request. '
      + 'Plase try again later or contact us if error repeats.');
    const reload = () => window.location.reload();
    ToastsContainer.instance.pushToast({
      message: () => (
        (
          <div className="content">
            <p>{message}</p>
            <p>
              <Bulma.Button isColor="danger" isInverted={true} isOutlined={true} onClick={reload}>
                Reload Page
              </Bulma.Button>
            </p>
          </div>
        )
      ),
      kind: 'danger',
      timeout: -1,
      isBlocked: true,
    });
  }

  protected static _instance: ToastsContainer;

  public constructor(props: IProps) {
    if (ToastsContainer._instance) {
      throw Error('Only one insance of ToastsContainer is allowed.')
    }
    super(props);
    this.state = {
      toasts: [],
    };
    ToastsContainer._instance = this;
  }

  public render() {
    const isBlocked = this.state.toasts.filter(({isBlocked}) => isBlocked).length > 0;

    const toasts = this.state.toasts.map(({id, kind, message}) => (
      <CSSTransition key={id} timeout={350} classNames="toast">
        <Toast kind={kind}>{typeof message === 'function' ? message() : message}</Toast>
      </CSSTransition>
    ));

    return (
      <>
        {this.props.children}
        <Toasts position={this.props.position} isBlocked={isBlocked}>
          <TransitionGroup component={null}>{toasts}</TransitionGroup>
        </Toasts>
      </>
    );
  }

  protected pushToast(toast: IToast) {
    const t = {
      ...toast,
      id: (Math.random() * 100000000).toFixed(0),
    };
    this.setState({toasts: [...this.state.toasts, t]});

    const timeout = t.timeout || this.props.timeout || DEFAULT_TIMEOUT;

    if (timeout > 0) {
      setTimeout(() => this.popToast(t), timeout);
    }
  }

  protected popToast(toast: IIdToast) {
    this.setState({
      toasts: this.state.toasts.filter(i => i.id !== toast.id)
    });
  }
}
