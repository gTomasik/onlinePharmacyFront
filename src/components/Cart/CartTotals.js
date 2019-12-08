import React, { Component } from "react";
//import PayPalButton from "./PayPalButton";
import { Button } from 'semantic-ui-react'

import { Link } from "react-router-dom";
export default class CartTotals extends Component {
  render() {
    const {
      cartSubTotal,
      cartTax,
      cartTotal,
      cart,
      clearCart
    } = this.props.value;
    const { history } = this.props;
    const emptyCart = cart.length === 0 ? true : false;
    return (
      <React.Fragment>
        {!emptyCart && (
          <div className="container">
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    wyczyść koszyk
                  </button>
                </Link>
                <h5>
                  <span className="text-title"> razem netto :</span>{" "}
                  <strong>zł {cartSubTotal} </strong>
                </h5>
                <h5>
                  <span className="text-title"> podatek vat :</span>{" "}
                  <strong>zł {cartTax} </strong>
                </h5>
                <h5>
                  <span className="text-title"> razem :</span>{" "}
                  <strong>zł {cartTotal} </strong>
                </h5>
                <button className="btn btn-outline-success text-uppercase mb-3 px-5"
                    type="button">Złóż zamówienie</button>
                {/*<PayPalButton
                  totalAmount={cartTotal}
                  clearCart={clearCart}
                  history={history}
                />*/}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
