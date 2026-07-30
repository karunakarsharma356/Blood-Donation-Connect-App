import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  ShieldCheck,
  Clock3,
  ArrowRight,
  Droplets,
  Search,
  ClipboardCheck,
  HandHeart,
} from "lucide-react";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="container hero-grid">

          {/* LEFT */}
          <div>
            <span className="badge">❤️ Every Drop Counts</span>

            <h1 className="hero-title">
              Donate Blood,
              <br />
              Save <span className="highlight">Lives</span>
            </h1>

            <p className="hero-text">
              BloodConnect connects blood donors, hospitals and patients
              instantly during emergencies.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">
                Become Donor <ArrowRight size={18} />
              </Link>
              <Link to="/requests" className="btn-secondary">
                Find Blood
              </Link>
            </div>

            <div className="trust-row">
              <div className="avatar-stack">
                <img src="https://i.pravatar.cc/100?img=12" alt="" />
                <img src="https://i.pravatar.cc/100?img=25" alt="" />
                <img src="https://i.pravatar.cc/100?img=34" alt="" />
                <img src="https://i.pravatar.cc/100?img=40" alt="" />
              </div>
              <p className="trust-text">
                Trusted by <strong>1200+</strong> active donors
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-image-wrap">
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=700&q=80"
                alt="Blood Donation"
              />
              <div className="floating-card">
                <div className="floating-icon">
                  <Heart fill="#dc2626" color="#dc2626" size={22} />
                </div>
                <div>
                  <h2>550+</h2>
                  <p>Lives Saved</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats-section">
        <div className="container stats-grid">

          <div className="stat-card">
            <Users color="#dc2626" size={36} />
            <h2>1200+</h2>
            <p>Registered Donors</p>
          </div>

          <div className="stat-card">
            <Droplets color="#dc2626" size={36} />
            <h2>600+</h2>
            <p>Blood Requests</p>
          </div>

          <div className="stat-card">
            <Clock3 color="#dc2626" size={36} />
            <h2>24×7</h2>
            <p>Emergency Support</p>
          </div>

          <div className="stat-card">
            <ShieldCheck color="#dc2626" size={36} />
            <h2>100%</h2>
            <p>Verified Donors</p>
          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features-section">
        <div className="container">

          <div className="section-header">
            <span className="badge">Why BloodConnect?</span>
            <h2 className="section-title">Simple. Fast. Reliable.</h2>
            <p className="section-subtitle">
              Everything you need to request or donate blood in one place.
            </p>
          </div>

          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-icon">
                <Heart color="#dc2626" fill="#dc2626" />
              </div>
              <h3>Instant Matching</h3>
              <p>Search nearby blood donors based on blood group and location.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users color="#dc2626" />
              </div>
              <h3>Trusted Community</h3>
              <p>Hospitals, donors and patients connected securely.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <ShieldCheck color="#dc2626" />
              </div>
              <h3>Safe Platform</h3>
              <p>Verified requests and registered donors make the process reliable.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="steps-section">
        <div className="container">

          <div className="section-header">
            <span className="badge">How It Works</span>
            <h2 className="section-title">Three Steps to Save a Life</h2>
          </div>

          <div className="steps-grid">

            <div className="step-card">
              <div className="step-icon">
                <ClipboardCheck color="#dc2626" size={32} />
              </div>
              <h3>1. Register</h3>
              <p>Sign up as a donor with your blood group and location details.</p>
            </div>

            <div className="step-card">
              <div className="step-icon">
                <Search color="#dc2626" size={32} />
              </div>
              <h3>2. Get Matched</h3>
              <p>We connect your profile to nearby patients or hospitals in need.</p>
            </div>

            <div className="step-card">
              <div className="step-icon">
                <HandHeart color="#dc2626" size={32} />
              </div>
              <h3>3. Donate</h3>
              <p>Visit the location and complete your donation safely.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Be Someone's Lifeline ❤️</h2>
            <p>Register today and help save lives with just one donation.</p>
            <Link to="/register" className="btn-white">
              Register Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;