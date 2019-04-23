import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-contextual';

import './index.css';
import App from './App';
import Messenger from './messenger';
import Marketplace from './marketplace';
import Events from './events';
import Maintenance from './maintenance';
import Security from './security';
import store from './_shared/store';


ReactDOM.render(
  <Provider {...store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Redirect exact path="/" to="/messenger" />
          <Route path="/messenger" component={Messenger} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/events" component={Events} />
          <Route path="/maintenance" component={Maintenance} />
          <Route path="/security" component={Security} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
