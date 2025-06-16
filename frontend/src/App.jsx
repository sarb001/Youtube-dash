
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom' ;
import { Home } from './components/Home';
import { Maindashboard } from './components/Maindashboard';

function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route  path = "/" element = {<Home />}>  </Route>
          <Route  path = "/dashboard" element = {<Maindashboard  />}>  </Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App
