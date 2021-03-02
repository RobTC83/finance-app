import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CurrenciesRates from './components/CurrenciesRates'
function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="flex">
          <Sidebar />
          <Switch>
            <Route exact path="/:currency" component={CurrenciesRates} />
          </Switch>
        </div>
      </Router>
    </>
  );
}
export default App;