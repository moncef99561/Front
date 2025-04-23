import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = lazy(() => import("../components/home/HeroSection"));
const FeatureSection = lazy(() => import("../components/home/FeatureSection"));
const AboutSection = lazy(() => import("../components/home/AboutSection"));
const TestimonialSection = lazy(() => import("../components/home/TestimonialSection"));
const CTASection = lazy(() => import("../components/home/CTASection"));
const Collaborator = lazy(() => import("../components/home/Collaborator"));

const Home = () => {
  return (
    <Suspense fallback={<div className="text-center my-5">Chargement en cours...</div>}>
      
      <div className="home">
        <HeroSection />
        <AboutSection />
        <Collaborator />
        <FeatureSection />
        <TestimonialSection />
        <CTASection />
      </div>
    </Suspense>
  );
};

export default Home;
