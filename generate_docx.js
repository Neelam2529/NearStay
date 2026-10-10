const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ImageRun,
  ShadingType
} = require('docx');

const screenshotDir = path.join(__dirname, 'documentation', 'screenshots');

function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 }
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 }
  });
}

function createHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 }
  });
}

function createParagraph(text, isBold = false) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        font: 'Segoe UI',
        size: 22, // 11pt
        bold: isBold
      })
    ],
    spacing: { before: 60, after: 100 }
  });
}

function createBullet(text, boldPrefix = '') {
  return new Paragraph({
    children: [
      boldPrefix ? new TextRun({ text: boldPrefix + ' ', bold: true, font: 'Segoe UI', size: 22, color: '0D9488' }) : new TextRun(''),
      new TextRun({ text: text, font: 'Segoe UI', size: 22 })
    ],
    bullet: { level: 0 },
    spacing: { before: 40, after: 60 }
  });
}

function createCallout(title, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: '💡 ' + title, bold: true, font: 'Segoe UI', size: 22, color: '0F766E' })
                ],
                spacing: { after: 60 }
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: text, font: 'Segoe UI', size: 20, color: '334155' })
                ]
              })
            ],
            shading: { fill: 'CCFBF1', type: ShadingType.CLEAR },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              left: { style: BorderStyle.SINGLE, size: 24, color: '0D9488' }
            },
            margins: { top: 140, bottom: 140, left: 200, right: 200 }
          })
        ]
      })
    ],
    margins: { bottom: 180 }
  });
}

