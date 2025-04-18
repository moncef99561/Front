import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Alert, ListGroup, Badge } from 'react-bootstrap';
import { 
  FaUsers, FaBuilding, FaFileContract, 
  FaBriefcase, FaChartLine, FaCalendarCheck 
} from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Palette de couleurs professionnelles
const colorPalette = {
  employees: {
    primary: '#4F46E5',    // Bleu violet
    secondary: '#C7D2FE',  // Bleu clair
    background: '#4F46E520'
  },
  departments: {
    primary: '#10B981',    // Vert émeraude
    secondary: '#A7F3D0',  // Vert clair
    background: '#10B98120'
  },
  contracts: {
    primary: '#F59E0B',    // Orange ambré
    secondary: '#FDE68A',  // Jaune clair
    background: '#F59E0B20'
  },
  offers: {
    primary: '#8B5CF6',    // Violet
    secondary: '#DDD6FE',  // Violet clair
    background: '#8B5CF620'
  }
};

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

  // Configuration du graphique
  const chartData = {
    labels: ['Employés', 'Départements', 'Services', 'Postes'],
    datasets: [{
      label: 'Effectifs',
      data: [stats.employees, stats.departments, stats.services, stats.postes],
      backgroundColor: [
        colorPalette.employees.primary,
        colorPalette.departments.primary,
        colorPalette.contracts.primary,
        colorPalette.offers.primary
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
        borderWidth: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
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

  // Activités récentes
  const recentActivities = [
    { id: 1, title: 'Nouveau contrat signé', time: '2h', type: 'contracts' },
    { id: 2, title: 'Entretien programmé', time: '4h', type: 'departments' },
    { id: 3, title: 'Offre publiée', time: '6h', type: 'offers' }
  ];

  return (
    <div className="dashboard-container p-4 bg-gray-50 min-vh-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tableau de Bord RH</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        {/* Cartes de statistiques */}
        <Row className="g-4 mb-6">
          {[
            { 
              title: 'Employés', 
              value: stats.employees, 
              icon: <FaUsers />,
              color: 'employees'
            },
            { 
              title: 'Départements', 
              value: stats.departments, 
              icon: <FaBuilding />,
              color: 'departments'
            },
            { 
              title: 'Contrats', 
              value: stats.contracts, 
              icon: <FaFileContract />,
              color: 'contracts'
            },
            { 
              title: 'Offres', 
              value: stats.jobOffers, 
              icon: <FaBriefcase />,
              color: 'offers'
            }
          ].map((metric, index) => (
            <Col key={index} md={3}>
              <Card 
                className="border-0 shadow-sm h-100 transition-all hover:shadow-lg"
                style={{ 
                  backgroundColor: colorPalette[metric.color].primary,
                  borderRadius: '12px'
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ 
                        backgroundColor: colorPalette[metric.color].background,
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      {React.cloneElement(metric.icon, { 
                        className: 'text-xl',
                        style: { color: colorPalette[metric.color].secondary } 
                      })}
                    </div>
                    <div>
                      <div 
                        className="text-sm mb-1"
                        style={{ color: colorPalette[metric.color].secondary }}
                      >
                        {metric.title}
                      </div>
                      <div 
                        className="h2 mb-0"
                        style={{ color: '#FFFFFF' }}
                      >
                        {metric.value || 0}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Contenu principal */}
        <Row className="g-4">
          <Col md={8}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 text-gray-900">Répartition des effectifs</h5>
                  <Badge bg="light" className="text-muted">
                    <FaChartLine className="me-2" />Mise à jour en temps réel
                  </Badge>
                </div>
                <div style={{ height: '320px' }}>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h5 className="mb-4 text-gray-900">Activités Récentes</h5>
                <ListGroup variant="flush">
                  {recentActivities.map(activity => (
                    <ListGroup.Item 
                      key={activity.id}
                      className="border-0 px-0 d-flex align-items-center mb-3"
                      style={{ backgroundColor: '#F8FAFC' }}
                    >
                      <div 
                        className="p-2 me-3 rounded"
                        style={{ 
                          backgroundColor: colorPalette[activity.type].background,
                          color: colorPalette[activity.type].primary
                        }}
                      >
                        <FaCalendarCheck />
                      </div>
                      <div className="flex-grow-1">
                        <div className="text-gray-900">{activity.title}</div>
                        <div className="text-muted small">{activity.time}</div>
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