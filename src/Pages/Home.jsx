import React from 'react';
import { Link } from 'react-router-dom';
import AddProductButton from '../components/AddProductButton';
import ShoppingCartButton from '../components/ShoppingCartButton';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from './CategoryList';

class Home extends React.Component {
  state = {
    homeInput: '',
    renderAlert: false,
    categories: [],
    produtcsAlert: false,
    validate: false,
    renderProductDetails: false,
    productDetails: [],
    shoppingCartProducts: [],
  }

  async componentDidMount() {
    const categoriesObject = await getCategories();
    const recovered = JSON.parse(localStorage.getItem('dataProducts'));
    this.setState({ categories: [...categoriesObject] }, () => {
      if (recovered !== null) {
        this.setState({
          shoppingCartProducts: recovered,
        });
      }
    });
  }

  componentWillUnmount() {
    const { shoppingCartProducts } = this.state;
    localStorage.setItem('dataProducts', JSON.stringify(shoppingCartProducts));
  }

  productCounter = () => {
    const { shoppingCartProducts } = this.state;
    const withoutAmount = shoppingCartProducts.filter((e) => !e.amount).length;
    const size = withoutAmount;
    const recovered = JSON.parse(localStorage.getItem('dataProducts'));
    let counter = 0;
    if (recovered !== null) {
      recovered.forEach((element) => {
        counter += element.amount;
      });
    }
    counter += size;
    return (<p data-testid="shopping-cart-size">{ counter }</p>);
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
          validate: true,
        })
      );
    }
    this.setState({
      produtcsAlert: true,
      homeInput: '',
      renderAlert: true,
      productDetails: response.results,
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

  onClickAddButton = (event) => {
    const { productDetails, shoppingCartProducts } = this.state;
    const id = event.target.getAttribute('data-key');
    const addedProduct = productDetails.find((product) => product.id === id);
    this.setState({
      shoppingCartProducts: [...shoppingCartProducts, addedProduct],
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
                  {product.shipping.free_shipping
            && <p data-testid="free-shipping"> Frete grátis</p>}
                  <p>Especificações Técnicas</p>
                </div>
                <div>
                  <AddProductButton
                    dataKey={ id }
                    onClickAddButton={ this.onClickAddButton }
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  render() {
    const { homeInput, renderAlert, productDetails,
      produtcsAlert, validate,
      categories, renderProductDetails } = this.state;
    const text = 'Digite algum termo de pesquisa ou escolha uma categoria.';
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
            onClick={ this.searchProduct }
          >
            Pesquisar
          </button>
        </label>
        { !renderAlert
        && <p data-testid="home-initial-message">{ text }</p>}
        {validate && (<p> Nenhum produto foi encontrado </p>)}

        {produtcsAlert && (productDetails.map((products) => (
          <div
            key={ products.id }
            data-testid="product"
          >
            <p>{products.title}</p>
            <Link
              data-testid="product-detail-link"
              to={ `/product-detail/${products.id}` }
            >
              <img src={ products.thumbnail } alt={ products.title } />
            </Link>
            {products.shipping.free_shipping
            && <p data-testid="free-shipping"> Frete grátis</p>}
            <p>{products.price}</p>
            <div>
              <AddProductButton
                dataKey={ products.id }
                onClickAddButton={ this.onClickAddButton }
              />
            </div>
          </div>
        ))) }
        <ShoppingCartButton />
        <div>
          {this.productCounter()}
        </div>
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
