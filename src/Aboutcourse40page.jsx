import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    bg: '#0077b5',
  },
  {
    name: 'Twitter',
    url: 'https://www.twitter.com',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg',
    bg: '#1da1f2',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    bg: '#1877f2',
  },
  {
    name: 'WhatsApp',
    url: 'https://www.whatsapp.com',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
    bg: '#25d366',
  },
];

const sidebarItems = [
  'Course Information',
  'Summary',
  'Course outline',
  'Books and References',
  'Instructor Bio',
  'Course Certificate',
];

function AboutCourse40Page() {
  const [activeItem, setActiveItem] = useState('Course Information');
  const navigate = useNavigate();

  const handleGoToCourse = () => {
    navigate('/ind40');
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)', background: '#eef0f5', fontFamily: 'Arial, Helvetica, sans-serif' }}>

      {/* LEFT SIDEBAR */}
      <aside style={{
        width: '260px',
        flexShrink: 0,
        background: '#f5f7fa',
        borderRight: '1px solid #dde2ea',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
      }}>
        {/* Welcome block */}
        <div style={{
          background: '#f0f3f8',
          padding: '20px 20px 18px',
          borderBottom: '1px solid #dde2ea',
        }}>
          <div style={{ fontSize: '12px', color: '#777', marginBottom: '6px' }}>Welcome to the course</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a73c8', lineHeight: '1.4', marginBottom: '10px' }}>
            Industry 4.0: Managing The Digita...
          </div>
          <div style={{ fontSize: '12.5px', color: '#444', marginBottom: '4px' }}>
            By Prof. Murli Dhar Agrawal &nbsp;|&nbsp; SJMSOM, IIT Bombay
          </div>
          <div style={{ fontSize: '12.5px', color: '#555' }}>
            <span style={{ color: '#1a73c8', fontWeight: 'bold' }}>Learners enrolled:</span> 2693
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1 }}>
          {sidebarItems.map(item => (
            <div
              key={item}
              onClick={() => setActiveItem(item)}
              style={{
                padding: '13px 20px',
                fontSize: '13.5px',
                fontWeight: item === activeItem ? '600' : '400',
                color: item === activeItem ? '#1a73c8' : '#333',
                background: item === activeItem ? '#fff' : 'transparent',
                borderLeft: item === activeItem ? '3px solid #1a73c8' : '3px solid transparent',
                cursor: 'pointer',
                borderBottom: '1px solid #eaecf0',
                transition: 'all 0.15s',
              }}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* RIGHT CONTENT */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top bar */}
        <div style={{
          background: '#fff',
          borderBottom: '1px solid #e0e4ea',
          padding: '0 28px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#222' }}>Course Information</span>
          <button
            onClick={handleGoToCourse}
            style={{
              background: '#e8f0fe',
              border: '1px solid #c5d8fa',
              color: '#1a73c8',
              fontWeight: 'bold',
              fontSize: '13px',
              padding: '8px 22px',
              borderRadius: '4px',
              cursor: 'pointer',
              letterSpacing: '0.2px',
            }}
          >
            Go to the Course
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px 32px 48px',
          background: '#fff',
          margin: '16px',
          borderRadius: '6px',
          border: '1px solid #e0e4ea',
        }}>

          {/* YouTube embed */}
          <div style={{ marginBottom: '28px' }}>
            <iframe
              width="100%"
              height="480"
              src="https://www.youtube.com/embed/sqGM2XA8G94"
              title="Course Introduction - Industry 4.0: Managing The Digital Transformation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: 'block', borderRadius: '4px', background: '#000' }}
            />
          </div>

          {/* About the Course */}
          <div style={{ borderTop: '1px solid #e8eaed', paddingTop: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13.5px', fontWeight: 'bold', color: '#333', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.4px' }}>
              ABOUT THE COURSE:
            </h3>
            <p style={{ fontSize: '13.5px', lineHeight: '1.75', color: '#444', marginBottom: '14px' }}>
              This course explores the disruptive forces of Industry 4.0 and its transformative impact on manufacturing and adjacent sectors. It equips MBA and engineering students—as well as faculty—with strategic and practical knowledge to upgrade their knowledge and skill and as well navigate and lead Industry 4.0 initiatives. Participants will gain a deep understanding of foundational technologies and their applications with list of use cases in domain industry 4.0 technologies such as IoT, AI, digital twins, and additive manufacturing, along with frameworks for digital transformation, governance, and workforce adaptation.
            </p>
            <p style={{ fontSize: '13.5px', lineHeight: '1.75', color: '#444', marginBottom: '14px' }}>
              A key highlight of the course is the study of global best practices from 169 nos. World Economic Forum–recognized Lighthouse companies—pioneers in leveraging AI and Industry 4.0 technologies for operational excellence and business augmentation. Drawing from these real-world case studies, as well as insights from leading consulting firms and OEMs, the course blends theory with applied learning. It also integrates frontier topics such as generative AI, intelligent automation, and digital business models to build industry-ready capabilities and enable value chain transformation. Course will discuss latest trends like Industry 5.0, its key concepts (humancentric, sustainability, resilience) and how global and Indian companies are leveraging.
            </p>

            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '13.5px', lineHeight: '1.7', color: '#444', marginBottom: '8px' }}>
                <strong>INTENDED AUDIENCE:</strong> Both Faculty and Students of Management and Engg discipline, Interested industry professionals.
              </p>
              <p style={{ fontSize: '13.5px', lineHeight: '1.7', color: '#444', marginBottom: '8px' }}>
                <strong>PREREQUISITES:</strong> Science Background is preferred
              </p>
              <p style={{ fontSize: '13.5px', lineHeight: '1.7', color: '#444' }}>
                <strong>INDUSTRY SUPPORT:</strong> All manufacturing companies will recognize learning of this course
              </p>
            </div>
          </div>

          {/* Social Share */}
          <div style={{
            borderTop: '1px solid #e8eaed',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ fontSize: '13px', color: '#555', fontWeight: '600', marginRight: '4px' }}>Share:</span>
            {socialLinks.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                title={s.name}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: s.bg,
                  padding: '8px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                  transition: 'opacity 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <img src={s.img} alt={s.name} style={{ width: '18px', height: '18px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </a>
            ))}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#e0e0e0',
              fontSize: '18px',
              color: '#555',
              cursor: 'pointer',
              fontWeight: 'bold',
              flexShrink: 0,
            }}>+</span>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AboutCourse40Page;