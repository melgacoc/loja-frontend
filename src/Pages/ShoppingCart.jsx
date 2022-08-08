import React from 'react';

class ShoppingCart extends React.Component {
  state = {
    shoppingCartProducts: [],
    isEmpty: true,
  }

  componentDidMount() {
    let { shoppingCartProducts } = this.state;
    let ids = [];
    let amount = [];
    const recovered = JSON.parse(localStorage.getItem('dataProducts'));
    if (recovered !== null) {
      recovered.forEach((element) => {
        ids = [...ids, element.id];
        amount.push(0);
      });
      const uniqueIds = [...new Set(ids)];
      uniqueIds.forEach((id, index) => {
        recovered.forEach((product) => {
          if (id === product.id) {
            amount[index] += 1;
          }
        });
      });
      amount = amount.filter((item) => item !== 0);
      shoppingCartProducts = uniqueIds
        .map((id) => recovered
          .find((obj) => obj.id === id));
      shoppingCartProducts.forEach((product, index) => {
        product.amount = amount[index];
      });
    }
    this.setState({ shoppingCartProducts }, () => {
      if (shoppingCartProducts.length > 0) {
        this.setState({ isEmpty: false });
      }
    });
  }

  render() {
    const { isEmpty, shoppingCartProducts } = this.state;
    return (
      <div>
        {isEmpty ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          <div>
            {shoppingCartProducts.map((product) => {
              const { id, thumbnail, title, amount } = product;
              return (
                <div key={ id }>
                  <img
                    src={ thumbnail }
                    alt={ title }
                  />
                  <p data-testid="shopping-cart-product-name">{ title }</p>
                  <p data-testid="shopping-cart-product-quantity">{ amount }</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
