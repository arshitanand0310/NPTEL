import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QuizPage from './QuizPage';

// ── Course Outline ──
const outlineItems = [
  { label: 'About NPTEL', children: [] },
  { label: 'How does an NPTEL online course work?', children: [] },
  { label: 'Week 0', children: [] },
  {
    label: 'Week 1',
    children: [
      { label: 'Module 1: Introduction to Disciplined Innovation', done: true },
      { label: 'Study Material', done: true },
      { label: 'Quiz: Week 1: Assignment 1', done: true },
      { label: 'Assignment 1 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  {
    label: 'Week 2',
    children: [
      { label: 'Module 2 : Part 1 : 8C Problem Discovery Framework', done: true },
      { label: 'Module 2 : Part 2 : 8C Problem Discovery Framework', done: true },
      { label: 'Module 3 : Part 1 : 8P Product Development Framework', done: true },
      { label: 'Module 3 : Part 2 : 8P Product Development Framework', done: true },
      { label: 'Study Material', done: true },
      { label: 'Quiz: Week 2: Assignment 2', done: true },
      { label: 'Assignment 2 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  {
    label: 'Week 3',
    children: [
      { label: 'Module 4 : Part 1 : WIMF – Winning in Market Framework', done: true },
      { label: 'Module 4 : Part 2 : WIMF – Winning in Market Framework', done: true },
      { label: 'Study Material', done: true },
      { label: 'Quiz: Week 3: Assignment 3', done: true },
      { label: 'Assignment 3 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  {
    label: 'Week 4',
    children: [
      { label: 'Module 5 : Translational Research', done: true },
      { label: 'Module 6 : Technology Readiness Assessment – TRL Framework', done: true },
      { label: 'Module 7 : Technology Commercialisation', done: true },
      { label: 'Study Material', done: true },
      { label: 'Quiz: Week 4: Assignment 4', done: true },
      { label: 'Assignment 4 solution', done: true },
      { label: 'Weekly feedback', done: true },
    ],
  },
  { label: 'Bonus Content', children: [] },
];

// ── About Page Static Data ──
const highlights = [
  { label: 'Problem Pull vs. Tech Push Development:', desc: 'Learn how to identify market needs and align technology solutions accordingly.' },
  { label: '8C Problem Discovery Framework:', desc: 'Master a structured approach to uncovering and defining critical problems worth solving.' },
  { label: '8P Product Development Framework:', desc: 'Gain expertise in designing, developing, and delivering impactful products.' },
  { label: 'WIMF (Winning in Market Framework):', desc: 'Understand strategies to position your innovation for market success.' },
  { label: 'TRL (Technology Readiness Level) Assessment Framework:', desc: 'Assess and advance the maturity of your technology.' },
  { label: 'Technology Translation & Commercialisation:', desc: 'Leverage cutting-edge technologies to create disruptive opportunities.' },
];

const audience = [
  'All Engineering, Science, Arts, and Commerce Faculty & Students, interested in Management & Entrepreneurship.',
  'Young professionals, Entrepreneurs (e.g, Product, Brand, and R&D Managers), and aspiring Entrepreneurs planning to launch new products or start a new business venture.',
  'Micro Entrepreneurs, MSMEs, and Family Business Owners.',
  'Faculty, Incubator Managers, and R&D Laboratory Heads.',
];

const layoutWeeks = [
  { label: 'Week 1:', desc: "Introductory Module, Introduction to Disciplined Innovation, Technology Landscape & Commercialisation Approaches, Global Technology Landscape, 'Problem Pull' vs. 'Technology Push', Industry Expert Session." },
  { label: 'Week 2:', desc: "'Problem Pull' Technology Development, 8C Problem Discovery Framework, 8P Product Innovation Framework." },
  { label: 'Week 3:', desc: 'Problem Pull Technology Development (Contd), WIMF – Winning in Market Framework 1 – Creating Customer Value, WIMF – Winning in Market Framework 2 – Delivering Customer Value.' },
  { label: 'Week 4:', desc: 'Technology Translation & Commercialisation, Technology Readiness Assessment – TRL Framework, Translational Research, Technology Commercialisation, Industry Expert Session.' },
  { label: 'BONUS Module:', desc: 'Disciplined Innovation - Customised AI Tools.' },
];

const books = [
  'Accelerated Startup Discovery Process - Devdip Purkayastha, 2022/24 Edition.',
  'Marketing Management | Philip Kotler, Kevin Keller, Alexander Chernev, Jagdiah Sheth, G Shainesh | Pearson Paperback – 16th Edition, India Case Studies.',
  'Startup Case Studies - Devdip Purkayastha, 2024 Edition.',
  'Various Industry Reports, Company Analysis, Websites: Will be referred to and provided with links during the course modules.',
];

// ── Week 1 Quiz Questions (exact from screenshots) ──
const quiz1Questions = [
  {
    // Q1 — correct: [2]
    q: 'Why are breakthrough innovations extremely rare among new product launches in India?',
    options: [
      'High cost of technology development',
      'Limited availability of skilled engineers',
      'Difficulty in simultaneously achieving relevance, endurance, and distinctiveness',
      'Lack of government funding',
    ],
    correct: [2],
    type: 'single',
  },
  {
    // Q2 — correct: [1]
    q: 'In the Nielsen Breakthrough Innovation framework, endurance refers to:',
    options: [
      'Product survival beyond ideation',
      'Sustained revenue performance after launch',
      'Long development timelines',
      'Ability to withstand competitive pricing',
    ],
    correct: [1],
    type: 'single',
  },
  {
    // Q3 — correct: [2]
    q: 'The Accelerated Startup Discovery Process (ASDP) is best described as:',
    options: [
      'A linear business planning tool',
      'A funding-driven accelerator model',
      'A discovery-driven and iterative entrepreneurial methodology',
      'A technology-first product development model',
    ],
    correct: [2],
    type: 'single',
  },
  {
    // Q4 — correct: [2]  ← WRONG (user picks [0])
    q: 'Which principle best represents the core philosophy of ASDP?',
    options: [
      'Perfecting ideas before market entry',
      'Rapid scaling to capture market share',
      'Systematic testing of assumptions using real-world evidence',
      'Prioritizing technological sophistication',
    ],
    correct: [2],
    type: 'single',
  },
  {
    // Q5 — correct: [2]
    q: 'According to startup failure data discussed in the course, the most common reason startups fail is:',
    options: [
      'Weak technology',
      'Insufficient funding',
      'Lack of market need',
      'Poor legal compliance',
    ],
    correct: [2],
    type: 'single',
  },
  {
    // Q6 — correct: [2]
    q: 'Which of the following is NOT an outcome of the ASDP framework?',
    options: [
      'Discovery of customer value proposition',
      'Discovery of go-to-market strategy',
      'Guaranteed commercial success',
      'Discovery of business model and growth strategy',
    ],
    correct: [2],
    type: 'single',
  },
  {
    // Q7 — correct: [2]
    q: 'The primary objective of Disciplined Innovation is to:',
    options: [
      'Eliminate entrepreneurial uncertainty',
      'Replace creativity with rigid processes',
      'Provide structured checkpoints and continuous evaluation',
      'Focus only on incremental innovation',
    ],
    correct: [2],
    type: 'single',
  },
  {
    // Q8 — correct: [1]
    q: 'The 8C Problem Discovery framework is mainly used to:',
    options: [
      'Assess technology maturity',
      'Understand customer problems in depth',
      'Design financial projections',
      'Evaluate intellectual property strength',
    ],
    correct: [1],
    type: 'single',
  },
  {
    // Q9 — correct: [2]
    q: 'Which framework focuses on ensuring that a product succeeds in the market?',
    options: [
      'Technology Readiness Levels (TRL)',
      '8P Product Development',
      'Winning-in-Market Framework (WIMF)',
      'Translational Research Model',
    ],
    correct: [2],
    type: 'single',
  },
  {
    // Q10 — correct: [1]  ← WRONG (user picks [0])
    q: 'Translational research is important for technology commercialization because it:',
    options: [
      'Emphasizes academic publication',
      'Bridges laboratory research and market application',
      'Eliminates the need for customer validation',
      'Focuses only on patent filing',
    ],
    correct: [1],
    type: 'single',
  },
];

// 8 correct, 2 wrong: Q4 (index 3) and Q10 (index 9) are wrong
const quiz1UserAnswers = quiz1Questions.map((q, i) => {
  if (i === 3) return [0]; // Wrong: picks "Perfecting ideas before market entry"
  if (i === 9) return [0]; // Wrong: picks "Emphasizes academic publication"
  return [...q.correct];   // All others correct
});

// ── Week 2 Quiz Questions ──
const quiz2Questions = [
  {
    q: 'The primary objective of the 8C Problem Discovery Framework is to:',
    options: [
      'Accelerate production scaling',
      'Ensure holistic assessment before solution development',
      'Design production factory',
      'Create advertising campaign',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which of the following Cs is part of the External Assessment in the 8C Framework?',
    options: [
      'Capability',
      'Cognition',
      'Competition',
      'Collaboration',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Under Category Assessment in the 8C Framework, which of the following is analyzed?',
    options: [
      'Regulatory challenges within the category',
      'Organizational culture',
      'Intellectual portfolio',
      'Prototype durability',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: 'Country Assessment in the 8C Framework primarily examines:',
    options: [
      'Technology convergence trends',
      'Cultural and geopolitical factors affecting adoption',
      'Internal risk management processes',
      'Product pricing models',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: "BlackBerry's market loss illustrates failure in which dimensions of the 8C Framework?",
    options: [
      'Capability and Cognition',
      'Country and Convergence',
      'Category and Collaboration',
      'Customer and Competition',
    ],
    correct: [3],
    type: 'single',
  },
  {
    q: 'Convergence in the 8C Framework focuses on:',
    options: [
      'Scaling manufacturing capacity',
      'Optimizing distribution logistics',
      'Integrating multiple technologies for innovation',
      'Budget forecasting',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Which of the following skills is explicitly mentioned under Problem Discovery Skills?',
    options: [
      'Ethical considerations in problem discovery',
      'Assembly line engineering',
      'Patent drafting',
      'Automation optimization',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: 'The 8P Product Development Framework is part of the broader concept of:',
    options: [
      'Agile Manufacturing',
      'Disciplined Innovation',
      'Lean Production',
      'Blue Ocean Strategy',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'P1: Problem Definition in 8P Product Development Framework emphasizes:',
    options: [
      'Prototype fabrication',
      'Pricing strategy optimization',
      'Scaling production',
      'Identifying customer pain points and validating market need',
    ],
    correct: [3],
    type: 'single',
  },
  {
    q: 'In P2 of the 8P product development framework, "user personas" are defined primarily to:',
    options: [
      'Estimate production costs',
      'Guide user-centered design decisions',
      'Secure patents',
      'Automate assembly',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which of the following is evaluated under "P3: Product Technology" of the product development framework?',
    options: [
      'Psychological pricing tactics',
      'Geographic expansion strategy',
      'Feasibility studies and technology validation',
      'Market segmentation',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: '"P4: Price–Cost–Benefit Test" of the product development framework requires:',
    options: [
      'Analysis of production cost, customer value, and profit margins',
      'Only competitor price benchmarking',
      'Patent valuation',
      'Supply chain mapping',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: '"Prototype Testing (P5)" of the product development framework involves:',
    options: [
      'Final mass production',
      'Brand positioning',
      'Export documentation',
      'Usability and functional validation before scaling',
    ],
    correct: [3],
    type: 'single',
  },
  {
    q: '"P6: Produceability, Quality, and Serviceability" of the product development framework focuses on:',
    options: [
      'Advertising strategy',
      'Manufacturing feasibility and lifecycle reliability',
      'Investor relations',
      'Customer segmentation',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: '"Production Scaling (P8)" of the product development framework includes which of the following?',
    options: [
      'Ideation workshops',
      'User persona creation',
      'Capacity analysis and supply chain optimization',
      'Market entry pricing',
    ],
    correct: [2],
    type: 'single',
  },
];

const quiz2WrongIndices = [0, 2, 4, 7, 10, 13];
const quiz2UserAnswers = quiz2Questions.map((q, i) => {
  if (quiz2WrongIndices.includes(i)) {
    return [q.correct[0] === 0 ? 1 : 0];
  }
  return [...q.correct];
});

// ── Week 3 Quiz Questions ──
const quiz3Questions = [
  {
    q: 'The primary objective of the Winning in Market Framework (WIMF) is to:',
    options: [
      'Improve laboratory research outcomes',
      'Integrate marketing and finance functions only',
      'Ensure systematic creation and delivery of value across customer touchpoints',
      'Replace traditional product development models',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: "Which WIM component focuses primarily on differentiating the product in the customer's mind?",
    options: [
      'WIM1 – Value Proposition',
      'WIM2 – Market Positioning',
      'WIM3 – Pricing & Promotion',
      'WIM5 – Social Media Influencing',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Which company example illustrates failure due to poor adaptation of the value proposition to "digital disruption" as discussed in the lecture?',
    options: [
      'Tesla',
      'SAP',
      'Nike',
      'Kodak',
    ],
    correct: [3],
    type: 'single',
  },
  {
    q: 'WIM3 (Pricing & Promotion) requires that pricing should:',
    options: [
      'Always be lower than competitors',
      'Focus only on cost leadership',
      "Reflect the product's value while remaining competitive",
      'Remain fixed across all markets',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: "The 'Intel Inside' campaign which is discussed in the course is primarily an example of effective:",
    options: [
      'Branding & Advertising',
      'B2B selling',
      'Omnichannel logistics',
      'Customer loyalty management',
    ],
    correct: [0],
    type: 'single',
  },
  {
    q: 'According to WIM1 (Value Proposition), an effective value proposition should:',
    options: [
      'Solve a real customer problem',
      'Be unique or superior to competitors',
      'Remain rigid and unchangeable',
      "Reflect the product's novel technology",
    ],
    correct: [0, 1, 3],
    type: 'multi',
  },
  {
    q: 'Which benefit of Winning in Market Framework is particularly emphasized for R&D Managers?',
    options: [
      'Increasing discount-based sales',
      'Aligning R&D activities with market needs and opportunities',
      'Eliminating customer feedback loops',
      'Reducing branding expenditure',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'WIM2 (Market Positioning) evaluates positioning based on:',
    options: [
      'Differentiation in crowded markets',
      'Alignment with brand authenticity',
      'Clear competitor comparison',
      'Random promotional experimentation',
    ],
    correct: [0, 1, 2],
    type: 'multi',
  },
  {
    q: 'Effective "Pricing & Promotion" strategies under WIM3 include:',
    options: [
      'Ignoring competitor pricing',
      'Measuring the impact of promotional strategies',
      'Transparent communication of offers',
      'Encouraging long-term engagement and loyalty',
    ],
    correct: [1, 2, 3],
    type: 'multi',
  },
  {
    q: 'Which WIM element explicitly addresses integration across physical and digital channels?',
    options: [
      'WIM5 – Social Media Influencing',
      'WIM6 – B2B & B2C Selling',
      'WIM7 – Omnichannel Distribution & Logistics',
      'WIM8 – Customer Service & Loyalty',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Under WIM4 (Branding & Advertising), effectiveness is strengthened when:',
    options: [
      'Brand messaging is consistent across channels',
      'Advertising ignores corporate customers',
      'Storytelling is used strategically',
      'Metrics are used to evaluate branding impact',
    ],
    correct: [0, 2, 3],
    type: 'multi',
  },
  {
    q: 'WIM5 (Social Media Influencing) emphasizes:',
    options: [
      'Influencer alignment with brand values',
      'Measuring engagement and conversion',
      'Complete detachment from other marketing strategies',
      'Direct customer engagement mechanisms',
    ],
    correct: [0, 1, 3],
    type: 'multi',
  },
  {
    q: 'The Winning in Market framework contributes to CEOs/CXOs primarily by providing:',
    options: [
      'Technical patent analysis',
      'A comprehensive alignment between products and market needs',
      'Manufacturing automation tools',
      'Legal compliance strategies',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'WIM6 (B2B & B2C Selling) requires organizations to:',
    options: [
      'Avoid adapting to market changes',
      'Emphasize product value and technology during sales',
      'Tailor strategies for B2B and B2C markets',
      'Foster long-term customer relationships',
    ],
    correct: [1, 2, 3],
    type: 'multi',
  },
  {
    q: 'According to WIM8 (Customer Service & Loyalty), strong customer advocacy is built through:',
    options: [
      'Loyalty programs',
      'Customer feedback mechanisms',
      'Consistent service across touchpoints',
      'Frequent price increases',
    ],
    correct: [0, 1, 2],
    type: 'multi',
  },
];

const quiz3UserAnswers = quiz3Questions.map((q, i) => {
  const wrongIndices = [2, 6, 7];
  if (wrongIndices.includes(i)) {
    const wrongOpt = [0, 1, 2, 3].find(x => !q.correct.includes(x));
    return [wrongOpt];
  }
  return [...q.correct];
});

// ── Week 4 Quiz Questions ──
const quiz4Questions = [
  {
    q: 'Translational research is best described as:',
    options: [
      'Research conducted without thought of practical ends',
      'Systematic application of science for a specific business purpose',
      'Conversion of basic research results into outcomes that directly benefit society',
      'Commercial licensing of patents only',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'During the Seed Stage of technology evolution, key considerations included:',
    options: [
      'Safety and reliability of systems',
      'Integration into the manufacturing environment',
      'Large-scale global marketing campaigns',
      'Minimal maintenance over long lifespan',
    ],
    correct: [0, 1, 3],
    type: 'multi',
  },
  {
    q: 'TRL 6 corresponds to:',
    options: [
      'Basic principles observed',
      'Experimental proof of concept',
      'System complete and qualified',
      'Technology demonstrated in relevant environment',
    ],
    correct: [3],
    type: 'single',
  },
  {
    q: 'Barriers to success in "technology push" include:',
    options: [
      'Strong communication between developer and user',
      'High development costs',
      'Lack of user conviction about value',
      'Difficulty in displacing entrenched products',
    ],
    correct: [1, 2, 3],
    type: 'multi',
  },
  {
    q: 'In the TRL framework, transition from technology development to business development begins prominently at:',
    options: [
      'TRL 1',
      'TRL 3',
      'TRL 7',
      'TRL 9',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Improving technology push requires:',
    options: [
      'Early involvement of potential users',
      'Iterative trial-and-modify cycles',
      'Avoiding exposure to external technologies',
      'Demonstration in user facilities',
    ],
    correct: [0, 1, 3],
    type: 'multi',
  },
  {
    q: 'The primary objective of TRL 0 is:',
    options: [
      'Prototype validation',
      'Market and commercialization strategy analysis',
      'System qualification',
      'Full-scale production',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'The critical Success Factors in external technology acquisition include dedicated personnel to:',
    options: [
      'give consistent external presence',
      'avoid developing partnerships',
      'coordinate internally',
      'develop implementation skills',
    ],
    correct: [0, 2, 3],
    type: 'multi',
  },
  {
    q: "Evolution of MNC R&D to a 'network structure' reflects:",
    options: [
      'Decline in globalization',
      'Centralization of innovation',
      'Trends in Globalization of R&D',
      'Elimination of collaboration',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'An effective IP strategy should:',
    options: [
      'Ignore freedom to operate',
      'Support long-term development goals',
      'Focus on competitive advantage',
      'Manage third-party IP risks',
    ],
    correct: [1, 2, 3],
    type: 'multi',
  },
  {
    q: "'Patents are only part of the game' implies that:",
    options: [
      'Patents are unnecessary',
      'Success depends solely on legal protection',
      'Brand, execution, and speed matter',
      'Patent protection lasts indefinitely',
    ],
    correct: [2],
    type: 'single',
  },
  {
    q: 'Open Innovation emphasizes:',
    options: [
      'Harnessing the power of the crowd',
      'Avoiding NIH (Not Invented Here) syndrome',
      'Restricting innovation internally',
      'Leveraging prediction markets',
    ],
    correct: [0, 1, 3],
    type: 'multi',
  },
  {
    q: "In technology push, 'Symbiosis' refers to:",
    options: [
      'Government funding partnerships',
      'Parallel development of products and markets',
      'Patent litigation',
      'Centralized R&D budgeting',
    ],
    correct: [1],
    type: 'single',
  },
  {
    q: 'Lessons in commercialization highlight importance of:',
    options: [
      'Understand what customers want from technology and how much they will pay for it',
      'Attention to economics is crucial at every stage',
      'Supporting the product till the product reaches the market',
      'Assuming customers know all their needs',
    ],
    correct: [0, 1, 2],
    type: 'multi',
  },
  {
    q: 'The "Technology Acquisition Grid" helps organizations to:',
    options: [
      'categorize technologies by TRL',
      'decide between known/new technologies and markets',
      'replace internal R&D',
      'eliminate external sourcing',
    ],
    correct: [1],
    type: 'single',
  },
];

const quiz4WrongIndices = [4, 8, 11];
const quiz4UserAnswers = quiz4Questions.map((q, i) => {
  if (quiz4WrongIndices.includes(i)) {
    const wrongOpt = [0, 1, 2, 3].find(x => !q.correct.includes(x));
    return [wrongOpt];
  }
  return [...q.correct];
});

// ── Helper: check if a single answer is correct ──
function isAnswerCorrect(qq, chosen) {
  const correct = qq.correct;
  return (
    chosen.length === correct.length &&
    chosen.every(a => correct.includes(a)) &&
    correct.every(c => chosen.includes(c))
  );
}

// ── Helper: compute assignment scores ──
function computeAssignmentScores() {
  const quizzes = [
    { name: 'Week 1: Assignment 1', questions: quiz1Questions, answers: quiz1UserAnswers },
    { name: 'Week 2: Assignment 2', questions: quiz2Questions, answers: quiz2UserAnswers },
    { name: 'Week 3: Assignment 3', questions: quiz3Questions, answers: quiz3UserAnswers },
    { name: 'Week 4: Assignment 4', questions: quiz4Questions, answers: quiz4UserAnswers },
  ];
  return quizzes.map(({ name, questions, answers }) => {
    const score = questions.filter((q, i) => isAnswerCorrect(q, answers[i])).length;
    return { name, score, total: questions.length };
  });
}

// ── Compute overall progress percent from quiz scores ──
function computeProgressPercent() {
  const allQuizzes = [
    { q: quiz1Questions, a: quiz1UserAnswers },
    { q: quiz2Questions, a: quiz2UserAnswers },
    { q: quiz3Questions, a: quiz3UserAnswers },
    { q: quiz4Questions, a: quiz4UserAnswers },
  ];
  let totalCorrect = 0;
  let totalQuestions = 0;
  allQuizzes.forEach(({ q, a }) => {
    totalQuestions += q.length;
    totalCorrect += q.filter((qq, i) => isAnswerCorrect(qq, a[i])).length;
  });
  return parseFloat(((totalCorrect / totalQuestions) * 100).toFixed(2));
}

// ── Student Progress Report Page ──
function StudentProgressPage({ progressPercent, onBack }) {
  const [openSection, setOpenSection] = useState(null);
  const assignments = computeAssignmentScores();

  const unitWiseData = [
    { unit: 'About NPTEL', lessonPct: 0, hasAssignment: false },
    { unit: 'How does an NPTEL online course work?', lessonPct: 0, hasAssignment: false },
    { unit: 'Week 0', lessonPct: 100, hasAssignment: false },
    { unit: 'Week 1', lessonPct: 50, hasAssignment: true, assignPct: 100 },   // ← was 0
    { unit: 'Week 2', lessonPct: 28.57, hasAssignment: true, assignPct: 100 }, // ← was 0
    { unit: 'Week 3', lessonPct: 0, hasAssignment: true, assignPct: 100 },     // ← was 0
    { unit: 'Week 4', lessonPct: 16.67, hasAssignment: true, assignPct: 100 }, // ← was 0
  ];

  const toggleSection = (section) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden', background: '#f0f2f5' }}>
      {/* LEFT INFO PANEL */}
      <div className="spr-standalone-left">
        <div className="spr-course-title">
          Technology Commercialization &amp; New Product Development
        </div>
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
          <div className="spr-info-value">e23cseu0530@bennett.edu.in</div>
        </div>
        <div className="spr-info-row">
          <div className="spr-info-label">Name</div>
          <div className="spr-info-value spr-name">Arshit</div>
        </div>
      </div>

      {/* RIGHT CONTENT PANEL */}
      <div className="spr-standalone-right">
        <div className="spr-back-link" onClick={onBack}>← Back to Course Outline</div>
        <h2 className="spr-page-title">Student Progress Report</h2>

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
  const displayScores = [80, 70, 90, 70];
  return (
    <tr key={a.name}><td>{a.name}</td><td>{displayScores[i]}</td></tr>
  );
})}
                </tbody>
              </table>
            </div>
          )}
        </div>

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
                            <div
                              className="spr-progress-bar-fill"
                              style={{ width: `${u.lessonPct}%`, background: u.lessonPct > 0 ? '#4caf50' : '#bdbdbd' }}
                            />
                          </div>
                          <span className="spr-progress-pct">
                            {u.lessonPct % 1 !== 0 ? u.lessonPct.toFixed(2) : u.lessonPct}%
                          </span>
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
              <p><strong>Date and Time of Exams:</strong> April 18, 2026 Morning session 9am to 12 noon; Afternoon Session 2pm to 5pm.</p>
              <p><strong>Registration url:</strong> Announcements will be made when the registration form is open for registrations.</p>
              <p>The online registration form has to be filled and the certification exam fee needs to be paid. More details will be made available when the exam registration form is published.</p>
              <p>Please check the form for more details on the cities where the exams will be held, the conditions you agree to when you fill the form etc.</p>
              <h4 className="spr-policy-heading">CRITERIA TO GET A CERTIFICATE</h4>
              <ul className="spr-policy-list">
                <li>Average assignment score = 25% of average of best 3 assignments out of the total 4 assignments given in the course.</li>
                <li>Exam score = 75% of the proctored certification exam score out of 100</li>
                <li>Final score = Average assignment score + Exam score</li>
                <li>Please note that assignments encompass all types (including quizzes, programming tasks, and essay submissions) available in the specific week.</li>
              </ul>
              <div className="spr-criteria-box">
                <strong>YOU WILL BE ELIGIBLE FOR A CERTIFICATE ONLY IF AVERAGE ASSIGNMENT SCORE &gt;=10/25 AND EXAM SCORE &gt;= 30/75.</strong>
              </div>
              <p>If one of the 2 criteria is not met, you will not get the certificate even if the Final score &gt;= 40/100.</p>
              <p>Certificate will have your name, photograph and the score in the final exam with the breakup. It will have the logos of NPTEL and IIT Bombay.</p>
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

// ── Main Page Component ──
function TechnologyCommercialization() {
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
      navigate(`/tech-commercialization?quiz=${quizParam}`);
    }, 1000);
  };

  const progressPercent = computeProgressPercent();

  const allQuizzes = [
    { q: quiz1Questions, a: quiz1UserAnswers },
    { q: quiz2Questions, a: quiz2UserAnswers },
    { q: quiz3Questions, a: quiz3UserAnswers },
    { q: quiz4Questions, a: quiz4UserAnswers },
  ];

  const completedAssignments = allQuizzes.filter(({ q, a }) =>
    q.every((qq, i) => isAnswerCorrect(qq, a[i]))
  ).length;

  // ── Progress page: full-width, no sidebar ──
  if (showProgressPage) {
    return (
      <div className="nptel-course-page">
        {loading && <div className="loading-overlay"><div className="loading-spinner" /></div>}
        <div style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '52px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {['About the course', 'Announcements', 'My Bookmarks', 'Q&A'].map(item => (
                <span key={item} className={`nptel-course-nav-item${item === 'Announcements' ? ' nptel-course-nav-active' : ''}`}>
                  {item}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#555', cursor: 'pointer' }}>accessibility</span>
              <div className="nptel-user-avatar">AT</div>
            </div>
          </div>
        </div>
        <StudentProgressPage progressPercent={progressPercent} onBack={() => setShowProgressPage(false)} />
      </div>
    );
  }

  // ── Normal layout with sidebar ──
  return (
    <div className="nptel-course-page">
      {loading && <div className="loading-overlay"><div className="loading-spinner" /></div>}

      <div className="nptel-layout">
        {/* LEFT SIDEBAR */}
        <aside className="nptel-sidebar">
          <div className="nptel-sidebar-header">
            <div className="nptel-sidebar-close">
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#555', cursor: 'pointer' }}>close</span>
            </div>
            <div className="nptel-sidebar-course-title">
              Technology Commercialization &amp; New Product Dev...
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
            {outlineItems.map((item) => {
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

                        const isActive = quizParam === activePage;
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
                <span className="nptel-course-nav-item">About the course</span>
                <span className="nptel-course-nav-item nptel-course-nav-active">Announcements</span>
                <span className="nptel-course-nav-item">My Bookmarks</span>
                <span className="nptel-course-nav-item">Q&amp;A</span>
              </div>
              <div className="nptel-course-nav-right">
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#555', cursor: 'pointer' }}>accessibility</span>
                <div className="nptel-user-avatar">AT</div>
              </div>
            </div>
          </div>

          <div className="nptel-content-body">
            {activePage === 'quiz1' ? (
              <QuizPage title="Week 1: Assignment 1" dueDate="2026-02-25" questions={quiz1Questions} userAnswers={quiz1UserAnswers} />
            ) : activePage === 'quiz2' ? (
              <QuizPage title="Week 2: Assignment 2" dueDate="2026-03-04" questions={quiz2Questions} userAnswers={quiz2UserAnswers} />
            ) : activePage === 'quiz3' ? (
              <QuizPage title="Week 3: Assignment 3" dueDate="2026-03-11" questions={quiz3Questions} userAnswers={quiz3UserAnswers} />
            ) : activePage === 'quiz4' ? (
              <QuizPage title="Week 4: Assignment 4" dueDate="2026-03-18" questions={quiz4Questions} userAnswers={quiz4UserAnswers} />
            ) : (
              <>
                <h1>Technology Commercialization &amp; New Product Development</h1>
                <div className="intro-grid">
                  <div>
                    <h3>ABOUT THE COURSE:</h3>
                    <h4>Disciplined Innovation</h4>
                    <p>Participants will be introduced to <strong>"Disciplined Innovation"</strong>, a practical methodology to navigate the complexities of bringing ideas to market.</p>
                    <ol>
                      {highlights.map(({ label, desc }) => (
                        <li key={label}><strong>{label}</strong> {desc}</li>
                      ))}
                    </ol>
                    <h4>Access to customised AI Tools</h4>
                    <p>Participants will get access to <strong>customised AI Tools</strong> and be able to explore a wide range of Startup Business Ideas.</p>
                  </div>
                  <iframe
                    className="intro-image"
                    src="https://www.youtube.com/embed/-jxH0DGIKx4"
                    title="Course Introduction"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="details-section">
                  <h3>INTENDED AUDIENCE:</h3>
                  <ul>{audience.map((item) => <li key={item}>{item}</li>)}</ul>
                  <div className="prof-card">
                    <div className="prof-left">
                      <img className="prof-image" src="https://storage.googleapis.com/swayam-node1-production.appspot.com/instructor/assets/i_1839.png" alt="Prof. Devdip Purkayastha" />
                      <div className="prof-name">Prof. Devdip Purkayastha</div>
                      <div className="prof-institute">IIT Bombay</div>
                    </div>
                    <div className="prof-bio">
                      <p>Prof. Devdip Purkayastha is a full time Professor-of-Practice at IIT Bombay.</p>
                    </div>
                  </div>
                  <div className="prof-card">
                    <div className="prof-left">
                      <img className="prof-image" src="https://storage.googleapis.com/swayam2-node/Jan2026_instructor_images/105_Jan_26.jpg" alt="Prof. Rajkumar Hirwani" />
                      <div className="prof-name">Prof. Rajkumar Hirwani</div>
                      <div className="prof-institute">IIT Bombay</div>
                    </div>
                    <div className="prof-bio">
                      <p>Prof. Raj Hirwani has 40+ years of experience in Research, Technology and IP Management.</p>
                    </div>
                  </div>
                  <h3>COURSE LAYOUT</h3>
                  <ul>{layoutWeeks.map(({ label, desc }) => (<li key={label}><strong>{label}</strong> {desc}</li>))}</ul>
                  <h3>BOOKS AND REFERENCES</h3>
                  <ul>{books.map((item) => <li key={item}>{item}</li>)}</ul>
                  <h3>CERTIFICATE</h3>
                  <p>The course is free to enroll and learn from. But if you want a certificate, you have to register and write the proctored exam.</p>
                  <p>The exam is optional for a fee of <strong>Rs 1000/- (Rupees one thousand only)</strong>.</p>
                  <p>Date and Time of Exams: <strong>April 18, 2026</strong> Morning session 9am to 12 noon; Afternoon Session 2pm to 5pm.</p>
                  <h3>CRITERIA TO GET A CERTIFICATE</h3>
                  <p>Average assignment score = 25% of average of best 3 assignments out of the total 4 assignments given in the course.</p>
                  <p>Exam score = 75% of the proctored certification exam score out of 100.</p>
                  <p><strong>Final score = Average assignment score + Exam score</strong></p>
                  <div className="criteria-note">
                    <strong>YOU WILL BE ELIGIBLE FOR A CERTIFICATE ONLY IF AVERAGE ASSIGNMENT SCORE &gt;=10/25 AND EXAM SCORE &gt;= 30/75.</strong>
                  </div>
                  <p><em>- NPTEL team</em></p>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TechnologyCommercialization;