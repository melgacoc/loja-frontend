import React from 'react';

class ProductEvaluation extends React.Component {
  state = {
    email: '',
    note: '',
    message: '',
    invalid: false,
    avaliations: [],
  }

  componentDidMount() {
    const id = window.location.pathname.split('/')[2];
    const messageRecovered = JSON.parse(localStorage.getItem(`${id}`));
    if (messageRecovered !== null) {
      this.setState({
        avaliations: messageRecovered,
      });
    }
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  sendAvaliation = (event) => {
    event.preventDefault();
    const { email, note, message, avaliations } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/g;
    const validEmail = emailRegex.test(email);
    if (validEmail && note) {
      const avaliation = {
        email,
        note,
        message,
      };
      this.setState({
        avaliations: [...avaliations, avaliation],
        invalid: false,
      }, this.setInputs);
    } else {
      this.setState({ invalid: true });
    }
  }

  setInputs = () => {
    const { avaliations } = this.state;
    const id = window.location.pathname.split('/')[2];
    localStorage.setItem(`${id}`, JSON.stringify(avaliations));
    this.setState({
      email: '',
      note: '',
      message: '',
    });
  }

  renderMessages = () => {
    const { avaliations } = this.state;
    return (avaliations.map((element, index) => (
      <div key={ index }>
        <p data-testid="review-card-email">{element.email}</p>
        <p data-testid="review-card-rating">{element.note}</p>
        <p data-testid="review-card-evaluation">{element.message}</p>
      </div>
    ))
    );
  }

  render() {
    const { email, note, message, invalid } = this.state;
    const ratings = ['1', '2', '3', '4', '5'];
    return (
      <form>
        <div>
          <label htmlFor="email">
            <input
              placeholder="Seu email"
              data-testid="product-detail-email"
              type="text"
              name="email"
              id="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
        </div>
        <div>
          <div>
            {ratings.map((input, index) => (
              <input
                data-testid={ `${input}-rating` }
                key={ index }
                type="radio"
                name="note"
                value={ input }
                checked={ note === input }
                onChange={ this.onInputChange }
              />
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
          >
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Messagem (opcional)"
              name="message"
              id="message"
              cols="30"
              rows="10"
              value={ message }
              onChange={ this.onInputChange }
            />
          </label>
        </div>
        <div>
          <button
            data-testid="submit-review-btn"
            type="submit"
            onClick={ this.sendAvaliation }
          >
            Avaliar
          </button>
          {invalid && (<p data-testid="error-msg">Campos inválidos</p>)}
        </div>
        <div>
          {this.renderMessages()}
        </div>
      </form>
    );
  }
}

export default ProductEvaluation;
