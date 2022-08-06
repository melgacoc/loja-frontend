import propTypes from 'prop-types';
import React from 'react';
import ShoppingCartButton from '../components/ShoppingCartButton';

class ProductDetail extends React.Component {
  state = {
    requestedProduct: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const url = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(url);
    const requestedProduct = await response.json();
    this.setState({
      requestedProduct,
    });
  }

  render() {
    const { requestedProduct: { title, price, thumbnail } } = this.state;
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
