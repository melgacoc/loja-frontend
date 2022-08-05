import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import CategoryList from './Pages/CategoryList';

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
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
