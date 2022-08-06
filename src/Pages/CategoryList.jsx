import PropTypes from 'prop-types';
import React from 'react';

class CategoryList extends React.Component {
  render() {
    const { categoryItems, categoryId, requestProductDetails } = this.props;

    return (
      <div>
        <button
          type="button"
          data-testid="category"
          data-key={ categoryId }
          onClick={ requestProductDetails }
        >
          { categoryItems }
        </button>
        <br />
      </div>
    );
  }
}

CategoryList.propTypes = {
  categoryItems: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  requestProductDetails: PropTypes.func.isRequired,
};

export default CategoryList;
