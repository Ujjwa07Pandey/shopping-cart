import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ProductsPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
