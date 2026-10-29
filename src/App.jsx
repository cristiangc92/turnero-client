import { useState, useEffect } from 'react';
import api from './services/api';
import { Container, Row, Col, Card, Alert, Form, Button, Table } from 'react-bootstrap';

function App() {
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Estados para el formulario de nuevo Servicio
  const [serviceForm, setServiceForm] = useState({ name: '', duration_minutes: '', price: '' });

  // Estados para el formulario de nueva Reserva (Turno)
  const [appointmentForm, setAppointmentForm] = useState({
    client_name: '',
    client_email: '',
    service_id: '',
    date: '',
    time_slot: ''
  });

  // Cargar datos al iniciar
  const fetchData = async () => {
    try {
      const servicesRes = await api.get('/services');
      setServices(servicesRes.data);

      const appointmentsRes = await api.get('/appointments');
      setAppointments(appointmentsRes.data);
    } catch (err) {
      console.error('Error al cargar datos:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Manejar creación de servicio
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services', serviceForm);
      setFeedback({ type: 'success', message: '¡Servicio creado con éxito!' });
      setServiceForm({ name: '', duration_minutes: '', price: '' });
      fetchData();
    } catch (err) {
      setFeedback({ type: 'danger', message: err.response?.data?.error || 'Error al crear servicio' });
    }
  };

  // Manejar creación de turno
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', appointmentForm);
      setFeedback({ type: 'success', message: '¡Turno reservado con éxito!' });
      setAppointmentForm({ client_name: '', client_email: '', service_id: '', date: '', time_slot: '' });
      fetchData();
    } catch (err) {
      setFeedback({ type: 'danger', message: err.response?.data?.error || 'Error al reservar turno' });
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Sistema de Reservas / Turnero</h1>

      {feedback.message && (
        <Alert variant={feedback.type} onClose={() => setFeedback({ type: '', message: '' })} dismissible>
          {feedback.message}
        </Alert>
      )}

      <Row className="mb-5">
        {/* Formulario de Turnos */}
        <Col md={6} className="mb-4">
          <Card className="p-4 shadow-sm h-100">
            <h3 className="mb-3">Reservar un Turno</h3>
            <Form onSubmit={handleAppointmentSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Tu Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={appointmentForm.client_name}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, client_name: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ej: juan@mail.com"
                  value={appointmentForm.client_email}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, client_email: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Seleccionar Servicio</Form.Label>
                <Form.Select
                  value={appointmentForm.service_id}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, service_id: e.target.value })}
                  required
                >
                  <option value="">-- Elige un servicio --</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} (${service.price} - {service.duration_minutes} mins)
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      type="date"
                      value={appointmentForm.date}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Hora</Form.Label>
                    <Form.Control
                      type="time"
                      value={appointmentForm.time_slot}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, time_slot: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit" className="w-100">
                Confirmar Reserva
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Formulario de Servicios */}
        <Col md={6} className="mb-4">
          <Card className="p-4 shadow-sm h-100">
            <h3 className="mb-3">Crear Nuevo Servicio</h3>
            <Form onSubmit={handleServiceSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Servicio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Corte de Cabello"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Duración (en minutos)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej: 30"
                  value={serviceForm.duration_minutes}
                  onChange={(e) => setServiceForm({ ...serviceForm, duration_minutes: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio ($)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Ej: 1500.00"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mt-4">
                Guardar Servicio
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Listado de Turnos Reservados */}
      <Card className="p-4 shadow-sm">
        <h3 className="mb-3">Turnos Reservados</h3>
        {appointments.length === 0 ? (
          <p className="text-muted">No hay turnos registrados todavía.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Email</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.id}>
                  <td>{app.client_name}</td>
                  <td>{app.client_email}</td>
                  <td>{app.Service?.name || 'Servicio eliminado'}</td>
                  <td>{app.date}</td>
                  <td>{app.time_slot}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}

export default App;