import propTypes from 'prop-types';
import React from 'react';
import ShoppingCartButton from '../components/ShoppingCartButton';

class ProductDetail extends React.Component {
  state = {
    requestedProduct: [],
    shoppingCartProducts: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const url = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(url);
    const requestedProduct = await response.json();
    const recovered = JSON.parse(localStorage.getItem('dataProducts'));
    this.setState({
      requestedProduct,
      shoppingCartProducts: recovered,
    });
  }

  componentWillUnmount() {
    const { shoppingCartProducts } = this.state;
    localStorage.setItem('dataProducts', JSON.stringify(shoppingCartProducts));
  }

  onClickAddButton = () => {
    const { shoppingCartProducts, requestedProduct } = this.state;
    this.setState({
      shoppingCartProducts: [...shoppingCartProducts, requestedProduct],
    });
    console.log('teste');
  }

  render() {
    const { requestedProduct: { title, price, thumbnail, id } } = this.state;
    return (
      <div>
        <ShoppingCartButton />
        <div>
          <p data-testid="product-detail-name">{ title }</p>
          <p data-testid="product-detail-price">
            {' '}
            { `R$ ${price}` }
          </p>
          <div>
            <img
              data-testid="product-detail-image"
              src={ thumbnail }
              alt={ title }
            />
          </div>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            data-key={ id }
            onClick={ this.onClickAddButton }
          >
            Adidionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
