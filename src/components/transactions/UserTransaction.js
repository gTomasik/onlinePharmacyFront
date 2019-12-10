import React, { Component } from 'react'
import { userService } from './../service/user.service';
import { Button }  from 'semantic-ui-react'
import './trans.css'
export class UserTransactions extends Component {

  state = { products: null }
  componentDidMount() {
    if(localStorage.getItem('user') == null) return 
    let user = JSON.parse(localStorage.getItem('user'))
    userService.getAllTransactions(user)
          .then(data => {
            const newData = []
            data.map( row => {
              if(row.productIds.length > 0) newData.push(row)
            })
            console.log(newData)
            this.setState({
              products: newData
            })
          }
    )
  }

  generateOutput = products => {
    if (products===null) return
    return products.map(product=>{    
        let cost =0 
        product.productsAll.map(prod=>{
            cost += prod.cost
          })
      return(
        <tr key={product.id}>
          <td>{product.number}</td>
          <td>
            {product.productsAll.map(prod=>{
              return `${prod.name} `
            })}
          </td>
          <td>{product.status}</td>
          <td>{product.prescriptionRequired === true ? 'potrzebna recepta' : 'niepotrzebna recepta'}</td>
          <td>
            {cost} zł
          </td>
       </tr>
      )
    }) 
  }

  render() {
    const { products } = this.state 
    return (
      <div style ={{ padding: '5%'}}>
        <table id ='students'>
          <tbody>
            <tr>
              <th>Numer zamówienia</th>
              <th>Produkty</th>
              <th>Status</th>
              <th>Recepta</th>
              <th>Koszt</th>
            </tr>
            {this.generateOutput(products)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default UserTransactions


