import  { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import LoginPage from './views/login';
import HomePage from './views/home';
  class App extends Component {
    render() {
      return (
        <div className="App">
          <Switch>  
              <Route path="/login" component={LoginPage}/>
              <Route path="/" component={HomePage}/>
          </Switch>
        </div>
      );
    }
  }

  export default App;