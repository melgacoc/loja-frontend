import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import CategoryList from './Pages/CategoryList';
import ShoppingCart from './Pages/ShoppingCart';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <CategoryList
            exact
            path="/"
            component={ CategoryList }
          />
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
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
