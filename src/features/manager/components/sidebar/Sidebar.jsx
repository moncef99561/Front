import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, FaChalkboardTeacher , FaLayerGroup , FaBriefcase, FaFileContract, FaUserTimes, FaRegCalendarCheck, FaHome, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('/dashboard');

  const menuItems = [
    { to: '/manager/', icon: <FaHome />, text: 'Tableau de Bord' },
    { to: '/manager/projet', icon: <FaBriefcase />, text: 'Projet' },
    { to: '/manager/taches', icon: <FaFileContract />, text: 'Tâches' },
    // { to: '/manager/evaluation', icon: <FaFileContract />, text: 'Evaluation' },
    { to: '/manager/equipes', icon: <FaUsers />, text: 'Equipes' },
    // { to: '/manager/addManager', icon: <FaUser />, text: 'Manager' },
    { to: '/manager/demandes-conges', icon: <FaRegCalendarCheck />, text: 'Congés Employés' },
    { to: '/manager/absences', icon: <FaUserTimes />, text: 'Absences' },
    { to: '/manager/type-formation', icon: <FaLayerGroup  />, text: 'Type-Formation' },
    { to: '/manager/formations', icon: <FaChalkboardTeacher  />, text: 'Formations' },


  ];

  return (
    <div className="d-flex flex-column justify-content-between p-3 bg-white text-dark sidebar-container">

      {/* Logo */}
      <div>
        <div className="pt-3 mb-5 px-3">
          <Link to="/responsable" className="nav-link">
            <h2>
              <span className="text-primary">Work</span>
              Wise</h2>
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

      {/* Déconnexion */}
      <div className="mb-2">
        <div className="d-flex align-items-center gap-2 px-3 text-secondary sidebar-logout">
          <FaSignOutAlt style={{ width: '24px' }} />
          <span className="sidebar-text">Déconnexion</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;