import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { ProductConsumer } from "../../context";
import EmptyCart from "./EmptyCart";

import {userService} from '../service/user.service';
export default class Store extends Component {
  componentDidMount() {
    userService.getAllProducts()
          .then(data => {
            console.log(data)
         // data.sort((a,b) => (a.cost - b.cost));
          //data.reverse();
          //console.log(data);
          // this.setState({ awards:data })
          // console.log([data[1].name])
          }
    )
  }


  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="Twój" title="Koszyk" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} history={this.props.history} />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}
