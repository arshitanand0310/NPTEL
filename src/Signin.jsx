import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  .signin-page * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .signin-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', Arial, sans-serif;
  }

  /* ── Top navbar ── */
  .signin-navbar {
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 72px;
    flex-shrink: 0;
    z-index: 10;
    position: relative;
  }

  .signin-navbar-logos {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .signin-swayam-logo {
    height: 52px;
    object-fit: contain;
  }

  .signin-moe-logo {
    height: 48px;
    object-fit: contain;
  }

  .signin-navbar-links {
    display: flex;
    align-items: center;
    gap: 36px;
    font-size: 14px;
    color: #333;
  }

  .signin-navbar-links span {
    cursor: pointer;
    font-weight: 500;
    white-space: nowrap;
  }

  .signin-navbar-links span:hover {
    color: #1a56c4;
  }

  /* ── Info bar ── */
  .signin-infobar {
    background: #f5f5f5;
    border-bottom: 1px solid #e8e8e8;
    text-align: center;
    font-size: 13px;
    color: #444;
    padding: 9px 24px;
    flex-shrink: 0;
    z-index: 10;
    position: relative;
  }

  .signin-infobar a {
    color: #1a56c4;
    text-decoration: none;
    font-weight: 600;
  }

  /* ── Hero with background image ── */
  .signin-hero {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 40px 80px;
    min-height: 600px;
    background: #c8a882;
  }

  .signin-hero-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  /* ── Sign-in card ── */
  .signin-card {
    position: relative;
    z-index: 2;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.18);
    width: 400px;
    max-width: 95vw;
    padding: 32px 32px 24px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .signin-card-title {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    text-align: center;
    margin-bottom: 22px;
  }

  /* ── SSO buttons ── */
  .signin-sso-row {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
  }

  .signin-sso-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 12px;
    border: 1.5px solid #d0d0d0;
    border-radius: 8px;
    background: #fff;
    font-size: 13.5px;
    font-weight: 600;
    color: #222;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .signin-sso-btn:hover {
    border-color: #1a56c4;
    box-shadow: 0 2px 8px rgba(26,86,196,0.1);
  }

  .signin-sso-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
  }

  /* ── Divider ── */
  .signin-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .signin-divider-line {
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }

  .signin-divider-text {
    font-size: 12px;
    color: #888;
    white-space: nowrap;
  }

  /* ── Inputs ── */
  .signin-field {
    position: relative;
    margin-bottom: 14px;
  }

  .signin-field-label {
    position: absolute;
    top: -8px;
    left: 12px;
    background: #fff;
    padding: 0 4px;
    font-size: 11px;
    color: #666;
    font-weight: 500;
    z-index: 1;
  }

  .signin-input {
    width: 100%;
    border: 1.5px solid #c8c8c8;
    border-radius: 6px;
    padding: 13px 14px 11px;
    font-size: 14px;
    color: #1a1a1a;
    outline: none;
    background: #fff;
    transition: border-color 0.15s;
  }

  .signin-input:focus {
    border-color: #1a56c4;
    background: #f0f5ff;
  }

  /* ── Forgot password ── */
  .signin-forgot {
    text-align: right;
    margin-bottom: 16px;
    margin-top: 4px;
  }

  .signin-forgot a {
    font-size: 13px;
    color: #1a56c4;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
  }

  .signin-forgot a:hover {
    text-decoration: underline;
  }

  /* ── Action buttons ── */
  .signin-actions {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  .signin-cancel-btn {
    flex: 1;
    padding: 12px;
    border: 1.5px solid #1a56c4;
    border-radius: 6px;
    background: #fff;
    color: #1a56c4;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s;
  }

  .signin-cancel-btn:hover {
    background: #f0f5ff;
  }

  .signin-submit-btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background: #1a56c4;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .signin-submit-btn:hover {
    background: #1446a8;
  }

  .signin-submit-btn:disabled {
    background: #5a8ad4;
    cursor: not-allowed;
  }

  /* ── Signup link ── */
  .signin-signup-row {
    text-align: center;
    font-size: 13px;
    color: #555;
    margin-bottom: 20px;
  }

  .signin-signup-row a {
    color: #1a56c4;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
  }

  /* ── Card footer (download + social) ── */
  .signin-card-footer {
    border-top: 1px solid #eee;
    padding-top: 16px;
    display: flex;
    gap: 32px;
    justify-content: center;
    align-items: flex-start;
  }

  .signin-card-footer-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .signin-card-footer-label {
    font-size: 11px;
    font-weight: 700;
    color: #555;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .signin-gplay-btn {
    background: #000;
    color: #fff;
    border-radius: 6px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    border: none;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
  }

  .signin-social-icons {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .signin-social-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  /* ── Bottom copyright bar ── */
  .signin-bottom-bar {
    background: #1a1a1a;
    color: #ccc;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 40px;
    flex-shrink: 0;
    flex-wrap: wrap;
    gap: 8px;
  }

  .signin-bottom-bar a {
    color: #ccc;
    text-decoration: underline;
    cursor: pointer;
  }

  .signin-bottom-links {
    display: flex;
    gap: 4px;
  }

  .signin-bottom-links span {
    color: #888;
    margin: 0 4px;
  }

  /* ── Error shake ── */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  .signin-shake { animation: shake 0.4s ease; }

  /* ── Loading overlay ── */
  .signin-loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.92);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .signin-loading-logo {
    height: 60px;
    object-fit: contain;
  }

  .signin-loading-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e0e8f8;
    border-top-color: #1a56c4;
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .signin-loading-text {
    font-size: 15px;
    font-weight: 600;
    color: #1a56c4;
    letter-spacing: 0.3px;
  }

  .signin-loading-sub {
    font-size: 12px;
    color: #888;
    margin-top: -16px;
  }

  /* ── Spinner inside button ── */
  .signin-btn-spinner {
    width: 16px;
    height: 16px;
    border: 2.5px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
  }
