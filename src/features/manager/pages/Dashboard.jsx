import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [stats, setStats] = useState({
    projets: 0,
    taches: 0,
    equipes: 0,
    formations: 0,
    employes: 0,
    demandesConge: 0,
    absences: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projetsRes, tachesRes, equipesRes, formationsRes, employesRes] = await Promise.all([
          axios.get('http://localhost:5132/api/Projet'),
          axios.get('http://localhost:5132/api/Tache'),
          axios.get('http://localhost:5132/api/Equipe'),
          axios.get('http://localhost:5132/api/Formation'),
          axios.get('http://localhost:5263/api/Employees') // attention : employes dans autre microservice
        ]);

        setStats({
          projets: projetsRes.data.length,
          taches: tachesRes.data.length,
          equipes: equipesRes.data.length,
          formations: formationsRes.data.length,
          employes: employesRes.data.length,
          demandesConge: Math.floor(Math.random() * 20), // pour l'instant valeur random
          absences: Math.floor(Math.random() * 10)
        });

        setLoading(false);
      } catch (error) {
        console.error("Erreur chargement dashboard:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: ['Projets', 'Tâches', 'Équipes', 'Employés', 'Formations'],
    datasets: [
      {
        label: 'Statistiques RH',
        backgroundColor: ['#007bff', '#ffc107', '#28a745', '#6610f2', '#dc3545'],
        data: [stats.projets, stats.taches, stats.equipes, stats.employes, stats.formations]
      }
    ]
  };

  const pieData = {
    labels: ['Demandes de congé', 'Absences'],
    datasets: [
      {
        data: [stats.demandesConge, stats.absences],
        backgroundColor: ['#17a2b8', '#dc3545'],
        borderWidth: 1
      }
    ]
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Chargement du tableau de bord...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4 fw-bold">Tableau de Bord - Vue Globale</h3>

      <Row className="g-4 mb-4">
        <Col md={2}><Card className="text-center p-3"><h6>Projets</h6><h3 className="text-primary">{stats.projets}</h3></Card></Col>
        <Col md={2}><Card className="text-center p-3"><h6>Tâches</h6><h3 className="text-warning">{stats.taches}</h3></Card></Col>
        <Col md={2}><Card className="text-center p-3"><h6>Équipes</h6><h3 className="text-success">{stats.equipes}</h3></Card></Col>
        <Col md={2}><Card className="text-center p-3"><h6>Employés</h6><h3 className="text-info">{stats.employes}</h3></Card></Col>
        <Col md={2}><Card className="text-center p-3"><h6>Formations</h6><h3 className="text-danger">{stats.formations}</h3></Card></Col>
      </Row>

      <Row className="g-4">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h5 className="text-center mb-3 fw-semibold">Statistiques Générales</h5>
            <Bar data={barData} />
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-4 shadow-sm text-center">
            <h5 className="mb-4 fw-semibold">Congés vs Absences</h5>
            <Pie data={pieData} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
