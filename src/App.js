import React, {lazy} from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { BrowserRouter as Router } from 'react-router-dom';


const Homepage = lazy(() => import('./views/Homepage'));
const Navbar = lazy(() => import('./components/Navbar'));


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
          <Homepage/>
        </Router>
    </div>
  );
}

export default App;
