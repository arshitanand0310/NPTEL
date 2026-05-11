import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './styles.css';

import TechnologyCommercialization from './Technologycommercialization';
import AboutCourse40Page from './AboutCourse40page';
import Industry40Page from './Industry40page';
import MyCertificationsPage from './MyCertificationsPage';
import SignIn from './Signin';
import SignUp from './Signup'; 

// ── Header Component ──
function Header({ onNavigate }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownItem = (item) => {
    setDropdownOpen(false);
    if (item === 'MY PROFILE') {
      navigate('/profile');
      if (onNavigate) onNavigate();
    } else if (item === 'MY COURSES') {
      navigate('/mycourses');
      if (onNavigate) onNavigate();
    } else if (item === 'MY CERTIFICATIONS') {
      navigate('/certifications');
      if (onNavigate) onNavigate();
    } else if (item === 'SIGN-OUT') {
      navigate('/signin');
      if (onNavigate) onNavigate();
    }
  };

  return (
    <>
      <div className="top-black-bar" />
      <div className="logo-header-wrap">
        <div className="container logo-header">
          <div className="logos">
            <img className="swayam-logo" src="https://storage.googleapis.com/swayam2-node/assets/img/swayam_images/swayam_logo.png" alt="Swayam" />
            <img className="nptel-seal" src="https://storage.googleapis.com/swayam2_central/assets/img/swayam_images/NC_logo/NPTEL_logo_128.png" alt="NPTEL" />
          </div>
          <div className="user-dropdown-wrap">
            <div className="user-email" onClick={() => setDropdownOpen(!dropdownOpen)}>
              e23cseu0649@bennett.edu.in
              <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle', marginLeft: '4px' }}>expand_more</span>
            </div>
            {dropdownOpen && (
              <div className="user-dropdown-menu">
                <div className="user-dropdown-item" onClick={() => handleDropdownItem('MY PROFILE')}>
                  <span className="material-symbols-outlined user-dropdown-icon">account_circle</span>
                  MY PROFILE
                </div>
                <div className="user-dropdown-item" onClick={() => handleDropdownItem('MY COURSES')}>
                  <span className="material-symbols-outlined user-dropdown-icon">folder</span>
                  MY COURSES
                </div>
                <div className="user-dropdown-item" onClick={() => handleDropdownItem('MY CERTIFICATIONS')}>
                  <span className="material-symbols-outlined user-dropdown-icon">description</span>
                  MY CERTIFICATIONS
                </div>
                <div className="user-dropdown-divider" />
                <div className="user-dropdown-item" onClick={() => handleDropdownItem('SIGN-OUT')}>
                  <span className="material-symbols-outlined user-dropdown-icon">logout</span>
                  SIGN-OUT
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── My Profile Page ──
function MyProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Arshit',
    mobile: '+91 98355 64442',
    dob: '03/10/2004',
    gender: 'Male',
    country: 'India',
    pincode: '201012',
    state: 'Uttar_Pradesh',
    city: 'Ghaziabad',
    profession: 'Student',
    qualification: "3 Year - Bachelor's degree",
    graduationYear: '2027',
    abcId: "I don't have APAAR/ABC ID",
    localChapter: 'Yes',
    localChapterState: 'Uttar Pradesh',
    collegeName: 'Bennett University, Greater Noida, UTTAR PRADESH (6361)',
    universityName: 'Bennett University, Greater Noida, Gautam Buddha Nagar, UTTAR P...',
    rollNo: 'E23CSEU0649',
    degree: 'BTech',
    department: 'Computer Science and Engineering',
    studyYear: '3rd Year',
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...profile });

  const handleEdit = () => { setDraft({ ...profile }); setEditing(true); };
  const handleSave = () => { setProfile({ ...draft }); setEditing(false); };
  const handleCancel = () => setEditing(false);
  const handleChange = (field, value) => setDraft(prev => ({ ...prev, [field]: value }));

  const renderField = (label, field, isReadOnly = false) => {
    const value = editing ? draft[field] : profile[field];
    return (
      <div className="mp-field-row" key={field}>
        <div className="mp-field-label">{label} <span className="mp-required">*</span></div>
        <div className="mp-field-value">
          {isReadOnly ? (
            <div className="mp-input mp-readonly">{value}</div>
          ) : editing ? (
            <input className="mp-input mp-editable" value={value} onChange={e => handleChange(field, e.target.value)} />
          ) : (
            <div className="mp-input">{value}</div>
          )}
        </div>
      </div>
    );
  };

  const renderSelect = (label, field, options) => {
    const value = editing ? draft[field] : profile[field];
    return (
      <div className="mp-field-row" key={field}>
        <div className="mp-field-label">{label} <span className="mp-required">*</span></div>
        <div className="mp-field-value">
          {editing ? (
            <select className="mp-input mp-select mp-editable" value={value} onChange={e => handleChange(field, e.target.value)}>
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : (
            <div className="mp-input mp-select-display">
              <span>{value}</span>
              <span className="material-symbols-outlined mp-select-arrow" style={{ fontSize: '16px' }}>expand_more</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mp-page">
      <div className="mc-top-blue-bar"><span>An initiative by Ministry of Education (Govt. of India)</span></div>
      <div className="mp-blue-bar">
        <div className="mp-blue-bar-inner">
          <span className="mp-breadcrumb">
            <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle' }}>home</span> Home &gt; Profile
          </span>
        </div>
      </div>
      <div className="mp-body">
        <div className="mp-body-inner">
          <div className="mp-sidebar">
            <div className="mp-sidebar-title">MY PROFILE</div>
            <div className="mp-sidebar-item mp-sidebar-item-active">Account Info</div>
          </div>
          <div className="mp-form-area">
            <div className="mp-form-header">
              <h2 className="mp-form-title">Account Info</h2>
              {!editing ? (
                <button className="mp-edit-btn" onClick={handleEdit}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>edit</span>
                  EDIT PROFILE
                </button>
              ) : (
                <div className="mp-edit-actions">
                  <button className="mp-save-btn" onClick={handleSave}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>save</span>
                    SAVE
                  </button>
                  <button className="mp-cancel-btn" onClick={handleCancel}>CANCEL</button>
                </div>
              )}
            </div>
            {renderField('Name', 'name')}
            {renderField('Mobile Number', 'mobile')}
            <div className="mp-field-row">
              <div className="mp-field-label">Email <span className="mp-required">*</span></div>
              <div className="mp-field-value"><div className="mp-input mp-readonly">e23cseu0649@bennett.edu.in</div></div>
            </div>
            {renderField('Date of Birth', 'dob')}
            {renderSelect('Gender', 'gender', ['Male', 'Female', 'Other'])}
            {renderSelect('Country residing in currently', 'country', ['India', 'USA', 'UK', 'Other'])}
            {renderField('Pincode', 'pincode')}
            {renderSelect('State', 'state', ['Uttar_Pradesh', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Other'])}
            {renderSelect('City/District', 'city', ['Ghaziabad', 'Noida', 'Lucknow', 'Agra', 'Other'])}
            {renderSelect('Profession', 'profession', ['Student', 'Faculty', 'Working Professional', 'Entrepreneur', 'Other'])}
            {renderSelect('Highest Qualification Pursuing/Pursued', 'qualification', ["3 Year - Bachelor's degree", "4 Year - Bachelor's degree", "Master's degree", 'PhD', 'Diploma', 'Other'])}
            {renderSelect('Year of Graduation', 'graduationYear', ['2024', '2025', '2026', '2027', '2028', '2029', '2030'])}
            <div className="mp-field-row">
              <div className="mp-field-label">Academic Bank of Credits (APAAR/ABC ID) <span className="mp-required">*</span>
                <div className="mp-field-sublabel">For more details <a href="https://www.abc.gov.in/" target="_blank" rel="noreferrer" className="mp-link">Click here</a></div>
              </div>
              <div className="mp-field-value">
                {editing ? (
                  <select className="mp-input mp-select mp-editable" value={draft.abcId} onChange={e => handleChange('abcId', e.target.value)}>
                    <option>I don't have APAAR/ABC ID</option>
                    <option>I have APAAR/ABC ID</option>
                  </select>
                ) : (
                  <div className="mp-input mp-select-display">
                    <span>{profile.abcId}</span>
                    <span className="material-symbols-outlined mp-select-arrow" style={{ fontSize: '16px' }}>expand_more</span>
                  </div>
                )}
                <div className="mp-abc-note">
                  Kindly visit <a href="https://www.abc.gov.in/" target="_blank" rel="noreferrer" className="mp-link">https://www.abc.gov.in/</a> to create an APAAR/ABC ID for yourself.
                </div>
              </div>
            </div>
            <div className="mp-field-row">
              <div className="mp-field-label">Part of a SWAYAM local chapter? <span className="mp-required">*</span></div>
              <div className="mp-field-value">
                {editing ? (
                  <select className="mp-input mp-select mp-editable" value={draft.localChapter} onChange={e => handleChange('localChapter', e.target.value)}>
                    <option>Yes</option><option>No</option>
                  </select>
                ) : (
                  <div className="mp-input mp-select-display">
                    <span>{profile.localChapter}</span>
                    <span className="material-symbols-outlined mp-select-arrow" style={{ fontSize: '16px' }}>expand_more</span>
                  </div>
                )}
              </div>
            </div>
            {renderSelect('Local Chapter State', 'localChapterState', ['Uttar Pradesh', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Other'])}
            <div className="mp-field-row">
              <div className="mp-field-label">College Name <span className="mp-required">*</span></div>
              <div className="mp-field-value">
                {editing ? (
                  <select className="mp-input mp-select mp-editable" value={draft.collegeName} onChange={e => handleChange('collegeName', e.target.value)}>
                    <option>Bennett University, Greater Noida, UTTAR PRADESH (6361)</option>
                    <option>IIT Bombay, Mumbai, MAHARASHTRA</option>
                    <option>IIT Delhi, New Delhi, DELHI</option>
                  </select>
                ) : (
                  <div className="mp-input mp-select-display">
                    <span>{profile.collegeName}</span>
                    <span className="material-symbols-outlined mp-select-arrow" style={{ fontSize: '16px' }}>expand_more</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mp-field-row">
              <div className="mp-field-label">University Name <span className="mp-required">*</span></div>
              <div className="mp-field-value">
                {editing ? (
                  <input className="mp-input mp-editable" value={draft.universityName} onChange={e => handleChange('universityName', e.target.value)} />
                ) : (
                  <div className="mp-input">{profile.universityName}</div>
                )}
              </div>
            </div>
            {renderField('College/School Roll No.', 'rollNo')}
            {renderSelect('Degree', 'degree', ['BTech', 'MTech', 'BCA', 'MCA', 'MBA', 'MSc', 'BSc', 'PhD', 'Other'])}
            {renderSelect('Department', 'department', ['Computer Science and Engineering', 'Electronics and Communication Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Information Technology', 'Other'])}
            {renderSelect('Study Year', 'studyYear', ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'])}
            {editing && (
              <div className="mp-save-row">
                <button className="mp-save-btn-bottom" onClick={handleSave}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>save</span>
                  SAVE CHANGES
                </button>
                <button className="mp-cancel-btn-bottom" onClick={handleCancel}>CANCEL</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── My Courses Page ──
function MyCoursesPage({ onGoToCourse }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  const courses = [
    {
      id: 'tc',
      title: 'Technology Commercialization & New Produ...',
      provider: 'NPTEL',
      image: 'https://storage.googleapis.com/swayam2-node/Jan2026_coursecard_images/noc26-mg79.jpg',
      examDate: '27 Feb 2026',
    },
    {
      id: 'ind40',
      title: 'Industry 4.0: Managing The Digital Transfor...',
      provider: 'NPTEL',
      image: 'https://storage.googleapis.com/swayam2-node/Jan2026_coursecard_images/noc26-ge04.jpg',
      examDate: '27 Feb 2026',
    },
  ];

  const handleGoToCourse = (id) => {
    if (id === 'ind40') navigate('/ind40');
    else navigate('/tech-commercialization');
    if (onGoToCourse) onGoToCourse(id);
  };

  return (
    <div className="mc-page">
      <div className="mc-top-blue-bar"><span>An initiative by Ministry of Education (Govt. of India)</span></div>
      <div className="mc-breadcrumb-row">
        <div className="mc-breadcrumb-inner">
          <span className="mc-breadcrumb-text">
            <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle' }}>home</span> Home / <strong>My Courses</strong>
          </span>
          <div className="mc-search-sync">
            <div className="mc-search-box">
              <input type="text" placeholder="Search" className="mc-search-input" />
              <span className="material-symbols-outlined mc-search-icon" style={{ fontSize: '18px' }}>search</span>
            </div>
            <button className="mc-sync-btn">
              <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle' }}>sync</span>
              Sync Courses
            </button>
          </div>
        </div>
      </div>
      <div className="mc-tabs-row">
        <div className="mc-tabs-inner">
          <span className={`mc-tab${activeTab === 'upcoming' ? ' mc-tab-active' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming/Ongoing</span>
          <span className={`mc-tab${activeTab === 'completed' ? ' mc-tab-active' : ''}`} onClick={() => setActiveTab('completed')}>Completed/Closed</span>
        </div>
      </div>
      <div className="mc-cards-area">
        <div className="mc-cards-inner">
          {courses.map(course => (
            <div className="mc-card" key={course.id}>
              <img src={course.image} alt={course.title} className="mc-card-img" />
              <div className="mc-card-body">
                <div className="mc-card-title">{course.title}</div>
                <div className="mc-card-provider">{course.provider}</div>
                <div className="mc-card-btns">
                  <button className="mc-btn-register">Register For Certificate Exam</button>
                  <button className="mc-btn-goto" onClick={() => handleGoToCourse(course.id)}>Go To Course</button>
                </div>
                <button className="mc-btn-payment">If Already Registered, Click To Check Your Payment Status</button>
                <div className="mc-exam-date">Exam registration end on {course.examDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Footer ──
function Footer() {
  return (
    <div className="mc-footer">
      <div className="mc-footer-inner">
        <div className="mc-footer-logos">
          <img src="https://storage.googleapis.com/swayam2_central/assets/img/swayam_images/mhrd_logo.png" alt="Ministry of Education" className="mc-footer-mhrd" />
          <img src="https://storage.googleapis.com/swayam2_central/assets/img/swayam_logo.png" alt="Swayam" className="mc-footer-swayam" />
        </div>
        <div className="mc-footer-download">
          <div className="mc-footer-section-title">DOWNLOAD APP</div>
          <img src="https://storage.googleapis.com/swayam2_central/assets/img/swayam_images/download_google_play_logo.png" alt="Google Play" className="mc-footer-gplay" />
        </div>
        <div className="mc-footer-social">
          <div className="mc-footer-section-title">FOLLOW US</div>
          <div className="mc-footer-icons">
            <img src="https://storage.googleapis.com/swayam2_central/assets/images/icon_social/facebook_icon.png" alt="Facebook" className="mc-social-icon" />
            <img src="https://storage.googleapis.com/swayam2_central/assets/images/icon_social/instagram_icon.png" alt="Instagram" className="mc-social-icon" />
            <img src="https://storage.googleapis.com/swayam2_central/assets/images/icon_social/twitter_icon.png" alt="X" className="mc-social-icon" />
          </div>
        </div>
      </div>
      <div className="mc-footer-bottom">
        <div className="mc-footer-bottom-inner">
          <div className="mc-footer-links"><span>Privacy Policy</span> | <span>Terms of Use</span> | <span>Honor Code</span></div>
          <div className="mc-footer-helpline">SWAYAM Helpline / Support</div>
        </div>
      </div>
      <div className="mc-footer-copyright">
        <div className="mc-footer-copyright-inner">
          <span>© 2026 SWAYAM . All rights reserved.</span>
          <span>Initiative by : Ministry of Education (Govt. of India)</span>
        </div>
      </div>
    </div>
  );
}

// ── Layout wrapper (Header + Footer) for authenticated pages ──
function AppLayout({ children }) {
  return (
    <div className="app-container">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

// ── Main App ──
function App() {
  return (
    <Router>
      <Routes>
        {/* Sign-in page: no Header/Footer */}
        <Route path="/signin" element={<SignIn />} />

        {/* All other pages: with Header + Footer */}
        <Route path="/" element={<AppLayout><TechnologyCommercialization /></AppLayout>} />
        <Route path="/tech-commercialization" element={<AppLayout><TechnologyCommercialization /></AppLayout>} />
        <Route path="/profile" element={<AppLayout><MyProfilePage /></AppLayout>} />
        <Route path="/mycourses" element={<AppLayout><MyCoursesPage /></AppLayout>} />
        <Route path="/ind40" element={<AppLayout><Industry40Page /></AppLayout>} />
        <Route path="/ind40/about" element={<AppLayout><AboutCourse40Page /></AppLayout>} />
        <Route path="/certifications" element={<AppLayout><MyCertificationsPage /></AppLayout>} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
