import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Cart from './components/Cart';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Navigation/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/cart">
            <Cart/>
          </Route>
        </Switch>
       </BrowserRouter>
    </div>
  );
}

export default App;
