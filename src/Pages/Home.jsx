import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartButton from '../components/ShoppingCartButton';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from './CategoryList';

class Home extends React.Component {
  state = {
    homeInput: '',
    renderAlert: false,
    categories: [],
    filteredProducts: [],
    produtcsAlert: false,
    validata: false,
    renderProductDetails: false,
    productDetails: [],
  }

  async componentDidMount() {
    const categoriesObject = await getCategories();
    this.setState({
      categories: [...categoriesObject],
    });
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
    if (response.results.length === 0) {
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

  requestProductDetails = async (event) => {
    const id = event.target.getAttribute('data-key');
    const response = await getProductsFromCategoryAndQuery(id, id);
    const results = await response.results;
    this.setState({
      renderProductDetails: true,
      productDetails: results,
    });
  }

  renderProductDetails = () => {
    const { productDetails } = this.state;
    if (productDetails.length > 0) {
      return (
        <div>
          {productDetails.map((product) => {
            const { id, title, price, thumbnail } = product;
            return (
              <div data-testid="product" key={ id }>
                <p>{ `${title} - R$ ${price}` }</p>
                <div>
                  <Link
                    data-testid="product-detail-link"
                    to={ `/product-detail/${id}` }
                  >
                    <img src={ thumbnail } alt={ title } />
                  </Link>
                  <p>Especificações Téccnicas</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  render() {
    const { homeInput, renderAlert, filteredProducts,
      produtcsAlert, validata,
      categories, renderProductDetails } = this.state;
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
        <ShoppingCartButton />
        {
          categories.map((category) => {
            const categoryItem = (
              <CategoryList
                key={ category.id }
                categoryItems={ category.name }
                categoryId={ category.id }
                requestProductDetails={ this.requestProductDetails }
              />);
            return categoryItem;
          })
        }
        { renderProductDetails && this.renderProductDetails() }
      </div>
    );
  }
}

export default Home;
