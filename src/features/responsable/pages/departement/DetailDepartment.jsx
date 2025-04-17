import React from 'react';
import { Modal, Badge, ListGroup } from 'react-bootstrap';
import { FaBuilding, FaInfoCircle, FaListAlt, FaCogs } from 'react-icons/fa';

const DetailDepartment = ({ department, onHide }) => {
  return (
    <Modal show={!!department} onHide={onHide} size="lg">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold text-primary">
          <FaBuilding className="me-2" />
          {department?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="department-details">
          <div className="mb-4">
            <h5 className="d-flex align-items-center text-secondary mb-3">
              <FaInfoCircle className="me-2 text-info" />
              Description
            </h5>
            <div className="ps-4 border-start border-3 border-info">
              <p className="lead mb-0">{department?.description}</p>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="d-flex align-items-center text-secondary mb-3">
              <FaListAlt className="me-2 text-warning" />
              Détails complémentaires
            </h5>
            <div className="ps-4">
              <p className="text-muted fst-italic">
                {department?.detail || "Aucun détail supplémentaire fourni"}
              </p>
            </div>
          </div>

          <div>
            <h5 className="d-flex align-items-center text-secondary mb-3">
              <FaCogs className="me-2 text-success" />
              Services associés
            </h5>
            <div className="ps-4">
              {department?.services?.length > 0 ? (
                <div className="service-list">
                  {department.services.map(service => (
                    <div key={service.serviceId} className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0 fw-bold">{service.name}</h6>
                        <Badge pill bg="success" className="ms-2">
                          {service.postes?.length || 0} poste(s)
                        </Badge>
                      </div>
                      {service.postes?.length > 0 && (
                        <div className="mt-2">
                          <span className="text-muted small">Postes :</span>
                          <div className="d-flex flex-wrap gap-2 mt-1">
                            {service.postes.map(poste => (
                              <span 
                                key={poste.posteId} 
                                className="badge bg-secondary bg-opacity-10 text-secondary"
                              >
                                {poste.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted fst-italic">
                  Aucun service associé à ce département
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>

      <style>{`
        .department-details h5 {
          font-size: 1.1rem;
          letter-spacing: 0.5px;
        }
        .service-list .bg-light {
          transition: transform 0.2s ease;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .service-list .bg-light:hover {
          transform: translateX(5px);
          background-color: #f8f9fa !important;
        }
      `}</style>
    </Modal>
  );
};

export default DetailDepartment;