import React, { useEffect, useState } from "react";
import apiRecrutement from "../../../services/apiRecrutement";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { LuBriefcase } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { RiFilePaperLine } from "react-icons/ri";
import { FaRegCalendarCheck } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import "./ProfilCandidat.css";

export default function ProfilCandidat() {
  const [candidat, setCandidat] = useState(null);

  useEffect(() => {
    const fetchCandidat = async () => {
      const id = localStorage.getItem("utilisateurId");
      if (!id) return;

      try {
        const response = await apiRecrutement.get(`/Candidat/${id}`);
        setCandidat(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };

    fetchCandidat();
  }, []);

  if (!candidat) return <p className="text-center mt-5">Chargement...</p>;

  return (

<div className="card rounded-4 overflow-hidden mt-4 mx-auto" style={{ maxWidth: '85%' }}>
        <div className="header-blue position-relative">
          <img
            src={`https://ui-avatars.com/api/?name=${candidat.prenom}+${candidat.nom}&background=0D8ABC&color=fff`}
            alt="avatar"
            className="rounded-circle border border-white position-absolute top-100 start-0 translate-middle ms-5"
            style={{ width: "80px", height: "80px" }}
          />
        </div>

        <div className="card-body pt-5">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <h5 className="fw-bold mb-0">{candidat.nom} {candidat.prenom}</h5>
              <small className="text-muted">{candidat.specialite || "Candidat"}</small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="px-2 py-2 bg-success bg-opacity-10 text-success rounded-pill">
                Actif
              </span>
              <button className="btn btn-primary btn-sm d-flex justify-content-center align-items-center" style={{ height: "40px" }}><CiMail size={20} className="me-2" />Contacter</button>
            </div>
          </div>

          <hr />

          <div className="row text-center fw-semibold">
            <div className="col-md-3 mb-3">
              <div className="d-flex justify-content-center align-items-center mt-2 mb-3">
                <MdOutlineEmail size={20} className="me-2" /> {candidat.email}
              </div>
              <div className=" bg-light py-3 rounded">
                <div className="d-flex justify-content-center align-items-center fw-bolder bg-light">
                  <LuBriefcase size={20} className="me-2 text-primary" /> Expérience
                </div>
                <div className="text-muted">{candidat.experience || "Non précisée"}</div>
              </div>

            </div>

            <div className="col-md-3 mb-3">
              <div className="d-flex justify-content-center align-items-center mt-2  mb-3">
                <FiPhone size={20} className="me-2" /> {candidat.telephone}
              </div>

              <div className=" bg-light py-3 rounded">
                <div className="d-flex justify-content-center align-items-center fw-bolder">
                  <FiCalendar size={20} className="me-2 text-primary" /> Disponibilité
                </div>
                <div className="text-muted">{candidat.disponibilite || "Inconnue"}</div>
              </div>

            </div>

            <div className="col-md-3 mb-3">
              <div className="d-flex justify-content-center align-items-center mt-2 mb-3">
                <CiLocationOn size={20} className="me-2" /> {candidat.adresse || "Adresse inconnue"}
              </div>
              <div className=" bg-light py-3 rounded">
                <div className="d-flex justify-content-center align-items-center fw-bolder">
                  <RiFilePaperLine size={20} className="me-2 text-primary" /> Candidatures
                </div>
                <div className="text-muted">{candidat.nbCandidatures || 0} actives</div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="d-flex justify-content-center align-items-center mt-2 mb-3">
                <FiGithub size={20} className="me-2" />
                <a href="https://github.com/moncef99561" className="text-decoration-none">Profil GitHub</a>
              </div>
              <div className=" bg-light py-3 rounded">
                <div className="d-flex justify-content-center align-items-center fw-bolder">
                  <FaRegCalendarCheck size={20} className="me-2 text-primary" /> Dernier entretien
                </div>
                <div className="text-muted">{candidat.dernierEntretien || "N/A"}</div>
              </div>
            </div>
          </div>


        </div>
      </div>
  )}