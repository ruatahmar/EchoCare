import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Heart, Pill, Users, Shield, Clock } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Pill className="w-12 h-12" />,
      title: "Medicine Reminders",
      description: "Never miss a dose. Gentle voice reminders at the right time, every time.",
      color: "accent-purple"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Family Memory",
      description: "Remember your loved ones. Ask about family and instantly recall precious memories.",
      color: "accent-blue"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Emergency Detection",
      description: "Stay safe always. Smart alerts notify caregivers when help is needed.",
      color: "accent-orange"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Just Speak",
      description: "Talk naturally - no typing, no buttons to press"
    },
    {
      step: "2",
      title: "AI Understands",
      description: "Smart voice assistant understands your needs"
    },
    {
      step: "3",
      title: "Get Help",
      description: "Instant reminders, memories, and emergency support"
    }
  ];

  return (
    <div className="home-container">
      <header className="header-nav">
        <div className="container" 
             style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          
          <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Heart className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
            <span className="heading-2" style={{ margin: 0 }}>EchoCare</span>
          </div>

          <div className="nav-actions">
            <button className="btn-secondary" onClick={() => navigate('/assistant')}>
              Try Demo
            </button>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          
          <div className="hero-announcement">
            <Heart className="w-4 h-4" />
            <span>Caring for Memory, One Voice at a Time</span>
          </div>

          <h1 className="heading-hero">
            Your AI Companion for<br />Memory & Wellness
          </h1>

          <p className="body-large hero-subtitle" style={{ color: 'var(--text-secondary)' }}>
            A voice-driven assistant that helps elderly people remember family,
            take medicine on time, and stay safe in emergencies.
          </p>

        </div>
      </section>
    </div>
  );
};

export default Home;
