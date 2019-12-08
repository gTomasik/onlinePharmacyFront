
import React from "react";
import styled from "styled-components";

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 500px;
  height: 470px;
  margin: 0 auto;
  border: 1px solid #000;
  border-radius: 5px;
  background: #ffff;
  h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
  button {
    background: #479664;
    color: #fff;
    padding: 10px;
    margin: 5px;
    width: 150px;
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
  }
`;

const StyledInput = styled.input`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 400px;
  box-sizing: border-box;
`;

const StyledSelect = styled.select`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 400px;
  box-sizing: border-box;
`;

const Register = () => (
  <div style={{marginTop: 180}}>
    <StyledLogin>
      <h3 style={{paddingTop: 10}}>Rejestracja</h3>
      
      <StyledInput type="text" placeholder="login" />
      <StyledInput type="text" placeholder="imie" />
      <StyledInput type="text" placeholder="nazwisko" />
      <StyledInput type="text" placeholder="mail" />
      <StyledInput type="password" placeholder="password" />
      <StyledSelect>
        <option value = "klient">Klient</option>
        <option value = "sprzedawca">Sprzedawca</option>
      </StyledSelect>
      <button>Rejestracja</button>
    </StyledLogin>
  </div>
);

export default Register;