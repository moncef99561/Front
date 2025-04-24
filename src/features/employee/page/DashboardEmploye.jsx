import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const DashboardEmploye = () => {
  const resumeStats = [
    { label: "Projets", value: 10, color: "#0d6efd" },
    { label: "Tâches", value: 30, color: "#ffc107" },
    { label: "Demandes", value: 8, color: "#198754" },
    { label: "Solde de Congé", value: 16, color: "#0dcaf0" }
  ];

  const chartActivites = [
    { name: "Projets", value: 10 },
    { name: "Tâches", value: 30 },
    { name: "Formation", value: 6 },
    { name: "Demandes", value: 8 },
  ];

  const pieAbsences = [
    { name: "Solde de Congé", value: 16 },
    { name: "Absences", value: 7 }
  ];

  const colors = ["#0dcaf0", "#dc3545"];

  return (
    <div className="container mt-4">
      <h4 className="text-center fw-semibold mb-4">Dashboard RH - Activité Globale</h4>

      <Row className="mb-4">
        {resumeStats.map((stat, i) => (
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
            <h6 className="fw-bold text-center mb-3">Activités internes : Projets, Tâches, Formations</h6>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartActivites}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Activités RH" fill="#0d6efd" />
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
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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