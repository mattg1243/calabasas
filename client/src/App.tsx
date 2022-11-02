import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Splash from './components/Splash';
import BaseLayout from './components/BaseLayout';
import './index.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<BaseLayout childComp={Login} />} />
          <Route path="/register" element={<BaseLayout childComp={Register} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
