import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            company,
            image,
            description,
            cost,
            name,
            inCart
          } = value.detailProduct;

          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{name}</h1>
                </div>
              </div>
              {/* end of title */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={image} className="img-fluid" alt="" />
                </div>
                {/* prdoduct description */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h1>Nazwa : {name}</h1>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    Producent : <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      Cena : {cost}
                      <span>zł</span>
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    informacje o produkcie :
                  </p>
                  <p className="text-muted lead">{description}</p>
                  {/* buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>Powrót do produktów</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "w koszyku" : "dodaj do koszyka"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
