import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './containers/Home/Home'
import Projects from './containers/Projects/Projects'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path='/projects' component={Projects}/>
            <Route path='/' component={Home}/>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
export default App;