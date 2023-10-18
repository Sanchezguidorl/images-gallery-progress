import './App.css'
import Admin from './components/Admin';
import Gallery from './components/Gallery';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
function App() {

  return (
 <div id='App'>
<Router>
  <Routes>
    <Route path={"/admin"} element={<Admin/>} />
    <Route path={"/"} element={<Gallery/>} />
    <Route path={"/login"} element={<Login/>} />
  </Routes>
</Router>
 </div>
  )
}

export default App