`;

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/mycourses');
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') triggerLogin();
  };

  return (
    <>
      <style>{styles}</style>

      {/* ── Loading overlay ── */}
      {loading && (
        <div className="signin-loading-overlay">
          <img
            className="signin-loading-logo"
            src="https://storage.googleapis.com/swayam2-node/assets/img/swayam_images/swayam_logo.png"
            alt="Swayam"
          />
          <div className="signin-loading-spinner" />
          <div className="signin-loading-text">Signing you in…</div>
          <div className="signin-loading-sub">Please wait a moment</div>
        </div>
      )}

      <div className="signin-page">
        {/* Navbar */}
        <nav className="signin-navbar">
          <div className="signin-navbar-logos">
            <img
              className="signin-swayam-logo"
              src="https://storage.googleapis.com/swayam2-node/assets/img/swayam_images/swayam_logo.png"
              alt="Swayam"
            />
            <img
              className="signin-moe-logo"
              src="https://storage.googleapis.com/swayam2_central/assets/img/swayam_images/NC_logo/moe_logo.png"
              alt="Ministry of Education"
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
          <div className="signin-navbar-links">
            {['About Swayam', 'All Courses', 'Partner Institutions', 'Local Chapters', 'Swayam Plus'].map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </nav>

        {/* Info bar */}
        <div className="signin-infobar">
          Sign in to SWAYAM using your Google (Gmail), Microsoft accounts (MSN, Hotmail etc.), or SWAYAM account. If you don't have one, select{' '}
          <a onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>Sign Up</a> now to create a new account.
        </div>

        {/* Hero */}
        <div className="signin-hero">
          <img
            className="signin-hero-bg"
            src="https://storage.googleapis.com/swayam-py3-central-dev-cdn/assets/fb-sso/images/background.png"
            alt="background"
          />

          {/* Sign-in card */}
          <div className={`signin-card${shake ? ' signin-shake' : ''}`}>
            <div className="signin-card-title">Sign in to SWAYAM</div>

            {/* SSO buttons */}
            <div className="signin-sso-row">
              <button className="signin-sso-btn" onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); navigate('/mycourses'); }, 2000); }}>
                <img
                  className="signin-sso-icon"
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                />
                Sign in with<br />Google
              </button>
              <button className="signin-sso-btn" onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); navigate('/mycourses'); }, 2000); }}>
                <img
                  className="signin-sso-icon"
                  src="https://learn.microsoft.com/en-us/entra/identity-platform/media/howto-add-branding-in-apps/ms-symbollockup_mssymbol_19.png"
                  alt="Microsoft"
                  onError={e => { e.target.replaceWith(Object.assign(document.createTextNode('⊞'), {})); }}
                />
                Sign in with<br />Microsoft
              </button>
            </div>

            {/* Divider */}
            <div className="signin-divider">
              <div className="signin-divider-line" />
              <span className="signin-divider-text">Or continue with SWAYAM Account</span>
              <div className="signin-divider-line" />
            </div>

            {/* Email */}
            <div className="signin-field">
              <span className="signin-field-label">Email</span>
              <input
                className="signin-input"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                placeholder="enter your mail"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="signin-field">
              <span className="signin-field-label">Password</span>
              <input
                className="signin-input"
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                placeholder="Enter Your Password"
                disabled={loading}
              />
            </div>

            {error && (
              <div style={{ color: '#d32f2f', fontSize: '12px', marginBottom: '8px', marginTop: '-6px' }}>
                {error}
              </div>
            )}

            {/* Forgot */}
            <div className="signin-forgot">
              <a href="#">Forgot your password?</a>
            </div>

            {/* Buttons */}
            <div className="signin-actions">
              <button
                className="signin-cancel-btn"
                onClick={() => { setEmail(''); setPassword(''); }}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="signin-submit-btn"
                onClick={triggerLogin}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="signin-btn-spinner" />
                    Signing In…
                  </>
                ) : 'Sign In'}
              </button>
            </div>

            {/* Signup */}
            <div className="signin-signup-row">
              Need a SWAYAM account? <a onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>Sign Up</a>
            </div>

            {/* Card footer */}
            <div className="signin-card-footer">
              <div className="signin-card-footer-section">
                <div className="signin-card-footer-label">Download App</div>
                <button className="signin-gplay-btn">
                  <span style={{ fontSize: '18px' }}>▶</span>
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '8px', fontWeight: 400 }}>GET IT ON</div>
                    <div style={{ fontSize: '13px' }}>Google Play</div>
                  </div>
                </button>
              </div>
              <div className="signin-card-footer-section">
                <div className="signin-card-footer-label">Follow Us</div>
                <div className="signin-social-icons">
                  <img
                    className="signin-social-icon"
                    src="https://storage.googleapis.com/swayam2_central/assets/images/icon_social/facebook_icon.png"
                    alt="Facebook"
                  />
                  <img
                    className="signin-social-icon"
                    src="https://storage.googleapis.com/swayam2_central/assets/images/icon_social/instagram_icon.png"
                    alt="Instagram"
                  />
                  <img
                    className="signin-social-icon"
                    src="https://storage.googleapis.com/swayam2_central/assets/images/icon_social/twitter_icon.png"
                    alt="X"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="signin-bottom-bar">
          <span>Copyright © 2026 | Ministry Of Education (Government Of India)</span>
          <div className="signin-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Use</a>
            <span>|</span>
            <a href="#">Honor Code</a>
          </div>
          <span>Initiative By : Ministry of Education (Government Of India)</span>
        </div>
      </div>
    </>
  );
}
