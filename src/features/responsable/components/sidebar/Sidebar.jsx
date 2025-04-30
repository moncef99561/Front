import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaBriefcase,
  FaFileAlt,
  FaFileContract,
  FaBuilding,
  FaCogs,
  FaUserTie,
  FaHome,
  FaCalendarAlt,
  FaSignOutAlt,
  FaRegCalendarCheck,
  FaUserTimes
} from 'react-icons/fa';

import './Sidebar.css';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('/dashboard');

  const menuItems = [
    { to: '/responsable', icon: <FaHome />, text: 'Tableau de Bord' },
    { to: '/responsable/employees', icon: <FaUsers />, text: 'Employés' },
    { to: '/responsable/jobOffers', icon: <FaBriefcase />, text: 'Offres d\'Emploi' },
    { to: '/responsable/contractTypes', icon: <FaFileContract />, text: 'Types Contrat' },
    { to: '/responsable/departments', icon: <FaBuilding />, text: 'Départements' },
    { to: '/responsable/services', icon: <FaCogs />, text: 'Services' },
    { to: '/responsable/postes', icon: <FaUserTie />, text: 'Postes' },
    { to: '/responsable/entretiens', icon: <FaCalendarAlt />, text: 'Entretiens' },
    { to: '/responsable/demandes-conges', icon: <FaRegCalendarCheck />, text: 'Congés Employés' },
    { to: '/responsable/absences', icon: <FaUserTimes /> , text: 'Absences' },
    { to: '/responsable/type-document', icon: <FaFileAlt />, text: 'Type-document' },
  ];

  return (
    <div className="d-flex flex-column justify-content-between p-3 bg-white text-dark sidebar-container">
      <div>
        <div className="pt-3 mb-5 px-3">
          <Link to="/responsable" className="nav-link">
            <h2>
              <span className="text-primary">Work</span>
              Wise
            </h2>
          </Link>
        </div>

        <Nav className="flex-column gap-1">
          {menuItems.map((item) => {
            const isActive = selectedItem === item.to;
            return (
              <Nav.Item key={item.to}>
                <Link
                  to={item.to}
                  className={`sidebar-link ${isActive ? 'sidebar-link-active' : 'text-dark'}`}
                  onClick={() => setSelectedItem(item.to)}
                >
                  {isActive && <div className="sidebar-divider"></div>}
                  <span className={`sidebar-icon ${isActive ? 'sidebar-icon-active' : 'sidebar-icon-inactive'}`}>
                    {item.icon}
                  </span>
                  <span className="sidebar-text">{item.text}</span>
                </Link>
              </Nav.Item>
            );
          })}
        </Nav>
      </div>

      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 px-3 text-secondary sidebar-logout">
          <FaSignOutAlt style={{ width: '24px' }} />
          <span className="sidebar-text">Déconnexion</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
