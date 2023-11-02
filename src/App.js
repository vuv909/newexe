import Homepage from './pages/Homepage'
import './App.css';
import styled from "styled-components";
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Food from './pages/Food';
import Search from './pages/Search';
function App() {
  
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/'  element={<Homepage />} />
      <Route path='/search/:text'  element={<Search />} />
      <Route path='/food/:id'  element={<Food />} />
      </Routes>
      </BrowserRouter> 

    </div>
  );
}

export default App;
