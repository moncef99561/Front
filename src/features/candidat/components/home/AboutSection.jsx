import React from 'react'
import {
  Users2Icon,
  TrendingUpIcon,
  GlobeIcon,
  HeartHandshakeIcon,
} from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h2 fw-bold text-dark mb-3">À propos de Work Wise</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '1000px' }}>
            Work Wise est une entreprise innovante qui aide les talents à
            trouver leur place idéale dans le monde professionnel. Notre mission
            est de connecter les bonnes personnes aux bonnes opportunités.
          </p>
        </div>
        <div className="row text-center">
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                <Users2Icon className="text-primary" size={24} />
              </div>
              <h5 className="fw-semibold mb-2 text-dark">Culture Collaborative</h5>
              <p className="text-muted">
                Nous valorisons le travail d'équipe et la collaboration pour atteindre l'excellence.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                <TrendingUpIcon className="text-primary" size={24} />
              </div>
              <h5 className="fw-semibold mb-2 text-dark">Croissance Continue</h5>
              <p className="text-muted">
                Nous offrons des opportunités de développement professionnel et personnel.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                <GlobeIcon className="text-primary" size={24} />
              </div>
              <h5 className="fw-semibold mb-2 text-dark">Impact Global</h5>
              <p className="text-muted">
                Nos solutions innovantes ont un impact positif à l'échelle mondiale.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                <HeartHandshakeIcon className="text-primary" size={24} />
              </div>
              <h5 className="fw-semibold mb-2 text-dark">Équilibre Vie Pro/Perso</h5>
              <p className="text-muted">
                Nous respectons l'équilibre entre vie professionnelle et vie personnelle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
