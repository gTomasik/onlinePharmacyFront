import styled from 'styled-components';

// Forms, inputs, buttons

export const Input = styled.input`
  width: 300px;
  height: 35px;
  border: ${props => props.border || '1px solid #ccc'};
  background-color: #fff;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #777;
  font-family: "Arial", sans-serif;
  font-size: 0.8em;
  margin: 0.5em 0;
  position: relative;
`;

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const Button = styled.button`
  width: 300px;
  height: 35px;
  background-color: #5995ef;
  color: #fff;
  border-radius: 3px;
`;

// Text

export const Title = styled.h1`
  font-family: 'Arial', sans-serif;
  font-weight: 600;
  color: #4d4d4d;
  font-size: 2.2em;
`;

export const Title2 = styled.h2`
  font-family: 'Arial', sans-serif;
  font-weight: 300;
  color: #4d4d4d;
  font-size: 1.8em;
`;

export const Text = styled.p`
  font-family: 'Arial', sans-serif;
  color: ${props => props.color || '#4d4d4d'}
`;