import React from 'react';
import './css/Estilos.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Kitchen from './pages/Kitchen';
import Menu from './pages/Menu';
import Deliver from './pages/Deliver';

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/menu">
          <Menu />
        </Route>

        <Route path="/kitchen">
          <Kitchen />
        </Route>

        <Route path="/deliver">
          <Deliver />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
