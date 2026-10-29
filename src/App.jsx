import { useState, useEffect } from 'react';
import api from './services/api';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';

function App() {
  const [message, setMessage] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Probando conexión raíz
    api.get('/')
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));

    // Obteniendo servicios disponibles
    api.get('/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Sistema de Reservas / Turnero</h1>
      
      {message && <Alert variant="success" className="text-center">Estado Backend: {message}</Alert>}

      <h2 className="mt-5 mb-3">Servicios Disponibles</h2>
      <Row>
        {services.length === 0 ? (
          <p className="text-muted">No hay servicios cargados todavía. (Puedes crearlos mediante Postman o los sumaremos en el siguiente paso).</p>
        ) : (
          services.map(service => (
            <Col md={4} key={service.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{service.name}</Card.Title>
                  <Card.Text>
                    <strong>Duración:</strong> {service.duration_minutes} mins<br />
                    <strong>Precio:</strong> ${service.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default App;