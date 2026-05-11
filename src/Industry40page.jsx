import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QuizPage from './QuizPage';

// ── Course Outline ──
const ind40OutlineItems = [
  { label: 'About NPTEL', children: [] },
  { label: 'How does an NPTEL online course work?', children: [] },
  { label: 'Week 0', children: [] },
  {
    label: 'Week 1',
    children: [
      { label: 'Lecture 1: Evolution of the Fourth Industrial Revolution (4IR) and Industry 4.0', done: true },
      { label: 'Lecture 2: Digital Transformation and Industry 4.0 Principles', done: true },
      { label: 'Lecture 3: Foundation technologies of Industry 4.0: Connectivity, IoT, Big Data, Cloud', done: true },
      { label: 'Lecture 4: Foundation Technology: IoT platform, Edge Computing, Connected Products', done: true },
      { label: 'Lecture 5: Data, cloud and advance Analytics', done: true },
      { label: 'Study material', done: true },
      { label: 'Quiz: Week 1: Assignment 1', done: true },
      { label: 'Assignment 1 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  {
    label: 'Week 2',
    children: [
      { label: 'Lecture 6: Playbook of Industry 4.0 Technologies, Convergence, Integration, Digitalization & Framework', done: true },
      { label: 'Lecture 7: Automation of Enterprise using RPA and Intelligent RPA', done: true },
      { label: 'lecture 8: Additive Manufacturing and 3D based revolution in manufacturing', done: true },
      { label: 'Lecture 9: Augmented Reality, Virtual Reality, Mixed Reality and Computer Vision', done: true },
      { label: 'lecture 10: Advance concepts of Augmented Technologies, Computer Vision, Virtual AI', done: true },
      { label: 'Study material', done: true },
      { label: 'Quiz: Week 2: Assignment 2', done: true },
      { label: 'Assignment 2 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  {
    label: 'Week 3',
    children: [
      { label: 'Lecture 11: Business Value Vale Chain and Processes for Industry 4.0', done: true },
      { label: 'Lecture 12: Frameworks: Industry 4.0 Value, RAMI 4.0 engineering core McKinsey Industry 4.0', done: true },
      { label: 'Lecture 13: Digitalization and digital transformation & Roadmap for implementation', done: true },
      { label: 'Lecture 14: Six models of Digitalization, Cert & Cyber Security standards Global Lighthouses', done: true },
      { label: "Lecture 15: What are learnings from World Economic Forum's Global Lighthouse Companies Use Cases", done: true },
      { label: 'Lecture 16: Tata Steel Case Study One of Global Light House Company by WEF', done: true },
      { label: 'Aadditional reference material', done: true },
      { label: 'Study material', done: true },
      { label: 'Quiz: Week 3: Assignment 3', done: true },
      { label: 'Assignment 3 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  {
    label: 'Week 4',
    children: [
      { label: 'Lecture 17: Innovation Playbook for Industry 4.0 and Overview of Industry 5.0 & Advance Technologies', done: true },
      { label: 'Lecture 18: Emergence of industry 5.0 standards: Transcending I4.0 to I5.0', done: true },
      { label: 'Lecture 19: Role of AI in Building Industry 5.0 Solutions', done: true },
      { label: 'Lecture 20: Introduction of Digital Twin (Concept)', done: true },
      { label: 'Aadditional reference material', done: true },
      { label: 'Study material', done: true },
      { label: 'Quiz: Week 4: Assignment 4', done: true },
      { label: 'Assignment 4 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  {
    label: 'Week 5',
    children: [
      { label: 'Lecture 21: Introduction of reference architecture for setting up Digital Infrastructure', done: true },
      { label: 'Lecture 22: Application Layer API Platform as a service for application integration', done: true },
      { label: 'Lecture 23: An overview of Data Management Reference data architecture', done: true },
      { label: 'Lecture 24: Digital data product, Cyber security management, Data Privacy Law', done: true },
      { label: 'Lecture 25: Case Studies of Cyber & Information security, AI security failure, governance framework, Data Protection and Privacy Law', done: true },
      { label: 'Study material', done: true },
      { label: 'Quiz: Week 5: Assignment 5', done: true },
      { label: 'Assignment 5 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  {
    label: 'Week 6',
    children: [
      { label: 'Lecture 26: Introduction of Smart Manufacturing and Intelligent Manufacturing', done: true },
      { label: 'Lecture 27: Framework of Smart Manufacturing, connected workers, assets, plants', done: true },
      { label: 'Lecture 28: Automation Vs Autonomous & Role of Robotics, Humanoid, GenAI', done: true },
      { label: 'Lecture 29: Revolution in Humanoid Use and AI playbook for smart manufacturing', done: true },
      { label: 'Lecture 30: Strategy for preparing workers for Smart Manufacturing and Smart Supply Chain and Logistics', done: true },
      { label: 'Study material', done: true },
      { label: 'Quiz: Week 6: Assignment 6', done: true },
      { label: 'Assignment 6 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  {
    label: 'Week 7',
    children: [
      { label: 'Lecture 31: Re-envisioning Manufacturing Business Model', done: true },
      { label: 'Lecture 32: Maturity Assessment elements and a brief overview of the global SIRI Framework & KPI', done: true },
      { label: 'Lecture 33: Re-envisioning the Digital Workplace for Industry 4.0 / 5.0', done: true },
      { label: 'Lecture 34: Democratization of Industry 4.0: Health Care and BFSI', done: true },
      { label: 'Lecture 35: Democratization of Industry 4.0: Agriculture and Retail& Consumer', done: true },
      { label: 'Study material', done: true },
      { label: 'Quiz: Week 7: Assignment 7', done: true },
      { label: 'Assignment 7 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  {
    label: 'Week 8',
    children: [
      { label: 'Lecture 36: AI Acceleration by the Government of India: Plans and Schemes', done: true },
      { label: 'Lecture 37: Key Success Factors for the adoption of Industry 4.0 / 5.0 and preparing for Industry 4.0 and AI Mindset', done: true },
      { label: 'Lecture 38: Industry 4.0 rollouts in India', done: true },
      { label: 'Lecture 39: Impact of Industry 4.0 and AI', done: true },
      { label: 'Lecture 40: Industry 4.0 Driver for emergence of New category of Jobs', done: true },
      { label: 'Study material', done: true },
      { label: 'Quiz: Week 8: Assignment 8', done: true },
      { label: 'Assignment 8 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  { label: 'Live session - 2026', children: [] },
];

// ── Layout / About Data ──
const ind40LayoutWeeks = [
  { label: 'Week 1:', desc: 'Lecture 1: Evolution of the Fourth Industrial Revolution (4IR) and Industry 4.0 | Lecture 2: Digital Transformation and Industry 4.0 Principles | Lecture 3: Foundation technologies of Industry 4.0: Connectivity, IoT, Big Data, Cloud | Lecture 4: Foundation Technology: IoT platform, Edge Computing, Connected Products | Lecture 5: Data, cloud and advance Analytics' },
  { label: 'Week 2:', desc: 'Lecture 6: Playbook of Industry 4.0 Technologies, Convergence, Integration, Digitalization & Framework | Lecture 7: Automation of Enterprise using RPA and Intelligent RPA | Lecture 8: Additive Manufacturing and 3D based revolution in manufacturing | Lecture 9: Augmented Reality, Virtual Reality, Mixed Reality and Computer Vision | Lecture 10: Advance concepts of Augmented Technologies, Computer Vision, Virtual AI' },
  { label: 'Week 3:', desc: "Lecture 11: Business Value Vale Chain and Processes for Industry 4.0 | Lecture 12: Frameworks: Industry 4.0 Value, RAMI 4.0 engineering core McKinsey Industry 4.0 | Lecture 13: Digitalization and digital transformation & Roadmap for implementation | Lecture 14: Six models of Digitalization, Cert & Cyber Security standards Global Lighthouses | Lecture 15: What are learnings from World Economic Forum's Global Lighthouse Companies Use Cases | Lecture 16: Tata Steel Case Study One of Global Light House Company by WEF" },
  { label: 'Week 4:', desc: 'Lecture 17: Innovation Playbook for Industry 4.0 and Overview of Industry 5.0 & Advance Technologies | Lecture 18: Emergence of industry 5.0 standards: Transcending I4.0 to I5.0 | Lecture 19: Role of AI in Building Industry 5.0 Solutions | Lecture 20: Introduction of Digital Twin (Concept)' },
  { label: 'Week 5:', desc: 'Lecture 21: Introduction of reference architecture for setting up Digital Infrastructure | Lecture 22: Application Layer API Platform as a service for application integration | Lecture 23: An overview of Data Management Reference data architecture | Lecture 24: Digital data product, Cyber security management, Data Privacy Law | Lecture 25: Case Studies of Cyber & Information security, AI security failure, governance framework, Data Protection and Privacy Law' },
  { label: 'Week 6:', desc: 'Lecture 26: Introduction of Smart Manufacturing and Intelligent Manufacturing | Lecture 27: Framework of Smart Manufacturing, connected workers, assets, plants | Lecture 28: Automation Vs Autonomous & Role of Robotics, Humanoid, GenAI | Lecture 29: Revolution in Humanoid Use and AI playbook for smart manufacturing | Lecture 30: Strategy for preparing workers for Smart Manufacturing and Smart Supply Chain and Logistics' },
  { label: 'Week 7:', desc: 'Lecture 31: Re-envisioning Manufacturing Business Model | Lecture 32: Maturity Assessment elements and a brief overview of the global SIRI Framework & KPI | Lecture 33: Re-envisioning the Digital Workplace for Industry 4.0 / 5.0 | Lecture 34: Democratization of Industry 4.0: Health Care and BFSI | Lecture 35: Democratization of Industry 4.0: Agriculture and Retail & Consumer' },
  { label: 'Week 8:', desc: 'Lecture 36: AI Acceleration by the Government of India: Plans and Schemes | Lecture 37: Key Success Factors for the adoption of Industry 4.0 / 5.0 and preparing for Industry 4.0 and AI Mindset | Lecture 38: Industry 4.0 rollouts in India | Lecture 39: Impact of Industry 4.0 and AI | Lecture 40: Industry 4.0 Driver for emergence of New category of Jobs' },
];

const ind40Books = [
  'Fourth Industrial Revolution by Prof Klaus, Founder chairman, World economic forum.',
  '2nd Machine age, Prof Eric & Prof McFAee.',
  'Industry 4.0: Managing The Digital Transformation – Author: Alp Ustundag, Emre Cevikcan, Springer publication.',
  'Digital Business Models for Industry 4.0: How Innovation and Technology Shape the Future of Companies by Carlo Bagnoli, Andrea Albarelli, Springer Publication.',
  'References: WEF Site on Industry 4.0 and Global light houses.',
  'Articles published by McKinsey, SIRI.',
  'McKinsey Article – What are Industry 4.0, the Fourth Industrial Revolution, and 4IR?',
  'References on Live use cases like Tata steel, Tata Motors, Bosch, Royal Philips, Schneider Electricals and few other Indian & global companies.',
  'SIRI Framework for Maturity assessment.',
];

// ── Week 1 Quiz ──
const ind40Quiz1Questions = [
  {
    q: "Which statement best matches the lecture's definition of Industry 4.0?",
    options: [
      'Replacing all human workers with robots',
      'Smart and connected production systems that sense, predict, and support real-time production decisions',
      'Electricity-driven mass production systems',
      'Only the use of ERP for finance and accounts',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: "In the lecture, 'cyber-physical systems' primarily mean:",
    options: [
      'Physical systems getting a digital identity and becoming accessible via digital networks',
      'A network firewall protecting factory data',
      'Only cloud computing for manufacturing',
      'A new mechanical design for steam engines',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: 'What is the primary role of IoT in Industry 4.0?',
    options: [
      'Automating only administrative tasks',
      'Connecting only computers',
      'Enabling connectivity and data capture from physical devices',
      'Replacing human workers',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Which component of IoT is responsible for sensing physical conditions like temperature or pressure?',
    options: [
      'Actuator',
      'Sensor',
      'Gateway',
      'Dashboard',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'What is the primary role of edge computing in IoT architecture?',
    options: [
      'Long-term data storage',
      'Real-time local data processing',
      'Replacing cloud platforms',
      'Managing enterprise transactions',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Why are data lakes preferred over RDBMS in IoT environments?',
    options: [
      'They are cheaper to maintain',
      'They handle unstructured and large-volume data',
      'They eliminate analytics',
      'They replace sensors',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which cloud deployment model combines private and public cloud usage?',
    options: [
      'Public cloud',
      'Private cloud',
      'Hybrid cloud',
      'Community cloud',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Why are data lakes preferred over RDBMS in Industry 4.0?',
    options: [
      'They are cheaper',
      'They store only structured data',
      'They handle all data types',
      'They replace analytics',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Which of the following is NOT one of the Five Vs of Big Data?',
    options: [
      'Volume',
      'Velocity',
      'Visibility',
      'Veracity',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'What happens if all IoT data is sent directly to the cloud without edge computing?',
    options: [
      'Faster processing',
      'Reduced costs',
      'Increased latency and bandwidth cost',
      'Improved security',
    ],
    correct: [2],
    type: 'single',
  },
];

const ind40Quiz1UserAnswers = ind40Quiz1Questions.map((q, i) => {
  if (i === 3 || i === 8) return [0];
  return [...q.correct];
});

// ── Week 2 Quiz ──
const ind40Quiz2Questions = [
  {
    q: 'In Industry 4.0, why is "integration of multiple technologies" more important than in Industry 3.0?',
    options: [
      'Industry 4.0 uses only ERP and CRM systems',
      'Industry 3.0 did not use computers',
      'Industry 4.0 solutions typically combine AI, IoT, analytics, cloud, and other technologies together',
      'Industry 4.0 avoids software systems',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Which statement best describes Artificial Intelligence (AI) as explained in the lecture?',
    options: [
      'AI is only about faster computers',
      'AI simulates human intelligence and can support decisions and actions',
      'AI is only used for social media',
      'AI cannot be used in healthcare',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Machine Learning (ML) mainly helps in:',
    options: [
      'Painting images manually',
      'Learning patterns from data and making decisions with minimal human intervention',
      'Printing spare parts directly',
      'Only storing data in databases',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Natural Language Processing (NLP) is most closely related to:',
    options: [
      'Understanding and processing human language (text/speech)',
      'Manufacturing metal parts',
      'Increasing Wi-Fi speed',
      'Database backup',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: 'Deep Learning is strongly associated with:',
    options: [
      'Manual checklists',
      'Neural networks and multi-layer learning from raw data',
      'Only simple spreadsheet calculations',
      'Email communication',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'In the factory example (alert → technician → spare part → 3D printing), which concept does it illustrate?',
    options: [
      'Technology convergence only',
      'Technology collaboration among multiple technologies',
      'Only cloud computing',
      'Only ERP implementation',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Aadhaar enabling UPI is an example of:',
    options: [
      'Convergence of technologies/platforms',
      'Removing technology from payments',
      'Only robotics automation',
      'Standalone IoT implementation',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: 'Which option best distinguishes collaboration from convergence?',
    options: [
      'Collaboration merges technologies into one device; convergence keeps them separate',
      'Collaboration means technologies work together; convergence means technologies merge into one product/device',
      'Both mean the same thing always',
      'Convergence happens only inside factories',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'In this lecture, RPA is primarily positioned as automation for:',
    options: [
      'Manufacturing machine control loops',
      'Business/enterprise processes like invoices, orders, and reporting',
      'Robotics-based assembly line automation',
      'Additive manufacturing (3D printing)',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which type of tasks are best suited for basic RPA?',
    options: [
      'Creative decision-making and strategy planning',
      'Repetitive, rule-based tasks with structured steps',
      'High-level product design problems',
      'Unstructured research and judgement-heavy tasks',
    ],
    correct: [1],
    type: 'single',
  },
];

const ind40Quiz2UserAnswers = ind40Quiz2Questions.map((q, i) => {
  const wrongIndices = [5, 6, 9];
  if (wrongIndices.includes(i)) return [0];
  return [...q.correct];
});

// ── Week 3 Quiz ──
const ind40Quiz3Questions = [
  {
    q: 'In Industry 4.0, business value should be viewed primarily as:',
    options: [
      'Adoption of advanced technologies',
      'Automation of all processes',
      'Measurable improvement in business outcomes',
      'Replacement of human labor',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Which of the following is NOT a primary dimension of business value discussed in the lecture?',
    options: [
      'Value from operations',
      'Value from customers',
      'Value from competitors',
      'Value from data insights',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'The automated warehouse example demonstrates which key Industry 4.0 benefit most strongly?',
    options: [
      'Marketing innovation',
      'Workforce expansion',
      'Operational efficiency and accuracy',
      'Product diversification',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Operational Excellence primarily focuses on continuous improvement in:',
    options: [
      'Technology investment',
      'Safety, quality, delivery, and cost',
      'Customer acquisition',
      'Market expansion',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'In Industry 4.0 implementation, business processes are important because they:',
    options: [
      'Replace organizational strategy',
      'Enable technology vendors',
      'Are the mechanisms through which value is created',
      'Reduce the need for data',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: "Michael Porter's Value Chain model remains relevant to Industry 4.0 because it:",
    options: [
      'Focuses only on manufacturing',
      'Integrates activities that create competitive advantage',
      'Excludes digital technologies',
      'Applies only to service industries',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which technology–process mapping is most appropriate?',
    options: [
      'AR glasses → Financial reporting',
      'Machine vision → Quality control',
      'IoT sensors → HR recruitment',
      'Digital twins → Advertising',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'From a managerial perspective, the starting point for Industry 4.0 solution design should be:',
    options: [
      'Availability of new technology',
      'Vendor recommendations',
      'Business value and process understanding',
      'Automation targets',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Digitalization primarily refers to:',
    options: [
      'Complete change in business model',
      'Using digital tools to improve existing processes',
      'Replacing humans with machines',
      'Creating digital-only companies',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which statement best differentiates digitalization from digital transformation?',
    options: [
      'Digitalization is costlier than transformation',
      'Digitalization improves processes, transformation changes business models',
      'Transformation uses less technology',
      'Digitalization applies only to IT firms',
    ],
    correct: [1],
    type: 'single',
  },
];

const ind40Quiz3UserAnswers = ind40Quiz3Questions.map((q, i) => {
  const wrongIndices = [3, 4, 7];
  if (wrongIndices.includes(i)) return [0];
  return [...q.correct];
});

// ── Week 4 Quiz ──
const ind40Quiz4Questions = [
  {
    q: 'AI is described in the lecture as a:',
    options: [
      'Minor support technology',
      'Game-changer technology in digital transformation',
      'Replacement for all human jobs',
      'Only a software automation tool',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'In the lecture, UPI and ONDC are presented mainly as examples of:',
    options: [
      'Industry 3.0 digitization',
      'Human centricity and resilience in an Industry 5.0 context',
      'Only factory automation',
      'Only predictive maintenance systems',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Predictive maintenance is important because:',
    options: [
      'It improves marketing',
      'Equipment breakdown reduces production and assets are critical',
      'It increases taxation',
      'It reduces customer complaints directly',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'In healthcare, the lecture mentions AI roles such as:',
    options: [
      'Only billing and accounting',
      'Automating repeated tasks, data management, NLP analysis, reducing unnecessary hospitalization',
      'Only robot surgery',
      'Only hospital construction',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'UPI and ONDC are presented as examples supporting:',
    options: [
      'Only Industry 3.0 digitization',
      'Human centricity and resilience in Industry 5.0 context',
      'Only factory robotics',
      'Only blockchain mining',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'The startup "agri pilot.ai" is described as using:',
    options: [
      'Only social media analytics',
      'IoT sensors + AI for smart agriculture advisories and alerts',
      'Only robotics for harvesting',
      'Only blockchain for payments',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'The lecture describes predictive maintenance as important primarily because:',
    options: [
      'It reduces marketing costs',
      'Equipment is a critical asset and breakdown affects production',
      'It reduces employee salaries',
      'It improves social media engagement',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Industry 4.0 is said to be "pervasive," meaning it applies to:',
    options: [
      'Only manufacturing',
      'Only steel plants',
      'Manufacturing and also fintech, BFSI, healthcare',
      'Only agriculture',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'The three pillars of Industry 5.0 mentioned are:',
    options: [
      'Profitability, speed, scale',
      'Human centricity, sustainability, resilience',
      'AI, cloud, IoT',
      'Automation, robotics, ERP',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'The "different" factor between Industry 4.0 and Industry 5.0 is mainly:',
    options: [
      'Sensors used',
      'Network speed',
      'Objective (human centricity, sustainability, resilience)',
      'Size of factories',
    ],
    correct: [2],
    type: 'single',
  },
];

const ind40Quiz4UserAnswers = ind40Quiz4Questions.map((q, i) => {
  if (i === 1) return [0];
  return [...q.correct];
});

// ── Week 5 Quiz ──
const ind40Quiz5Questions = [
  {
    q: 'In the Industry 4.0 reference architecture, what is the primary role of the Application Layer?',
    options: [
      'Collecting raw sensor data from machines',
      'Providing physical connectivity between devices',
      'Transforming operational data into business value and user interaction',
      'Storing historical data for compliance purposes',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'What is the key advantage of using a microservices architecture in the application layer?',
    options: [
      'Lower hardware costs',
      'Faster database transactions',
      'Ability to upgrade or modify services independently without system downtime',
      'Elimination of cybersecurity risks',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Which Indian platform is an example of a reusable digital data product?',
    options: [
      'GSTN',
      'Aadhaar',
      'IRCTC',
      'DigiLocker',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'CIA stands for:',
    options: [
      'Control, Integrity, Access',
      'Confidentiality, Integrity, Availability',
      'Cyber, Information, Access',
      'Compliance, Integrity, Authorization',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'In a connected factory, why are APIs considered production-critical assets rather than just IT tools?',
    options: [
      'They reduce the number of machines required',
      'API failure can directly impact production continuity',
      'They replace machine controllers',
      'APIs are used only for reporting purposes',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which statement best reflects the core architectural logic of Industry 4.0 systems?',
    options: [
      'Physical assets operate independently with periodic reporting',
      'Data flows from connected assets to analytics systems to enable decision-making',
      'Enterprise systems replace operational technologies',
      'Automation eliminates the need for human oversight',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Why is edge computing especially important in large-scale IoT deployments?',
    options: [
      'It eliminates the need for cloud infrastructure',
      'It stores all historical data locally',
      'It enables low-latency processing close to the data source',
      'It converts unstructured data into relational format',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Which characteristic distinguishes a digital data product from a traditional dataset?',
    options: [
      'It is stored only in cloud databases',
      'It is designed for one specific application',
      'It is reusable, governed, and designed for multiple consumers',
      'It contains only structured data',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Which analytics type is most closely associated with optimization and decision recommendation in Industry 4.0?',
    options: [
      'Descriptive analytics',
      'Diagnostic analytics',
      'Predictive analytics',
      'Prescriptive analytics',
    ],
    correct: [3],
    type: 'single',
  },
  {
    q: 'Why is cybersecurity considered business-critical (not just IT-critical) in Industry 4.0 environments?',
    options: [
      'Because cybersecurity tools are expensive',
      'Because cyber risks are limited to data centers',
      'Because cyber incidents can directly disrupt physical operations and production',
      'Because cybersecurity is mandated only by regulators',
    ],
    correct: [2],
    type: 'single',
  },
];

const ind40Quiz5UserAnswers = ind40Quiz5Questions.map((q, i) => {
  if (i === 6) return [0];
  return [...q.correct];
});

// ── Week 6 Quiz ──
const ind40Quiz6Questions = [
  {
    q: 'Which of the following is a sustainability strategy mentioned for decarbonising manufacturing?',
    options: [
      'Fuel switching to electrification/green hydrogen',
      'Increasing coal usage',
      'Avoiding process optimisation',
      'Reducing sensor deployment',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: 'End-to-end supply chain visibility mainly helps a company to:',
    options: [
      'Identify bottlenecks and improve resilience',
      'Hide production problems',
      'Eliminate the need for suppliers',
      'Stop using data integration',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: 'Which is NOT one of the six core enablers for smart manufacturing success?',
    options: [
      'Agile approach',
      'IoT stack',
      'Transformation office',
      'Only manual inspection teams',
    ],
    correct: [3],
    type: 'single',
  },
  {
    q: 'In the Tata Steel example, the three key building blocks of transformation were summarised as:',
    options: [
      'Cloud, Data, and AI',
      'Paper files, phone calls, and manual logs',
      'Only robotics and drones',
      'Only ERP and CRM',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: "A 'photorealistic and physics-based' digital twin is emphasized as being beyond:",
    options: [
      'A simple 3D model',
      'A machine sensor',
      'An ERP screen',
      'A barcode label',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: 'Digital dexterity is best defined as:',
    options: [
      'The ability to purchase and deploy advanced digital tools',
      'The capability to combine digital skills with adaptive attitudes toward change',
      'Full automation of processes using AI',
      'Replacement of manual work with robotics',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which factor is most critical for effective adoption of digital systems in manufacturing organizations?',
    options: [
      'Immediate replacement of legacy systems',
      'Alignment of workforce skills and organizational mindset',
      'Exclusive focus on technology vendors',
      'Reduction in workforce size',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Intelligent manufacturing differs from smart manufacturing primarily because it:',
    options: [
      'Uses connected machines instead of manual systems',
      'Relies exclusively on ERP platforms',
      'Incorporates AI-driven, adaptive decision-making capabilities',
      'Eliminates human interaction entirely',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Vertical integration in digital manufacturing refers to:',
    options: [
      'Coordination between suppliers and distributors',
      'Integration of shop-floor systems with enterprise-level systems',
      'Deployment of robots across production lines',
      'Replacement of PLC systems with cloud platforms',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'A manufacturing system qualifies as autonomous when it:',
    options: [
      'Operates continuously without maintenance',
      'Executes predefined rules faster than humans',
      'Adapts its actions based on sensed conditions and feedback',
      'Uses robots in all production processes',
    ],
    correct: [2],
    type: 'single',
  },
];

const ind40Quiz6UserAnswers = ind40Quiz6Questions.map((q, i) => {
  if (i === 5) return [0];
  if (i === 8) return [0];
  if (i === 9) return [0];
  return [...q.correct];
});

// ── Week 7 Quiz ──
const ind40Quiz7Questions = [
  {
    q: 'The primary purpose of KPIs in Industry 4.0 is to:',
    options: [
      'Replace automation systems',
      'Continuously monitor performance',
      'Conduct annual audits',
      'Eliminate human decision-making',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which of the following is an example of a real-time KPI?',
    options: [
      'Return on Assets',
      'Annual profit',
      'Throughput and production attainment',
      'Market share',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'According to the lecture, manufacturing performance today:',
    options: [
      'Can be managed retrospectively',
      'Should be measured quarterly',
      'Requires real-time measurement',
      'Depends only on manual supervision',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'KPIs primarily support which type of decision-making?',
    options: [
      'Intuition-based',
      'Historical',
      'Fact-based',
      'Opinion-based',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Vertical integration in SIRI refers to:',
    options: [
      'Supplier to customer integration',
      'Machine to shop floor integration',
      'Design to service integration',
      'HR to finance integration',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: "Which statement best reflects the lecture's definition of digital workplace?",
    options: [
      'Collaboration tools alone define the digital workplace',
      'Digital workplace includes how people work across teams, functions, and geographies',
      'Digital workplace applies only to office employees',
      'Digital workplace excludes organizational policies',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which of the following is described as a "de facto standard" for workplace security?',
    options: [
      'SaaS',
      'Zero Trust Network Architecture',
      'SharePoint',
      'Yammer',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Digital workplace is NOT limited to tools like Zoom/Teams because it also includes:',
    options: [
      'Cafeteria and seating design',
      'AI, analytics, IoT connectivity, and cloud services',
      'Manufacturing automation',
      'HR policies',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'What is the primary objective of Agriculture 4.0?',
    options: [
      'Increase use of fertilizers',
      'Replace farmers with robots',
      'Enable data-driven precision farming',
      'Eliminate government intervention',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Which technology helps retail companies offer virtual product trials?',
    options: [
      'IoT',
      'AR/VR',
      'Blockchain',
      'RFID',
    ],
    correct: [1],
    type: 'single',
  },
];

const ind40Quiz7UserAnswers = ind40Quiz7Questions.map((q, i) => {
  if (i === 1) return [0];
  if (i === 4) return [0];
  if (i === 5) return [0];
  return [...q.correct];
});

// ── Week 8 Quiz ──
const ind40Quiz8Questions = [
  {
    q: 'The purpose of the AI Kosh platform is best described as:',
    options: [
      'A platform for movie streaming',
      'A unified hub of datasets and models to help developers and reduce data collection burden',
      'A banking platform',
      'An agricultural platform',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Bhashini is primarily associated with:',
    options: [
      'Cloud storage of hospital images',
      'Real-time language translation and multilingual access',
      'Robot manufacturing',
      'Credit scoring',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'XR (Mixed Reality) refers to:',
    options: [
      'Only VR',
      'Only AR',
      'AR and VR used together in a convergent manner',
      'Only video calling',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Which skill was described as "evergreen" and even more important today?',
    options: [
      'Coding in C++',
      'Active listening',
      'Drawing skills',
      'Cloud certification',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: '"Digital fluency" in the lecture means:',
    options: [
      'Becoming an AI scientist',
      'Knowing every technology deeply',
      'Understanding key technology terms and using them confidently',
      'Avoiding technology',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'In the lecture, "Agentic AI" is primarily described as:',
    options: [
      'A single-step chatbot response system',
      'A multi-step workflow system that can orchestrate actions',
      'A database backup tool',
      'A manual ticketing system',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'In the WEF examples, AI for agriculture is linked to which combined problem set?',
    options: [
      'High urban traffic + airline delays',
      'Low productivity, climate uncertainty, and soil degradation',
      'Only bank frauds',
      'Only hospital staffing',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: "DEPA is primarily described as India's framework for:",
    options: [
      'Building drones for logistics',
      'Secure, user-controlled data sharing via consent',
      'Manufacturing semiconductors for AI',
      'Replacing banks with cryptocurrencies',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'A key principle stated about data is:',
    options: [
      'Data is an IT issue',
      'Data should be copied for every new app',
      'Data is an operating strategy, not an IT issue',
      'Data is not needed for analytics',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: "Which set best matches the \"five success factors\" for India's AI progress?",
    options: [
      'More factories, more exports, more tourism, more mining, more ports',
      'Government policy + startup ecosystem + data/compute + research ecosystem + talent pool',
      'Only foreign investment + ads + entertainment + gaming + social media',
      'Only hardware manufacturing + only coding',
    ],
    correct: [1],
    type: 'single',
  },
];

const ind40Quiz8UserAnswers = ind40Quiz8Questions.map((q, i) => {
  if (i === 5) return [0];
  return [...q.correct];
});

// ── Helper: compute assignment scores ──
function computeAssignmentScores() {
  const quizzes = [
    { name: 'Week 1: Assignment 1', questions: ind40Quiz1Questions, answers: ind40Quiz1UserAnswers },
    { name: 'Week 2: Assignment 2', questions: ind40Quiz2Questions, answers: ind40Quiz2UserAnswers },
    { name: 'Week 3: Assignment 3', questions: ind40Quiz3Questions, answers: ind40Quiz3UserAnswers },
    { name: 'Week 4: Assignment 4', questions: ind40Quiz4Questions, answers: ind40Quiz4UserAnswers },
    { name: 'Week 5: Assignment 5', questions: ind40Quiz5Questions, answers: ind40Quiz5UserAnswers },
    { name: 'Week 6: Assignment 6', questions: ind40Quiz6Questions, answers: ind40Quiz6UserAnswers },
    { name: 'Week 7: Assignment 7', questions: ind40Quiz7Questions, answers: ind40Quiz7UserAnswers },
    { name: 'Week 8: Assignment 8', questions: ind40Quiz8Questions, answers: ind40Quiz8UserAnswers },
  ];
  return quizzes.map(({ name, questions, answers }) => {
    const score = questions.filter((q, i) => {
      const chosen = answers[i];
      const correct = q.correct;
      return chosen.length === correct.length && chosen.every(a => correct.includes(a)) && correct.every(c => chosen.includes(c));
    }).length;
    return { name, score, total: questions.length };
  });
}

// ── Avatar Dropdown Component ──
function AvatarDropdown({ initials = 'AA', email = 'e23cseu0649@bennett.edu.in' }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const menuItems = [
    { icon: 'person', label: 'My Profile' },
    { icon: 'menu_book', label: 'My Courses' },
    { icon: 'verified', label: 'My Certifications' },
    { icon: 'recommend', label: 'Course Recommendation' },
    { icon: 'logout', label: 'Sign Out' },
  ];

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <div
        className="nptel-user-avatar"
        onClick={() => setOpen(prev => !prev)}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {initials}
      </div>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          minWidth: '220px',
          zIndex: 9999,
          overflow: 'hidden',
          border: '1px solid #e8e8e8',
        }}>
          {/* Email header */}
          <div style={{
            padding: '12px 16px',
            color: '#1a73e8',
            fontSize: '13px',
            fontWeight: 500,
            borderBottom: '1px solid #f0f0f0',
            background: '#fafafa',
          }}>
            {email}
          </div>

          {/* Menu items */}
          {menuItems.map(({ icon, label }) => (
            <div
              key={label}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 16px',
                fontSize: '14px',
                color: '#333',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#555' }}>
                {icon}
              </span>
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Student Progress Report Page ──
function StudentProgressPage({ progressPercent, onBack }) {
  const [openSection, setOpenSection] = useState(null);
  const assignments = computeAssignmentScores();

  const unitWiseData = [
    { unit: 'About NPTEL', lessonPct: 100, hasAssignment: false },
    { unit: 'How does an NPTEL online course work?', lessonPct: 0, hasAssignment: false },
    { unit: 'Week 0', lessonPct: 0, hasAssignment: false },
    { unit: 'Week 1', lessonPct: 0, hasAssignment: true, assignPct: 100 },
    { unit: 'Week 2', lessonPct: 0, hasAssignment: true, assignPct: 100 },
    { unit: 'Week 3', lessonPct: 0, hasAssignment: true, assignPct: 100 },
    { unit: 'Week 4', lessonPct: 0, hasAssignment: true, assignPct: 100 },
    { unit: 'Week 5', lessonPct: 0, hasAssignment: true, assignPct: 0 },
    { unit: 'Week 6', lessonPct: 0, hasAssignment: true, assignPct: 100 },
    { unit: 'Week 7', lessonPct: 0, hasAssignment: true, assignPct: 0 },
    { unit: 'Week 8', lessonPct: 0, hasAssignment: true, assignPct: 100 },
    { unit: 'Live session - 2026', lessonPct: 0, hasAssignment: false },
  ];

  const toggleSection = (section) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  return (
    <div style={{ display: 'flex', flex: 1, width: '100%', overflow: 'hidden' }}>
      {/* LEFT PANEL */}
      <div className="spr-left">
        <div className="spr-course-title">Industry 4.0: Managing The Digital Transformation</div>
        <div className="spr-circle-wrap">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e0e0" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="#4caf50"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 50 * progressPercent / 100} ${2 * Math.PI * 50 * (1 - progressPercent / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="spr-circle-pct">{progressPercent}%</div>
        </div>
        <div className="spr-course-progress-label">Course Progress</div>
        <div className="spr-divider" />
        <div className="spr-info-row">
          <div className="spr-info-label">Date Enrolled</div>
          <div className="spr-info-value">2026-02-15</div>
        </div>
        <div className="spr-info-row">
          <div className="spr-info-label">Email</div>
          <div className="spr-info-value">e23cseu0649@bennett.edu.in</div>
        </div>
        <div className="spr-info-row">
          <div className="spr-info-label">Name</div>
          <div className="spr-info-value spr-name">Arshit</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="spr-right">
        <div className="spr-back-link" onClick={onBack}>← Back to Course Outline</div>
        <h2 className="spr-page-title">Student Progress Report</h2>

        {/* Assignment Scores Accordion */}
        <div className="spr-accordion">
          <div className="spr-accordion-header" onClick={() => toggleSection('assignments')}>
            <span className="spr-accordion-title">Assignment Scores</span>
            <span className="material-symbols-outlined spr-accordion-icon">
              {openSection === 'assignments' ? 'expand_less' : 'expand_more'}
            </span>
          </div>
          {openSection === 'assignments' && (
            <div className="spr-accordion-body">
              <table className="spr-table">
                <thead><tr><th>Title</th><th>Score</th></tr></thead>
                <tbody>
                  {assignments.map((a, i) => {
                    const displayScores = [80, 80, 70, 90, 0, 70, 0, 90];
                    return (
                      <tr key={a.name}><td>{a.name}</td><td>{displayScores[i]}</td></tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Unit Wise Progress Accordion */}
        <div className="spr-accordion">
          <div className="spr-accordion-header" onClick={() => toggleSection('unitwise')}>
            <span className="spr-accordion-title">Unit Wise Progress</span>
            <span className="material-symbols-outlined spr-accordion-icon">
              {openSection === 'unitwise' ? 'expand_less' : 'expand_more'}
            </span>
          </div>
          {openSection === 'unitwise' && (
            <div className="spr-accordion-body">
              <div className="spr-unit-note">
                Note : The latest Course and Unit progress will be reflected within 24 hours.
              </div>
              <table className="spr-table">
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th>Lesson Progress</th>
                    <th>Assignments Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {unitWiseData.map(u => (
                    <tr key={u.unit}>
                      <td>{u.unit}</td>
                      <td>
                        <div className="spr-progress-cell">
                          <div className="spr-progress-bar-wrap">
                            <div className="spr-progress-bar-fill" style={{ width: `${u.lessonPct}%`, background: u.lessonPct === 100 ? '#4caf50' : '#bdbdbd' }} />
                          </div>
                          <span className="spr-progress-pct">{u.lessonPct}%</span>
                        </div>
                      </td>
                      <td>
                        {u.hasAssignment ? (
                          <div className="spr-progress-cell">
                            <div className="spr-progress-bar-wrap">
                              <div className="spr-progress-bar-fill" style={{ width: `${u.assignPct}%`, background: u.assignPct > 0 ? '#4caf50' : '#bdbdbd' }} />
                            </div>
                            <span className="spr-progress-pct">{u.assignPct}%</span>
                          </div>
                        ) : (
                          <span className="spr-dash">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Grading and Certifications Policy Accordion */}
        <div className="spr-accordion">
          <div className="spr-accordion-header" onClick={() => toggleSection('grading')}>
            <span className="spr-accordion-title">Grading and Certifications Policy</span>
            <span className="material-symbols-outlined spr-accordion-icon">
              {openSection === 'grading' ? 'expand_less' : 'expand_more'}
            </span>
          </div>
          {openSection === 'grading' && (
            <div className="spr-accordion-body spr-policy-body">
              <p>The course is free to enroll and learn from. But if you want a certificate, you have to register and write the proctored exam conducted by us in person at any of the designated exam centres.</p>
              <p>The exam is optional for a fee of <strong>Rs 1000/- (Rupees one thousand only)</strong>.</p>
              <p><strong>Date and Time of Exams:</strong> April 25, 2026 Morning session 9am to 12 noon; Afternoon Session 2pm to 5pm.</p>
              <p><strong>Registration url:</strong> Announcements will be made when the registration form is open for registrations.</p>
              <p>The online registration form has to be filled and the certification exam fee needs to be paid. More details will be made available when the exam registration form is published.</p>
              <h4 className="spr-policy-heading">CRITERIA TO GET A CERTIFICATE</h4>
              <ul className="spr-policy-list">
                <li>Average assignment score = 25% of average of best 6 assignments out of the total 8 assignments given in the course.</li>
                <li>Exam score = 75% of the proctored certification exam score out of 100</li>
                <li>Final score = Average assignment score + Exam score</li>
                <li>Please note that assignments encompass all types (including quizzes, programming tasks, and essay submissions) available in the specific week.</li>
              </ul>
              <div className="spr-criteria-box">
                <strong>YOU WILL BE ELIGIBLE FOR A CERTIFICATE ONLY IF AVERAGE ASSIGNMENT SCORE &gt;=10/25 AND EXAM SCORE &gt;= 30/75.</strong>
              </div>
              <p>Certificate will have your name, photograph and the score in the final exam with the breakup.</p>
              <p>It will have the logos of NPTEL and IIT Bombay.</p>
              <p>It will be e-verifiable at <a href="http://nptel.ac.in/noc" target="_blank" rel="noreferrer" className="spr-link">nptel.ac.in/noc</a>.</p>
              <p>Only the e-certificate will be made available. Hard copies will not be dispatched.</p>
              <p className="spr-policy-footer">Once again, thanks for your interest in our online courses and certification. Happy learning.<br />- NPTEL team</p>
            </div>
          )}
        </div>

        <div className="spr-announcements">
          <p>Announcement: You are currently receiving course-related emails. <a href="#" className="spr-link">Click here to unsubscribe.</a></p>
          <p>Discussion Form:<br />If you want to unsubscribe from forum <a href="#" className="spr-link">Click here.</a></p>
        </div>
      </div>
    </div>
  );
}

// ── Industry 4.0 Page Component ──
function Industry40Page() {
  const [expandedItem, setExpandedItem] = useState('Week 1');
  const [activePage, setActivePage] = useState('quiz1');
  const [loading, setLoading] = useState(false);
  const [showProgressPage, setShowProgressPage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const quizParam = params.get('quiz');
    if (quizParam === 'quiz1') setActivePage('quiz1');
    else if (quizParam === 'quiz2') setActivePage('quiz2');
    else if (quizParam === 'quiz3') setActivePage('quiz3');
    else if (quizParam === 'quiz4') setActivePage('quiz4');
    else if (quizParam === 'quiz5') setActivePage('quiz5');
    else if (quizParam === 'quiz6') setActivePage('quiz6');
    else if (quizParam === 'quiz7') setActivePage('quiz7');
    else if (quizParam === 'quiz8') setActivePage('quiz8');
    else setActivePage('about');
  }, [location]);

  const handleOutlineClick = (label, hasChildren) => {
    if (!hasChildren) return;
    setExpandedItem(prev => prev === label ? null : label);
  };

  const handleSubitemClick = (label, quizParam) => {
    setShowProgressPage(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActivePage(quizParam);
      navigate(`/ind40?quiz=${quizParam}`);
    }, 2000);
  };

  const allQuizzes = [
    { q: ind40Quiz1Questions, a: ind40Quiz1UserAnswers },
    { q: ind40Quiz2Questions, a: ind40Quiz2UserAnswers },
    { q: ind40Quiz3Questions, a: ind40Quiz3UserAnswers },
    { q: ind40Quiz4Questions, a: ind40Quiz4UserAnswers },
    { q: ind40Quiz5Questions, a: ind40Quiz5UserAnswers },
    { q: ind40Quiz6Questions, a: ind40Quiz6UserAnswers },
    { q: ind40Quiz7Questions, a: ind40Quiz7UserAnswers },
    { q: ind40Quiz8Questions, a: ind40Quiz8UserAnswers },
  ];

  let totalCorrect = 0;
  let totalQuestions = 0;
  allQuizzes.forEach(({ q, a }) => {
    totalQuestions += q.length;
    totalCorrect += q.filter((qq, i) => {
      const chosen = a[i];
      const correct = qq.correct;
      return chosen.length === correct.length && chosen.every(x => correct.includes(x)) && correct.every(c => chosen.includes(c));
    }).length;
  });

  const displayScores = [80, 80, 70, 90, 0, 70, 0, 90];
  const progressPercent = Math.round(displayScores.reduce((a, b) => a + b, 0) / displayScores.length);
  const completedAssignments = allQuizzes.filter(({ q, a }) =>
    q.every((qq, i) => {
      const chosen = a[i];
      const correct = qq.correct;
      return chosen.length === correct.length && chosen.every(x => correct.includes(x)) && correct.every(c => chosen.includes(c));
    })
  ).length;

  if (showProgressPage) {
    return (
      <div className="nptel-course-page">
        {loading && <div className="loading-overlay"><div className="loading-spinner" /></div>}
        <div style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '52px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {['About the course', 'Announcements', 'My Bookmarks', 'Q&A'].map(item => (
                <span
                  key={item}
                  className={`nptel-course-nav-item${item === 'Announcements' ? ' nptel-course-nav-active' : ''}`}
                  style={{ cursor: item === 'About the course' ? 'pointer' : 'default' }}
                  onClick={() => item === 'About the course' && navigate('/ind40/about')}
                >
                  {item}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#555', cursor: 'pointer' }}>accessibility</span>
              {/* ── Avatar with dropdown ── */}
              <AvatarDropdown initials="AA" email="e23cseu0649@bennett.edu.in" />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', background: '#f0f2f5', width: '100%' }}>
          <StudentProgressPage progressPercent={progressPercent} onBack={() => setShowProgressPage(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="nptel-course-page">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}

      <div className="nptel-layout">
        {/* LEFT SIDEBAR */}
        <aside className="nptel-sidebar">
          <div className="nptel-sidebar-header">
            <div className="nptel-sidebar-close">
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#555', cursor: 'pointer' }}>close</span>
            </div>
            <div className="nptel-sidebar-course-title">
              Industry 4.0: Managing The Digital ...
            </div>
            <div className="nptel-sidebar-progress-row">
              <span className="nptel-sidebar-progress-label">Overall Course Progress</span>
              <span className="nptel-sidebar-progress-pct">{progressPercent}%</span>
            </div>
            <div className="nptel-sidebar-progress-bar-wrap">
              <div className="nptel-sidebar-progress-bar" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="nptel-sidebar-assignments">
              <span>{completedAssignments} of {allQuizzes.length} assignments completed</span>
              <span className="nptel-sidebar-progress-link" onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setShowProgressPage(true);
                }, 2000);
              }}>
                Progress details
              </span>
            </div>
          </div>

          <div className="nptel-outline">
            {ind40OutlineItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItem === item.label;
              return (
                <div className="nptel-outline-item" key={item.label}>
                  <span
                    className="nptel-outline-title"
                    onClick={() => handleOutlineClick(item.label, hasChildren)}
                  >
                    {hasChildren && (
                      <span className="material-symbols-outlined nptel-outline-chevron">
                        {isExpanded ? 'expand_more' : 'chevron_right'}
                      </span>
                    )}
                    <span className="nptel-outline-label">{item.label}</span>
                  </span>
                  {isExpanded && (
                    <div className="nptel-subitems">
                      {item.children.map((child) => {
                        let quizParam = null;
                        if (child.label === 'Quiz: Week 1: Assignment 1') quizParam = 'quiz1';
                        else if (child.label === 'Quiz: Week 2: Assignment 2') quizParam = 'quiz2';
                        else if (child.label === 'Quiz: Week 3: Assignment 3') quizParam = 'quiz3';
                        else if (child.label === 'Quiz: Week 4: Assignment 4') quizParam = 'quiz4';
                        else if (child.label === 'Quiz: Week 5: Assignment 5') quizParam = 'quiz5';
                        else if (child.label === 'Quiz: Week 6: Assignment 6') quizParam = 'quiz6';
                        else if (child.label === 'Quiz: Week 7: Assignment 7') quizParam = 'quiz7';
                        else if (child.label === 'Quiz: Week 8: Assignment 8') quizParam = 'quiz8';

                        const isActive = quizParam === activePage && !showProgressPage;
                        return (
                          <div
                            className={`nptel-subitem${isActive ? ' nptel-subitem-active' : ''}`}
                            key={child.label}
                            onClick={() => quizParam && handleSubitemClick(child.label, quizParam)}
                          >
                            <span className={`nptel-dot${child.done ? ' nptel-dot-done' : ''}`} />
                            <span className="nptel-subitem-label">{child.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="nptel-mentor-section">
              <div className="nptel-mentor-title">Course Mentor</div>
              <div className="nptel-mentor-text">Mentors are not yet assigned for this course.</div>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="nptel-content">
          <div className="nptel-course-topnav">
            <div className="nptel-course-topnav-inner">
              <div className="nptel-course-nav-links">
                <span className="nptel-course-nav-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/ind40/about')}>About the course</span>
                <span className="nptel-course-nav-item nptel-course-nav-active">Announcements</span>
                <span className="nptel-course-nav-item">My Bookmarks</span>
                <span className="nptel-course-nav-item">Q&A</span>
              </div>
              <div className="nptel-course-nav-right">
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#555', cursor: 'pointer' }}>accessibility</span>
                {/* ── Avatar with dropdown ── */}
                <AvatarDropdown initials="AA" email="e23cseu0649@bennett.edu.in" />
              </div>
            </div>
          </div>

          <div className="nptel-content-body">
            {activePage === 'quiz1' ? (
              <QuizPage title="Week 1: Assignment 1" dueDate="2026-02-25" questions={ind40Quiz1Questions} userAnswers={ind40Quiz1UserAnswers} />
            ) : activePage === 'quiz2' ? (
              <QuizPage title="Week 2: Assignment 2" dueDate="2026-03-04" questions={ind40Quiz2Questions} userAnswers={ind40Quiz2UserAnswers} />
            ) : activePage === 'quiz3' ? (
              <QuizPage title="Week 3: Assignment 3" dueDate="2026-03-11" questions={ind40Quiz3Questions} userAnswers={ind40Quiz3UserAnswers} />
            ) : activePage === 'quiz4' ? (
              <QuizPage title="Week 4: Assignment 4" dueDate="2026-03-18" questions={ind40Quiz4Questions} userAnswers={ind40Quiz4UserAnswers} />
            ) : activePage === 'quiz5' ? (
              <QuizPage title="Week 5: Assignment 5" dueDate="2026-03-25" questions={ind40Quiz5Questions} userAnswers={ind40Quiz5UserAnswers} />
            ) : activePage === 'quiz6' ? (
              <QuizPage title="Week 6: Assignment 6" dueDate="2026-04-01" questions={ind40Quiz6Questions} userAnswers={ind40Quiz6UserAnswers} />
            ) : activePage === 'quiz7' ? (
              <QuizPage title="Week 7: Assignment 7" dueDate="2026-04-08" questions={ind40Quiz7Questions} userAnswers={ind40Quiz7UserAnswers} />
            ) : activePage === 'quiz8' ? (
              <QuizPage title="Week 8: Assignment 8" dueDate="2026-04-15" questions={ind40Quiz8Questions} userAnswers={ind40Quiz8UserAnswers} />
            ) : (
              <>
                <h1>Industry 4.0: Managing The Digital Transformation</h1>
                <div className="intro-grid">
                  <div>
                    <h3>ABOUT THE COURSE:</h3>
                    <p>This course explores the disruptive forces of Industry 4.0 and its transformative impact on manufacturing and adjacent sectors.</p>
                  </div>
                  <iframe
                    className="intro-image"
                    src="https://www.youtube.com/embed/sqGM2XA8G94"
                    title="Course Introduction"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="details-section">
                  <h3>INTENDED AUDIENCE:</h3>
                  <p>Both Faculty and Students of Management and Engg discipline, Interested industry professionals.</p>
                  <div className="prof-card">
                    <div className="prof-left">
                      <img className="prof-image" src="https://storage.googleapis.com/swayam2-node/Jan2026_instructor_images/95_jan_26.jpg" alt="Prof. Murli Dhar Agrawal" />
                      <div className="prof-name">Prof. Murli Dhar Agrawal</div>
                      <div className="prof-institute">SJMSOM, IIT Bombay</div>
                    </div>
                    <div className="prof-bio">
                      <p>Prof M D Agrawal, visiting faculty, is a thought leader, coach, seasoned speaker and trainer.</p>
                    </div>
                  </div>
                  <h3>COURSE LAYOUT</h3>
                  <ul>{ind40LayoutWeeks.map(({ label, desc }) => (<li key={label}><strong>{label}</strong> {desc}</li>))}</ul>
                  <h3>BOOKS AND REFERENCES</h3>
                  <ol>{ind40Books.map((item) => <li key={item}>{item}</li>)}</ol>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Industry40Page;