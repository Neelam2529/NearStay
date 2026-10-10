const pptxgen = require('pptxgenjs');
const path = require('path');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Modern Startup Color Palette
const C = {
  navy: '0B0F19',
  darkCard: '151D2E',
  teal: '0D9488',
  tealLight: '14B8A6',
  amber: 'F59E0B',
  red: 'EF4444',
  textLight: 'F8FAFC',
  textMuted: '94A3B8',
  white: 'FFFFFF',
  slateBg: 'F1F5F9',
  slateCard: 'FFFFFF',
  slateDark: '0F172A',
  border: 'E2E8F0',
};

const imgExterior1 = path.join(__dirname, 'images', 'hostel_exterior_1.jpg');
const imgExterior2 = path.join(__dirname, 'images', 'hostel_exterior_2.jpg');
const imgRoomDeluxe = path.join(__dirname, 'images', 'hostel_room_deluxe.jpg');
const imgMess = path.join(__dirname, 'images', 'hostel_mess_1.jpg');
const imgStudy = path.join(__dirname, 'images', 'hostel_lounge_study.jpg');

// =========================================================================
// SLIDE 1: TITLE SLIDE (Showstopper Modern Hero Deck)
// =========================================================================
const s1 = pres.addSlide();
s1.background = { color: C.navy };

// Left Side: Branding & Team
s1.addText('FULL STACK DEVELOPMENT (FSD) LAB PROJECT', {
  x: 0.8, y: 0.8, w: 6.5, h: 0.35,
  fontSize: 11, fontFace: 'Arial', bold: true, color: C.tealLight, letterSpacing: 2
});

s1.addText('NEARSTAY', {
  x: 0.8, y: 1.2, w: 6.5, h: 1.2,
  fontSize: 48, fontFace: 'Arial', bold: true, color: C.white
});

s1.addText('One App. Every Room Nearby.', {
  x: 0.8, y: 2.35, w: 6.5, h: 0.5,
  fontSize: 18, fontFace: 'Arial', color: C.amber, italic: true
});

s1.addText('A real-time full stack web platform connecting students with verified hostels & PGs with live room availability, transparent pricing & zero brokerage.', {
  x: 0.8, y: 2.9, w: 5.6, h: 1.1,
  fontSize: 13, fontFace: 'Arial', color: C.textMuted, lineSpacing: 18
});

// Team Card (Left Bottom)
s1.addShape(pres.ShapeType.roundRect, {
  x: 0.8, y: 4.2, w: 5.6, h: 2.2,
  rectRadius: 0.1, fill: { color: C.darkCard }, line: { color: '243048', width: 1 }
});

s1.addText('PROJECT CONTRIBUTORS', {
  x: 1.1, y: 4.4, w: 5.0, h: 0.25,
  fontSize: 10, fontFace: 'Arial', bold: true, color: C.tealLight, letterSpacing: 1.5
});

s1.addText('1. Neelam Jashwanth  (Roll No: 24CSB0A49)\n2. Venu Gopala Dasari (Roll No: 24CSB0A84)', {
  x: 1.1, y: 4.75, w: 5.0, h: 0.9,
  fontSize: 14, fontFace: 'Arial', bold: true, color: C.white, lineSpacing: 22
});

s1.addText('Department of Computer Science & Engineering (CSE)', {
  x: 1.1, y: 5.75, w: 5.0, h: 0.35,
  fontSize: 11, fontFace: 'Arial', color: '64748B'
});

// Right Side: Hero Image with sleek rounded border
s1.addImage({
  path: imgExterior1,
  x: 6.8, y: 0.8, w: 5.6, h: 5.6,
  rounding: true
});


// Helper for Clean Modern Header (Slides 2-7)
function createHeader(slide, category, title) {
  slide.background = { color: 'F8FAFC' };

  slide.addText(category.toUpperCase(), {
    x: 0.8, y: 0.45, w: 11.7, h: 0.25,
    fontSize: 10, fontFace: 'Arial', bold: true, color: C.teal, letterSpacing: 2
  });

  slide.addText(title, {
    x: 0.8, y: 0.7, w: 11.7, h: 0.55,
    fontSize: 24, fontFace: 'Arial', bold: true, color: C.slateDark
  });

  slide.addShape(pres.ShapeType.line, {
    x: 0.8, y: 1.3, w: 11.7, h: 0,
    line: { color: 'E2E8F0', width: 1 }
  });
}


