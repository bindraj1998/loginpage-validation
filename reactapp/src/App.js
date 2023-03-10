import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './pages/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
<Route path="/home"element={<Home/>}></Route>

  <Route path="/" element={<Signup/>}></Route>
  <Route path="/login" element={<Login/>}></Route>

        </Routes>
    </div>
  );
}

export default App;
