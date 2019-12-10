import React, { Component } from "react";
//import PayPalButton from "./PayPalButton";
import { Button } from 'semantic-ui-react'

import { Link } from "react-router-dom";
import {userService} from '../service/user.service';
export default class CartTotals extends Component {
  state = {
    user: ''
  }
  componentDidMount() {
    if(localStorage.getItem('user') == null) {
      return
      
  } else {
    let user = JSON.parse(localStorage.getItem('user'))
    let userId = parseInt(user.accountId) + 1
      userService.getUser(userId)
      .then(
        user => {
          this.setState({
            user: user.id,

          },console.log(user.id))
        }
      )
    }
  }

  isPreNeeded = (data) => {
    let prescription = false
    data.map(obj => {
      if (obj.prescriptionRequired === true){
        prescription = true
      }
    })
    return prescription
  }

  createTransaction = (prescription, user, cart) => {
  
    if(prescription) alert("Pamiętaj o wysłaniu zdjęcia recepty do tej transakcji")
    userService.saveNewTransaction(prescription, user, cart)
  }

  render() {
    const {
      cartSubTotal,
      cartTax,
      cartTotal,
      cart,
      clearCart
    } = this.props.value;
    
    const prescription = this.isPreNeeded(cart)
    const user = localStorage.getItem('user')
    console.log(cart)
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
                <button 
                  className="btn btn-outline-success text-uppercase mb-3 px-5"
                  type="button"
                  onClick={() =>this.createTransaction(prescription, this.state.user, cart)}
                >
                    Złóż zamówienie
                </button>

              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
