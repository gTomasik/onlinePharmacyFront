import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import Login from './components/Auth/Login'
import Register2 from './components/Auth/Register2'
import Transactions from './components/transactions/Transactions';
import  UserTransactions  from './components/transactions/UserTransaction';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path ='/user-transactions' component={UserTransactions} />
          <Route path ='/transactions' component={Transactions} />
          <Route path="/register" component={Register2} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
         
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
