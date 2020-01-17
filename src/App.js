import React from 'react';
import PropTypes from 'prop-types';
import { Modals } from 'components/Modals';
import { hot } from 'react-hot-loader';

class App extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="flex flex-column" style={{ minHeight: '100%' }}>
        <Modals />
        {this.props.children}
      </div>
    );
  }
}

export default hot(module)(App);
