import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './Pages/Payment'; // Importa el componente Payment
import Login from './Pages/Login'; // Importa el componente Login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Ruta por defecto para el login */}
        <Route path="/payment" element={<Payment />} /> {/* Ruta para el formulario de pago */}
      </Routes>
    </Router>
  );
}

export default App;