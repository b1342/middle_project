import logo from './logo.svg';
import './App.css';
import './flags.css';
import './index.css'
import Home from './Component/Home'
import Posts from './Component/Posts'
import Photos from './Component/Photos'
import Users from './Component/Users';
import Todos from './Component/Todos';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Router>
      <Home />
      <Routes>
        <Route path='/User' element={<Users/>}/>
        <Route path='/Posts' element={<Posts/>}/>
        <Route path='/Todos' element={<Todos/>}/>
        <Route path='/Photos' element={<Photos/>}/>
      </Routes>
</Router>
    </div>
  );
}

export default App;
