import React, { Component } from 'react';

//react-router-dom
import { BrowserRouter as Router } from 'react-router-dom'
import {Switch , Route} from 'react-router-dom'

//redux
import {Provider} from 'react-redux';
import Store from './store.js';

//containers
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register' 

//components
import Navbar from './components/Navbar'

//context
import MyProvider from './MyProvider'

export class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <MyProvider>
          <Router>
            <div className="App">
              <Navbar/>
              <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/" component={Home} />
              </Switch>
            </div>
          </Router>
        </MyProvider> 
      </Provider>
    );
  }
}

export default App;
