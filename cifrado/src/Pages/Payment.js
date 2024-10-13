import React, { useState } from 'react';
import './Payment.css'; // Asegúrate de tener un archivo CSS para el estilo

const Payment = () => {
  // Estados para los campos de la tarjeta
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Validar y procesar el pago
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de campos vacíos
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    if (cardNumber.length !== 16) {
      setErrorMessage('El número de tarjeta debe tener 16 dígitos.');
      return;
    }

    if (cvv.length !== 3) {
      setErrorMessage('El CVV debe tener 3 dígitos.');
      return;
    }

    // Aquí puedes agregar más validaciones para la fecha de vencimiento

    try {
      const response = await fetch('https://localhost:3001/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardName,
          cardNumber,
          expiryDate,
          cvv,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage('');
        // Aquí puedes redirigir o hacer otra acción después del pago exitoso
      } else {
        setErrorMessage(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Hubo un error al procesar el pago.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="payment-container">
      <h2>Realizar Pago</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre en la tarjeta</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Nombre completo"
            required
          />
        </div>
        <div>
          <label>Número de tarjeta</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Número de tarjeta"
            maxLength={16}
            required
          />
        </div>
        <div>
          <label>Fecha de vencimiento</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/AA"
            required
          />
        </div>
        <div>
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
            maxLength={3}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
};

export default Payment;

