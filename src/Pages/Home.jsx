import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    homeInput: '',
    renderAlert: false,
    filteredProducts: [],
    produtcsAlert: false,
    validata: false,
  }

  validate = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateRender);
  }

  validateRender = () => {
    const { homeInput } = this.state;
    if (homeInput.length > 0) {
      this.setState({ renderAlert: true });
    } else {
      this.setState({ renderAlert: false });
    }
  }

  searchProduct = async () => {
    const { homeInput } = this.state;
    const response = await getProductsFromCategoryAndQuery(homeInput, homeInput);
    console.log('test');
    console.log(response);
    if (response.results.length === 0) {
      console.log('test');
      return (
        this.setState({
          produtcsAlert: false,
          renderAlert: true,
          homeInput: '',
          validata: true,
        })
      );
    }
    this.setState({
      filteredProducts: response,
      produtcsAlert: true,
      homeInput: '',
      renderAlert: true,
    });
  }

  render() {
    const { homeInput, renderAlert, filteredProducts,
      produtcsAlert, validata } = this.state;
    const text = 'Digite algum termo de pesquisa ou escolha uma categoria.';
    const { results } = filteredProducts;

    return (
      <div>
        <label htmlFor="home-search-input">
          <input
            id="home-search-input"
            type="text"
            data-testid="query-input"
            name="homeInput"
            value={ homeInput }
            onChange={ this.validate }
          />
          <button
            data-testid="query-button"
            name="Pesquisar"
            value="Pesquisar"
            type="button"
            // disabled={ buttonDisable }
            onClick={ this.searchProduct }
          >
            Pesquisar
          </button>
        </label>
        { !renderAlert
        && <p data-testid="home-initial-message">{ text }</p>}

        {validata && (<p> Nenhum produto foi encontrado </p>)}

        {produtcsAlert && (results.map((products) => (
          <div
            key={ products.id }
            data-testid="product"
          >
            <p>{products.title}</p>
            <img
              src={ products.thumbnail }
              alt={ products.title }
            />
            <p>{products.price}</p>
          </div>
        ))) }
      </div>
    );
  }
}

export default Home;
