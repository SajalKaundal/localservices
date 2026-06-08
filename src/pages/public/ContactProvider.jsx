import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { fetchProvider } from '../../services/publicServices';
import './ContactProvider.css';

const SUBJECT_OPTIONS = [
  'General enquiry',
  'Request a quote',
  'Check availability',
  'Custom requirement',
  'Urgent job',
];

const AVAILABILITY_OPTIONS = ['Today', 'Tomorrow', 'This week', 'Flexible'];

const MAX_CHARS = 1000;

// SVG check icon for success state — no emoji
const CheckIcon = () => (
  <svg className="contact-success-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ContactProvider = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [subject, setSubject] = useState('General enquiry');
  const [message, setMessage] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [availability, setAvailability] = useState('Flexible');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProvider = async () => {
      try {
        const data = await fetchProvider(id);
        setProvider(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProvider();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!message.trim()) {
      setError('Please write a message before sending.');
      return;
    }

    setSubmitting(true);
    // Simulated send — replace with real API call when backend endpoint is ready
    await new Promise((res) => setTimeout(res, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="contact-provider-page">
        <div className="container">
          <p className="body-muted" style={{ paddingTop: '80px' }}>Loading…</p>
        </div>
      </div>
    );
  }

  const providerFirstName = provider?.name?.split(' ')[0] ?? 'this provider';

  return (
    <div className="contact-provider-page">
      <div className="container">

        {/* Breadcrumb */}
        <nav className="contact-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="contact-breadcrumb-sep">/</span>
          <Link to="/providers">Providers</Link>
          <span className="contact-breadcrumb-sep">/</span>
          <Link to={`/provider/${id}`}>{provider?.name ?? 'Provider'}</Link>
          <span className="contact-breadcrumb-sep">/</span>
          <span style={{ color: 'var(--color-muted-text)' }}>Contact</span>
        </nav>

        <div className="contact-grid">

          {/* ── Left: Message form ─────────────────────────────────── */}
          <div className="contact-card contact-form-card">
            {submitted ? (
              /* Success state */
              <div className="contact-success">
                <div className="contact-success-check">
                  <CheckIcon />
                </div>
                <h2>Message sent</h2>
                <p>
                  Your message has been delivered to{' '}
                  <strong style={{ color: 'var(--color-white)' }}>{provider?.name}</strong>.
                  They will get back to you shortly.
                </p>
                <div className="contact-success-actions">
                  <Button variant="primary" onClick={() => navigate(`/provider/${id}`)}>
                    Back to profile
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => { setSubmitted(false); setMessage(''); setError(''); }}
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="contact-overline">Send a message</p>
                <h1 className="contact-form-title">
                  Contact {provider?.name ?? 'provider'}
                </h1>
                <p className="contact-form-subtitle">
                  Ask a question, request a quote, or discuss your requirements directly.
                </p>

                {/* Subject */}
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <label className="contact-field-label">Subject</label>
                  <div className="contact-chips">
                    {SUBJECT_OPTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`contact-chip${subject === s ? ' active' : ''}`}
                        onClick={() => setSubject(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="contact-textarea-wrap">
                  <label className="contact-field-label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="contact-textarea"
                    placeholder={`Hi ${providerFirstName}, I'm looking for help with…`}
                    value={message}
                    maxLength={MAX_CHARS}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <p className="contact-char-count">{message.length} / {MAX_CHARS}</p>
                </div>

                {/* Budget */}
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <label className="contact-field-label">Budget range (INR) — optional</label>
                  <div className="contact-budget-row">
                    <Input
                      label="Minimum"
                      type="number"
                      placeholder="e.g. 500"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                    />
                    <Input
                      label="Maximum"
                      type="number"
                      placeholder="e.g. 2000"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                    />
                  </div>
                </div>

                {/* Availability */}
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <label className="contact-field-label">When do you need this?</label>
                  <div className="contact-chips">
                    {AVAILABILITY_OPTIONS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        className={`contact-chip${availability === a ? ' active' : ''}`}
                        onClick={() => setAvailability(a)}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auth notice for guests */}
                {!isAuthenticated && (
                  <div className="contact-auth-notice">
                    You need to{' '}
                    <Link to="/login">sign in</Link>
                    {' '}before sending a message.
                  </div>
                )}

                {/* Error */}
                {error && (
                  <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>{error}</p>
                )}

                <div className="contact-submit-row">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                    style={{ minWidth: '140px' }}
                  >
                    {submitting ? 'Sending…' : 'Send message'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* ── Right: Provider info ───────────────────────────────── */}
          <aside>
            <div className="contact-card contact-info-card">

              {/* Avatar */}
              <div className="contact-provider-avatar">
                {provider?.profileImage?.url ? (
                  <img src={provider.profileImage.url} alt={provider.name} />
                ) : (
                  provider?.name?.charAt(0)
                )}
              </div>

              <p className="contact-provider-name">{provider?.name}</p>
              <p className="contact-provider-bio">
                {provider?.bio}
                {provider?.experience && ` · ${provider.experience} yrs experience`}
              </p>

              {/* Stats */}
              <div className="contact-stat-list">
                <div className="contact-stat-row">
                  <span className="contact-stat-label">Rating</span>
                  <span className="contact-stat-value accent">
                    {provider?.rating ?? '—'}
                    <span style={{ color: 'var(--color-shade-50)', fontWeight: 400, marginLeft: '4px', fontSize: '13px' }}>
                      ({provider?.ratingCount ?? 0} reviews)
                    </span>
                  </span>
                </div>
                <div className="contact-stat-row">
                  <span className="contact-stat-label">Location</span>
                  <span className="contact-stat-value">{provider?.location ?? '—'}</span>
                </div>
                <div className="contact-stat-row">
                  <span className="contact-stat-label">Verified</span>
                  <span className="contact-stat-value">
                    {provider?.isVerified ? (
                      <Badge style={{
                        backgroundColor: 'rgba(54,244,164,0.1)',
                        color: 'var(--color-neon-green)',
                        fontSize: '12px',
                        padding: '2px 10px',
                      }}>
                        Verified
                      </Badge>
                    ) : (
                      <span style={{ color: 'var(--color-shade-50)', fontSize: '13px' }}>No</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Services */}
              {provider?.services?.length > 0 && (
                <>
                  <div className="contact-info-divider" />
                  <label className="contact-field-label" style={{ marginBottom: '10px' }}>
                    Services offered
                  </label>
                  <div className="contact-service-tags">
                    {provider.services.slice(0, 5).map((s) => (
                      <span key={s._id} className="contact-service-tag">{s.name}</span>
                    ))}
                    {provider.services.length > 5 && (
                      <span className="contact-service-tag">+{provider.services.length - 5} more</span>
                    )}
                  </div>
                </>
              )}

              <div className="contact-info-divider" />

              <Button
                variant="secondary"
                style={{ width: '100%' }}
                onClick={() => navigate(`/provider/${id}`)}
              >
                Back to profile
              </Button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ContactProvider;