// =========================================================================
// SLIDE 2: THE PROBLEM (Clear, Split Layout with Real Context Image)
// =========================================================================
const s2 = pres.addSlide();
createHeader(s2, 'Current Reality', 'The Problem: Why Student Accommodation Hunting is Broken');

// Left Column: 3 Major Pain Points
const pPoints = [
  {
    title: '1. Blind & Exhausting Offline Search',
    desc: 'New college students walk 10-15 km in hot sun checking hostels one-by-one with zero real-time visibility into whether rooms are actually vacant.'
  },
  {
    title: '2. Exploitation by Unregistered Brokers',
    desc: 'Local offline agents charge 50% to 100% of the first month’s rent as heavy brokerage commission without offering any legal safety guarantee.'
  },
  {
    title: '3. Outdated Classifieds & Fake Photos',
    desc: 'Traditional classifieds (OLX, Facebook groups) feature dead phone numbers, misleading old pictures, and uninspected food mess claims.'
  }
];

pPoints.forEach((p, idx) => {
  const y = 1.6 + idx * 1.65;

  s2.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: y, w: 6.2, h: 1.45,
    rectRadius: 0.08, fill: { color: 'FFFFFF' }, line: { color: 'FCA5A5', width: 1.5 }
  });

  s2.addText(p.title, {
    x: 1.05, y: y + 0.15, w: 5.7, h: 0.35,
    fontSize: 14, fontFace: 'Arial', bold: true, color: 'B91C1C'
  });

  s2.addText(p.desc, {
    x: 1.05, y: y + 0.5, w: 5.7, h: 0.85,
    fontSize: 12, fontFace: 'Arial', color: '475569', lineSpacing: 16
  });
});

// Right Column: Real Street/Hostel Context Image
s2.addImage({
  path: imgExterior2,
  x: 7.3, y: 1.6, w: 5.2, h: 4.75,
  rounding: true
});


// =========================================================================
// SLIDE 3: THE SOLUTION (NearStay Architecture & Image)
// =========================================================================
const s3 = pres.addSlide();
createHeader(s3, 'Our Innovation', 'The Solution: How NearStay Solves This');

const solPoints = [
  {
    title: '⚡ Live Room-Level Availability Matrix',
    desc: 'Students can view floor-wise vacant rooms in real-time (Green = Available, Dark = Occupied) and pick their exact room before visiting.'
  },
  {
    title: '🛡️ 100% Zero-Brokerage Direct Model',
    desc: 'Direct connection between students and verified property wardens with ₹0 platform commission or hidden middleman charges.'
  },
  {
    title: '🍛 Inspected Weekly Food Mess Schedules',
    desc: 'Clear 7-day breakfast, lunch, and dinner menus verified on-ground to eliminate food disputes and ensure hygiene.'
  }
];

solPoints.forEach((s, idx) => {
  const y = 1.6 + idx * 1.65;

  s3.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: y, w: 6.2, h: 1.45,
    rectRadius: 0.08, fill: { color: 'FFFFFF' }, line: { color: '99F6E4', width: 1.5 }
  });

  s3.addText(s.title, {
    x: 1.05, y: y + 0.15, w: 5.7, h: 0.35,
    fontSize: 14, fontFace: 'Arial', bold: true, color: C.teal
  });

  s3.addText(s.desc, {
    x: 1.05, y: y + 0.5, w: 5.7, h: 0.85,
    fontSize: 12, fontFace: 'Arial', color: '475569', lineSpacing: 16
  });
});

// Right Column: Deluxe Room Interior
s3.addImage({
  path: imgRoomDeluxe,
  x: 7.3, y: 1.6, w: 5.2, h: 4.75,
  rounding: true
});


// =========================================================================
// SLIDE 4: SYSTEM ARCHITECTURE & FULL STACK TECH
// =========================================================================
const s4 = pres.addSlide();
createHeader(s4, 'Engineering Stack', 'Full Stack System Architecture');

