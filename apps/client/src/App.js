import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';
import Announce from './pages/Announce';
import DeauthRoute from './util/DeauthRoute';
import Seller from './pages/Seller';
import UserForm from './components/forms/UserForm';
import Messenger from './pages/messenger/messenger';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container style={{ height: "100%" }} fluid>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route path="/users/:username" component={Seller} />
          {/* <Route exact path="/map" component={MapContainer} /> */}
          <DeauthRoute exact path="/accounts/announce" component={Announce} />
          <DeauthRoute exact path="/messenger" component={Messenger} />
          <AuthRoute exact path="/accounts/login" component={Login} />
          <AuthRoute exact path="/accounts/register" component={UserForm} />
          <Route exact path="/products/:_id" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
