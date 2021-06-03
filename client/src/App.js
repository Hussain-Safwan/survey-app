import React from 'react';
import Survey from './components/Survey' 
import CreateSurvey from './components/CreateSurvey'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const App = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Survey} />
          <Route exact path='/admin' component={CreateSurvey} />
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
