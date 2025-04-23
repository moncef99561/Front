import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    demandesConge: 0,
    absences: 0,
    equipes: 0,
    projets: 0,
    taches: 0
  });

  useEffect(() => {
    // Génération aléatoire réaliste pour démo
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    setStats({
      demandesConge: getRandom(10, 30),
      absences: 6,
      equipes: 8,
      projets: 10,
      taches: 30,
      employes: 50,
      formateurs: 3,
      Formation: 6
    });
  }, []);

  const barData = {
    labels: ['Projets', 'Tâches', 'Employés', 'Équipes', 'Formateurs', 'Formation'],
    datasets: [
      {
        label: 'Activités RH',
        backgroundColor: ['#007bff', '#f8b739', '#28a745', '#6DE1D2', '#547792', '#E83F25'],
        data: [stats.projets, stats.taches, stats.employes, stats.equipes, stats.formateurs, stats.Formation]
      }
    ]
  };

  const pieData = {
    labels: ['Demandes de Congé', 'Absences'],
    datasets: [
      {
        data: [stats.demandesConge, stats.absences],
        backgroundColor: ['#17a2b8', '#dc3545'],
        borderWidth: 0
      }
    ]
  };

  const lineData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Demandes Congé',
        data: [2, 3, 1, 4, 2, 0, 1],
        fill: true,
        backgroundColor: 'rgba(23, 162, 184, 0.2)',
        borderColor: '#17a2b8',
        tension: 0.4
      },
      {
        label: 'Absences',
        data: [1, 2, 2, 1, 3, 4, 2],
        fill: true,
        backgroundColor: 'rgba(220, 53, 69, 0.2)',
        borderColor: '#dc3545',
        tension: 0.4
      }
    ]
  };

  return (
    <Container className="my-5">
      <h3 className="text-center fw-bold mb-4">Dashboard RH - Activité Globale</h3>
      <Row className="g-4 mb-4">
        <Col md={3}><Card className="shadow-sm border-0 p-3 text-center"><h6>Projets</h6><h2 className="text-primary">{stats.projets}</h2></Card></Col>
        <Col md={3}><Card className="shadow-sm border-0 p-3 text-center"><h6>Tâches</h6><h2 className="text-warning">{stats.taches}</h2></Card></Col>
        <Col md={3}><Card className="shadow-sm border-0 p-3 text-center"><h6>Équipes</h6><h2 className="text-success">{stats.equipes}</h2></Card></Col>
        <Col md={3}><Card className="shadow-sm border-0 p-3 text-center"><h6>Demandes Congé</h6><h2 className="text-info">{stats.demandesConge}</h2></Card></Col>
      </Row>
      <Row className="g-4">
        <Col md={8}>
          <Card className="p-3 shadow-sm border-0">
            <h6 className="mb-3 fw-semibold">Activités internes : Projets, Tâches, Équipes, Formateurs, Employés,Formations</h6>
            <Bar data={barData} />
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-4 py-4 shadow-sm border-0 text-center">
            <h6 className="mb-5">Congés et Absences</h6>
            <Pie data={pieData} />
            {/* <button className="btn btn-warning mt-2">Voir détail</button> */}
          </Card>
        </Col>   
      </Row>
    </Container>
  );
};

export default Dashboard;
