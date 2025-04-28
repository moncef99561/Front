import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import axios from "axios";

const DashboardEmploye = () => {
  const [stats, setStats] = useState({
    projets: 0,
    taches: 0,
    demandes: 0,
    soldeConge: 0,
    absences: 0,
    formations: 0
  });

  const barColors = ["#0d6efd", "#ffc107", "#6610f2", "#20c997"];
  const pieColors = ["#0dcaf0", "#dc3545"];

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5107/api/DashboardEmploye");
      setStats(res.data);
    } catch (err) {
      console.error("Erreur dashboard", err);
    }
  };

  const chartActivites = [
    { name: "Projets", value: stats.projets },
    { name: "Tâches", value: stats.taches },
    { name: "Formation", value: stats.formations },
    { name: "Demandes", value: stats.demandes }
  ];

  const pieAbsences = [
    { name: "Solde de Congé", value: stats.soldeConge },
    { name: "Absences", value: stats.absences }
  ];

  return (
    <div className="container mt-4">
      <h4 className="text-center fw-semibold mb-4">Tableau de Bord - Activité Globale</h4>

      <Row className="mb-4">
        {[
          { label: "Projets", value: stats.projets, color: "#0d6efd" },
          { label: "Tâches", value: stats.taches, color: "#ffc107" },
          { label: "Demandes", value: stats.demandes, color: "#198754" },
          { label: "Solde de Congé", value: stats.soldeConge, color: "#0dcaf0" }
        ].map((stat, i) => (
          <Col md={3} key={i}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>{stat.label}</Card.Title>
                <h3 style={{ color: stat.color }}>{stat.value}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="p-3 shadow-sm">
            <h6 className="fw-bold text-center mb-3">Activités internes</h6>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartActivites}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {chartActivites.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6 className="fw-bold text-center mb-3">Congés et Absences</h6>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieAbsences}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieAbsences.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardEmploye;
