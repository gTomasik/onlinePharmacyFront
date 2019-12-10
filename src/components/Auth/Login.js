import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'

import { Link } from 'react-router-dom'

import { userService } from '../service/user.service';
export default class Login extends Component {
  state = {
    username: '',
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
    const { username, password } = this.state;
    if(this.isFormValid(this.state)){
      this.setState({ errors: [], loading: true})
      userService.login(username, password)
      .then(
          user => {

              const { from } = this.props.location.state || { from: { pathname: "/" } };
              this.props.history.push(from);
              window.location.reload();
          },
          error => this.setState({ error, loading: false })
      );
    }
  }

  isFormValid = ({ username, password} ) => username && password

  handleInputError = (errors, inputName) => {
    return errors.some(error => 
      error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }

  render() {
    const { 
      username, 
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
                fluid name="username" 
                icon="user" 
                iconPosition="left"
                placeholder="Nazwa Użytkownika" 
                onChange={this.handleChange}
                value={username}
                className={this.handleInputError(errors, 'email')}
                type="text"
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
