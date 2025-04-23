import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, ListGroup } from 'react-bootstrap';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';

const mockEmployees = [
  { id: 1, name: 'Ahmed Karim' },
  { id: 2, name: 'Sara El Yazidi' },
  { id: 3, name: 'Youssef Bennis' },
  { id: 4, name: 'Hajar Zaki' }
];

const ChatPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState({});
  const messagesEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedEmployee) return;

    const newMsg = {
      user: 'Manager',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats((prevChats) => ({
      ...prevChats,
      [selectedEmployee.id]: [...(prevChats[selectedEmployee.id] || []), newMsg]
    }));

    setMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, selectedEmployee]);

  return (
    <Container fluid className="px-0" style={{ height: '100vh', maxHeight: '100vh' }}>
      <Row className="h-100">
        <Col md={3} className="bg-white border-end px-0">
          <div className="bg-success text-white p-3 fw-bold">Employés</div>
          <ListGroup variant="flush" className="border-top">
            {mockEmployees.map(emp => (
              <ListGroup.Item
                key={emp.id}
                action
                className="d-flex align-items-center gap-2"
                active={selectedEmployee?.id === emp.id}
                onClick={() => setSelectedEmployee(emp)}
              >
                <FaUserCircle size={24} />
                <span>{emp.name}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={9} className="d-flex flex-column px-0">
          <div className="bg-light border-bottom p-3 d-flex align-items-center">
            <FaUserCircle size={30} className="me-2 text-muted" />
            <h6 className="mb-0">{selectedEmployee ? selectedEmployee.name : 'Sélectionnez un employé'}</h6>
          </div>

          <div
            className="flex-grow-1 px-3 py-2 position-relative"
            style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/purty-wood.png')",
              backgroundColor: '#e0dede',
              backgroundRepeat: 'repeat',
              overflowY: 'auto'
            }}
          >
            <ListGroup variant="flush">
              {(chats[selectedEmployee?.id] || []).map((msg, idx) => (
                <ListGroup.Item
                  key={idx}
                  className={`border-0 bg-transparent d-flex flex-column ${msg.user === 'Manager' ? 'align-items-end text-end' : 'align-items-start text-start'}`}
                >
                  <div
                    className={`p-2 rounded-3 mb-2 ${msg.user === 'Manager' ? 'bg-success text-white' : 'bg-white text-dark'}`}
                    style={{ maxWidth: '75%', wordBreak: 'break-word' }}
                  >
                    {msg.text}
                    <div className="text-end small mt-1 opacity-75">{msg.time}</div>
                  </div>
                </ListGroup.Item>
              ))}
              <div ref={messagesEndRef} />
            </ListGroup>
          </div>

          <div className="bg-white border-top p-3">
            <Form onSubmit={handleSend}>
              <InputGroup>
                <Form.Control
                  type="text"
                  className="rounded-pill"
                  placeholder={selectedEmployee ? 'Écrivez un message...' : 'Choisissez un employé...'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={!selectedEmployee}
                />
                <Button type="submit" variant="success" className="ms-2 rounded-pill" disabled={!selectedEmployee || !message.trim()}>
                  <FaPaperPlane />
                </Button>
              </InputGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;