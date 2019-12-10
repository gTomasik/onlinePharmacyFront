import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../logo.svg";
import { ButtonContainer } from "./Button";
import { Icon } from 'semantic-ui-react'

import { userService } from './service/user.service';
export default class Navbar extends Component {
  state = {
    username: "",
    name: "",
    surname: "",
    isLoggedIn: false,
    role: '',
  };
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
            username: user.username,
            name: user.name,
            surname: user.surname,
            isLoggedIn: true,
            role: user.role
          })
        }
      )
    }
  }

  logingOut = () => {
    console.log('elo')
    userService.logout()
  }
  render() {
    return (
      <Nav className="navbar navbar-expand-sm  navbar-dark px-sm-5">

        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              Produkty
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav align-items-center ">
          <li className="nav-item ml-5">
            <Link to="/login" className="nav-link">
              Logowanie
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav align-items-center" >
          <li className="nav-item ml-5">
            <Link to="/register" className="nav-link">
              Rejestracja
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav align-items-center" >
          <li className="nav-item ml-5">
            <Link to="/user-transactions" className="nav-link">
              Zamówienia użytkownika
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav align-items-center" >
          <li className="nav-item ml-5">
            <Link to="/transactions" className="nav-link">
             {this.state.role === 'EMPLOYEE' ? 'Zamówienia' : ''} 
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav align-items-center" >
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              Nazwa Użytkwnika: <b>{this.state.name}</b>
            </Link>
          </li>
        </ul>
        <Link to="/" className="ml-auto " >
          <Icon name="power off" color ="white" size="big" onClick={this.logingOut}/>
        </Link>
        <Link to="/cart" className="ml-auto " >
          <Icon name="shopping cart" color ="white" size="big" />
        </Link>
      </Nav>
    );
  }
}

const Nav = styled.nav`
  background: var(--mainGreen);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
    }
  }
`;


