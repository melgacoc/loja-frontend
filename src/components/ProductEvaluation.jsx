import React from 'react';
import propTypes from 'prop-types';

class ProductEvaluation extends React.Component {
  render() {
    const {
      email,
      rate,
      evaluation,
      isSubmitButtonDisabled,
      onClickChange } = this.props;

    return (
      <form>

        <h3>
          Avaliações
        </h3>
        <div>
          <label htmlFor="Email">
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
              placeholder="Email"
              value={ email }
              onChange={ onClickChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="Evaluation">
            <select
              name="rate"
              value={ rate }
            >
              <option data-testid="1-rating" value="1"> 1 </option>
              <option data-testid="2-rating" value="2"> 2 </option>
              <option data-testid="3-rating" value="3"> 3 </option>
              <option data-testid="4-rating" value="4"> 4 </option>
              <option data-testid="5-rating" value="5"> 5 </option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="Text Evaluation">
            <input
              data-testid="product-detail-evaluation"
              type="text"
              name="evaluation"
              placeholder="Mensagem(Opcional)"
              value={ evaluation }
              onChange={ onClickChange }
            />
          </label>
        </div>
        <div>
          <button
            data-testid="submit-review-btn"
            type="submit"
            onClick={ onClickChange }
            disabled={ isSubmitButtonDisabled }
          >
            Avaliar
          </button>
        </div>
      </form>
    );
  }
}

ProductEvaluation.propTypes = {
  email: propTypes.string.isRequired,
  rate: propTypes.number.isRequired,
  evaluation: propTypes.string.isRequired,
  isSubmitButtonDisabled: propTypes.bool.isRequired,
  onClickChange: propTypes.func.isRequired,
};

export default ProductEvaluation;
