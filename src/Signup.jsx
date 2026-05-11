import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  .signup-page * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .signup-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', Arial, sans-serif;
  }

  /* ── Top navbar ── */
  .signup-navbar {
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

  .signup-navbar-logos {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .signup-swayam-logo {
    height: 52px;
    object-fit: contain;
  }

  .signup-moe-logo {
    height: 48px;
    object-fit: contain;
  }

  .signup-navbar-links {
    display: flex;
    align-items: center;
    gap: 36px;
    font-size: 14px;
    color: #333;
  }

  .signup-navbar-links span {
    cursor: pointer;
    font-weight: 500;
    white-space: nowrap;
  }

  .signup-navbar-links span:hover {
    color: #1a56c4;
  }

  /* ── Hero with background image ── */
  .signup-hero {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 40px 80px;
    min-height: 600px;
    background: #c8a882;
  }

  .signup-hero-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  /* ── Sign-up card ── */
  .signup-card {
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

  .signup-card-title {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    text-align: center;
    margin-bottom: 22px;
  }

  /* ── Inputs ── */
  .signup-field {
    position: relative;
    margin-bottom: 14px;
  }

  .signup-field-label {
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

  .signup-input {
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

  .signup-input:focus {
    border-color: #1a56c4;
    background: #f0f5ff;
  }

  /* ── Captcha verifying row ── */
  .signup-captcha-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f8f8f8;
    border: 1.5px solid #e0e0e0;
    border-radius: 6px;
    padding: 10px 14px;
    margin-bottom: 18px;
    font-size: 13.5px;
    color: #222;
    font-weight: 500;
    margin-top: 6px;
  }

  .signup-captcha-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .signup-captcha-spinner {
    width: 22px;
    height: 22px;
    border: 2.5px solid #d0d0d0;
    border-top-color: #1a56c4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .signup-cloudflare {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  .signup-cloudflare-logo {
    font-size: 11px;
    font-weight: 800;
    color: #f38020;
    letter-spacing: 0.5px;
  }

  .signup-cloudflare-sub {
    font-size: 9px;
    color: #aaa;
  }

  /* ── Action buttons ── */
  .signup-actions {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  .signup-cancel-btn {
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

  .signup-cancel-btn:hover {
    background: #f0f5ff;
  }

  .signup-submit-btn {
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
  }

  .signup-submit-btn:hover {
    background: #1446a8;
  }

  /* ── Sign in link ── */
  .signup-signin-row {
    text-align: center;
    font-size: 13px;
    color: #555;
    margin-bottom: 20px;
  }

  .signup-signin-row a {
    color: #1a56c4;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
  }

  /* ── Card footer ── */
  .signup-card-footer {
    border-top: 1px solid #eee;
    padding-top: 16px;
    display: flex;
    gap: 32px;
    justify-content: center;
    align-items: flex-start;
  }

  .signup-card-footer-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .signup-card-footer-label {
    font-size: 11px;
    font-weight: 700;
    color: #555;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .signup-gplay-btn {
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

  .signup-social-icons {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .signup-social-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  /* ── Bottom copyright bar ── */
  .signup-bottom-bar {
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

  .signup-bottom-bar a {
    color: #ccc;
    text-decoration: underline;
    cursor: pointer;
  }

  .signup-bottom-links {
    display: flex;
    gap: 4px;
  }

  .signup-bottom-links span {
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
  .signup-shake { animation: shake 0.4s ease; }
`;

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSignUp = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    navigate('/mycourses');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSignUp();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="signup-page">
        {/* Navbar */}
        <nav className="signup-navbar">
          <div className="signup-navbar-logos">
            <img
              className="signup-swayam-logo"
              src="https://storage.googleapis.com/swayam2-node/assets/img/swayam_images/swayam_logo.png"
              alt="Swayam"
            />
            <img
              className="signup-moe-logo"
              src="https://storage.googleapis.com/swayam2_central/assets/img/swayam_images/NC_logo/moe_logo.png"
              alt="Ministry of Education"
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
          <div className="signup-navbar-links">
            {['About Swayam', 'All Courses', 'Partner Institutions', 'Local Chapters', 'Swayam Plus'].map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <div className="signup-hero">
          <img
            className="signup-hero-bg"
            src="https://storage.googleapis.com/swayam-py3-central-dev-cdn/assets/fb-sso/images/background.png"
            alt="background"
          />

          {/* Sign-up card */}
          <div className={`signup-card${shake ? ' signup-shake' : ''}`}>
            <div className="signup-card-title">Sign Up with your Email</div>

            {/* Email */}
            <div className="signup-field">
              <span className="signup-field-label">Email</span>
              <input
                className="signup-input"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="signup-field">
              <span className="signup-field-label">Password</span>
              <input
                className="signup-input"
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password */}
            <div className="signup-field">
              <span className="signup-field-label">Confirm Password</span>
              <input
                className="signup-input"
                type="password"
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                placeholder="Confirm your password"
              />
            </div>

            {error && (
              <div style={{ color: '#d32f2f', fontSize: '12px', marginBottom: '8px', marginTop: '-6px' }}>
                {error}
              </div>
            )}

            {/* Captcha verifying row */}
            <div className="signup-captcha-row">
              <div className="signup-captcha-left">
                <div className="signup-captcha-spinner" />
                <span>Verifying...</span>
              </div>
              <div className="signup-cloudflare">
                <span className="signup-cloudflare-logo">CLOUDFLARE</span>
                <span className="signup-cloudflare-sub">Privacy · Help</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="signup-actions">
              <button className="signup-cancel-btn" onClick={() => navigate('/')}>
                Cancel
              </button>
              <button className="signup-submit-btn" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>

            {/* Sign in link */}
            <div className="signup-signin-row">
              Already have an account? <a onClick={() => navigate('/signin')} style={{ cursor: 'pointer' }}>Sign In</a>
            </div>

            {/* Card footer */}
            <div className="signup-card-footer">
              <div className="signup-card-footer-section">
                <div className="signup-card-footer-label">Download App</div>
                <button className="signup-gplay-btn">
                  <span style={{ fontSize: '18px' }}>▶</span>
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '8px', fontWeight: 400 }}>GET IT ON</div>
                    <div style={{ fontSize: '13px' }}>Google Play</div>
                  </div>
                </button>
              </div>
              <div className="signup-card-footer-section">
                <div className="signup-card-footer-label">Follow Us</div>
                <div className="signup-social-icons">
                  <img
                    className="signup-social-icon"
                    src="https://storage.googleapis.com/swayam2_central/assets/images/icon_social/facebook_icon.png"
                    alt="Facebook"
                  />
                  <img
                    className="signup-social-icon"
                    src="https://storage.googleapis.com/swayam2_central/assets/images/icon_social/instagram_icon.png"
                    alt="Instagram"
                  />
                  <img
                    className="signup-social-icon"
                    src="https://storage.googleapis.com/swayam2_central/assets/images/icon_social/twitter_icon.png"
                    alt="X"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="signup-bottom-bar">
          <span>Copyright © 2026 | Ministry Of Education (Government Of India)</span>
          <div className="signup-bottom-links">
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
