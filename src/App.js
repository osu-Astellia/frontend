import React, { lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'rsuite/dist/styles/rsuite-dark.css'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

import { LeaderboardPage } from './views/LeaderboardPage';


const Homepage = lazy(() => import('./views/Homepage'));
const Navbar = lazy(() => import('./components/Navbar'));


function App() {
  return (

    <div className="App">
      <Router>
        <Navbar />
        <Route path="/leaderboard" component={LeaderboardPage}></Route>
        <Route path="/" exact component={Homepage}></Route>
      </Router>

    </div>
  );
}

export default App;
