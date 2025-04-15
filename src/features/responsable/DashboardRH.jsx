import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./DashboardRH.css";
import { FaUserFriends, FaClipboardList, FaBriefcase, FaCheckCircle, FaUserPlus, FaFileContract } from "react-icons/fa";
import { LayoutDashboardIcon,UsersIcon,BriefcaseIcon,FileTextIcon,BuildingIcon,HeadphonesIcon,TagIcon,} from 'lucide-react'


export default function DashboardRH() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 min-vh-100 sidebar p-3">
          <div className="p-1 border-bottom">
            <h4 className="fw-bold mb-4">RH Manager</h4>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item"><a href="/" className="nav-link active"><LayoutDashboardIcon size={20} /> Dashboard</a></li>
            <li className="nav-item"><a href="/" className="nav-link"><UsersIcon size={20} /> Employés</a></li>
            <li className="nav-item"><a href="/" className="nav-link"><BriefcaseIcon size={20} /> Offres d'emploi</a></li>
            <li className="nav-item"><a href="/" className="nav-link"><FileTextIcon size={20} /> Contrats</a></li>
            <li className="nav-item"><a href="/" className="nav-link"><BuildingIcon size={20} /> Départements</a></li>
            <li className="nav-item"><a href="/" className="nav-link"><HeadphonesIcon size={20} /> Services</a></li>
            <li className="nav-item"><a href="/" className="nav-link"><TagIcon size={20} />Postes</a></li>
          </ul>
          <div className="mt-auto pt-5">
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-primary text-white text-center me-2" style={{width: '30px', height: '30px'}}>JD</div>
              <div>
                <strong>Jean Dupont</strong>
                <div className="text-muted" style={{fontSize: '0.9em'}}>Responsable RH</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4  bg-light">
          <h3 className="fw-bold">Tableau de bord RH</h3>
          <p className="text-muted">Bienvenue, voici la vue d'ensemble de votre département</p>

          {/* Statistiques principales */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="p-3 bg-white shadow-sm rounded d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1">Employés actifs</p>
                  <h5 className="fw-bold">124 <span className="text-success">+4</span></h5>
                </div>
                <FaUserFriends size={30} className="text-primary" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-white shadow-sm rounded d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1">Offres d'emploi</p>
                  <h5 className="fw-bold">12 <span className="text-success">+2</span></h5>
                </div>
                <FaBriefcase size={30} className="text-success" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-white shadow-sm rounded d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1">Contrats en attente</p>
                  <h5 className="fw-bold">5 <span className="text-danger">-1</span></h5>
                </div>
                <FaClipboardList size={30} className="text-warning" />
              </div>
            </div>
          </div>

          {/* Activités récentes et répartition */}
          <div className="row g-3">
            <div className="col-md-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <h6>Activités récentes</h6>
                <ul className="list-unstyled mt-3">
                  <li className="mb-2">
                    <FaCheckCircle className="text-primary me-2" /> <strong>Entretien planifié</strong><br/>
                    Développeur Frontend - Marie Laurent <small className="text-muted">il y a 2 heures</small>
                  </li>
                  <li className="mb-2">
                    <FaUserPlus className="text-success me-2" /> <strong>Nouveau candidat</strong><br/>
                    Designer UX - Thomas Mercier <small className="text-muted">il y a 5 heures</small>
                  </li>
                  <li>
                    <FaFileContract className="text-warning me-2" /> <strong>Contrat à renouveler</strong><br/>
                    Assistant RH - Sophie Dubois <small className="text-muted">il y a 1 jour</small>
                  </li>
                </ul>
                <a href="/" className="text-primary">Voir toutes les activités</a>
              </div>
            </div>

            <div className="col-md-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <h6>Répartition des employés</h6>
                <div className="mt-3">
                  {[
                    {label: 'Technique', value: 42, color: 'primary'},
                    {label: 'Marketing', value: 28, color: 'success'},
                    {label: 'Ventes', value: 22, color: 'warning'},
                    {label: 'Finance', value: 15, color: 'info'},
                    {label: 'RH', value: 8, color: 'danger'},
                    {label: 'Autres', value: 9, color: 'secondary'}
                  ].map((item, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="d-flex justify-content-between">
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                      <div className="progress">
                        <div
                          className={`progress-bar bg-${item.color}`}
                          style={{width: `${item.value}%`}}>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
} 
