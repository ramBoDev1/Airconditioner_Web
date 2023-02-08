import React,{ useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./login/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductsContextProvider } from "./products/ProductsContext";
import { CartContextProvider } from "./products/CartContext";
import Login from "./login/Login";
import Home from "./login/Home";
import Dashboard from "./login/Dashboard";
import Register from "./login/Registers";
import ProductAir from "./login/ProductAir";
import NotFound from "./login/NotFound";
import Cart from "./login/Cart";

function App() {
 
  return (
    
    <ProductsContextProvider>
      <CartContextProvider>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/product" component={ProductAir} />
              <Route path="/cartproducts" component={Cart} />
              <Route exact path="/Dashboard" component={Dashboard} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Register" component={Register} />
              <Route path="" component={NotFound} />
            </Switch>
          </Router>
        </AuthProvider>
      </CartContextProvider>
    </ProductsContextProvider>
  );
}

export default App;

