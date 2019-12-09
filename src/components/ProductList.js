import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { storeProducts } from "../data";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { userService } from './service/user.service'
export default class ProductList extends Component {

  state = {
    products: ''
  };
 
  componentDidMount() {
    userService.getAllProducts()
          .then(data => {
            data.map(el => {
              el.company = ''
              el.count = 0
              el.total = 0
              el.inCart = false
            })
            console.log(data)
            this.setState({
              products: data
            })
          }
    )
  }
  
  render() {
    return (
      <React.Fragment>
        <ProductWrapper className="py-5">
          <div className="container">
            <Title name="Nasze" title="Produkty" />
            <div className="row">
              <ProductConsumer>
                {value => {
                  return value.products.map(product => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </ProductWrapper>
      </React.Fragment>
    );
  }
}

const ProductWrapper = styled.section``;