const stack = [
  {
    layer: '1. FRONTEND UI',
    tech: 'HTML5 · CSS3 · ES6+ JS',
    bullets: '• Modular Semantic Layout\n• Custom CSS Design System\n• Dark / Light Theme Engine\n• Interactive Photo Carousels\n• Client-side State Cache'
  },
  {
    layer: '2. BACKEND & LOGIC',
    tech: 'Node.js · Firebase Compat',
    bullets: '• Student & Warden Auth\n• Dynamic Pricing Engine\n• Coupon Validation Logic\n• Real-Time Event Sync\n• Responsive Webhooks'
  },
  {
    layer: '3. DATABASE LAYER',
    tech: 'Google Cloud Firestore',
    bullets: '• NoSQL Document Store\n• `onSnapshot` Live Listeners\n• Atomic Room State Locks\n• Sub-second Latency Sync\n• Offline Cache Fallback'
  },
  {
    layer: '4. HOSTING & CLOUD',
    tech: 'Firebase Edge CDN',
    bullets: '• Global Edge Delivery\n• 256-bit SSL Security\n• 99.9% Uptime Guarantee\n• Instant CI/CD Deploy\n• Zero Server Maintenance'
  }
];

stack.forEach((st, idx) => {
  const x = 0.8 + idx * 2.95;

  s4.addShape(pres.ShapeType.roundRect, {
    x: x, y: 1.6, w: 2.8, h: 4.8,
    rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1 }
  });

  s4.addShape(pres.ShapeType.roundRect, {
    x: x + 0.15, y: 1.75, w: 2.5, h: 0.4,
    rectRadius: 0.06, fill: { color: C.slateDark }
  });

  s4.addText(st.layer, {
    x: x + 0.15, y: 1.82, w: 2.5, h: 0.25,
    fontSize: 10, fontFace: 'Arial', bold: true, color: C.tealLight, align: 'center'
  });

  s4.addText(st.tech, {
    x: x + 0.15, y: 2.3, w: 2.5, h: 0.45,
    fontSize: 12, fontFace: 'Arial', bold: true, color: C.slateDark, align: 'center'
  });

  s4.addText(st.bullets, {
    x: x + 0.2, y: 2.9, w: 2.4, h: 3.2,
    fontSize: 12, fontFace: 'Arial', color: '475569', lineSpacing: 18
  });
});


// =========================================================================
// SLIDE 5: CORE FEATURES & LIVE MODULES (With 2 Real Images)
// =========================================================================
const s5 = pres.addSlide();
createHeader(s5, 'Live Functionalities', 'Core System Modules & Key Features');

const mods = [
  '• Smart Search & Campus Filtering (NIT Warangal, Kazipet, Subedari, Sharing type, Budget).',
  '• Interactive Live Room Matrix (Floor-wise room selector with real-time occupancy updates).',
  '• Verified Weekly Food Mess Schedule (7-day breakfast, lunch, dinner & special meals).',
  '• Digital Booking Confirmation Pass (Unique Ref ID, Reception QR verification, Warden Call).'
];

s5.addShape(pres.ShapeType.roundRect, {
  x: 0.8, y: 1.6, w: 5.7, h: 4.8,
  rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1 }
});

s5.addText('FEATURE HIGHLIGHTS', {
  x: 1.1, y: 1.9, w: 5.1, h: 0.3,
  fontSize: 12, fontFace: 'Arial', bold: true, color: C.teal, letterSpacing: 1.5
});

s5.addText(mods.join('\n\n'), {
  x: 1.1, y: 2.35, w: 5.1, h: 3.8,
  fontSize: 13, fontFace: 'Arial', color: '334155', lineSpacing: 20
});

// Right Side Images (Mess & Study Lounge)
s5.addImage({
  path: imgMess,
  x: 6.8, y: 1.6, w: 5.7, h: 2.3,
  rounding: true
});

s5.addImage({
  path: imgStudy,
  x: 6.8, y: 4.1, w: 5.7, h: 2.3,
  rounding: true
});


// =========================================================================
// SLIDE 6: PROJECT ROADMAP & PROGRESS
// =========================================================================
const s6 = pres.addSlide();
createHeader(s6, 'Project Milestones', 'Implementation Roadmap & Current Progress');

