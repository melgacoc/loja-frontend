import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Checkout from './Pages/Checkout';
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import ShoppingCart from './Pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={ Home }
          />
          <Route
            exact
            path="/shopping-cart"
            component={ ShoppingCart }
          />
          <Route
            exact
            path="/product-detail/:id"
            component={ ProductDetail }
          />
          <Route
            exact
            path="/checkout"
            component={ Checkout }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
