import React, { Component } from "react";
import "./auth.css";

class Auth extends Component {

  state = {
    username: "",
    password: "",
    email: "",
    last_name: "",
    first_name: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  }

  onChange(e) {
    const user = Object.assign({}, this.state);
    user[e.target.name] = e.target.value;
    this.setState(user, () => {
      console.log("Staaaatee", this.state)
    });
  }

  register() {
    console.log("register called")
    const user = Object.assign({}, this.state);
    console.log("user?", user)
    return fetch("http://127.0.0.1:8000/register/", {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((response) => {
      console.log('"auth', response);
      return response.json();
    })
    .then((responseToken) => {
      console.log('converted token', responseToken.token);
      localStorage.setItem("token", responseToken.token)
      return this.setState({
        user: this.state.username,
        token: responseToken.token,
        username: "",
        password: "",
        email: "",
        last_name: "",
        first_name: "",
        street: "",
        city: "",
        state: "",
        zip: ""
      })
    })
    .catch((err) => {
      console.log("auth no like you, brah", err);
    })
  }

  render() {
    const { username, password, email, last_name, first_name, street, city, state, zip} = this.state
    return (
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={e => this.onChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => this.onChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => this.onChange(e)}
        />
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          value={first_name}
          onChange={e => this.onChange(e)}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={last_name}
          onChange={e => this.onChange(e)}
        />
        <input
          type="text"
          placeholder="Address"
          name="street"
          value={street}
          onChange={e => this.onChange(e)}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={city}
          onChange={e => this.onChange(e)}
        />
        <input
          type="text"
          placeholder="State"
          name="state"
          value={state}
          onChange={e => this.onChange(e)}
        />
        <input
          type="text"
          placeholder="Zipcode"
          name="zip"
          value={zip}
          onChange={e => this.onChange(e)}
        />
        <button onClick = {() => this.register()}>Submit</button>
      </div>
    )
  }
}

export default Auth
