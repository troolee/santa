// https://gist.github.com/vivmaha/f34fdea72d0f1fa0467a671b5ec7321e

import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

class ScrollToTopWithoutRouter extends React.Component<RouteComponentProps<any>> {
  componentDidUpdate(prevProps: Readonly<RouteComponentProps<any>>) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <></>;
  }
}


export var ScrollToTop = withRouter(ScrollToTopWithoutRouter);
