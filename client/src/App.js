import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = { users: [] };

  async componentDidMount() {
    // fetch("/users")
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
    // console.
    try {
      let res = await axios.get("/api/users");
      let data = res.data;
      console.log("what data??", data);
    } catch (err) {
      console.log("err!", err);
    }
  }

  render() {
    console.log();
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user => <div key={user.id}>{user.username}</div>)}
      </div>
    );
  }
}

export default App;
