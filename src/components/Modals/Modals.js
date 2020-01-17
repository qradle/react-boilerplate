import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideModal } from 'store/actions/modal.actions';
import { CloseIcon } from 'components/SvgIcons';
import './modal.scss';

@connect(
  ({ modalState }) => ({
    ...modalState,
  }),
  (dispatch) => ({
    hideModal: bindActionCreators(hideModal, dispatch),
  })
)
class Modals extends React.PureComponent {
  static propTypes = {
    isShow: PropTypes.bool.isRequired,
    Node: PropTypes.func,
    hideModal: PropTypes.func,
  };

  static defaultProps = {
    modalState: {},
    hideModal: Function.prototype,
  };

  state = {
    Node: null,
  };

  render() {
    const { Node, options, isShow, hideModal } = this.props;
    if (!Boolean(Node)) return null;

    return (
      <Modal
        isOpen={isShow}
        className="modal__window"
        overlayClassName="modal__overlay"
        shouldCloseOnOverlayClick
        onRequestClose={this.props.hideModal}
        ariaHideApp={false}>
        <Node hide={this.props.hideModal} options={options} />
        {options && options.withCross && <CloseIcon className="modal__cross" onClick={hideModal} />}
      </Modal>
    );
  }
}

export default Modals;
