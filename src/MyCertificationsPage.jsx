import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  /* ── Global reset for this page ── */
  .swayam-cert-page * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .swayam-cert-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f0f2f5;
  }

  /* ── Top black bar ── */
  .swayam-topbar {
    background: #000;
    height: 28px;
    width: 100%;
    flex-shrink: 0;
  }

  /* ── Blue announcement bar ── */
  .swayam-announcement {
    background: #1a56c4;
    color: #fff;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    padding: 6px 16px;
    flex-shrink: 0;
  }

  /* ── Main navbar ── */
  .swayam-navbar {
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    height: 64px;
    flex-shrink: 0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }

  .swayam-logo-wrap {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .swayam-logo-box {
    border: 2px solid #1a56c4;
    border-radius: 4px;
    padding: 4px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.1;
    min-width: 90px;
  }

  .swayam-logo-free {
    font-size: 8px;
    color: #888;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .swayam-logo-name {
    font-size: 22px;
    font-weight: 900;
    color: #1a56c4;
    letter-spacing: -1px;
    line-height: 1;
  }

  .swayam-logo-tagline {
    font-size: 7px;
    color: #555;
    letter-spacing: 0.3px;
    margin-top: 2px;
  }

  .swayam-nav-links {
    display: flex;
    align-items: center;
    gap: 0;
    font-size: 13.5px;
    color: #333;
    flex-wrap: wrap;
  }

  .swayam-nav-links span {
    padding: 0 10px;
    cursor: pointer;
    white-space: nowrap;
  }

  .swayam-nav-links span:hover {
    color: #1a56c4;
  }

  .swayam-nav-separator {
    color: #bbb;
    font-weight: 300;
  }

  .swayam-nav-right {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .swayam-bell-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #e53935;
    font-size: 22px;
  }

  .swayam-bell-badge {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 8px;
    height: 8px;
    background: #e53935;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .swayam-globe-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #333;
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .swayam-globe-btn:hover {
    background: #f5f5f5;
  }

  .swayam-user-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #1a56c4;
    cursor: pointer;
    font-weight: 500;
    border: none;
    background: transparent;
  }

  /* ── Breadcrumb ── */
  .swayam-breadcrumb-row {
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 32px;
    font-size: 13px;
    color: #555;
    flex-shrink: 0;
  }

  .swayam-breadcrumb a {
    color: #1a56c4;
    text-decoration: none;
    cursor: pointer;
  }

  .swayam-breadcrumb a:hover {
    text-decoration: underline;
  }

  .swayam-breadcrumb-sep {
    margin: 0 6px;
    color: #aaa;
  }

  .swayam-search-wrap {
    display: flex;
    align-items: center;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    height: 34px;
  }

  .swayam-search-input {
    border: none;
    outline: none;
    padding: 0 12px;
    font-size: 13px;
    width: 200px;
    height: 100%;
    background: #fff;
    color: #333;
  }

  .swayam-search-btn {
    background: #fff;
    border: none;
    border-left: 1px solid #ccc;
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    color: #555;
    display: flex;
    align-items: center;
  }

  /* ── Main content area ── */
  .swayam-cert-main {
    flex: 1;
    background: #eef0f4;
    display: flex;
    flex-direction: column;
  }

  /* ── Certifications content card ── */
  .swayam-cert-content {
    background: #fff;
    margin: 28px 32px;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    overflow: hidden;
  }

  .swayam-cert-header-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 20px 24px 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  .swayam-cert-title {
    font-size: 22px;
    font-weight: 700;
    color: #1a56c4;
    display: inline;
  }

  .swayam-cert-subtitle {
    font-size: 13px;
    color: #555;
    font-weight: 400;
    margin-left: 8px;
    display: inline;
  }

  .swayam-cert-subtitle a {
    color: #1a56c4;
    text-decoration: none;
    font-weight: 500;
  }

  .swayam-cert-subtitle a:hover {
    text-decoration: underline;
  }

  .swayam-cert-ia-btn {
    font-size: 18px;
    font-weight: 700;
    color: #1a56c4;
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 4px;
    letter-spacing: -1px;
  }

  /* ── Empty state ── */
  .swayam-cert-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 32px;
    gap: 18px;
  }

  .swayam-cert-empty-icon {
    width: 70px;
    height: 70px;
    opacity: 0.35;
  }

  .swayam-cert-empty-text {
    font-size: 16px;
    color: #666;
    font-weight: 400;
    letter-spacing: 0.2px;
  }


