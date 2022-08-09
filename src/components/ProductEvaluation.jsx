import React from 'react';

class ProductEvaluation extends React.Component {
  state = {
    email: '',
    note: '',
    message: '',
    isSendButtonDisabled: true,
    avaliations: [],
  }

  componentDidMount() {
    const messageRecovered = JSON.parse(localStorage.getItem('avaliations'));
    if (messageRecovered !== null) {
      this.setState({
        avaliations: messageRecovered,
      });
    }
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateSendbutton);
  }

  validateSendbutton = () => {
    const { email, note } = this.state;
    const validate = [
      email.length > 0,
      email.includes('@'),
      email.includes('.com'),
      note.length === 1,
    ].every(Boolean);
    this.setState({
      isSendButtonDisabled: !validate,
    });
  }

  sendAvaliation = (event) => {
    event.preventDefault();
    const id = window.location.pathname.split('/')[2];
    const { email, note, message, avaliations } = this.state;
    const avaliation = {
      email,
      note,
      message,
      id,
    };
    this.setState({ avaliations: [...avaliations, avaliation] }, this.setInputs);
  }

  setInputs = () => {
    const { avaliations } = this.state;
    localStorage.setItem('avaliations', JSON.stringify(avaliations));
    this.setState({
      email: '',
      note: '',
      message: '',
      isSendButtonDisabled: true,
    });
  }

  renderMessages = () => {
    const { avaliations } = this.state;
    const id = window.location.pathname.split('/')[2];
    const avaliation = avaliations.filter((element) => element.id === id);
    return (avaliation.map((element, index) => (
      <div key={ index }>
        <p data-testid="review-card-email">{element.email}</p>
        <p data-testid="review-card-rating">{element.note}</p>
        <p data-testid="review-card-evaluation">{element.message}</p>
      </div>
    ))
    );
  }

  render() {
    const { email, note, message, isSendButtonDisabled } = this.state;
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
          <label htmlFor="note">
            <select
              name="note"
              id="note"
              value={ note }
              onChange={ this.onInputChange }
            >
              <option
                data-testid="1-rating"
                value="1"
              >
                1
              </option>
              <option
                data-testid="2-rating"
                value="2"
              >
                2
              </option>
              <option
                data-testid="3-rating"
                value="3"
              >
                3
              </option>
              <option
                data-testid="4-rating"
                value="4"
              >
                4
              </option>
              <option
                data-testid="5-rating"
                value="5"
              >
                5
              </option>
            </select>
          </label>
        </div>
        <div>
          <label
            htmlFor="message"
            data-testid="product-detail-evaluation"
          >
            <textarea
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
            disabled={ isSendButtonDisabled }
          >
            Avaliar
          </button>
          {isSendButtonDisabled && <p data-testid="error-msg">Campos inválidos.</p>}
        </div>
        <div>
          {this.renderMessages()}
        </div>
      </form>
    );
  }
}

export default ProductEvaluation;
