import { useState } from 'react'
import './App.css'
import { supabase } from './lib/supabaseClient'

function App() {
  const [screen, setScreen] = useState('landing')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleContinue = async (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert('Please complete all fields.')
      return
    }

    // Test-only restriction:
    // use test@example.com and a phone number beginning with 000.
    const isTestEmail = email.trim().toLowerCase().endsWith('@example.com')
    const isTestPhone = /^000\d{7}$/.test(phone.trim())

    if (!isTestEmail || !isTestPhone) {
      alert(
        'Testing only: use an email ending in @example.com and a 10-digit phone number starting with 000.'
      )
      return
    }

    setSubmitting(true)

    const { error } = await supabase
      .from('test_user_profiles')
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      })

    setSubmitting(false)

    if (error) {
      console.error('Supabase insert error:', error)
      alert('Unable to submit the test entry. Please check the Supabase setup.')
      return
    }

    setScreen('processing')

    setTimeout(() => {
      setScreen('confirmation')
    }, 3000)
  }

  const goHome = () => {
    setScreen('landing')
    setName('')
    setEmail('')
    setPhone('')
    setSubmitting(false)
  }

  if (screen === 'landing') {
    return (
      <main className="page-shell">
        <section className="offer-card">
          <div className="badge">🎉 EXCLUSIVE LIMITED-TIME OFFER</div>

          <h1>Claim Your Special Deal Today</h1>

          <p className="lead">
            Get access to an exclusive offer available for a limited time.
          </p>

          <div className="price-area">
            <div className="special-price">₱0.99</div>
            <div className="regular-price">₱499.00</div>
          </div>

          <div className="limited">⏳ Limited availability</div>

          <button
            className="primary-button"
            onClick={() => setScreen('claim')}
          >
            CLAIM OFFER NOW
          </button>

          <div className="why-section">
            <h2>Why claim now?</h2>

            <div className="benefits">
              <div>✓ Exclusive promotional price</div>
              <div>✓ Limited daily availability</div>
              <div>✓ Fast claim verification</div>
              <div>✓ Available for a limited time</div>
            </div>
          </div>

          <p className="fine-print">Offer availability may vary.</p>
        </section>
      </main>
    )
  }

  if (screen === 'claim') {
    return (
      <main className="page-shell">
        <section className="form-card">
          <button
            className="back-button"
            onClick={() => setScreen('landing')}
            type="button"
          >
            ← Back
          </button>

          <div className="step-label">STEP 1 OF 2</div>

          <h1>Claim Your Offer</h1>

          <p className="lead">
            You're one step away from completing your claim.
          </p>

          <form onSubmit={handleContinue}>
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              disabled={submitting}
            />

            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              disabled={submitting}
            />

            <label htmlFor="phone">Phone Number</label>

            <input
              id="phone"
              type="tel"
              placeholder="0001234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="off"
              disabled={submitting}
            />

            <p className="accuracy-note">
              For testing, use a dummy email ending in @example.com and a
              phone number beginning with 000.
            </p>

            <button
              className="primary-button"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'SUBMITTING...' : 'CONTINUE'}
            </button>
          </form>
        </section>
      </main>
    )
  }

  if (screen === 'processing') {
    return (
      <main className="page-shell">
        <section className="status-card">
          <div className="spinner" />

          <div className="step-label">STEP 2 OF 2</div>

          <h1>Processing Your Claim</h1>

          <p className="wait-label">⏳ Please wait...</p>

          <p className="lead">
            We're currently processing your request.
          </p>

          <p className="processing-copy">
            Please wait a few minutes while we process your submission.
          </p>

          <div className="status-box">
            <div className="status-heading">Claim Status</div>
            <div className="status-value">Processing</div>
          </div>

          <p className="processing-copy">
            We'll notify you once there's an update.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="status-card confirmation">
        <div className="success-icon">✓</div>

        <h1>Your Claim Has Been Submitted! 🎉</h1>

        <p className="lead">
          Thank you for completing the claim process.
        </p>

        <p className="processing-copy">
          Your submission has been received successfully.
        </p>

        <div className="next-section">
          <h2>What happens next?</h2>

          <p className="processing-copy">
            Please wait a few minutes while we process your request. We'll
            notify you once there's an update.
          </p>
        </div>

        <div className="status-box submitted">
          <div className="status-heading">Claim Status</div>
          <div className="status-value">✓ Submitted</div>
        </div>

        <div className="estimate">
          <span>Estimated update</span>
          <strong>Within a few minutes</strong>
        </div>

        <button className="primary-button" onClick={goHome} type="button">
          BACK TO HOME
        </button>
      </section>
    </main>
  )
}

export default App