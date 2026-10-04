import { useState } from "react";
import "./App.css";
import heroImage from "./assets/hero.png";

function App() {
  const [page, setPage] = useState("home");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      return;
    }

    setPage("processing");

    setTimeout(() => {
      setPage("confirmation");
    }, 3000);
  };

  return (
    <div className="app">

      {/* =========================
          HOME / LANDING PAGE
      ========================== */}

      {page === "home" && (
        <>
          {/* NAVIGATION */}
          <header className="topbar">

            <div className="logo">
              NOVA
            </div>

            <div className="search-bar">
              <span className="search-icon">⌕</span>

              <input
                type="text"
                placeholder="Search products"
                readOnly
              />
            </div>

            <div className="nav-actions">
              <button className="nav-icon" aria-label="Language">
                🌐
              </button>

              <button className="nav-icon" aria-label="Shopping cart">
                🛒
              </button>
            </div>

          </header>

          {/* MAIN LANDING CONTENT */}
          <main className="landing">

            {/* HERO SECTION */}
            <section className="hero">

              {/* LEFT SIDE */}
              <div className="hero-content">

                <div className="offer-label">
                  LIMITED-TIME OFFER
                </div>

                <h1>
                  Your Special
                  <br />
                  Deal Is Waiting
                </h1>

                <p className="hero-description">
                  Discover an exclusive offer available for a
                  limited time. Don't miss your chance to claim
                  today's special deal.
                </p>

                <div className="hero-price">
                  <span className="hero-old-price">
                    ₱499.00
                  </span>

                  <span className="hero-new-price">
                    ₱0.99
                  </span>
                </div>

                <button
                  className="primary-button"
                  onClick={() => setPage("form")}
                >
                  CLAIM OFFER NOW
                  <span>→</span>
                </button>

                <div className="availability">
                  <span className="pulse-dot"></span>
                  Limited availability today
                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="hero-product">

                <div className="deal-badge">
                  SPECIAL DEAL
                </div>

                <div className="hero-image-container">

                  <div className="purple-glow"></div>

                  <img
                    src={heroImage}
                    alt="Featured shopping offer"
                    className="hero-image"
                  />

                </div>

                <div className="product-info">

                  <h2>
                    Exclusive Shopping Deal
                  </h2>

                  <div className="rating">
                    <span>★★★★★</span>
                    <strong>4.9</strong>
                  </div>

                </div>

              </div>

            </section>

            {/* BENEFITS */}
            <section className="benefits">

              <div className="benefit-card">
                <div className="benefit-icon">
                  🚚
                </div>

                <div>
                  <h3>Fast Processing</h3>

                  <p>
                    Quick and easy claim process.
                  </p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  🎁
                </div>

                <div>
                  <h3>Exclusive Offers</h3>

                  <p>
                    Special promotions available today.
                  </p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  🔒
                </div>

                <div>
                  <h3>Secure Process</h3>

                  <p>
                    Your claim is handled securely.
                  </p>
                </div>
              </div>

            </section>

            {/* SMALL PROMOTIONAL SECTION */}
            <section className="promo-strip">

              <div>
                <span className="promo-small">
                  TODAY ONLY
                </span>

                <h2>
                  Don't miss today's special offer.
                </h2>
              </div>

              <button
                className="secondary-button"
                onClick={() => setPage("form")}
              >
                Claim Now
              </button>

            </section>

          </main>

          {/* FOOTER */}
          <footer className="footer">

            <div className="footer-logo">
              NOVA
            </div>

            <p>
              © 2026 Nova Shopping. All rights reserved.
            </p>

          </footer>
        </>
      )}

      {/* =========================
          CLAIM FORM
      ========================== */}

      {page === "form" && (
        <main className="form-page">

          <div className="form-container">

            <button
              className="back-button"
              onClick={() => setPage("home")}
            >
              ← Back
            </button>

            <div className="form-header">

              <div className="form-icon">
                🎁
              </div>

              <h1>
                Claim Your Offer
              </h1>

              <p>
                You're one step away from completing
                your claim. Enter your information below
                to continue.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="input-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />

              </div>

              <div className="input-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />

              </div>

              <div className="privacy-note">
                Your information is used only for this
                demonstration and is not transmitted or stored.
              </div>

              <button
                type="submit"
                className="primary-button form-button"
              >
                CONTINUE
                <span>→</span>
              </button>

            </form>

          </div>

        </main>
      )}

      {/* =========================
          PROCESSING PAGE
      ========================== */}

      {page === "processing" && (
        <main className="status-page">

          <div className="status-container">

            <div className="loading-circle"></div>

            <h1>
              Processing Your Claim
            </h1>

            <p className="status-description">
              Please wait while we process your request.
            </p>

            <div className="status-box">

              <span>
                Claim Status
              </span>

              <strong>
                Processing
              </strong>

            </div>

            <p className="status-small">
              This may take a few moments.
              Please keep this page open.
            </p>

          </div>

        </main>
      )}

      {/* =========================
          CONFIRMATION PAGE
      ========================== */}

      {page === "confirmation" && (
        <main className="status-page">

          <div className="status-container confirmation">

            <div className="success-icon">
              ✓
            </div>

            <h1>
              Your Claim Has Been Submitted!
            </h1>

            <p className="status-description">
              Thank you for completing the claim process.
            </p>

            <div className="status-box success-box">

              <span>
                Claim Status
              </span>

              <strong>
                ✓ Submitted
              </strong>

            </div>

            <p className="notification-text">
              Please allow a few hours for processing.
              You will be notified once your offer becomes
              available to claim within today.
            </p>

            <p className="email-message">
              📩 Keep an eye on your email for updates.
            </p>

            <button
              className="primary-button"
              onClick={() => setPage("home")}
            >
              BACK TO HOME
            </button>

          </div>

        </main>
      )}

    </div>
  );
}

export default App;