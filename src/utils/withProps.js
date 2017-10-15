import React, { Component } from 'react';

// hoc to inject props
const withProps = (WrappedComponent, props) => {
  // ...and returns another component...
  return class extends Component {
    render() {
      return <WrappedComponent
        {...props}
        {...this.props}
      />;
    }
  };
}

export default withProps;
