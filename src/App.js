import React from 'react';
import Banner from './Banner';
import Nav from './Nav';
import ActiveTask from './ActiveTask';
import CanceledTask from './CanceledTask';
import CompletedTask from './CompletedTask';
import CreateTask from './CreateTask';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  return (
      <div className="app">
          <Router>
          <Banner />
            <Switch>
              <Route exact path = '/CreateTask'>
                    <CreateTask />
              </Route>
              <Route exact path = '/active'>
                  <ActiveTask />
              </Route>
              <Route exact path = '/completed'>
                  <CompletedTask />
              </Route>
              <Route exact path = '/canceled'>
                  <CanceledTask />
              </Route>
            </Switch>
          </Router>
      </div>
  );
}

export default App;
