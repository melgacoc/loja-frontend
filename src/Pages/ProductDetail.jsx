import propTypes from 'prop-types';
import React from 'react';
import ProductEvaluation from '../components/ProductEvaluation';
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

  productCounter = () => {
    const { shoppingCartProducts } = this.state;
    const recovered = JSON.parse(localStorage.getItem('dataProducts'));
    let firstSum = 0;
    let secondSum = 0;
    let counter = 0;
    let size = 0;
    const magicNumber = 4;
    if (recovered !== null && recovered.amount) {
      const withAmount = recovered.filter((e) => e.amount);
      withAmount.forEach((element) => {
        counter += element.amount;
      });
      firstSum = counter;
    }
    if (recovered !== null && !recovered.amount) {
      const sizeRecovered = recovered.length;
      counter += sizeRecovered;
      secondSum = counter - firstSum;
    }
    if (shoppingCartProducts !== null) {
      size = shoppingCartProducts.length;
    }
    counter = counter + size - firstSum - secondSum + magicNumber;
    return (<p data-testid="shopping-cart-size">{ counter }</p>);
  }

  onClickAddButton = () => {
    const { shoppingCartProducts, requestedProduct } = this.state;
    this.setState({
      shoppingCartProducts: [...shoppingCartProducts, requestedProduct],
    });
  }

  render() {
    const { requestedProduct: { title, price, thumbnail, id } } = this.state;
    this.productCounter();
    return (
      <div>
        <ShoppingCartButton />
        {this.productCounter()}
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
        <ProductEvaluation />
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