const phases = [
  {
    tag: 'PHASE 1 : COMPLETED',
    tagBg: 'D1FAE5',
    tagColor: '059669',
    title: 'Frontend & UI Experience',
    items: '• Modern responsive interface\n• Multi-photo card carousel\n• Detail lightbox modal & tabs\n• Dark/Light theme toggle\n• Wishlist local storage'
  },
  {
    tag: 'PHASE 2 : IN PROGRESS',
    tagBg: 'FEF3C7',
    tagColor: 'D97706',
    title: 'Real-Time Database & Logic',
    items: '• Cloud Firestore collections\n• Real-time `onSnapshot` sync\n• Dynamic pricing & coupon logic\n• Digital booking pass with QR\n• Role-based authentication'
  },
  {
    tag: 'PHASE 3 : PLANNED',
    tagBg: 'E0E7FF',
    tagColor: '4338CA',
    title: 'Deployment & Mobile App',
    items: '• SMS/WhatsApp Warden Alerts\n• Integrated UPI Token Gateway\n• React Native mobile app\n• AI-based roommate matching\n• Production Cloud Edge Deploy'
  }
];

phases.forEach((ph, idx) => {
  const x = 0.8 + idx * 3.95;

  s6.addShape(pres.ShapeType.roundRect, {
    x: x, y: 1.6, w: 3.8, h: 4.8,
    rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1 }
  });

  s6.addShape(pres.ShapeType.roundRect, {
    x: x + 0.2, y: 1.85, w: 3.4, h: 0.4,
    rectRadius: 0.06, fill: { color: ph.tagBg }
  });

  s6.addText(ph.tag, {
    x: x + 0.2, y: 1.92, w: 3.4, h: 0.25,
    fontSize: 10, fontFace: 'Arial', bold: true, color: ph.tagColor, align: 'center'
  });

  s6.addText(ph.title, {
    x: x + 0.2, y: 2.4, w: 3.4, h: 0.5,
    fontSize: 14, fontFace: 'Arial', bold: true, color: C.slateDark, align: 'center'
  });

  s6.addText(ph.items, {
    x: x + 0.25, y: 3.0, w: 3.3, h: 3.1,
    fontSize: 12, fontFace: 'Arial', color: '475569', lineSpacing: 20
  });
});


// =========================================================================
// SLIDE 7: IMPACT & CONCLUSION
// =========================================================================
const s7 = pres.addSlide();
createHeader(s7, 'Impact & Road Ahead', 'Project Impact & Future Vision');

// Left Box: Real-World Impact
s7.addShape(pres.ShapeType.roundRect, {
  x: 0.8, y: 1.6, w: 5.7, h: 4.8,
  rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: '99F6E4', width: 1.5 }
});

s7.addText('REAL-WORLD VALUE IMPACT', {
  x: 1.1, y: 1.9, w: 5.1, h: 0.3,
  fontSize: 12, fontFace: 'Arial', bold: true, color: C.teal, letterSpacing: 1.5
});

const impact = [
  '• Drastically reduces accommodation hunting time from 3-4 days to under 5 minutes.',
  '• 100% Zero-Brokerage model eliminates high commissions for students & parents.',
  '• Live room matrix prevents traveling to hostels that are already full.',
  '• On-ground verified meal menus & safety badges provide peace of mind.'
];

s7.addText(impact.join('\n\n'), {
  x: 1.1, y: 2.35, w: 5.1, h: 3.8,
  fontSize: 13, fontFace: 'Arial', color: '334155', lineSpacing: 20
});

// Right Box: Future Scope
s7.addShape(pres.ShapeType.roundRect, {
  x: 6.8, y: 1.6, w: 5.7, h: 4.8,
  rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'FDE68A', width: 1.5 }
});

s7.addText('FUTURE SCOPE & EXPANSION', {
  x: 7.1, y: 1.9, w: 5.1, h: 0.3,
  fontSize: 12, fontFace: 'Arial', bold: true, color: C.amber, letterSpacing: 1.5
});

const future = [
  '• Native Android & iOS Mobile Apps using React Native / Flutter.',
  '• AI-Powered Roommate Compatibility matching based on course & habits.',
  '• Direct Online Token Payments via UPI & Razorpay gateway integration.',
  '• Expansion from Warangal to major educational hubs like Hyderabad & Kota.'
];

s7.addText(future.join('\n\n'), {
  x: 7.1, y: 2.35, w: 5.1, h: 3.8,
  fontSize: 13, fontFace: 'Arial', color: '334155', lineSpacing: 20
});


// Save to NearStay_Presentation.pptx
const outPath = path.join(__dirname, 'NearStay_Presentation.pptx');
pres.writeFile({ fileName: outPath })
  .then(() => console.log('Successfully generated premium presentation at:', outPath))
  .catch(err => console.error(err));
