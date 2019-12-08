import React, { Component } from 'react'

import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { userService } from '../service/user.service';
const options = [
  {key:'p', text: 'Klient', value: 'klient'},
  {key:'d', text: 'Sprzedawca', value: 'sprzedawca'},
]

const selected = 'klient'

export default class Register2 extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: '',
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
// jezezli ktorys ma 0 to wyrzucamy wartosc true 
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
   const {login, password, email, name, surname, role } = this.state
    event.preventDefault()
    if(this.isFormValid()){
      this.setState({ errors: [], loading: true})
      userService.register(login, password, email, name, surname, role)
    .then(
      user => {
          const { from } = this.props.location.state || { from: { pathname: "/" } };
          this.props.history.push(from);
          window.location.reload();
      },
      error => console.log(error)//this.setState({ error, loading: false })
     );
    }
  }

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      //role: createdUser.user.accRole
    })
  }

  handleInputError = (errors, inputName) => {
    return errors.some(error => 
      error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }



  render() {
    const { 
      username, 
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
                placeholder="Username" 
                onChange={this.handleChange}
                value={username}
                type="text"
              />
              <Form.Input 
                fluid name="email" 
                icon="mail" 
                iconPosition="left"
                placeholder="Email Adress" 
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, 'email')}
                type="email"
              />
              <Form.Input 
                fluid name="password" 
                icon="lock" 
                iconPosition="left"
                placeholder="Password" 
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, 'password')}
                type="password"
              />
              <Form.Input 
                fluid name="passwordConfirmation" 
                icon="repeat" 
                iconPosition="left"
                placeholder="Password Confirmation" 
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, 'password')}
                type="password"
              />
              <Form.Select 
                fluid name="role" 
                placeholder="Accout Role"
                options = {options}
                defaultValue = {selected}
              />
              <Button 
                disabled={loading} 
                className={ loading ? 'loading' : ''} 
                color="grey" 
                fluid 
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
