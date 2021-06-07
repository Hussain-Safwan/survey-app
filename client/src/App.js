import React from 'react';
import Survey from './components/Survey' 
import CreateSurvey from './components/CreateSurvey'
import SurveyList from './components/SurveyList'
import AdminSurveyList from './components/AdminSurveyList'
import Response from './components/Response'
import Messenger from './components/Messenger'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

const App = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={SurveyList} />
          <Route exact path='/survey' component={Survey} />
          <Route exact path='/admin' component={AdminSurveyList} />
          <Route exact path='/create' component={CreateSurvey} />
          <Route exact path='/response' component={Response} />
          <Route exact path='/messenger' component={Messenger} />
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
