
import './App.css';

import { Login } from './logintask/Login';
import { Signup } from './logintask/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />

        </Routes>
      </BrowserRouter>

     
    </div>
  );
}

export default App;
