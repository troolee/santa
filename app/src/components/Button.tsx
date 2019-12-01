import * as Bulma from 'bloomer';
import { Button as IBulmaButton } from 'bloomer/lib/elements/Button';
import { Bulma as BulmaNamespace } from 'bloomer/lib/bulma'
import * as React from 'react';

interface IProps {
  onClick?: React.MouseEventHandler | Promise<void>;
}

type ButtonProps = IBulmaButton<HTMLButtonElement | HTMLAnchorElement>
  & React.HTMLProps<HTMLElement> & BulmaNamespace.Helpers & IProps;

interface IState {
  isLoading: boolean;
}

export default class Button extends React.Component<ButtonProps, IState> {
  private isUnmounted = false;

  public constructor (props: ButtonProps) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  public componentWillUnmount() {
    this.isUnmounted = true;
  }

  public render() {
    const onClick = async (e: any) => {
      if (this.props.onClick === undefined) {
        return;
      }

      this.setState({isLoading: true});
      await Promise.resolve(this.props.onClick(e));
      setTimeout(() => {
        if (!this.isUnmounted) {
          this.setState({isLoading: false});
        }
      });
    };
    return (
      <Bulma.Button
        {...this.props}
        onClick={onClick}
        isLoading={this.state.isLoading || this.props.isLoading}
      >
        {this.props.children}
      </Bulma.Button>
    );
  }
}
