import './App.css';
import Product from './pages/Product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './common/Header';

function App() {
  return (
    <>
      <Header/>
      <Product/>
     
    </>
  );
}

export default App;
