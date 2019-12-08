import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'

import { Link } from 'react-router-dom'

import { userService } from '../service/user.service';
export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
  }

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    
    event.preventDefault()
    const { email, password } = this.state;
    if(this.isFormValid(this.state)){
      console.log(email, password)
      this.setState({ errors: [], loading: true})
      userService.login(email, password)
      .then(
          user => {
              console.log(user)
              const { from } = this.props.location.state || { from: { pathname: "/" } };
              //this.props.history.push(from);
              //window.location.reload();
          },
          error => this.setState({ error, loading: false })
      );
      
      /*
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser => {
        console.log(signedInUser)
      })
      .catch(err => {
        console.error(err)
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        })
      })
      */
    }
  }

  isFormValid = ({ email, password} ) => email && password

  handleInputError = (errors, inputName) => {
    return errors.some(error => 
      error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }

  render() {
    const { 
      email, 
      password, 
      errors,
      loading
    } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app" style ={{marginTop: 250}}>
        <Grid.Column style={{ maxWidth: 450}}>
          <Header as="h1" icon  textAlign="center">
            <Icon name="stethoscope" />
            Logowanie
          </Header>
          <Form  onSubmit={this.handleSubmit} size="large">
            <Segment stacked>

              <Form.Input 
                fluid name="email" 
                icon="mail" 
                iconPosition="left"
                placeholder="Email Adress" 
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, 'email')}
                type="text"
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
          <Message>Nie posiadasz konta?<Link to="/register"> Registracja</Link></Message>
        </Grid.Column>
      </Grid>
    )
  }
}
