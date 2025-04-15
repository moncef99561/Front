import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Alert, ListGroup, Badge } from 'react-bootstrap';
import {
  FaUsers, FaBuilding, FaFileContract,
  FaBriefcase, FaChartLine, FaCalendarCheck
} from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';
import api from '../../services/api';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (err) {
        setError('Erreur de chargement des statistiques');
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ['Employés', 'Départements', 'Services', 'Postes'],
    datasets: [{
      label: 'Effectifs',
      data: [stats.employees, stats.departments, stats.services, stats.postes],
      backgroundColor: [
        'var(--color-employees-primary)',
        'var(--color-departments-primary)',
        'var(--color-contracts-primary)',
        'var(--color-offers-primary)'
      ],
      borderColor: '#FFFFFF',
      borderWidth: 2,
      borderRadius: 8,
      barPercentage: 0.7
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        grid: { color: '#F3F4F6' },
        ticks: { color: '#6B7280' },
        beginAtZero: true
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280' }
      }
    }
  };

  const cards = [
    { title: 'Employés', value: stats.employees, icon: <FaUsers />, color: 'employees' },
    { title: 'Départements', value: stats.departments, icon: <FaBuilding />, color: 'departments' },
    { title: 'Contrats', value: stats.contracts, icon: <FaFileContract />, color: 'contracts' },
    { title: 'Offres', value: stats.jobOffers, icon: <FaBriefcase />, color: 'offers' }
  ];

  const recentActivities = [
    { id: 1, title: 'Nouveau contrat signé', time: '2h', type: 'contracts' },
    { id: 2, title: 'Entretien programmé', time: '4h', type: 'departments' },
    { id: 3, title: 'Offre publiée', time: '6h', type: 'offers' }
  ];

  return (
    <div className="dashboard-container bg-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="dashboard-header">Tableau de Bord RH</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="g-4 mb-5">
          {cards.map((metric, index) => (
            <Col key={index} md={3}>
              <Card className={`stat-card ${metric.color}-card`}>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className={`stat-icon-container ${metric.color}-bg`}>
                      {React.cloneElement(metric.icon, {
                        className: `text-xl ${metric.color}-icon`
                      })}
                    </div>
                    <div>
                      <div className={`stat-title ${metric.color}-text`}>
                        {metric.title}
                      </div>
                      <div className="stat-value">{metric.value || 0}</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="g-4">
          <Col md={8}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 text-dark">Répartition des effectifs</h5>
                  <Badge bg="light" className="text-muted">
                    <FaChartLine className="me-2" />
                    Mise à jour en temps réel
                  </Badge>
                </div>
                <div className="chart-wrapper">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h5 className="recent-title">Activités Récentes</h5>
                <ListGroup variant="flush">
                  {recentActivities.map(activity => (
                    <ListGroup.Item key={activity.id} className="recent-activity-item">
                      <div className={`recent-activity-icon ${activity.type}-icon-bg ${activity.type}-icon-text`}>
                        <FaCalendarCheck />
                      </div>
                      <div className="flex-grow-1">
                        <div className="recent-activity-title">{activity.title}</div>
                        <div className="recent-activity-time">{activity.time}</div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
