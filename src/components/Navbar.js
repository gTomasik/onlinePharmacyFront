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
        <Link to="/">
 
          <img src={logo} alt="store" className="navbar-brand" /> 
        </Link>
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
            <Link to="/" className="nav-link">
              Nazwa Użytkwnika: <b>{this.state.name}</b>
            </Link>
          </li>
        </ul>
        <Icon name="power off" color ="white" size="big" onClick={this.logingOut}/>
        <Link to="/cart" className="ml-auto " >
        <Icon name="shopping cart" color ="white" size="big" />
        
         { /*
          <ButtonContainer>
            
            <span className="mr-2 ">
              <i className="fas fa-cart-plus " />
            </span>
            Koszyk

          </ButtonContainer>
          */}
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