`;

export default function MyCertificationsPage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>
      <div className="swayam-cert-page">
        {/* Black top bar */}
        <div className="swayam-topbar" />

        {/* Blue announcement */}
        <div className="swayam-announcement">
          An initiative by Ministry of Education (Govt. of India)
        </div>

        {/* Main navbar */}
        <nav className="swayam-navbar">
          <div className="swayam-logo-wrap">
            <div className="swayam-logo-box">
              <span className="swayam-logo-free">FREE ONLINE EDUCATION</span>
              <span className="swayam-logo-name">swayam</span>
              <span className="swayam-logo-tagline">सिखो हर दिन, जियो हर दिन</span>
            </div>
          </div>

          <div className="swayam-nav-links">
            {['About Swayam', 'All Courses', 'National Coordinator', 'Local Chapters', 'FAQ', 'Swayam Plus'].map((item, i, arr) => (
              <React.Fragment key={item}>
                <span>{item}</span>
                {i < arr.length - 1 && <span className="swayam-nav-separator">|</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="swayam-nav-right">
            {/* Bell */}
            <button className="swayam-bell-btn">
              
              <span className="swayam-bell-badge" />
            </button>

            {/* Globe */}
            <button className="swayam-globe-btn">
              🌐 ▾
            </button>

            {/* User */}
            <button className="swayam-user-btn" onClick={() => navigate('/tech-commercialization')}>
              e23cseu0649@benne... ▾
            </button>
          </div>
        </nav>

        {/* Breadcrumb row */}
        <div className="swayam-breadcrumb-row">
          <div className="swayam-breadcrumb">
            <a onClick={() => navigate('/')}>Home</a>
            <span className="swayam-breadcrumb-sep">/</span>
            <span style={{ color: '#333', fontWeight: 500 }}>My Certifications</span>
          </div>
          <div className="swayam-search-wrap">
            <input
              className="swayam-search-input"
              type="text"
              placeholder="Search"
            />
            <button className="swayam-search-btn">🔍</button>
          </div>
        </div>

        {/* Main content */}
        <div className="swayam-cert-main">
          <div className="swayam-cert-content">
            <div className="swayam-cert-header-row">
              <div>
                <span className="swayam-cert-title">My Certifications</span>
                <span className="swayam-cert-subtitle">
                  Students who have taken the in-person exam through NPTEL can download their certificate by visiting{' '}
                  <a href="https://nptel.ac.in/noc" target="_blank" rel="noreferrer">NPTEL website</a>.
                </span>
              </div>
              <button className="swayam-cert-ia-btn">IA</button>
            </div>

            {/* Empty state */}
            <div className="swayam-cert-empty">
              <svg
                className="swayam-cert-empty-icon"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Envelope / inbox icon matching screenshot */}
                <rect x="8" y="22" width="64" height="46" rx="4" stroke="#999" strokeWidth="3" fill="none" />
                <polyline points="8,22 40,50 72,22" stroke="#999" strokeWidth="3" fill="none" strokeLinejoin="round" />
                <line x1="8" y1="68" x2="72" y2="68" stroke="#999" strokeWidth="3" />
                {/* Flap open */}
                <path d="M8 22 L40 44 L72 22" stroke="#bbb" strokeWidth="2" fill="none" />
              </svg>
              <span className="swayam-cert-empty-text">No Certificates available</span>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}