function insertImageIfExists(filename, caption, width = 560, height = 300) {
  const filePath = path.join(screenshotDir, filename);
  if (!fs.existsSync(filePath)) {
    return [new Paragraph({ text: `[Image: ${filename}]`, spacing: { before: 100, after: 100 } })];
  }

  const imageBuffer = fs.readFileSync(filePath);
  return [
    new Paragraph({
      children: [
        new ImageRun({
          data: imageBuffer,
          transformation: { width: width, height: height }
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 140, after: 60 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Figure: ' + caption,
          italics: true,
          font: 'Segoe UI',
          size: 18,
          color: '64748B'
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 180 }
    })
  ];
}

// Generate the Document
async function generateDoc() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Segoe UI', color: '0F172A' }
        }
      },
      paragraphStyles: [
        {
          id: 'Heading1',
          name: 'Heading 1',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { size: 36, bold: true, color: '0D9488', font: 'Segoe UI' }
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { size: 28, bold: true, color: '0F766E', font: 'Segoe UI' }
        },
        {
          id: 'Heading3',
          name: 'Heading 3',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { size: 24, bold: true, color: 'D97706', font: 'Segoe UI' }
        }
      ]
    },
    sections: [
      {
        properties: {},
        children: [
          // Title Cover Block
          new Paragraph({
            children: [
              new TextRun({ text: 'NEARSTAY', bold: true, size: 48, color: '0D9488', font: 'Segoe UI' }),
              new TextRun({ text: ' — Official Product & Technical Documentation', bold: true, size: 32, color: '1E293B', font: 'Segoe UI' })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'The 100% Verified Student Accommodation & Live Hostel Matrix Platform', italics: true, size: 24, color: '64748B', font: 'Segoe UI' })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Live Web URL: ', bold: true, size: 20 }),
              new TextRun({ text: 'https://nearstay-74ad6.web.app', color: '0D9488', bold: true, size: 20 }),
              new TextRun({ text: '  |  Target Region: Warangal, Kazipet & Expanding Student Cities', size: 20, color: '64748B' })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 }
          }),

          // SECTION 1
          createHeading1('1. What is NearStay? (Executive Overview)'),
          createParagraph('NearStay is a modern, verified student residence and hostel booking web platform engineered to solve the chronic difficulties students, parents, and working professionals face when searching for accommodation near colleges, universities, and coaching hubs.'),
          createParagraph('Unlike general classifieds or map tools, NearStay is a dedicated accommodation engine providing real-time room-level availability (Live Room Matrix), hygienic weekly mess food schedules, verified warden credentials, transparent rental pricing with zero brokerage commission, and instant official digital boarding passes.'),
          createCallout('Core Mission', 'To ensure that every student moving to a new educational city can find, verify, and reserve a safe, hygienic, and affordable hostel room in under 2 minutes — with zero street-wandering, zero middleman broker fees, and complete peace of mind.'),

          ...insertImageIfExists('1_homepage_search.png', 'NearStay Homepage, Hero Showcase & Smart Search Console', 540, 290),

          // SECTION 2
          createHeading1('2. The Problem with Traditional Hostel Hunting'),
          createParagraph('Finding a hostel or PG in cities like Warangal (near NIT Warangal, Kakatiya Medical College, Kakatiya University, etc.) has traditionally been a painful, confusing, and costly experience:'),
          createBullet('Students and elderly parents spend days walking from lane to lane in scorching heat or rain, looking for "To-Let" signs and wall posters.', 'Physical Exhaustion & Time Waste:'),
          createBullet('Local brokers and agents charge students ₹1,000 to ₹3,000 just for showing addresses, with no accountability.', 'Hefty Brokerage Fees:'),
          createBullet('Students travel long distances only to discover that single or double sharing rooms are completely full.', 'No Live Room Vacancy Visibility:'),
          createBullet('Hostel owners often promise North/South Indian meals, high-speed WiFi, and 24/7 geysers, but reality is poor quality food and broken amenities.', 'Uninspected Food & Broken Promises:'),
          createBullet('Female students and their parents have no reliable way to verify biometric security, resident wardens, and curfew rules in advance.', 'Safety Concerns for Girls Hostels:'),

          // SECTION 3 - WHY NEARSTAY VS GOOGLE SEARCH
          createHeading1('3. The Big Question: "Why NearStay when Google already exists?"'),
          createParagraph('Many people ask: "Why do we need a separate website when we can just search on Google Maps or Google Search?" Here is the crystal-clear answer:'),
          createParagraph('Google is a general search engine, NOT an accommodation booking & management system. Google Maps only shows a pin on a map with a random phone number. It does NOT manage room inventories, does NOT inspect kitchens, and cannot issue official room allocation passes.'),

          // Comparison Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Feature / Capability', bold: true, color: 'FFFFFF', size: 20 })] })],
                    shading: { fill: '0D9488', type: ShadingType.CLEAR }
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Searching on Google / Maps', bold: true, color: 'FFFFFF', size: 20 })] })],
                    shading: { fill: 'E11D48', type: ShadingType.CLEAR }
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Using NearStay Platform', bold: true, color: 'FFFFFF', size: 20 })] })],
                    shading: { fill: '0F766E', type: ShadingType.CLEAR }
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph('Live Room Availability', true)] }),
                  new TableCell({ children: [createParagraph('❌ None. You must call or visit in person.')] }),
                  new TableCell({ children: [createParagraph('✅ YES. Real-time floor & room matrix showing available vs occupied rooms.')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph('Weekly Food / Mess Menu', true)] }),
                  new TableCell({ children: [createParagraph('❌ No food schedule or meal details.')] }),
                  new TableCell({ children: [createParagraph('✅ YES. Detailed 7-day breakfast, lunch, snack, and dinner breakdown.')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph('Middleman & Brokerage Fee', true)] }),
                  new TableCell({ children: [createParagraph('❌ High risk of reaching brokers who demand commission.')] }),
                  new TableCell({ children: [createParagraph('✅ ZERO Brokerage. Direct warden contact with price lock.')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph('Official Allocation Pass', true)] }),
                  new TableCell({ children: [createParagraph('❌ None. Verbal promises only.')] }),
                  new TableCell({ children: [createParagraph('✅ YES. Instant Digital Boarding Pass with QR verification.')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph('Girls Hostel Safety Verification', true)] }),
                  new TableCell({ children: [createParagraph('❌ Unverified claims.')] }),
                  new TableCell({ children: [createParagraph('✅ YES. 100% verified biometric gates, female wardens, and CCTV checks.')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph('Warden Live Dashboard', true)] }),
                  new TableCell({ children: [createParagraph('❌ Wardens cannot manage bed-level occupancy.')] }),
                  new TableCell({ children: [createParagraph('✅ YES. Wardens can toggle room availability in 1 click.')] })
                ]
              })
            ]
          }),

          createCallout('Key Takeaway', 'Google tells you that a building exists. NearStay tells you which room on which floor is vacant right now, what is being cooked for lunch on Wednesday, how much the exact rent is, and locks your room with an official confirmation pass.'),

          ...insertImageIfExists('2_property_cards.png', 'Verified Property Listings with Live Vacancy Indicators', 540, 270),

          // SECTION 4
          createHeading1('4. Key Features & How NearStay Works'),
          createHeading2('A. Smart Search Console & Quick Filters'),
          createParagraph('Students can search instantly by typing their college landmark (e.g., "NIT Warangal", "Kazipet", "Subedari", "Kakatiya Medical College") and filtering by:'),
          createBullet('Boys Hostel / PG, Girls Safe Hostel, Co-living PG, and AC Deluxe Rooms.', 'Accommodation Type:'),
          createBullet('Single occupancy, 2-sharing, or 3-sharing options.', 'Room Sharing:'),
          createBullet('Under ₹4,500, ₹4,500 - ₹6,000, and Luxury ₹6,000+ brackets.', 'Budget Per Month:'),
          createBullet('Trending tags for rapid 1-click filtering ("3 Mins to NIT", "Near Kazipet Station", "Food Included").', 'Campus Chips:'),

          ...insertImageIfExists('3_room_matrix_modal.png', 'Interactive Property Detail Modal with Live Room Grid', 540, 280),

          createHeading2('B. Interactive Live Room Grid (Floor Matrix)'),
          createParagraph('When a student clicks any hostel card, a full-screen interactive modal opens displaying:'),
          createBullet('Students can switch between 1st Floor, 2nd Floor, and 3rd Floor to see all room numbers.', 'Floor Selector:'),
          createBullet('Green rooms are available; dark slate rooms are occupied.', 'Visual Color Codes:'),
          createBullet('Clicking any green room (e.g., Room 103) highlights it in teal and updates the booking sidebar immediately with the selected room number and pricing.', 'Instant Room Selection:'),

          ...insertImageIfExists('4_room_selection_checkout.png', 'Room 103 Selected with Dynamic Price & Coupon Calculation', 540, 280),

          createHeading2('C. Transparent Weekly Mess Menu'),
          createParagraph('NearStay displays the full weekly dining schedule audited during on-ground physical inspection:'),
          createBullet('Idli Sambar, Masala Dosa, Puri Bhaji, Upma & Fresh Tea.', 'Breakfast:'),
          createBullet('Unlimited Steamed Rice, Sambar, Rasam, Veg Curry, Curd & Crispy Papad.', 'Lunch:'),
          createBullet('Tea / Coffee with hot snacks (Mirchi Bajji / Samosa).', 'Evening:'),
          createBullet('Special Chicken Biryani / Curry (Sundays & Wednesdays), Paneer Butter Masala.', 'Dinner:'),

          ...insertImageIfExists('5_mess_food_menu.png', 'Verified Weekly Mess Food Schedule', 540, 280),

          createHeading2('D. Dynamic Google Maps Embed & Student Reviews'),
          createParagraph('The modal includes an interactive Google Map calculating exact walking distance to NIT Warangal Gate and transit stations. Students can read peer reviews and post their own verified student reviews directly on the platform.'),

          createHeading2('E. Instant Digital Boarding Pass'),
          createParagraph('Upon entering name, phone number, and check-in date (with optional discount coupon code NEARSTAY500), NearStay generates an Official Digital Boarding Pass:'),
          createBullet('Unique allocation pass ID (e.g. #NS-WAR-2026-9842).', 'Pass Identifier:'),
          createBullet('Hostel name, allocated room number, student name, and locked check-in rate.', 'Student Details:'),
          createBullet('One-click print button formatted with dedicated @media print CSS for printing or PDF saving.', 'Clean Printing:'),
          createBullet('Direct 1-tap phone dialer to speak with the warden immediately.', 'Call Warden:'),

          ...insertImageIfExists('7_boarding_pass.png', 'Official NearStay Digital Student Boarding Pass', 500, 360),

          createHeading2('F. Sleek Dark / Light Theme & Saved Wishlist'),
          createParagraph('Students can switch seamlessly between a crisp Light Mode and an eye-friendly Dark Mode tailored with high-contrast colors and zero layout flickering.'),

          ...insertImageIfExists('6_dark_theme.png', 'NearStay Dark Theme for Night Browsing', 540, 280),

          // SECTION 5
          createHeading1('5. Warden & Hostel Owner Portal'),
          createParagraph('NearStay provides property wardens with a dedicated self-service listing portal accessible via the "+ List Property" button:'),
          createBullet('Hostel name, type (Boys/Girls/Co-living), locality, monthly rent, and phone number.', 'Easy Registration:'),
          createBullet('Wardens select their floor count (e.g., 3 Floors) and rooms per floor (4-6 rooms). NearStay automatically builds the interactive live room grid!', 'Automated Room Grid Generator:'),
          createBullet('Wardens can log in and click on any room in their hostel grid to toggle its status between Available and Booked in real-time.', 'One-Tap Room Status Toggle:'),
          createBullet('Direct real-time cloud synchronization with Google Cloud Firebase Firestore.', 'Cloud Sync:'),

          // SECTION 6
          createHeading1('6. Technical Architecture & Tech Stack'),
          createParagraph('NearStay is built using high-performance, robust web technologies to ensure sub-second page loads and zero crashes during peak admission rush:'),
          createBullet('HTML5 structure with accessible ARIA tags, custom modern CSS design tokens, and modular ES6+ JavaScript.', 'Frontend:'),
          createBullet('Google Firebase Firestore for real-time live vacancy updates and Firebase Authentication for student/warden sign-in.', 'Database & Cloud:'),
          createBullet('Firebase Hosting CDN delivering assets globally with automated SSL certificates.', 'Production Hosting:'),
          createBullet('Lightweight ES module HTTP streaming server for zero-dependency local development.', 'Local Dev Server:'),

          // SECTION 7
          createHeading1('7. Frequently Asked Questions (FAQ)'),
          createParagraph('Q1: How does a student book a room on NearStay?'),
          createParagraph('A: The student searches by college landmark, opens a hostel, picks an available room from the live floor grid, enters their name and mobile number, applies coupon NEARSTAY500, and receives an official Digital Boarding Pass instantly with ₹0 platform fee.'),
          createParagraph('Q2: Is NearStay only for Warangal or other cities too?'),
          createParagraph('A: NearStay is launched in Warangal (covering NIT Warangal, Kazipet, Subedari, Hanamkonda, KMC) as its primary launchpad and is built to scale across Hyderabad, Bengaluru, Chennai, and other major educational hubs.'),
          createParagraph('Q3: How do wardens benefit from NearStay?'),
          createParagraph('A: Wardens receive direct student admissions without paying commissions to local brokers, and their room vacancy is showcased live to thousands of incoming students 24/7.')
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.join(__dirname, 'documentation', 'NearStay_Project_Documentation.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Successfully generated Word Document at:', outPath);
}

generateDoc().catch(err => {
  console.error('Error generating document:', err);
  process.exit(1);
});
