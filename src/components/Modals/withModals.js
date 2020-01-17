import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModal, hideModal } from 'store/actions/modal.actions';

export function withModals(WrappedComponent) {
  @connect(null, mapDispatchToProps)
  class HOC extends React.PureComponent {
    render() {
      return <WrappedComponent showModal={this.props.showModal} hideModal={this.props.hideModal} {...this.props} />;
    }
  }

  return HOC;
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: bindActionCreators(showModal, dispatch),
    hideModal: bindActionCreators(hideModal, dispatch),
  };
}
