import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/cart" component={CartPage} />

          <Route exact path="/product-page/:id">
            <ProductPage />
          </Route>
          <Route path="/" component={ProductsPage} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
