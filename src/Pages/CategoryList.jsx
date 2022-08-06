import React from 'react';
import PropTypes from 'prop-types';

class CategoryList extends React.Component {
  render() {
    const { categoryItems } = this.props;

    return (
      <div>
        <button
          type="button"
          data-testid="category"
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
};

export default CategoryList;
