import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCartButton extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
        >
          <Link
            data-testid="shopping-cart-button"
            to="/shopping-cart"
          >
            Carrinho de Compras
          </Link>
        </button>
      </div>
    );
  }
}

export default ShoppingCartButton;
