import { useState } from 'react'
import './App.css'
import { supabase } from './lib/supabaseClient'

function App() {
  const [screen, setScreen] = useState('landing')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isValidPhilippinePhone = (value) => {
    const cleaned = value.replace(/\s|-/g, '')

    return (
      /^09\d{9}$/.test(cleaned) ||
      /^\+639\d{9}$/.test(cleaned)
    )
  }

  const handleContinue = async (event) => {
    event.preventDefault()
    setError('')

    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanPhone = phone.replace(/\s|-/g, '')

    if (!cleanName || !cleanEmail || !cleanPhone) {
      setError('Please complete all fields.')
      return
    }

    if (!isValidPhilippinePhone(cleanPhone)) {
      setError(
        'Please enter a valid Philippine mobile number, such as 09171234567 or +639171234567.'
      )
      return
    }

    setSubmitting(true)

    const { error: insertError } = await supabase
      .from('test_user_profiles')
      .insert({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
      })

    setSubmitting(false)

    if (insertError) {
      console.error('Supabase error:', insertError)
      setError(
        'We could not submit your information right now. Please try again.'
      )
      return
    }

    setScreen('processing')

    setTimeout(() => {
      setScreen('confirmation')
    }, 2500)
  }

  const goHome = () => {
    setScreen('landing')
    setName('')
    setEmail('')
    setPhone('')
    setSubmitting(false)
    setError('')
  }

  if (screen === 'landing') {
    return (
      <main className="page-shell">
        <section className="offer-card">
          <div className="badge">
            🎉 EXCLUSIVE LIMITED-TIME OFFER
          </div>

          <h1>Claim Your Special Deal Today</h1>

          <p className="lead">
            Get access to an exclusive offer available for a limited time.
          </p>

          <div className="price-area">
            <div className="special-price">₱0.99</div>
            <div className="regular-price">₱499.00</div>
          </div>

          <div className="limited">
            ⏳ Limited availability
          </div>

          <button
            className="primary-button"
            onClick={() => setScreen('claim')}
            type="button"
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

          <p className="fine-print">
            Offer availability may vary.
          </p>
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

          <div className="step-label">
            STEP 1 OF 2
          </div>

          <h1>Claim Your Offer</h1>

          <p className="lead">
            You're one step away from completing your claim.
          </p>

          <form onSubmit={handleContinue}>
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              disabled={submitting}
              required
            />

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              disabled={submitting}
              required
            />

            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              placeholder="09XXXXXXXXX"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              autoComplete="tel"
              inputMode="tel"
              disabled={submitting}
              required
            />

            <p className="accuracy-note">
              By continuing, you agree that the information you provide will
              be submitted to process your request.
            </p>

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

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

          <div className="step-label">
            STEP 2 OF 2
          </div>

          <h1>Processing Your Claim</h1>

          <p className="wait-label">
            ⏳ Please wait...
          </p>

          <p className="lead">
            We're currently processing your request.
          </p>

          <p className="processing-copy">
            Please wait a few minutes while we process your submission.
          </p>

          <div className="status-box">
            <div className="status-heading">
              Claim Status
            </div>

            <div className="status-value">
              Processing
            </div>
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
        <div className="success-icon">
          ✓
        </div>

        <h1>
          Thank You! 🎉
        </h1>

        <p className="lead">
          Your submission has been received successfully.
        </p>

        <p className="processing-copy">
          Please wait a few minutes while we process your request.
          We'll notify you once there's an update.
        </p>

        <div className="next-section">
          <h2>
            What happens next?
          </h2>

          <p className="processing-copy">
            Your submission is now being processed.
          </p>

          <p className="email-reminder">
            📩 Keep an eye on your email for updates.
          </p>
        </div>

        <div className="status-box submitted">
          <div className="status-heading">
            Claim Status
          </div>

          <div className="status-value">
            ✓ Submitted
          </div>
        </div>

        <div className="estimate">
          <span>
            Estimated update
          </span>

          <strong>
            Within a few minutes
          </strong>
        </div>

        <button
          className="primary-button"
          onClick={goHome}
          type="button"
        >
          BACK TO HOME
        </button>
      </section>
    </main>
  )
}

export default App