import React, { Component } from "react";

export default class CartColumns extends Component {
  render() {
    return (
      <div className="container-fluid text-center d-none d-lg-block">
        <div className="row ">
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">Produkty</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">nazwy produktów</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">cena</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">ilość</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">usuń</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">razem</p>
          </div>
        </div>
      </div>
    );
  }
}
