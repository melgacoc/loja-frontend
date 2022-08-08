import PropTypes from 'prop-types';
import React from 'react';

class AddProductButton extends React.Component {
  render() {
    const { dataKey, onClickAddButton } = this.props;
    return (
      <button
        data-testid="product-add-to-cart"
        type="button"
        data-key={ dataKey }
        onClick={ onClickAddButton }
      >
        Adidionar ao Carrinho
      </button>
    );
  }
}

AddProductButton.propTypes = {
  dataKey: PropTypes.string.isRequired,
  onClickAddButton: PropTypes.func.isRequired,
};

export default AddProductButton;
