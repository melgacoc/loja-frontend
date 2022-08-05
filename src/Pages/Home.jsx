import React from 'react';

class Home extends React.Component {
  state = {
    homeInput: '',
    renderAlert: false,
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

  render() {
    const { homeInput, renderAlert } = this.state;
    const text = 'Digite algum termo de pesquisa ou escolha uma categoria.';
    return (
      <div>
        <label htmlFor="home-search-input">
          <input
            id="home-search-input"
            type="text"
            name="homeInput"
            value={ homeInput }
            onChange={ this.validate }
          />
        </label>
        { !renderAlert
        && <p data-testid="home-initial-message">{ text }</p>}
      </div>
    );
  }
}

export default Home;
