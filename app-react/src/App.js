import React from 'react';
import NotFound from './components/NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserListView from './components/UserListView';
import UserEditView from './components/UserEditView';

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={UserListView} />
          <Route path="/user/edit" exact component={UserEditView} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>

  );
}

export default App;
