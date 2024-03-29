import React, { Component } from 'react'
import { userService } from './../service/user.service';
import { Button }  from 'semantic-ui-react'
import './trans.css'
export class Transactions extends Component {

  state = { products: null }
  componentDidMount() {
    userService.getAllTransactions()
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
            <Button color="red" onClick={()=>userService.action(product.id, 'cancel')}>
              Anuluj
            </Button>
            <Button color = "green" onClick={()=>userService.action(product.id, 'accept')}>
              Akceptuj
            </Button>
            <Button color = "olive" onClick={()=>userService.action(product.id, 'realise')}>
              Zrealizowano
            </Button>
            <Button color = "brown" onClick={()=>userService.action(product.id, 'receive')}>
              Otrzymano
            </Button>
          </td>
       </tr>
      )
    }) 
  }

  renderTableHeader = () => {

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
              <th>Akcja</th>
            </tr>
            {this.generateOutput(products)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Transactions
