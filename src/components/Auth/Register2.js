import React, { Component } from 'react'

import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { userService } from '../service/user.service';

export default class Register2 extends Component {
  state = {
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: 'CUSTOMER',
    errors: [],
    loading: false,
  }

  isFormValid = () => {
    let errors = []
    let error
    if(this.isFormEmpty(this.state)){
      error = { message: 'Fill in all fields'}
      this.setState({ errors: errors.concat(error) })
      return false
    } else if (!this.isPasswordValid(this.state)){
      error = { message: 'Password is invalid'}
      this.setState({ errors: errors.concat(error) })
      return false
    } else {
      return true
    }
  }

  isFormEmpty = ({ username, email, password, passwordConfirmation}) => {
    return !username.length || !email.length || !password.length ||
      !passwordConfirmation.length
  }

  isPasswordValid = ({ password, passwordConfirmation}) => {
    if(password.length < 6 || passwordConfirmation < 6){
      return false
    } else if (password !== passwordConfirmation){
      return false
    } else {
      return true
    }
  }


  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
   const {username, password, email, name, surname, role } = this.state
  console.log(username, password, email, name, surname, role)
    event.preventDefault()
    
    if(this.isFormValid()){
      this.setState({ errors: [], loading: true})
      userService.register(username, password, email, name, surname, role)
    .then(
      user => {
         // const { from } = this.props.location.state || { from: { pathname: "/" } };
        //  this.props.history.push(from);
         // window.location.reload();
      },
      error => console.log(error)//this.setState({ error, loading: false })
     );
    }
    
  }

  handleInputError = (errors, inputName) => {
    return errors.some(error => 
      error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }


  render() {
    const { 
      username,
      name,
      surname, 
      email, 
      password, 
      passwordConfirmation, 
      errors,
      loading
    } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app" style ={{marginTop: 200}}>
        <Grid.Column style={{ maxWidth: 450}}>
          <Header as="h1" icon color ="black" textAlign="center">
            <Icon name="stethoscope" color ="black"/>
            Rejestracja
          </Header>
          <Form  onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input 
                fluid name="username" 
                icon="user" 
                iconPosition="left"
                placeholder="Nazwa użytkownika" 
                onChange={this.handleChange}
                value={username}
                type="text"
              />
              <Form.Input 
                fluid name="name" 
                icon="user" 
                iconPosition="left"
                placeholder="Imię" 
                onChange={this.handleChange}
                value={name}
                type="text"
              />
              <Form.Input 
                fluid name="surname" 
                icon="user" 
                iconPosition="left"
                placeholder="Nazwisko" 
                onChange={this.handleChange}
                value={surname}
                type="text"
              />
              <Form.Input 
                fluid name="email" 
                icon="mail" 
                iconPosition="left"
                placeholder="Adres Email" 
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, 'email')}
                type="email"
              />
              <Form.Input 
                fluid name="password" 
                icon="lock" 
                iconPosition="left"
                placeholder="Hasło" 
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, 'password')}
                type="password"
              />
              <Form.Input 
                fluid name="passwordConfirmation" 
                icon="repeat" 
                iconPosition="left"
                placeholder="Powtórz Hasło" 
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, 'password')}
                type="password"
              />
              <Button 
                disabled={loading} 
                className={ loading ? 'loading' : ''} 
                color="grey" 
                fluid 
                onClick={this.handleSubmit}
                size="large">
                  Potwierdź
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>Masz już konto?<Link to="/login"> Login</Link></Message>
        </Grid.Column>
      </Grid>
    )
  }
}
