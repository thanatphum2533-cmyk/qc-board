// ============================================================================
// QC Board — 7-Stage Content Workflow + News Link Auto-Thumbnail + Multi-Channel
// ============================================================================

const STORAGE_KEY_CARDS = 'qc_board_cards_v4';
const STORAGE_KEY_COLUMNS = 'qc_board_cols_v4';
const STORAGE_KEY_DICT = 'qc_board_dict_v4';
const STORAGE_KEY_THEME = 'qc_board_theme_v4';
const STORAGE_KEY_TITLE = 'qc_board_title_v4';

const DEFAULT_COLUMNS = [
  {
    id: 'idea_review',
    title: '💡 1. ไอเดีย (รอตรวจ)',
    subtitle: 'แปะลิงก์ข่าว/เสนอหัวข้อ รอเคาะก่อนเขียนบท',
    isCore: true
  },
  {
    id: 'writing',
    title: '✍️ 2. เขียนบท',
    subtitle: 'ไอเดียผ่านแล้ว ไปเขียนบทต่อได้',
    isCore: true
  },
  {
    id: 'script_review',
    title: '📝 3. บทเสร็จ (รอตรวจ/ปรับแก้)',
    subtitle: 'ตรวจบท อาจมีคอมเมนต์ปรับแก้',
    isCore: true
  },
  {
    id: 'script_done',
    title: '✨ 4. บทสมบูรณ์',
    subtitle: 'บทผ่าน 100% พร้อมถ่าย/ตัดต่อ',
    isCore: true
  },
  {
    id: 'edit_review',
    title: '🎬 5. ตัดเสร็จ (รอตรวจ)',
    subtitle: 'ตรวจคลิป/ซับไตเติล/กราฟิก',
    isCore: true
  },
  {
    id: 'waiting_post',
    title: '⏰ 6. รอลง (ตั้งเวลาโพสต์)',
    subtitle: 'ผ่านแล้ว ตั้งเวลาล่วงหน้ารอขึ้นโพสต์',
    isCore: true
  },
  {
    id: 'posted',
    title: '🚀 7. ลงแล้ว (เช็คช่อง 1, 2, 3...)',
    subtitle: 'ติ๊กเช็คช่องที่ลงโพสต์เรียบร้อยแล้ว',
    isCore: true
  }
];

const DEFAULT_CHANNELS = [
  { id: 'ch1', name: 'ช่อง 1 (Facebook)', color: 'bg-[#0079bf] text-white' },
  { id: 'ch2', name: 'ช่อง 2 (TikTok)', color: 'bg-[#172b4d] text-white' },
  { id: 'ch3', name: 'ช่อง 3 (IG / Reels)', color: 'bg-[#cd5a91] text-white' },
  { id: 'ch4', name: 'ช่อง 4 (YouTube)', color: 'bg-[#eb5a46] text-white' }
];

const DEFAULT_CHECKLIST = [
  { id: 'chk1', text: 'อ่านทวนบทและสคริปต์ออกเสียง 1 รอบ (ไม่มีคำผิด/คำตกหล่น)', done: false },
  { id: 'chk2', text: 'เช็คข้อมูลอ้างอิงจากลิงก์ข่าวต้นทางถูกต้อง 100%', done: false },
  { id: 'chk3', text: 'ตรวจซับไตเติลในคลิปและข้อความบนภาพปกว่าไม่มีคำผิด', done: false },
  { id: 'chk4', text: 'เช็ควันและเวลาลงโพสต์ของแต่ละช่อง (ช่อง 1, 2, 3...) ถูกต้อง', done: false }
];

const DEFAULT_TYPO_DICT = [
  { wrong: 'นะค่ะ', right: 'นะคะ', type: 'คำผิดยอดฮิต', note: 'คำลงท้ายเสียงตรีใช้ คะ' },
  { wrong: 'สวัสดีคะ', right: 'สวัสดีค่ะ', type: 'คำผิดยอดฮิต', note: 'คำทักทายเสียงเอกใช้ ค่ะ' },
  { wrong: 'ขอบคุณคะ', right: 'ขอบคุณค่ะ', type: 'คำผิดยอดฮิต', note: 'คำขอบคุณใช้ ค่ะ' },
  { wrong: 'ใช่ไหมค่ะ', right: 'ใช่ไหมคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'มั้ยค่ะ', right: 'มั้ยคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'ไหมค่ะ', right: 'ไหมคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'หรอค่ะ', right: 'เหรอคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'เหรอค่ะ', right: 'เหรอคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'หรือยังค่ะ', right: 'หรือยังคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'หรือเปล่าค่ะ', right: 'หรือเปล่าคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'ยังไงค่ะ', right: 'ยังไงคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'อย่างไรค่ะ', right: 'อย่างไรคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'ที่ไหนค่ะ', right: 'ที่ไหนคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'กี่บาทค่ะ', right: 'กี่บาทคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'เท่าไหร่ค่ะ', right: 'เท่าไหร่คะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'อะไรค่ะ', right: 'อะไรคะ', type: 'ผิดบริบทประโยคคำถาม', note: 'ประโยคคำถามต้องลงท้ายด้วย คะ' },
  { wrong: 'อัพเดท', right: 'อัปเดต', type: 'คำสะกดผิด', note: 'บัญญัติราชบัณฑิตฯ ใช้ ป ปลา' },
  { wrong: 'อัพโหลด', right: 'อัปโหลด', type: 'คำสะกดผิด', note: 'บัญญัติราชบัณฑิตฯ ใช้ ป ปลา' },
  { wrong: 'ลิ้งค์', right: 'ลิงก์', type: 'คำสะกดผิด', note: 'Link สะกดว่า ลิงก์' },
  { wrong: 'ลิ้งก์', right: 'ลิงก์', type: 'คำสะกดผิด', note: 'Link สะกดว่า ลิงก์' },
  { wrong: 'อินบ๊อกซ์', right: 'อินบ็อกซ์', type: 'คำสะกดผิด', note: 'Inbox ใช้ไม้ไต่คู้' },
  { wrong: 'โปรโมรชั่น', right: 'โปรโมชัน', type: 'คำสะกดผิด', note: 'สะกดผิดบ่อย' },
  { wrong: 'โปรโมชั่น', right: 'โปรโมชัน', type: 'คำสะกดผิด', note: 'คำทับศัพท์ไม่เติมไม้เอก' },
  { wrong: 'คอนเท้นต์', right: 'คอนเทนต์', type: 'คำสะกดผิด', note: 'Content ไม่เติมไม้โท' },
  { wrong: 'คอนเท้น', right: 'คอนเทนต์', type: 'คำสะกดผิด', note: 'Content สะกดว่า คอนเทนต์' },
  { wrong: 'โพส ', right: 'โพสต์ ', type: 'คำสะกดผิด', note: 'Post ต้องมี ต์ การันต์' },
  { wrong: 'กฏหมาย', right: 'กฎหมาย', type: 'คำสะกดผิด', note: 'ใช้ ฎ ชฎา' },
  { wrong: 'ปรากฎ', right: 'ปรากฏ', type: 'คำสะกดผิด', note: 'ใช้ ฏ ปฏัก' },
  { wrong: 'อนุญาติ', right: 'อนุญาต', type: 'คำสะกดผิด', note: 'ไม่มีสระอิ' },
  { wrong: 'สังเกตุ', right: 'สังเกต', type: 'คำสะกดผิด', note: 'ไม่มีสระอุ' },
  { wrong: 'กระเพรา', right: 'กะเพรา', type: 'คำสะกดผิด', note: 'สะกดที่ถูกคือ กะเพรา' },
  { wrong: 'คลิ๊ก', right: 'คลิก', type: 'คำสะกดผิด', note: 'Click ไม่ใช้ไม้ตรี' },
  { wrong: 'แท๊ก', right: 'แท็ก', type: 'คำสะกดผิด', note: 'Tag ใช้ไม้ไต่คู้' },
  { wrong: 'พรีออเดอร์', right: 'พรีออร์เดอร์', type: 'คำสะกดผิด', note: 'Pre-order' },
  { wrong: 'รสชาด', right: 'รสชาติ', type: 'คำสะกดผิด', note: 'รสชาติ ใช้ ต เต่า สระอิ' },
  { wrong: 'โอกาศ', right: 'โอกาส', type: 'คำสะกดผิด', note: 'โอกาส ใช้ ส เสือ' },
  { wrong: 'ศรีษะ', right: 'ศีรษะ', type: 'คำสะกดผิด (ศัพท์สุขภาพ)', note: 'ศีรษะ สระอีอยู่บน ศ ศาลา' },
  { wrong: 'คลอเรสเตอรอล', right: 'คอเลสเตอรอล', type: 'คำสะกดผิด (ศัพท์สุขภาพ)', note: 'Cholesterol สะกดว่า คอเลสเตอรอล' },
  { wrong: 'แคลเซี่ยม', right: 'แคลเซียม', type: 'คำสะกดผิด (ศัพท์สุขภาพ)', note: 'ไม่เติมไม้เอก' },
  { wrong: 'สมดุลย์', right: 'สมดุล', type: 'คำสะกดผิด (ศัพท์สุขภาพ)', note: 'สมดุล ไม่มี ย การันต์' },
  { wrong: 'คลีนิค', right: 'คลินิก', type: 'คำสะกดผิด (ศัพท์สุขภาพ)', note: 'Clinic สะกดว่า คลินิก' },
  { wrong: 'วิตามิ่น', right: 'วิตามิน', type: 'คำสะกดผิด (ศัพท์สุขภาพ)', note: 'วิตามิน ไม่เติมไม้เอก' },
  { wrong: 'ภูมิแพ้ตัวเอง', right: 'ภูมิคุ้มกันทำลายตนเอง', type: 'คำศัพท์สุขภาพแนะนำ', note: 'ใช้คำทางการแพทย์ที่เข้าใจง่าย' },
  { wrong: 'ผูกพันธ์', right: 'ผูกพัน', type: 'คำสะกดผิด', note: 'ไม่มี ธ การันต์' },
  { wrong: 'ทำการสั่งซื้อ', right: 'สั่งซื้อ', type: 'รูปประโยคฟุ่มเฟือย', note: 'ตัดคำว่า "ทำการ" ออกเพื่อให้ประโยคกระชับ' },
  { wrong: 'ทำการติดต่อ', right: 'ติดต่อ', type: 'รูปประโยคฟุ่มเฟือย', note: 'ตัดคำว่า "ทำการ" ออกเพื่อให้ประโยคกระชับ' },
  { wrong: 'ทำการแจ้ง', right: 'แจ้ง', type: 'รูปประโยคฟุ่มเฟือย', note: 'ตัดคำว่า "ทำการ" ออกเพื่อให้ประโยคกระชับ' },
  { wrong: 'ได้มีการจัดทำ', right: 'จัดทำ', type: 'รูปประโยคฟุ่มเฟือย', note: 'คำฟุ่มเฟือย ควรใช้คำกริยาตรงๆ' }
];

// Helper to generate SVG News Thumbnail Cover Data URI (instant fallback or demo cover)
function makeNewsSvgThumb(headline, domain, bgFrom = '#0f172a', bgTo = '#0284c7') {
  const safeTitle = (headline || 'ข่าวอ้างอิงคอนเทนต์').slice(0, 42);
  const safeDomain = (domain || 'NEWS SOURCE').toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="315" viewBox="0 0 600 315">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgFrom}"/>
        <stop offset="100%" stop-color="${bgTo}"/>
      </linearGradient>
    </defs>
    <rect width="600" height="315" fill="url(#g)"/>
    <circle cx="520" cy="60" r="110" fill="rgba(255,255,255,0.06)"/>
    <rect x="28" y="26" width="160" height="32" rx="6" fill="rgba(255,255,255,0.18)"/>
    <text x="40" y="47" fill="#38bdf8" font-family="sans-serif" font-size="14" font-weight="bold">📰 ${safeDomain}</text>
    <text x="28" y="135" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="bold">${safeTitle}</text>
    <text x="28" y="275" fill="rgba(255,255,255,0.7)" font-family="sans-serif" font-size="14">คลิกเพื่อดูรายละเอียดและเปิดลิงก์ข่าวต้นทาง</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// State
let columns = [];
let cards = [];
let typoDict = [];
let currentRole = 'writer';
let currentView = 'board';
let activeCardId = null;
let tempProofImageData = '';
let tempNewsData = { url: '', thumb: '', title: '', domain: '', description: '' };
let currentScriptStyle = 'health_alert';
let currentHealthAngle = 'general';
let tempChannels = [];
let tempChecklist = [];
let draggedCardId = null;
let activeQuickComposerColId = null;

function offsetDateTimeLocal(hoursOffset) {
  const d = new Date(Date.now() + hoursOffset * 3600 * 1000);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function getInitialDemoCards() {
  return [
    {
      id: 'card-1',
      title: 'สรุปเทรนด์ผู้บริโภคปี 2026 ที่คนทำธุรกิจต้องรู้',
      status: 'idea_review',
      assignee: 'น้องมายด์',
      contentType: 'คลิปสั้น (Reels/TikTok)',
      newsUrl: 'https://www.thairath.co.th/money/business',
      newsDomain: 'thairath.co.th',
      newsTitle: 'เจาะเทรนด์ผู้บริโภคยุคใหม่ ปี 2026 พฤติกรรมการซื้อเปลี่ยนไปอย่างไร',
      newsThumb: makeNewsSvgThumb('เจาะเทรนด์ผู้บริโภคยุคใหม่ ปี 2026', 'THAIRATH MONEY', '#064e3b', '#059669'),
      draftDeadline: offsetDateTimeLocal(12),
      publishTime: offsetDateTimeLocal(48),
      script: 'แนวทางคอนเทนต์: สรุปจากข่าว Thairath Money ยกตัวอย่าง 3 เทรนด์สำคัญ รอหัวหน้าเคาะไอเดียเพื่อไปเขียนบทต่อ',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: false })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 (Facebook)', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 (TikTok)', target: true, posted: false },
        { id: 'ch3', name: 'ช่อง 3 (IG / Reels)', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 (YouTube)', target: false, posted: false }
      ],
      scheduleLink: '',
      scheduleImage: '',
      feedback: '',
      history: [{ time: 'วันนี้ 09:00', text: 'น้องมายด์ แปะลิงก์ข่าวพร้อมดึง Thumbnail เข้าช่อง "1. ไอเดีย (รอตรวจ)"' }]
    },
    {
      id: 'card-2',
      title: 'รีวิว 5 เทคนิคเลือกซื้อสินค้ายังไงให้คุ้มที่สุด',
      status: 'writing',
      assignee: 'น้องมายด์',
      contentType: 'คลิปสั้น (Reels/TikTok)',
      newsUrl: 'https://thestandard.co/wealth-smart-shopping/',
      newsDomain: 'thestandard.co',
      newsTitle: '5 เทคนิควางแผนซื้อของออนไลน์ให้คุ้มค่าและประหยัดงบที่สุด',
      newsThumb: makeNewsSvgThumb('5 เทคนิคซื้อของออนไลน์ให้คุ้มที่สุด', 'THE STANDARD', '#1e1b4b', '#4f46e5'),
      draftDeadline: offsetDateTimeLocal(-3),
      publishTime: offsetDateTimeLocal(10),
      script: 'สวัสดีคะทุกคน! วันนี้ วันนี้ แอดมินมีเทคนิคดีๆ มาอัพเดทให้ฟังกันนะค่ะ ใครสงสัยว่าควรเลือกรุ่นไหนดีค่ะ สามารถทำการสั่งซื้อหรือคลิ๊กลิ้งค์เพื่อดูคอนเท้นได้เลยเลย ขอบคุณคะ',
      checklist: [
        { id: 'chk1', text: 'อ่านทวนบทและสคริปต์ออกเสียง 1 รอบ (ไม่มีคำผิด/คำตกหล่น)', done: false },
        { id: 'chk2', text: 'เช็คข้อมูลอ้างอิงจากลิงก์ข่าวต้นทางถูกต้อง 100%', done: true },
        { id: 'chk3', text: 'ตรวจซับไตเติลในคลิปและข้อความบนภาพปกว่าไม่มีคำผิด', done: false },
        { id: 'chk4', text: 'เช็ควันและเวลาลงโพสต์ของแต่ละช่อง (ช่อง 1, 2, 3...) ถูกต้อง', done: false }
      ],
      channels: [
        { id: 'ch1', name: 'ช่อง 1 (Facebook)', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 (TikTok)', target: true, posted: false },
        { id: 'ch3', name: 'ช่อง 3 (IG / Reels)', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 (YouTube)', target: false, posted: false }
      ],
      scheduleLink: '',
      scheduleImage: '',
      feedback: 'ไอเดียผ่านแล้ว เขียนบทต่อได้เลย (ระวังคำผิดด้วยนะครับ)',
      history: [{ time: 'วันนี้ 09:30', text: 'หัวหน้าอนุมัติไอเดีย -> ย้ายมาช่อง "2. เขียนบท"' }]
    },
    {
      id: 'card-3',
      title: 'เปิดเบื้องหลังขั้นตอนการแพ็คสินค้าส่งลูกค้า',
      status: 'script_review',
      assignee: 'น้องมายด์',
      contentType: 'คลิปสั้น (Reels/TikTok)',
      newsUrl: '',
      newsDomain: '',
      newsTitle: '',
      newsThumb: '',
      draftDeadline: offsetDateTimeLocal(2),
      publishTime: offsetDateTimeLocal(26),
      script: 'พามาดูเบื้องหลังความใส่ใจในทุกออเดอร์! กว่าจะถึงมือลูกค้า เราตรวจเช็คคุณภาพสินค้าทุกชิ้นและห่อกันกระแทกอย่างดีที่สุด สั่งซื้อผ่านลิงก์หน้าโปรไฟล์ได้เลยนะคะ',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: true })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 (Facebook)', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 (TikTok)', target: true, posted: false },
        { id: 'ch3', name: 'ช่อง 3 (IG / Reels)', target: false, posted: false },
        { id: 'ch4', name: 'ช่อง 4 (YouTube)', target: false, posted: false }
      ],
      scheduleLink: '',
      scheduleImage: '',
      feedback: 'ปรับแก้ท่อนเปิดนิดนึง: อยากให้โชว์กล่องพัสดุตั้งแต่ 3 วินาทีแรก',
      history: [{ time: 'วันนี้ 10:15', text: 'น้องมายด์ ส่งบทเข้าช่อง "3. บทเสร็จ (รอตรวจ/ปรับแก้)"' }]
    },
    {
      id: 'card-4',
      title: 'โพสต์แจ้งโปรฯ ประจำเดือน + แจกโค้ดส่วนลดพิเศษ',
      status: 'script_done',
      assignee: 'น้องมายด์',
      contentType: 'โพสต์ภาพเดี่ยว/อัลบั้ม',
      newsUrl: '',
      newsDomain: '',
      newsTitle: '',
      newsThumb: '',
      draftDeadline: offsetDateTimeLocal(-10),
      publishTime: offsetDateTimeLocal(20),
      script: 'แจกโค้ดส่วนลดพิเศษประจำเดือน! สำหรับลูกค้าที่สั่งซื้อผ่านช่องทางออนไลน์วันนี้ รับส่วนลดทันที 15% เพียงทักอินบ็อกซ์หรือกดสั่งซื้อที่ลิงก์ใต้โพสต์นี้ได้เลยนะคะ สอบถามข้อมูลเพิ่มเติมได้ตลอดค่ะ',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: true })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 (Facebook)', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 (TikTok)', target: false, posted: false },
        { id: 'ch3', name: 'ช่อง 3 (IG / Reels)', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 (YouTube)', target: false, posted: false }
      ],
      scheduleLink: '',
      scheduleImage: '',
      feedback: 'บทสมบูรณ์แล้ว นำไปทำภาพ/ตัดต่อได้เลย',
      history: [{ time: 'เมื่อวาน 17:00', text: 'หัวหน้าอนุมัติบท -> ย้ายเข้า "4. บทสมบูรณ์"' }]
    },
    {
      id: 'card-5',
      title: 'คลิปเปรียบเทียบรุ่นยอดฮิต รุ่นไหนเหมาะกับใคร?',
      status: 'edit_review',
      assignee: 'น้องมายด์',
      contentType: 'คลิปสั้น (Reels/TikTok)',
      newsUrl: '',
      newsDomain: '',
      newsTitle: '',
      newsThumb: '',
      draftDeadline: offsetDateTimeLocal(-20),
      publishTime: offsetDateTimeLocal(6),
      script: 'เปรียบเทียบชัดๆ หมัดต่อหมัด รุ่น A กับ รุ่น B ต่างกันตรงไหน รุ่นไหนเหมาะกับการใช้งานแบบไหน ดูจบคลิปนี้ตัดสินใจเลือกได้ทันทีค่ะ',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: true })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 (Facebook)', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 (TikTok)', target: true, posted: false },
        { id: 'ch3', name: 'ช่อง 3 (IG / Reels)', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 (YouTube)', target: true, posted: false }
      ],
      scheduleLink: 'ลิงก์ตรวจคลิป Google Drive: drive.google.com/clip-review-05',
      scheduleImage: '',
      feedback: 'ตัดเสร็จแล้ว รอหัวหน้าตรวจคลิปและซับไตเติล',
      history: [{ time: 'วันนี้ 10:30', text: 'ตัดต่อเสร็จ ส่งเข้า "5. ตัดเสร็จ (รอตรวจ)"' }]
    },
    {
      id: 'card-6',
      title: 'สรุป Q&A คำถามที่ลูกค้าถามเข้ามาบ่อยที่สุด',
      status: 'waiting_post',
      assignee: 'น้องมายด์',
      contentType: 'โพสต์ภาพเดี่ยว/อัลบั้ม',
      newsUrl: '',
      newsDomain: '',
      newsTitle: '',
      newsThumb: '',
      draftDeadline: offsetDateTimeLocal(-28),
      publishTime: offsetDateTimeLocal(3),
      script: 'รวมคำถามยอดฮิตที่ลูกค้าถามกันเข้ามาบ่อยที่สุด! วันนี้เรารวบรวมคำตอบแบบเข้าใจง่ายมาให้ครบจบในโพสต์เดียวแล้วนะคะ',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: true })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 (Facebook)', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 (TikTok)', target: true, posted: false },
        { id: 'ch3', name: 'ช่อง 3 (IG / Reels)', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 (YouTube)', target: false, posted: false }
      ],
      scheduleLink: 'ตั้งเวลาโพสต์ล่วงหน้าแล้ว (วันนี้ 14:00 น.)',
      scheduleImage: '',
      feedback: 'ตรวจผ่านแล้ว รอเวลาขึ้นโพสต์',
      history: [{ time: 'วันนี้ 10:45', text: 'ตรวจคลิปผ่าน -> ตั้งเวลาโพสต์ไว้ในช่อง "6. รอลง"' }]
    },
    {
      id: 'card-7',
      title: 'รีวิวจากลูกค้าใช้งานจริง ประจำสัปดาห์',
      status: 'posted',
      assignee: 'น้องมายด์',
      contentType: 'คลิปสั้น (Reels/TikTok)',
      newsUrl: '',
      newsDomain: '',
      newsTitle: '',
      newsThumb: '',
      draftDeadline: offsetDateTimeLocal(-48),
      publishTime: offsetDateTimeLocal(-2),
      script: 'ขอบคุณรีวิวจากลูกค้าทุกท่านที่ไว้วางใจเลือกใช้สินค้าของเรานะคะ ใครใช้แล้วชอบตรงไหนคอมเมนต์มาคุยกันได้เลยค่ะ',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: true })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 (Facebook)', target: true, posted: true },
        { id: 'ch2', name: 'ช่อง 2 (TikTok)', target: true, posted: true },
        { id: 'ch3', name: 'ช่อง 3 (IG / Reels)', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 (YouTube)', target: true, posted: true }
      ],
      scheduleLink: 'ลงโพสต์แล้ว (คลิกติ๊กเช็คช่อง 1, 2, 3, 4 ได้เลย)',
      scheduleImage: '',
      feedback: 'ลงช่อง 1, 2, 4 แล้ว เหลือตามลงช่อง 3 ให้ครบ',
      history: [{ time: 'วันนี้ 09:00', text: 'ลงโพสต์แล้ว กำลังไล่เช็คช่อง 1, 2, 3, 4' }]
    }
  ];
}

// ============================================================================
// AUTOMATIC NEWS LINK THUMBNAIL FETCHER (OpenGraph / YouTube / Screenshot)
// ============================================================================
function extractYouTubeId(url) {
  const m = String(url || '').match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function extractDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch (e) {
    return 'news-link';
  }
}

async function fetchNewsMetadata(rawUrl) {
  const url = String(rawUrl || '').trim();
  if (!url || !/^https?:\/\//i.test(url)) return null;

  const domain = extractDomain(url);

  // 1. Check if YouTube Video/Shorts URL -> Instant HD Thumbnail
  const ytId = extractYouTubeId(url);
  if (ytId) {
    return {
      url,
      domain: 'youtube.com',
      title: `วิดีโออ้างอิง YouTube (${ytId})`,
      thumb: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    };
  }

  // 2. Call our local Python News Extractor API (/api/extract-news) for 100% real Thai News og:image, title & paragraphs
  try {
    const localRes = await fetch(`/api/extract-news?url=${encodeURIComponent(url)}`);
    if (localRes.ok) {
      const data = await localRes.json();
      if (data && data.status === 'success') {
        const extraBody = (data.paragraphs || []).slice(0, 2).join(' ');
        const fullDesc = [data.description, extraBody].filter(Boolean).join(' — ');
        return {
          url,
          domain: data.domain || domain,
          title: data.title || `สรุปประเด็นข่าวจาก ${domain}`,
          description: fullDesc,
          thumb: data.image || makeNewsSvgThumb(data.title || domain, domain, '#064e3b', '#0284c7')
        };
      }
    }
  } catch (e) {
    // If opened via file:// without server.py, try AllOrigins CORS proxy
  }

  // 3. Browser-only CORS proxy fallback (AllOrigins + DOMParser)
  try {
    const proxyRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    if (proxyRes.ok) {
      const proxyJson = await proxyRes.json();
      if (proxyJson && proxyJson.contents) {
        const doc = new DOMParser().parseFromString(proxyJson.contents, 'text/html');
        const ogTitle = doc.querySelector('meta[property="og:title"], meta[name="twitter:title"]')?.getAttribute('content') || doc.title || '';
        const ogImg = doc.querySelector('meta[property="og:image"], meta[name="twitter:image"]')?.getAttribute('content') || '';
        const ogDesc = doc.querySelector('meta[property="og:description"], meta[name="description"]')?.getAttribute('content') || '';
        if (ogTitle || ogImg) {
          return {
            url,
            domain,
            title: ogTitle.trim() || `ข่าวจาก ${domain}`,
            description: ogDesc.trim(),
            thumb: ogImg || makeNewsSvgThumb(ogTitle || domain, domain, '#064e3b', '#0284c7')
          };
        }
      }
    }
  } catch (e) {}

  // 4. Fallback: Microlink API
  try {
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl);
    if (res.ok) {
      const json = await res.json();
      if (json && json.status === 'success' && json.data) {
        const ogImg = json.data.image?.url || json.data.logo?.url || '';
        const ogTitle = json.data.title || `สรุปประเด็นข่าวจาก ${domain}`;
        const ogDesc = json.data.description || '';
        return {
          url,
          domain,
          title: ogTitle,
          description: ogDesc,
          thumb: ogImg || `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`
        };
      }
    }
  } catch (err) {
    // Fallback if offline or blocked
  }

  // 3. Fallback: live website screenshot or clean generated news cover
  return {
    url,
    domain,
    title: `ข่าวอ้างอิงจาก ${domain}`,
    thumb: makeNewsSvgThumb(`ข่าวจาก ${domain}`, domain, '#0f172a', '#0369a1')
  };
}

async function fetchNewsThumbnailFromInput(forceToast = false) {
  const input = document.getElementById('modal-news-url');
  const statusEl = document.getElementById('news-fetch-status');
  const url = (input?.value || '').trim();

  if (!url) {
    clearNewsThumbnail();
    return;
  }

  // Add https:// if user forgot protocol
  const normalizedUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  input.value = normalizedUrl;

  statusEl.innerHTML = `<span class="text-amber-600 font-semibold animate-pulse">⏳ กำลังดึงภาพปกข่าว (Thumbnail)...</span>`;

  const meta = await fetchNewsMetadata(normalizedUrl);
  if (meta) {
    tempNewsData = {
      url: meta.url,
      thumb: meta.thumb,
      title: meta.title,
      domain: meta.domain,
      description: meta.description || ''
    };
    renderModalNewsPreview();
    // If script is currently empty, auto-generate initial health script draft!
    const scriptEl = document.getElementById('modal-script');
    if (scriptEl && (!scriptEl.value || scriptEl.value.trim().length < 15)) {
      generateScriptFromNews(currentScriptStyle || 'health_alert', false);
    }
    syncModalFieldsToCardObject();
    saveState();
    renderCurrentView();
    statusEl.innerHTML = `<span class="text-emerald-600 font-semibold">✅ ดึง Thumbnail + ร่างบทสุขภาพจากข่าวสำเร็จ!</span>`;
    if (forceToast) showToast('📰 ดึงภาพปกข่าวและร่างบทเพจสุขภาพให้อัตโนมัติแล้ว!');
  } else {
    statusEl.innerHTML = `<span class="text-rose-600">❌ ลิงก์ไม่ถูกต้อง</span>`;
  }
}

function syncHealthAngle(val) {
  currentHealthAngle = val;
  const s1 = document.getElementById('health-angle-select');
  const s2 = document.getElementById('health-angle-select-inline');
  if (s1 && s1.value !== val) s1.value = val;
  if (s2 && s2.value !== val) s2.value = val;
  generateScriptFromNews(currentScriptStyle || 'health_alert', true);
}

// Health Knowledge Snippets per Angle
const HEALTH_ANGLE_TIPS = {
  general: {
    insight: 'ร่างกายของเรามักส่งสัญญาณเตือนล่วงหน้าเสมอ การหมั่นสังเกตอาการผิดปกติและตรวจเช็คสุขภาพเป็นประจำจึงสำคัญมากค่ะ',
    tips: [
      'หมั่นสังเกตอาการผิดปกติของร่างกาย เช่น อ่อนเพลียเรื้อรัง หรือปวดศีรษะบ่อยๆ',
      'ดื่มน้ำสะอาดให้เพียงพอวันละ 6-8 แก้ว เพื่อให้ระบบไหลเวียนเลือดทำงานได้ดี',
      'ขยับร่างกายอย่างน้อยวันละ 30 นาที เพื่อกระตุ้นระบบเผาผลาญและภูมิคุ้มกันค่ะ'
    ]
  },
  food: {
    insight: 'เรื่องนี้สัมพันธ์กับอาหารการกินโดยตรงเลยค่ะ เพราะสิ่งที่เราทานเข้าไปทุกวันส่งผลต่อระดับน้ำตาล ไขมัน และคอเลสเตอรอลในหลอดเลือด',
    tips: [
      'ลดอาหารรสจัด หวานจัด มันจัด และของทอดที่กระตุ้นการอักเสบในร่างกาย',
      'เพิ่มผักใบเขียว โปรตีนดี และไฟเบอร์ในทุกมื้ออาหาร เพื่อช่วยชะลอการดูดซึมน้ำตาล',
      'อ่านฉลากโภชนาการก่อนเลือกซื้อ เพื่อคุมโซเดียมและไขมันทรานส์ไม่ให้เกินเกณฑ์ค่ะ'
    ]
  },
  sleep_stress: {
    insight: 'สำหรับคนวัยทำงาน ความเครียดสะสมและการพักผ่อนไม่เพียงพอคือตัวเร่งสำคัญที่ทำให้สมดุลร่างกายรวนโดยไม่รู้ตัวค่ะ',
    tips: [
      'เข้านอนให้เป็นเวลาและนอนหลับลึกอย่างน้อย 7-8 ชั่วโมง เพื่อให้ร่างกายซ่อมแซมส่วนที่สึกหรอ',
      'พักสายตาและลุกยืดเหยียดทุกๆ 1 ชั่วโมง ลดอาการปวดคอบ่าไหล่และออฟฟิศซินโดรม',
      'งดจอมือถือ 30 นาทีก่อนนอน เพื่อช่วยให้ฮอร์โมนเมลาโทนินหลั่งได้ดีขึ้นค่ะ'
    ]
  },
  immunity: {
    insight: 'เมื่ออายุเพิ่มขึ้นหรือสภาพอากาศเปลี่ยน ระบบภูมิคุ้มกันของร่างกายจะทำงานลดลง จึงต้องดูแลฟื้นฟูตั้งแต่ระดับเซลล์ค่ะ',
    tips: [
      'เสริมสารอาหารกลุ่มวิตามินซี วิตามินดี และแร่ธาตุที่ช่วยสร้างเกราะภูมิคุ้มกัน',
      'หลีกเลี่ยงมลภาวะ ฝุ่นควัน และล้างมือให้สะอาดอยู่เสมอเพื่อลดความเสี่ยงการติดเชื้อ',
      'ดูแลสุขภาพลำไส้ด้วยโพรไบโอติกส์ เพราะภูมิคุ้มกันกว่า 70% อยู่ที่ลำไส้ของเราค่ะ'
    ]
  },
  product: {
    insight: 'นอกจากการปรับพฤติกรรมแล้ว การมีตัวช่วยดูแลสุขภาพที่ได้มาตรฐานและคัดสรรสารสกัดที่ตรงจุด จะช่วยดูแลร่างกายได้ครบถ้วนขึ้นค่ะ',
    tips: [
      'เลือกตัวช่วยเสริมสุขภาพที่ปลอดภัย มีผลการรับรองชัดเจน และทานง่ายในชีวิตประจำวัน',
      'ดูแลควบคู่กับการทานอาหารให้ครบ 5 หมู่ เพื่อผลลัพธ์ที่ยั่งยืน',
      'สามารถทักอินบ็อกซ์ปรึกษาผู้เชี่ยวชาญของเพจเรา หรือกดดูรายละเอียดที่ลิงก์หน้าโปรไฟล์ได้เลยนะคะ'
    ]
  }
};

// Auto-Generate Health Page Script from News Metadata in 5 Styles
function buildScriptFromNewsMeta(title, desc, domain, style = 'health_alert', angle = 'general') {
  const cleanTitle = (title || 'ประเด็นข่าวสุขภาพใกล้ตัววันนี้').replace(/\s*[-|]\s*.*$/, '').trim();
  const cleanDesc = (desc || `รายงานจาก ${domain || 'แหล่งข่าว'} ที่หลายคนกำลังให้ความสนใจและใกล้ตัวคนรักสุขภาพมากค่ะ`).trim();
  const angleObj = HEALTH_ANGLE_TIPS[angle] || HEALTH_ANGLE_TIPS.general;

  if (style === 'wellness_tips') {
    return [
      `🥗 [สไตล์เคล็ดลับดูแลตัวเอง - Hook 3 วินาทีแรก]:`,
      `"เห็นข่าวเรื่อง ${cleanTitle} แล้ว อย่าเพิ่งตกใจนะคะ! มาดู 3 วิธีดูแลตัวเองง่ายๆ ที่ทำตามได้ทันทีกันค่ะ"`,
      ``,
      `📰 [เชื่อมโยงจากข่าวเข้าสู่สุขภาพ]:`,
      `จากข่าวของ ${domain || 'สำนักข่าว'} ที่ระบุว่า ${cleanDesc}`,
      `🩺 มุมมองสุขภาพ: ${angleObj.insight}`,
      ``,
      `✅ [3 เคล็ดลับดูแลตัวเองที่ทำได้ทันที]:`,
      `1. ${angleObj.tips[0]}`,
      `2. ${angleObj.tips[1]}`,
      `3. ${angleObj.tips[2]}`,
      ``,
      `👇 [ตอนจบ CTA]:`,
      `"ลองนำทั้ง 3 ข้อนี้ไปปรับใช้กันดูนะคะ ใครทำข้อไหนอยู่บ้าง คอมเมนต์บอกแอดมินหน่อยนะ และอย่าลืมกดแชร์เก็บไว้ดูแลคนที่คุณรักด้วยนะคะ ขอบคุณค่ะ"`
    ].join('\n');
  }

  if (style === 'myth_fact') {
    return [
      `🧠 [สไตล์ไขข้อข้องใจสุขภาพ - Hook เปิดด้วยคำถาม]:`,
      `"จริงหรือไม่คะ? ที่หลายคนกังวลกันจากข่าวเรื่อง ${cleanTitle} วันนี้เพจเราสรุปความจริงด้านสุขภาพมาให้ฟังชัดๆ ค่ะ!"`,
      ``,
      `🔍 [ที่มาของประเด็นข่าว]:`,
      `ล่าสุดมีกระแสข่าวจาก ${domain || 'สื่อออนไลน์'} เกี่ยวกับ ${cleanDesc}`,
      ``,
      `💡 [ข้อเท็จจริงด้านสุขภาพที่ควรรู้]:`,
      `• ความจริงก็คือ: ${angleObj.insight}`,
      `• สิ่งที่ควรทำควบคู่กัน: ${angleObj.tips[0]} และ ${angleObj.tips[1]}`,
      ``,
      `👇 [ตอนจบ CTA]:`,
      `"รู้แบบนี้แล้วสบายใจขึ้นไหมคะ? ถ้าเห็นว่าคลิปนี้มีประโยชน์ ฝากกดติดตามและแชร์ส่งต่อให้เพื่อนๆ ด้วยนะคะ ขอบคุณค่ะ"`
    ].join('\n');
  }

  if (style === 'soft_sell') {
    return [
      `💊 [สไตล์ขยี้ข่าวสุขภาพ + โยงเข้าตัวช่วยของเพจ]:`,
      `"ใครที่มีไลฟ์สไตล์เร่งรีบ ต้องดูข่าวนี้เลยค่ะ! เรื่อง ${cleanTitle} กำลังเป็นสัญญาณเตือนสุขภาพใกล้ตัวเรามาก"`,
      ``,
      `📌 [สรุปข่าว + สอดแทรกปัญหาสุขภาพ]:`,
      `จากรายงานของ ${domain || 'แหล่งข่าว'} พบว่า ${cleanDesc}`,
      `ซึ่งในมุมสุขภาพ ${angleObj.insight}`,
      ``,
      `✨ [ทางออก & เชื่อมโยงตัวช่วยดูแลสุขภาพ]:`,
      `• เริ่มต้นง่ายๆ ด้วยการ ${angleObj.tips[0]}`,
      `• และสำหรับใครที่ไม่มีเวลาเตรียมอาหารหรืออยากได้ตัวช่วยดูแลสุขภาพแบบครบจบในขั้นตอนเดียว`,
      `• สามารถทักอินบ็อกซ์เพจ หรือกดที่ลิงก์หน้าโปรไฟล์เพื่อรับคำแนะนำและโปรโมชันพิเศษประจำเดือนนี้ได้เลยนะคะ ขอบคุณค่ะ`
    ].join('\n');
  }

  if (style === 'fb_infographic') {
    return [
      `📢 สรุปข่าวเด่นสอดแทรกสุขภาพ: "${cleanTitle}"`,
      ``,
      `หลายคนน่าจะได้เห็นข่าวจาก ${domain || 'สื่อโซเชียล'} กันแล้วเกี่ยวกับ ${cleanDesc}`,
      `วันนี้เพจเราขอสรุปสาระสุขภาพสำคัญที่สอดแทรกอยู่ในเรื่องนี้มาฝากกันค่ะ:`,
      ``,
      `🩺 ทำไมเรื่องนี้ถึงสำคัญต่อสุขภาพเรา?`,
      `➡️ ${angleObj.insight}`,
      ``,
      `🌿 3 แนวทางดูแลสุขภาพเชิงป้องกัน:`,
      `✅ 1. ${angleObj.tips[0]}`,
      `✅ 2. ${angleObj.tips[1]}`,
      `✅ 3. ${angleObj.tips[2]}`,
      ``,
      `ฝากกดแชร์โพสต์นี้เก็บไว้เตือนตัวเอง หรือส่งต่อให้คนที่คุณรักอ่านกันด้วยนะคะ ❤️`,
      `#สุขภาพดีสร้างได้ #เคล็ดลับสุขภาพ #ดูแลตัวเอง #อัปเดตข่าวสุขภาพ`
    ].join('\n');
  }

  // Default: 'health_alert' (สไตล์เตือนภัย/อุทาหรณ์สุขภาพจากข่าว)
  return [
    `🚨 [สไตล์เตือนภัยสุขภาพจากข่าว - Hook 3 วินาทีแรก]:`,
    `"อุทาหรณ์คนรักสุขภาพ! ล่าสุดมีข่าวเรื่อง ${cleanTitle} ออกมาเตือนใจพวกเราอีกแล้วค่ะ!"`,
    ``,
    `📰 [สรุปประเด็นข่าวสั้นๆ]:`,
    `เรื่องนี้มาจากรายงานของ ${domain || 'สำนักข่าว'} ที่ระบุว่า ${cleanDesc}`,
    ``,
    `🩺 [สอดแทรกความรู้สุขภาพ & สัญญาณเตือน]:`,
    `• ${angleObj.insight}`,
    `• วิธีป้องกันและดูแลตัวเองตั้งแต่วันนี้:`,
    `  1) ${angleObj.tips[0]}`,
    `  2) ${angleObj.tips[1]}`,
    ``,
    `👇 [ตอนจบ CTA]:`,
    `"เช็คตัวเองด่วนเลยนะคะว่าใครมีพฤติกรรมเสี่ยงแบบนี้บ้าง? คอมเมนต์มาคุยกันหน่อยนะ และกดติดตามเพจเราไว้เพื่อไม่พลาดสาระสุขภาพดีๆ ทุกวันค่ะ ขอบคุณค่ะ"`
  ].join('\n');
}

function generateScriptFromNews(style = 'health_alert', notify = true) {
  currentScriptStyle = style;
  const angleSelect = document.getElementById('health-angle-select') || document.getElementById('health-angle-select-inline');
  if (angleSelect) currentHealthAngle = angleSelect.value;

  const title = tempNewsData?.title || document.getElementById('modal-title')?.value || 'ประเด็นข่าวสุขภาพใกล้ตัววันนี้';
  const desc = tempNewsData?.description || '';
  const domain = tempNewsData?.domain || 'แหล่งข่าวสุขภาพ';

  const generated = buildScriptFromNewsMeta(title, desc, domain, style, currentHealthAngle);
  const scriptEl = document.getElementById('modal-script');
  if (scriptEl) {
    scriptEl.value = generated;
    runTypoCheck();
  }
  if (notify) {
    const styleNames = {
      health_alert: '🚨 สไตล์เตือนภัย/อุทาหรณ์สุขภาพ',
      wellness_tips: '🥗 สไตล์เคล็ดลับดูแลตัวเอง (How-to)',
      myth_fact: '🧠 สไตล์ไขข้อข้องใจสุขภาพ (รู้หรือไม่)',
      soft_sell: '💊 สไตล์ขยี้ข่าว + โยงเข้าสินค้าสุขภาพ',
      fb_infographic: '📋 แคปชั่นโพสต์สรุปสาระสุขภาพ'
    };
    showToast(`🩺 สร้างบท "${styleNames[style]}" พร้อมสอดแทรกสาระสุขภาพเรียบร้อย!`);
  }
}

function renderModalNewsPreview() {
  const box = document.getElementById('news-preview-box');
  const img = document.getElementById('news-preview-img');
  const domainEl = document.getElementById('news-preview-domain');
  const titleEl = document.getElementById('news-preview-title');
  const openEl = document.getElementById('news-preview-open');

  if (tempNewsData && tempNewsData.url && tempNewsData.thumb) {
    box.classList.remove('hidden');
    img.src = tempNewsData.thumb;
    domainEl.textContent = `📰 ${tempNewsData.domain || 'NEWS'}`;
    titleEl.textContent = tempNewsData.title || tempNewsData.url;
    openEl.href = tempNewsData.url;
  } else {
    box.classList.add('hidden');
    img.src = '';
  }
}

function handleThumbImgError(imgEl) {
  const domain = tempNewsData?.domain || 'NEWS';
  const title = tempNewsData?.title || 'ลิงก์ข่าวอ้างอิง';
  imgEl.onerror = null;
  imgEl.src = makeNewsSvgThumb(title, domain, '#1e293b', '#0284c7');
}

function clearNewsThumbnail() {
  tempNewsData = { url: '', thumb: '', title: '', domain: '' };
  const input = document.getElementById('modal-news-url');
  if (input) input.value = '';
  document.getElementById('news-fetch-status').textContent = 'วาง URL ข่าวเพื่อให้ระบบดึงรูปปกข่าว';
  renderModalNewsPreview();
  syncModalFieldsToCardObject();
  saveState();
  renderCurrentView();
}

function useNewsTitleAsCardTitle() {
  if (!tempNewsData || !tempNewsData.title) return;
  document.getElementById('modal-title').value = tempNewsData.title;
  syncModalFieldsToCardObject();
  saveState();
  renderCurrentView();
  showToast('✨ นำหัวข้อข่าวมาตั้งเป็นชื่อการ์ดเรียบร้อย!');
}

// ============================================================================
// STATE LOAD / SAVE
// ============================================================================
function loadState() {
  try {
    const savedCols = localStorage.getItem(STORAGE_KEY_COLUMNS);
    columns = savedCols ? JSON.parse(savedCols) : [...DEFAULT_COLUMNS];
  } catch (e) {
    columns = [...DEFAULT_COLUMNS];
  }

  try {
    const savedCards = localStorage.getItem(STORAGE_KEY_CARDS);
    cards = savedCards ? JSON.parse(savedCards) : getInitialDemoCards();
  } catch (e) {
    cards = getInitialDemoCards();
  }

  try {
    const savedDict = localStorage.getItem(STORAGE_KEY_DICT);
    typoDict = savedDict ? JSON.parse(savedDict) : [...DEFAULT_TYPO_DICT];
  } catch (e) {
    typoDict = [...DEFAULT_TYPO_DICT];
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
  if (savedTheme) setBoardTheme(savedTheme, false);

  const savedTitle = localStorage.getItem(STORAGE_KEY_TITLE);
  if (savedTitle) {
    document.getElementById('board-title-input').value = savedTitle;
  }
}

const STORAGE_KEY_UPDATED_AT = 'qc_board_updated_at_v4';
let lastSyncedUpdatedAt = Number(localStorage.getItem(STORAGE_KEY_UPDATED_AT) || 0);
let officeLanUrl = '';

function saveState() {
  const nowTs = Date.now();
  lastSyncedUpdatedAt = nowTs;
  localStorage.setItem(STORAGE_KEY_COLUMNS, JSON.stringify(columns));
  localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(cards));
  localStorage.setItem(STORAGE_KEY_DICT, JSON.stringify(typoDict));
  localStorage.setItem(STORAGE_KEY_UPDATED_AT, String(nowTs));
  updateStats();

  // Sync to shared organization database on server (/api/state)
  fetch('/api/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      updatedAt: nowTs,
      columns,
      cards,
      typoDict,
      boardTitle: document.getElementById('board-title-input')?.value || '',
      boardTheme: localStorage.getItem(STORAGE_KEY_THEME) || 'trello-bg-blue'
    })
  })
    .then(r => r.json())
    .then(res => {
      if (res && res.updatedAt) {
        lastSyncedUpdatedAt = res.updatedAt;
        localStorage.setItem(STORAGE_KEY_UPDATED_AT, String(res.updatedAt));
      }
    })
    .catch(() => {});
}

async function syncFromServerState(isInitial = false) {
  try {
    const res = await fetch('/api/state');
    if (!res.ok) return;
    const json = await res.json();
    if (json.lanUrl) {
      officeLanUrl = json.lanUrl;
      const btn = document.getElementById('lan-share-btn');
      const txt = document.getElementById('lan-url-text');
      if (btn && txt) {
        txt.textContent = officeLanUrl;
        btn.classList.remove('hidden');
      }
    }
    if (json.hasData && json.data) {
      const remote = json.data;
      const remoteTs = Number(remote.updatedAt || 0);
      const localTs = Number(localStorage.getItem(STORAGE_KEY_UPDATED_AT) || 0);

      // If remote server has newer data than our browser, pull it in!
      if (remoteTs > localTs && !activeCardId) {
        lastSyncedUpdatedAt = remoteTs;
        localStorage.setItem(STORAGE_KEY_UPDATED_AT, String(remoteTs));
        if (Array.isArray(remote.columns) && remote.columns.length > 0) {
          columns = remote.columns;
          localStorage.setItem(STORAGE_KEY_COLUMNS, JSON.stringify(columns));
        }
        if (Array.isArray(remote.cards)) {
          cards = remote.cards;
          localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(cards));
        }
        if (Array.isArray(remote.typoDict) && remote.typoDict.length > 0) {
          typoDict = remote.typoDict;
          localStorage.setItem(STORAGE_KEY_DICT, JSON.stringify(typoDict));
        }
        if (remote.boardTitle && document.getElementById('board-title-input')) {
          document.getElementById('board-title-input').value = remote.boardTitle;
        }
        renderCurrentView();
      } else if (localTs > remoteTs) {
        // Our browser has newer data than the server (e.g. after Vercel cold start), push it up!
        saveState();
      }
    } else {
      // Server has no data yet -> push our browser's saved state up to the server!
      saveState();
    }
  } catch (e) {}
}

function copyLanUrl() {
  if (!officeLanUrl) return;
  navigator.clipboard.writeText(officeLanUrl).then(() => {
    showToast(`🌐 คัดลอกลิงก์ "${officeLanUrl}" แล้ว! ส่งให้น้องในออฟฟิศที่ต่อ Wi-Fi เดียวกันเปิดได้เลย`);
  });
}

function saveBoardTitle(val) {
  localStorage.setItem(STORAGE_KEY_TITLE, val);
  showToast('บันทึกชื่อบอร์ดเรียบร้อย');
}

function setBoardTheme(themeClass, notify = true) {
  const body = document.getElementById('board-bg');
  body.className = `${themeClass} min-h-screen flex flex-col font-sans select-none text-slate-800 overflow-hidden`;
  localStorage.setItem(STORAGE_KEY_THEME, themeClass);
  if (notify) showToast('🎨 เปลี่ยนสีพื้นหลัง QC Board แล้ว');
}

function resetDemoData() {
  if (!confirm('ต้องการรีเซ็ต QC Board กลับเป็นข้อมูลตัวอย่างทั้ง 7 ขั้นตอนใช่หรือไม่?')) return;
  columns = [...DEFAULT_COLUMNS];
  cards = getInitialDemoCards();
  typoDict = [...DEFAULT_TYPO_DICT];
  saveState();
  renderCurrentView();
  showToast('รีเซ็ตข้อมูลตัวอย่าง 7 ขั้นตอนเรียบร้อยแล้ว');
}

// ============================================================================
// TYPO SCANNER & DEADLINE BADGES
// ============================================================================
// ============================================================================
// 3-LAYER THAI PROOFREADING ENGINE:
// 1) คำสะกดผิด (Spelling/Typos)
// 2) คำซ้ำ / พิมพ์เบิ้ลติดกัน (Duplicate/Repeated Words)
// 3) คำไม่ถูกบริบทประโยค / รูปประโยคผิดธรรมชาติ (Contextual & Sentence Grammar)
// ============================================================================
const ALLOWED_DOUBLE_WORDS = new Set(['ต่างๆ', 'นาๆ', 'ใครๆ', 'ไหนๆ', 'ค่อยๆ', 'บ่อยๆ', 'จริงๆ', 'ดีๆ', 'เร็วๆ', 'ช้าๆ', 'เล็กๆ', 'ใหญ่ๆ', 'มากๆ', 'สดๆ', 'ร้อนๆ', 'ง่ายๆ']);

function scanTextForTypos(text) {
  if (!text || !text.trim()) return [];
  const found = [];
  const seenKeys = new Set();

  const addIssue = (wrong, right, note, category) => {
    const key = `${wrong}=>${right}`;
    if (seenKeys.has(key)) return;
    seenKeys.add(key);
    found.push({ wrong, right, note, category });
  };

  // LAYER 1: Dictionary Spelling & Redundant Phrase Rules
  typoDict.forEach(rule => {
    if (!rule.wrong) return;
    if (text.includes(rule.wrong)) {
      addIssue(rule.wrong, rule.right, rule.note || 'คำที่มักเขียนผิด', rule.type || 'คำสะกดผิด');
    }
  });

  // LAYER 2: Automatic Repeated / Duplicate Word Detector (คำซ้ำ / พิมพ์เบิ้ลติดกัน)
  // 2A: Space-separated duplicate Thai/English words (e.g. "วันนี้ วันนี้", "สั่งซื้อ สั่งซื้อ")
  const spaceDupRegex = /([ก-๙A-Za-z0-9]{2,})\s+\1/g;
  let m;
  while ((m = spaceDupRegex.exec(text)) !== null) {
    addIssue(m[0], m[1], 'พิมพ์คำซ้ำเว้นวรรคติดกัน 2 ครั้ง', 'คำซ้ำติดกัน');
  }

  // 2B: Unspaced consecutive duplicate words via Intl.Segmenter('th') (e.g. "เราเรา", "ที่ที่", "ครับครับ", "เลยเลย")
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
      const segments = Array.from(segmenter.segment(text));
      for (let i = 0; i < segments.length - 1; i++) {
        const w1 = segments[i].segment;
        const w2 = segments[i + 1].segment;
        if (
          segments[i].isWordLike &&
          segments[i + 1].isWordLike &&
          w1 === w2 &&
          w1.length >= 2 &&
          !/^[0-9]+$/.test(w1) &&
          !ALLOWED_DOUBLE_WORDS.has(w1) &&
          w1 !== 'ๆ'
        ) {
          addIssue(w1 + w2, w1, `พิมพ์คำว่า "${w1}" ซ้ำติดกันโดยไม่จำเป็น (หากต้องการซ้ำให้ใช้ "${w1}ๆ")`, 'คำซ้ำติดกัน');
        }
      }
    } catch (e) {}
  }

  // LAYER 3: Contextual Sentence Structure & Grammar Rules (คำไม่ถูกประโยค / บริบทคำถาม)
  // Split into clauses by spaces/newlines/punctuation
  const clauses = text.split(/[\n\r!?.]+|\s{2,}/);
  const questionPatterns = [
    /(ใคร|อะไร|ที่ไหน|เมื่อไหร่|ทำไม|อย่างไร|ยังไง|กี่บาท|เท่าไหร่|รุ่นไหน|สีไหน|แบบไหน|ตัวไหน|ดีไหม|ดีมั้ย|ใช่ไหม|ใช่มั้ย|หรือเปล่า|หรือยัง)([ก-๙\s]{0,18}?)(ค่ะ)/g
  ];

  clauses.forEach(clause => {
    questionPatterns.forEach(regex => {
      let qm;
      while ((qm = regex.exec(clause)) !== null) {
        const fullMatch = qm[0];
        const fixedMatch = fullMatch.replace(/ค่ะ$/, 'คะ');
        addIssue(
          fullMatch,
          fixedMatch,
          `ประโยคคำถาม ("${qm[1]}...") ต้องลงท้ายด้วยเสียงตรี "คะ" ไม่ใช่ "ค่ะ"`,
          'คำไม่ถูกประโยค'
        );
      }
    });
  });

  // Check awkward particle combinations (เช่น "ซิค่ะ", "เถอะค่ะ", "จ๊ะค่ะ", "นะคะค่ะ")
  const awkwardParticles = [
    { wrong: 'ซิค่ะ', right: 'ซิคะ', note: 'คำบอกให้ทำต้องใช้ "ซิคะ"' },
    { wrong: 'สิค่ะ', right: 'สิคะ', note: 'คำบอกให้ทำต้องใช้ "สิคะ"' },
    { wrong: 'เถอะค่ะ', right: 'เถอะคะ', note: 'คำชวนต้องใช้ "เถอะคะ"' },
    { wrong: 'นะคะค่ะ', right: 'นะคะ', note: 'พิมพ์คำลงท้ายซ้ำซ้อน' },
    { wrong: 'ค่ะคะ', right: 'ค่ะ', note: 'พิมพ์คำลงท้ายซ้ำซ้อน' },
    { wrong: 'คะค่ะ', right: 'คะ', note: 'พิมพ์คำลงท้ายซ้ำซ้อน' }
  ];
  awkwardParticles.forEach(p => {
    if (text.includes(p.wrong)) {
      addIssue(p.wrong, p.right, p.note, 'คำไม่ถูกประโยค');
    }
  });

  return found;
}

function getDeadlineInfo(card) {
  const now = new Date();
  const draftDate = card.draftDeadline ? new Date(card.draftDeadline) : null;
  const pubDate = card.publishTime ? new Date(card.publishTime) : null;

  let draftState = {
    label: 'ไม่ระบุเวลาส่งบท',
    shortLabel: '-',
    trelloBadge: 'bg-slate-100 text-slate-600',
    isOverdue: false
  };

  if (draftDate && !isNaN(draftDate)) {
    const diffHours = (draftDate - now) / (1000 * 3600);
    const formatted = formatThaiDateTime(draftDate);
    if (card.status === 'idea_review' || card.status === 'writing') {
      if (diffHours < 0) {
        draftState = {
          label: `ส่งบทช้า ${Math.abs(Math.round(diffHours))} ชม. (${formatted})`,
          shortLabel: `ส่งบท: ${formatted} (ช้า!)`,
          trelloBadge: 'bg-[#eb5a46] text-white font-semibold',
          isOverdue: true
        };
      } else if (diffHours <= 5) {
        draftState = {
          label: `ใกล้ถึงเวลาส่งบท (${formatted})`,
          shortLabel: `ส่งบท: ${formatted}`,
          trelloBadge: 'bg-[#f2d600] text-slate-900 font-semibold',
          isOverdue: false
        };
      } else {
        draftState = {
          label: `กำหนดส่งบท: ${formatted}`,
          shortLabel: `ส่งบท: ${formatted}`,
          trelloBadge: 'bg-slate-100 text-slate-700 border border-slate-300',
          isOverdue: false
        };
      }
    } else {
      draftState = {
        label: `ส่งบทแล้ว (${formatted})`,
        shortLabel: `บทเสร็จแล้ว`,
        trelloBadge: 'bg-[#61bd4f] text-white font-medium',
        isOverdue: false
      };
    }
  }

  let pubState = {
    label: 'ไม่ระบุเวลาลงโพสต์',
    shortLabel: '-',
    trelloBadge: 'bg-slate-100 text-slate-600',
    isMissed: false
  };

  if (pubDate && !isNaN(pubDate)) {
    const diffPubHours = (pubDate - now) / (1000 * 3600);
    const formattedPub = formatThaiDateTime(pubDate);
    if (card.status !== 'posted' && card.status !== 'waiting_post' && diffPubHours < 0) {
      pubState = {
        label: `เลยเวลาลงโพสต์! (${formattedPub})`,
        shortLabel: `เวลาลง: ${formattedPub} (สาย!)`,
        trelloBadge: 'bg-[#eb5a46] text-white font-bold',
        isMissed: true
      };
    } else if (card.status === 'waiting_post' || card.status === 'posted') {
      pubState = {
        label: `เวลาลงโพสต์: ${formattedPub}`,
        shortLabel: `เวลาลง: ${formattedPub}`,
        trelloBadge: 'bg-[#0079bf] text-white font-medium',
        isMissed: false
      };
    } else {
      pubState = {
        label: `เวลาลงโพสต์: ${formattedPub}`,
        shortLabel: `เวลาลง: ${formattedPub}`,
        trelloBadge: 'bg-sky-50 text-sky-800 border border-sky-200',
        isMissed: false
      };
    }
  }

  return { draftState, pubState };
}

function formatThaiDateTime(dateObj) {
  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const d = dateObj.getDate();
  const m = months[dateObj.getMonth()];
  const hh = String(dateObj.getHours()).padStart(2, '0');
  const mm = String(dateObj.getMinutes()).padStart(2, '0');
  return `${d} ${m} ${hh}:${mm}`;
}

function validateMoveCard(card, targetStatus) {
  const typos = scanTextForTypos(card.script || '');
  const totalCheck = (card.checklist || []).length;
  const doneCheck = (card.checklist || []).filter(c => c.done).length;

  if (targetStatus === 'script_review' || targetStatus === 'script_done') {
    if (!card.script || card.script.trim().length < 10) {
      return {
        allowed: false,
        reason: '❌ ยังไม่ได้เขียนบทคอนเทนต์ในการ์ด (ต้องพิมพ์บทก่อนส่งตรวจบท)'
      };
    }
    if (typos.length > 0) {
      return {
        allowed: false,
        reason: `❌ พบคำผิดในบท ${typos.length} คำ (${typos.map(t => `"${t.wrong}"`).join(', ')}) ต้องกดแก้คำผิดให้หมดก่อนส่งบท!`
      };
    }
  }

  if (targetStatus === 'waiting_post') {
    if (typos.length > 0) {
      return {
        allowed: false,
        reason: '❌ พบคำผิดในบท/แคปชั่น กรุณาแก้ก่อนนำไปตั้งเวลารอลงโพสต์'
      };
    }
    if (doneCheck < totalCheck) {
      return {
        allowed: false,
        reason: `❌ ต้องติ๊ก Checklist ตรวจทานงานให้ครบทุกข้อก่อน (${doneCheck}/${totalCheck} ข้อ)`
      };
    }
  }

  return { allowed: true, reason: '' };
}

function switchView(view) {
  currentView = view;
  const boardContainer = document.getElementById('board-view-container');
  const calContainer = document.getElementById('calendar-view-container');
  const btnBoard = document.getElementById('view-btn-board');
  const btnCal = document.getElementById('view-btn-calendar');

  if (view === 'board') {
    boardContainer.classList.remove('hidden');
    calContainer.classList.add('hidden');
    btnBoard.className = 'px-3 py-1.5 rounded-md font-semibold bg-white text-slate-900 shadow flex items-center gap-1.5 transition';
    btnCal.className = 'px-3 py-1.5 rounded-md font-medium text-white/85 hover:text-white flex items-center gap-1.5 transition';
  } else {
    boardContainer.classList.add('hidden');
    calContainer.classList.remove('hidden');
    btnCal.className = 'px-3 py-1.5 rounded-md font-semibold bg-white text-slate-900 shadow flex items-center gap-1.5 transition';
    btnBoard.className = 'px-3 py-1.5 rounded-md font-medium text-white/85 hover:text-white flex items-center gap-1.5 transition';
  }
  renderCurrentView();
}

function renderCurrentView() {
  if (currentView === 'board') {
    renderBoard();
  } else {
    renderCalendarView();
  }
}

// ============================================================================
// RENDER 7-COLUMN QC BOARD WITH NEWS THUMBNAIL COVERS
// ============================================================================
function renderBoard() {
  const boardEl = document.getElementById('kanban-board');
  const filterPlatform = document.getElementById('filter-platform').value;
  const searchQuery = (document.getElementById('search-input')?.value || '').trim().toLowerCase();

  boardEl.innerHTML = '';

  columns.forEach(col => {
    const colCards = cards.filter(c => {
      if (c.status !== col.id) return false;
      if (filterPlatform !== 'ALL') {
        const hasCh = (c.channels || []).some(ch => ch.target && ch.name.includes(filterPlatform));
        if (!hasCh) return false;
      }
      if (searchQuery) {
        const hay = `${c.title} ${c.assignee} ${c.script} ${c.newsTitle || ''} ${c.newsDomain || ''}`.toLowerCase();
        if (!hay.includes(searchQuery)) return false;
      }
      return true;
    });

    const listEl = document.createElement('div');
    listEl.className = 'trello-list flex flex-col max-h-full select-none shrink-0';
    listEl.dataset.colId = col.id;

    listEl.addEventListener('dragover', e => {
      e.preventDefault();
      listEl.classList.add('drop-zone-active');
    });
    listEl.addEventListener('dragleave', () => {
      listEl.classList.remove('drop-zone-active');
    });
    listEl.addEventListener('drop', e => {
      e.preventDefault();
      listEl.classList.remove('drop-zone-active');
      if (draggedCardId) {
        attemptMoveCard(draggedCardId, col.id);
      }
    });

    listEl.innerHTML = `
      <div class="px-3 pt-2.5 pb-1.5 border-b border-slate-200/80">
        <div class="flex items-center justify-between gap-1">
          <input type="text" value="${escapeHtml(col.title)}"
            onchange="renameColumn('${col.id}', this.value)"
            class="bg-transparent focus:bg-white font-bold text-xs sm:text-[13px] text-[#172b4d] px-1 py-0.5 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#0079bf]" />
          <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-300/90 text-slate-800 shrink-0">${colCards.length}</span>
        </div>
        ${col.subtitle ? `<p class="text-[10px] text-slate-500 px-1">${escapeHtml(col.subtitle)}</p>` : ''}
      </div>

      <!-- Cards Container -->
      <div class="trello-list-cards px-2 py-2 space-y-2 overflow-y-auto flex-1" id="col-body-${col.id}"></div>

      <!-- Quick Add Card Footer -->
      <div class="p-2 pt-1" id="col-footer-${col.id}"></div>
    `;

    const bodyEl = listEl.querySelector(`#col-body-${col.id}`);
    colCards.forEach(card => {
      bodyEl.appendChild(createTrelloCardElement(card));
    });

    const footerEl = listEl.querySelector(`#col-footer-${col.id}`);
    if (activeQuickComposerColId === col.id) {
      footerEl.innerHTML = `
        <div class="space-y-1.5">
          <textarea id="quick-card-title-${col.id}" rows="2" placeholder="พิมพ์ชื่อหัวข้อ หรือวางลิงก์ข่าว (https://...) เพื่อดึง Thumbnail อัตโนมัติ!"
            onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();submitQuickAddCard('${col.id}');}"
            class="w-full bg-white rounded-lg p-2 text-xs text-slate-800 shadow-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0079bf] select-text"></textarea>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <button onclick="submitQuickAddCard('${col.id}')" class="bg-[#0079bf] hover:bg-[#026aa7] text-white text-xs font-semibold px-3 py-1.5 rounded transition">
                เพิ่มการ์ด
              </button>
              <button onclick="closeQuickComposer()" class="text-slate-500 hover:text-slate-800 p-1">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>
            <button onclick="openCreateModal('${col.id}')" class="text-[11px] text-[#0079bf] hover:underline font-medium">
              เปิดฟอร์มเต็ม
            </button>
          </div>
        </div>
      `;
    } else {
      footerEl.innerHTML = `
        <button onclick="openQuickComposer('${col.id}')" class="w-full py-1.5 px-2 rounded-lg text-xs font-medium text-[#44546f] hover:bg-slate-300/60 hover:text-[#172b4d] transition flex items-center gap-1.5">
          <i data-lucide="plus" class="w-4 h-4"></i> เพิ่มการ์ด / วางลิงก์ข่าว
        </button>
      `;
    }

    boardEl.appendChild(listEl);
  });

  const addListWrap = document.createElement('div');
  addListWrap.className = 'w-[260px] min-w-[260px] shrink-0';
  addListWrap.innerHTML = `
    <button onclick="promptAddColumn()" class="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shadow-sm border border-white/15">
      <i data-lucide="plus" class="w-4 h-4"></i> เพิ่มช่องขั้นตอนอื่น
    </button>
  `;
  boardEl.appendChild(addListWrap);

  updateStats();
  document.getElementById('dict-count').textContent = typoDict.length;
  lucide.createIcons();

  if (activeQuickComposerColId) {
    const input = document.getElementById(`quick-card-title-${activeQuickComposerColId}`);
    if (input) input.focus();
  }
}

function createTrelloCardElement(card) {
  const cardEl = document.createElement('div');
  const typos = scanTextForTypos(card.script || '');
  const totalCheck = (card.checklist || []).length;
  const doneCheck = (card.checklist || []).filter(c => c.done).length;
  const { draftState, pubState } = getDeadlineInfo(card);

  const urgentBorder = draftState.isOverdue || pubState.isMissed
    ? 'ring-2 ring-[#eb5a46]'
    : '';

  cardEl.className = `trello-card overflow-hidden cursor-pointer ${urgentBorder}`;
  cardEl.draggable = true;

  cardEl.addEventListener('dragstart', () => {
    draggedCardId = card.id;
    cardEl.classList.add('dragging');
  });
  cardEl.addEventListener('dragend', () => {
    draggedCardId = null;
    cardEl.classList.remove('dragging');
  });
  cardEl.addEventListener('click', e => {
    if (e.target.closest('.quick-ch-toggle') || e.target.closest('.news-ext-link')) return;
    openCardModal(card.id);
  });

  // 1. News Link Thumbnail Cover (Trello Card Cover Image!)
  let newsCoverHtml = '';
  if (card.newsThumb) {
    const fallbackSvg = makeNewsSvgThumb(card.newsTitle || card.title, card.newsDomain || 'NEWS');
    newsCoverHtml = `
      <div class="relative h-32 w-full bg-slate-900 overflow-hidden border-b border-slate-200 group">
        <img src="${escapeHtml(card.newsThumb)}" alt="News Thumbnail"
          onerror="this.onerror=null;this.src='${fallbackSvg}';"
          class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"></div>
        <div class="absolute bottom-1.5 left-2 right-2 flex items-center justify-between gap-1 text-white">
          <span class="text-[10px] font-bold bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1 truncate">
            📰 ${escapeHtml(card.newsDomain || 'ลิงก์ข่าว')}
          </span>
          ${card.newsUrl ? `
            <a href="${escapeHtml(card.newsUrl)}" target="_blank" rel="noopener"
              class="news-ext-link text-[10px] font-semibold bg-[#0079bf] hover:bg-[#026aa7] text-white px-2 py-0.5 rounded shadow">
              เปิดข่าว ↗
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }

  // 2. Channels Row (ช่อง 1, ช่อง 2, ช่อง 3...)
  const targetChannels = (card.channels || []).filter(ch => ch.target);
  const postedCount = targetChannels.filter(ch => ch.posted).length;

  const channelPillsHtml = targetChannels.map(ch => {
    if (card.status === 'waiting_post' || card.status === 'posted') {
      return `
        <button type="button" onclick="toggleChannelPosted('${card.id}', '${ch.id}', event)"
          class="quick-ch-toggle text-[10px] font-bold px-2 py-0.5 rounded border transition flex items-center gap-1 ${
            ch.posted
              ? 'bg-[#61bd4f] text-white border-[#519839] shadow-sm'
              : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
          }">
          ${ch.posted ? '✅' : '⬜'} ${escapeHtml(ch.name)}
        </button>
      `;
    } else {
      const chStyle = DEFAULT_CHANNELS.find(d => d.id === ch.id)?.color || 'bg-slate-700 text-white';
      return `<span class="text-[10px] font-semibold px-2 py-0.5 rounded ${chStyle}">${escapeHtml(ch.name)}</span>`;
    }
  }).join('');

  // 3. Typo Badge
  let typoBadgeHtml = '';
  if (!card.script || card.script.trim().length === 0) {
    typoBadgeHtml = `<span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">📝 รอเขียนบท</span>`;
  } else if (typos.length > 0) {
    typoBadgeHtml = `<span class="text-[10px] px-1.5 py-0.5 rounded bg-[#eb5a46] text-white font-bold animate-pulse">🚨 ${typos.length} คำผิด</span>`;
  } else {
    typoBadgeHtml = `<span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">✅ ไร้คำผิด</span>`;
  }

  const feedbackHtml = card.feedback
    ? `<div class="text-[11px] bg-amber-50 border border-amber-200 text-amber-900 px-2 py-1 rounded">💬 <b>โน้ต/ปรับแก้:</b> ${escapeHtml(card.feedback)}</div>`
    : '';

  const assigneeName = card.assignee || 'ไม่ระบุ';
  const initial = assigneeName.replace('น้อง', '').trim().charAt(0) || 'น';

  cardEl.innerHTML = `
    ${newsCoverHtml}
    <div class="p-2.5 space-y-2">
      ${channelPillsHtml ? `<div class="flex flex-wrap gap-1">${channelPillsHtml}</div>` : ''}
      <div class="text-[13px] font-semibold text-[#172b4d] leading-snug">${escapeHtml(card.title)}</div>
      ${feedbackHtml}
      <div class="flex flex-wrap gap-1 pt-0.5">
        <span class="text-[10px] px-1.5 py-0.5 rounded ${draftState.trelloBadge}">🕒 ${draftState.shortLabel}</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded ${pubState.trelloBadge}">📅 ${pubState.shortLabel}</span>
      </div>
      <div class="pt-1 flex items-center justify-between gap-1 border-t border-slate-100">
        <div class="flex items-center gap-1.5 flex-wrap">
          ${typoBadgeHtml}
          <span class="text-[10px] px-1.5 py-0.5 rounded ${doneCheck === totalCheck && totalCheck > 0 ? 'bg-[#61bd4f] text-white font-semibold' : 'bg-slate-100 text-slate-600'}">
            ☑️ ${doneCheck}/${totalCheck}
          </span>
          ${targetChannels.length > 0 ? `<span class="text-[10px] px-1.5 py-0.5 rounded ${postedCount === targetChannels.length ? 'bg-emerald-600 text-white font-bold' : 'bg-sky-100 text-sky-900 font-semibold'}">📺 ${postedCount}/${targetChannels.length} ช่อง</span>` : ''}
        </div>
        <div class="w-6 h-6 rounded-full bg-[#0079bf] text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-sm" title="ผู้รับผิดชอบ: ${escapeHtml(assigneeName)}">
          ${escapeHtml(initial)}
        </div>
      </div>
    </div>
  `;

  return cardEl;
}

function toggleChannelPosted(cardId, chId, event) {
  if (event) event.stopPropagation();
  const card = cards.find(c => c.id === cardId);
  if (!card) return;
  const ch = (card.channels || []).find(x => x.id === chId);
  if (!ch) return;

  ch.posted = !ch.posted;
  card.history = card.history || [];
  card.history.unshift({
    time: getNowShortTime(),
    text: ch.posted ? `✅ ติ๊กลงโพสต์ "${ch.name}" เรียบร้อย` : `⬜ ยกเลิกสถานะลงโพสต์ "${ch.name}"`
  });

  const targets = card.channels.filter(x => x.target);
  const doneCount = targets.filter(x => x.posted).length;
  saveState();
  renderCurrentView();
  showToast(`📺 ${ch.name}: ${ch.posted ? 'ลงโพสต์แล้ว' : 'รอลง'} (ลงแล้ว ${doneCount}/${targets.length} ช่อง)`);
}

// ============================================================================
// QUICK COMPOSER (Supports pasting a News URL directly!)
// ============================================================================
function openQuickComposer(colId) {
  activeQuickComposerColId = colId;
  renderBoard();
}

function closeQuickComposer() {
  activeQuickComposerColId = null;
  renderBoard();
}

async function submitQuickAddCard(colId) {
  const input = document.getElementById(`quick-card-title-${colId}`);
  const rawVal = (input?.value || '').trim();
  if (!rawVal) return;

  const isUrl = /^https?:\/\/\S+$/i.test(rawVal) || /^www\.\S+\.\S+/i.test(rawVal);
  const normalizedUrl = isUrl ? (/^https?:\/\//i.test(rawVal) ? rawVal : `https://${rawVal}`) : '';

  const newCard = {
    id: 'card-' + Date.now(),
    title: isUrl ? `กำลังดึงหัวข้อข่าวจาก ${extractDomain(normalizedUrl)}...` : rawVal,
    status: colId,
    assignee: 'น้องมายด์',
    contentType: 'คลิปสั้น (Reels/TikTok)',
    newsUrl: normalizedUrl,
    newsDomain: normalizedUrl ? extractDomain(normalizedUrl) : '',
    newsTitle: '',
    newsThumb: normalizedUrl ? makeNewsSvgThumb('กำลังดึงรูปปกข่าว...', extractDomain(normalizedUrl)) : '',
    draftDeadline: offsetDateTimeLocal(18),
    publishTime: offsetDateTimeLocal(42),
    script: '',
    checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: false })),
    channels: DEFAULT_CHANNELS.map((c, idx) => ({ id: c.id, name: c.name, target: idx < 3, posted: false })),
    scheduleLink: '',
    scheduleImage: '',
    feedback: '',
    history: [
      { time: getNowShortTime(), text: isUrl ? `วางลิงก์ข่าวสร้างการ์ดใหม่ (${normalizedUrl})` : `เพิ่มการ์ดใหม่ในช่อง "${colId}"` }
    ]
  };

  cards.push(newCard);
  activeQuickComposerColId = null;
  saveState();
  renderBoard();

  if (normalizedUrl) {
    showToast('⏳ กำลังดึงภาพปกข่าว (Thumbnail) และหัวข้อข่าวอัตโนมัติ...');
    const meta = await fetchNewsMetadata(normalizedUrl);
    if (meta) {
      newCard.newsThumb = meta.thumb;
      newCard.newsTitle = meta.title;
      newCard.newsDomain = meta.domain;
      if (newCard.title.startsWith('กำลังดึงหัวข้อข่าว')) {
        newCard.title = meta.title;
      }
      saveState();
      renderCurrentView();
      showToast('📰 ดึง Thumbnail และหัวข้อข่าวขึ้นหน้าการ์ดเรียบร้อย!');
    }
  } else {
    showToast('➕ เพิ่มการ์ดใหม่เรียบร้อย');
  }
}

function renameColumn(colId, newTitle) {
  const col = columns.find(c => c.id === colId);
  if (col && newTitle.trim()) {
    col.title = newTitle.trim();
    saveState();
    showToast('เปลี่ยนชื่อช่องเรียบร้อย');
  }
}

function promptAddColumn() {
  const title = prompt('ตั้งชื่อช่องขั้นตอนใหม่:');
  if (!title || !title.trim()) return;
  columns.push({
    id: 'col-' + Date.now(),
    title: title.trim(),
    subtitle: 'ขั้นตอนเพิ่มเติม',
    isCore: false
  });
  saveState();
  renderBoard();
}

function updateStats() {
  let overdue = 0;
  let review = 0;
  let scheduled = 0;

  cards.forEach(c => {
    const { draftState, pubState } = getDeadlineInfo(c);
    if (draftState.isOverdue || pubState.isMissed) overdue++;
    if (c.status === 'idea_review' || c.status === 'script_review' || c.status === 'edit_review') review++;
    if (c.status === 'waiting_post' || c.status === 'posted') scheduled++;
  });

  document.getElementById('stat-overdue').textContent = overdue;
  document.getElementById('stat-review').textContent = review;
  document.getElementById('stat-scheduled').textContent = scheduled;
}

function attemptMoveCard(cardId, targetStatus) {
  const card = cards.find(c => c.id === cardId);
  if (!card || card.status === targetStatus) return;

  const check = validateMoveCard(card, targetStatus);
  if (!check.allowed) {
    openCardModal(cardId);
    const warnBox = document.getElementById('gatekeeper-warning');
    warnBox.classList.remove('hidden');
    warnBox.innerHTML = `
      <div class="font-bold text-rose-700 flex items-center gap-1">
        🔒 QC Board ล็อกการข้ามขั้นตอน!
      </div>
      <div>${check.reason}</div>
    `;
    showToast(check.reason);
    return;
  }

  const colObj = columns.find(col => col.id === targetStatus);
  card.status = targetStatus;
  card.history = card.history || [];
  card.history.unshift({
    time: getNowShortTime(),
    text: `ย้ายการ์ดไปที่ "${colObj ? colObj.title : targetStatus}"`
  });

  saveState();
  renderCurrentView();
  showToast(`✅ ย้ายไปที่ "${colObj ? colObj.title : targetStatus}" เรียบร้อย`);
}

// ============================================================================
// CARD MODAL
// ============================================================================
function handleModalBackdropClick(e) {
  if (e.target.id === 'card-modal') {
    closeCardModal();
  }
}

function openCreateModal(defaultStatus = 'idea_review') {
  const newCard = {
    id: 'card-' + Date.now(),
    title: 'หัวข้อคอนเทนต์ใหม่ (วางลิงก์ข่าวด้านล่างเพื่อดึงรูปปกได้)',
    status: defaultStatus,
    assignee: 'น้องมายด์',
    contentType: 'คลิปสั้น (Reels/TikTok)',
    newsUrl: '',
    newsDomain: '',
    newsTitle: '',
    newsThumb: '',
    draftDeadline: offsetDateTimeLocal(18),
    publishTime: offsetDateTimeLocal(42),
    script: '',
    checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: false })),
    channels: DEFAULT_CHANNELS.map((c, idx) => ({ id: c.id, name: c.name, target: idx < 3, posted: false })),
    scheduleLink: '',
    scheduleImage: '',
    feedback: '',
    history: [
      { time: getNowShortTime(), text: 'สร้างการ์ดงานใหม่' }
    ]
  };
  cards.unshift(newCard);
  saveState();
  renderCurrentView();
  openCardModal(newCard.id);
}

function openCardModal(cardId) {
  const card = cards.find(c => c.id === cardId);
  if (!card) return;
  activeCardId = cardId;

  const colObj = columns.find(c => c.id === card.status) || columns[0];
  const { draftState } = getDeadlineInfo(card);

  document.getElementById('modal-status-badge').textContent = colObj.title;
  document.getElementById('modal-list-name-inline').textContent = colObj.title;
  document.getElementById('modal-deadline-badge').textContent = draftState.label;

  document.getElementById('modal-title').value = card.title || '';
  document.getElementById('modal-assignee').value = card.assignee || '';
  document.getElementById('modal-content-type').value = card.contentType || 'คลิปสั้น (Reels/TikTok)';
  document.getElementById('modal-draft-deadline').value = card.draftDeadline || '';
  document.getElementById('modal-publish-time').value = card.publishTime || '';
  document.getElementById('modal-script').value = card.script || '';
  document.getElementById('modal-schedule-link').value = card.scheduleLink || '';
  document.getElementById('modal-feedback').value = card.feedback || '';
  document.getElementById('modal-news-url').value = card.newsUrl || '';
  document.getElementById('news-fetch-status').textContent = card.newsThumb ? '✅ แสดง Thumbnail ข่าวอยู่' : 'วาง URL ข่าวเพื่อให้ระบบดึงรูปปกข่าว';

  tempNewsData = {
    url: card.newsUrl || '',
    thumb: card.newsThumb || '',
    title: card.newsTitle || '',
    domain: card.newsDomain || ''
  };

  if (!card.channels || card.channels.length === 0) {
    card.channels = DEFAULT_CHANNELS.map((c, idx) => ({ id: c.id, name: c.name, target: idx < 3, posted: false }));
  }
  tempChannels = card.channels.map(ch => ({ ...ch }));
  tempChecklist = (card.checklist || DEFAULT_CHECKLIST).map(c => ({ ...c }));
  tempProofImageData = card.scheduleImage || '';

  renderModalNewsPreview();
  renderModalChannels();
  renderModalChecklist();
  renderProofImagePreview();
  runTypoCheck();
  renderWorkflowActionButtons(card);
  renderHistoryLog(card);

  document.getElementById('gatekeeper-warning').classList.add('hidden');

  const modal = document.getElementById('card-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  lucide.createIcons();
}

function closeCardModal() {
  if (activeCardId) {
    saveCardModal(false);
  }
  activeCardId = null;
  const modal = document.getElementById('card-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function renderModalChannels() {
  const container = document.getElementById('modal-platforms');
  container.innerHTML = '';

  tempChannels.forEach((ch, idx) => {
    const row = document.createElement('div');
    row.className = `flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs ${
      ch.target ? 'bg-sky-50 border-sky-300 text-slate-900' : 'bg-slate-100 border-slate-200 text-slate-400'
    }`;

    row.innerHTML = `
      <label class="flex items-center gap-1.5 cursor-pointer font-semibold">
        <input type="checkbox" ${ch.target ? 'checked' : ''} class="rounded text-[#0079bf]" />
        <span>${escapeHtml(ch.name)}</span>
      </label>
      ${ch.target ? `
        <button type="button" class="ml-1 px-2 py-0.5 rounded text-[11px] font-bold transition ${
          ch.posted ? 'bg-[#61bd4f] text-white' : 'bg-amber-200/80 text-amber-900 hover:bg-amber-300'
        }">
          ${ch.posted ? '✅ ลงแล้ว' : '⏳ รอลง'}
        </button>
      ` : ''}
    `;

    row.querySelector('input').onchange = e => {
      tempChannels[idx].target = e.target.checked;
      if (!e.target.checked) tempChannels[idx].posted = false;
      renderModalChannels();
      syncAndRefreshActions();
    };

    const statusBtn = row.querySelector('button');
    if (statusBtn) {
      statusBtn.onclick = () => {
        tempChannels[idx].posted = !tempChannels[idx].posted;
        renderModalChannels();
        syncAndRefreshActions();
      };
    }

    container.appendChild(row);
  });

  const addChBtn = document.createElement('button');
  addChBtn.type = 'button';
  addChBtn.className = 'text-xs px-2.5 py-1.5 rounded-lg border border-dashed border-slate-400 text-slate-600 hover:bg-slate-100 font-medium';
  addChBtn.textContent = '+ เพิ่มช่องทาง (ช่อง 5...)';
  addChBtn.onclick = () => {
    const name = prompt(`ตั้งชื่อช่องทางใหม่ (เช่น "ช่อง ${tempChannels.length + 1} (Lemon8 / LINE)"):`);
    if (!name || !name.trim()) return;
    tempChannels.push({
      id: 'ch-' + Date.now(),
      name: name.trim(),
      target: true,
      posted: false
    });
    renderModalChannels();
    syncAndRefreshActions();
  };
  container.appendChild(addChBtn);
}

function renderModalChecklist() {
  const container = document.getElementById('modal-checklist');
  container.innerHTML = '';

  const total = tempChecklist.length;
  const done = tempChecklist.filter(c => c.done).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  document.getElementById('checklist-progress-text').textContent = `${done}/${total} (${pct}%)`;
  const bar = document.getElementById('checklist-progress-bar');
  bar.style.width = `${pct}%`;
  bar.className = pct === 100 ? 'bg-[#61bd4f] h-full transition-all duration-300' : 'bg-[#0079bf] h-full transition-all duration-300';

  tempChecklist.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = `flex items-center justify-between gap-2 p-2 rounded-md border transition text-xs ${
      item.done
        ? 'bg-emerald-50/70 border-emerald-200 text-slate-500 line-through'
        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
    }`;
    row.innerHTML = `
      <label class="flex items-start gap-2.5 cursor-pointer flex-1">
        <input type="checkbox" ${item.done ? 'checked' : ''} class="mt-0.5 rounded text-[#0079bf] focus:ring-0 cursor-pointer" />
        <span>${escapeHtml(item.text)}</span>
      </label>
      <button type="button" onclick="removeChecklistItem(${idx})" class="text-slate-400 hover:text-rose-600 text-[11px] px-1">ลบ</button>
    `;
    row.querySelector('input').addEventListener('change', e => {
      tempChecklist[idx].done = e.target.checked;
      renderModalChecklist();
      syncAndRefreshActions();
    });
    container.appendChild(row);
  });
}

function addChecklistItem() {
  const input = document.getElementById('new-checklist-input');
  const text = (input.value || '').trim();
  if (!text) return;
  tempChecklist.push({ id: 'chk-' + Date.now(), text, done: false });
  input.value = '';
  renderModalChecklist();
  syncAndRefreshActions();
}

function removeChecklistItem(idx) {
  tempChecklist.splice(idx, 1);
  renderModalChecklist();
  syncAndRefreshActions();
}

function syncAndRefreshActions() {
  syncModalFieldsToCardObject();
  const card = cards.find(c => c.id === activeCardId);
  if (card) renderWorkflowActionButtons(card);
}

function runTypoCheck() {
  const text = document.getElementById('modal-script').value || '';
  document.getElementById('char-counter').textContent = `${text.length} ตัวอักษร`;

  const typos = scanTextForTypos(text);
  const alertBox = document.getElementById('typo-alert-box');
  const btnAutoFix = document.getElementById('btn-autofix');

  if (!text.trim()) {
    btnAutoFix.classList.add('hidden');
    alertBox.className = 'rounded-lg p-3 border bg-slate-50 border-slate-200 text-xs text-slate-500';
    alertBox.innerHTML = `✍️ พิมพ์ไอเดียหรือบทคอนเทนต์ลงในช่องด้านบน ระบบจะสแกนหาคำผิดภาษาไทยอัตโนมัติครับ`;
  } else if (typos.length > 0) {
    btnAutoFix.classList.remove('hidden');
    alertBox.className = 'rounded-lg p-3 border bg-rose-50 border-rose-300 text-xs text-rose-900 space-y-2';
    const itemsHtml = typos.map(t => {
      const catColor = t.category === 'คำซ้ำติดกัน'
        ? 'bg-amber-100 text-amber-800 border-amber-300'
        : t.category === 'คำไม่ถูกประโยค' || t.category === 'ผิดบริบทประโยคคำถาม' || t.category === 'รูปประโยคฟุ่มเฟือย'
        ? 'bg-purple-100 text-purple-800 border-purple-300'
        : 'bg-rose-100 text-rose-800 border-rose-300';
      return `
      <div class="flex items-center justify-between bg-white px-3 py-1.5 rounded border border-rose-200 shadow-sm gap-2">
        <div class="flex items-center flex-wrap gap-1.5">
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded border ${catColor}">${escapeHtml(t.category || 'คำผิด')}</span>
          <span class="line-through text-rose-600 font-bold">"${escapeHtml(t.wrong)}"</span>
          <span>➡️ แก้เป็น</span>
          <span class="text-emerald-700 font-bold">"${escapeHtml(t.right)}"</span>
          ${t.note ? `<span class="text-slate-500 text-[11px]">(${escapeHtml(t.note)})</span>` : ''}
        </div>
        <button type="button" onclick="replaceSingleTypo('${escapeQuotes(t.wrong)}', '${escapeQuotes(t.right)}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded text-[11px] font-semibold shrink-0 transition">
          แก้จุดนี้
        </button>
      </div>
    `;
    }).join('');

    alertBox.innerHTML = `
      <div class="font-bold text-rose-700 flex items-center gap-1.5">
        🚨 พบคำผิด ${typos.length} จุด! (ระบบล็อกปุ่มส่งตรวจบทจนกว่าจะแก้ครบ)
      </div>
      <div class="space-y-1.5">${itemsHtml}</div>
    `;
  } else {
    btnAutoFix.classList.add('hidden');
    alertBox.className = 'rounded-lg p-3 border bg-emerald-50 border-emerald-300 text-xs text-emerald-800 flex items-center gap-2';
    alertBox.innerHTML = `✅ <b>ตรวจคำผิดผ่าน 100%!</b> ไม่พบคำที่มักสะกดผิดในคลังคำศัพท์`;
  }

  if (activeCardId) {
    syncAndRefreshActions();
  }
}

function replaceSingleTypo(wrongWord, rightWord) {
  const scriptEl = document.getElementById('modal-script');
  scriptEl.value = scriptEl.value.split(wrongWord).join(rightWord);
  runTypoCheck();
  showToast(`แก้คำว่า "${wrongWord}" เป็น "${rightWord}" เรียบร้อย!`);
}

function autoFixAllTypos() {
  const scriptEl = document.getElementById('modal-script');
  let text = scriptEl.value;
  const typos = scanTextForTypos(text);
  typos.forEach(t => {
    text = text.split(t.wrong).join(t.right);
  });
  scriptEl.value = text;
  runTypoCheck();
  showToast('✨ แก้ไขคำผิดทั้งหมดในบทให้อัตโนมัติแล้ว!');
}

function handleProofImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    tempProofImageData = e.target.result;
    renderProofImagePreview();
    syncAndRefreshActions();
  };
  reader.readAsDataURL(file);
}

function removeProofImage() {
  tempProofImageData = '';
  document.getElementById('modal-schedule-image').value = '';
  renderProofImagePreview();
  syncAndRefreshActions();
}

function renderProofImagePreview() {
  const container = document.getElementById('proof-image-preview-container');
  const img = document.getElementById('proof-image-preview');
  if (tempProofImageData) {
    img.src = tempProofImageData;
    container.classList.remove('hidden');
  } else {
    img.src = '';
    container.classList.add('hidden');
  }
}

function renderWorkflowActionButtons(card) {
  const container = document.getElementById('workflow-buttons');
  if (!container) return;

  container.innerHTML = '';

  if (card.status === 'idea_review') {
    container.innerHTML += `
      <button type="button" onclick="saveAndMoveCard('writing')" class="w-full py-2.5 px-3 rounded-md bg-[#61bd4f] hover:bg-[#519839] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition">
        ✅ อนุมัติไอเดีย ➡️ ไปเขียนบทต่อได้
      </button>
    `;
  }

  if (card.status === 'writing') {
    const check = validateMoveCard(card, 'script_review');
    if (check.allowed) {
      container.innerHTML += `
        <button type="button" onclick="saveAndMoveCard('script_review')" class="w-full py-2.5 px-3 rounded-md bg-[#0079bf] hover:bg-[#026aa7] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition">
          📝 ส่งบทเสร็จแล้ว ➡️ รอตรวจ / ปรับแก้
        </button>
      `;
    } else {
      container.innerHTML += `
        <div class="p-2.5 rounded-md bg-rose-50 border border-rose-200 text-xs space-y-1">
          <div class="font-bold text-rose-700">🔒 ยังส่งบทไม่ได้:</div>
          <div class="text-rose-900 text-[11px]">${check.reason}</div>
        </div>
      `;
    }
  }

  if (card.status === 'script_review') {
    const check = validateMoveCard(card, 'script_done');
    if (check.allowed) {
      container.innerHTML += `
        <button type="button" onclick="saveAndMoveCard('script_done')" class="w-full py-2.5 px-3 rounded-md bg-[#61bd4f] hover:bg-[#519839] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition">
          ✨ ตรวจผ่าน ➡️ ย้ายไป "4. บทสมบูรณ์"
        </button>
        <button type="button" onclick="rejectCardWithFeedback()" class="w-full py-2 px-3 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition">
          🔄 มีจุดต้องปรับแก้ (ตีกลับไปเขียนบท)
        </button>
      `;
    } else {
      container.innerHTML += `
        <div class="p-2.5 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-800">${check.reason}</div>
      `;
    }
  }

  if (card.status === 'script_done') {
    container.innerHTML += `
      <button type="button" onclick="saveAndMoveCard('edit_review')" class="w-full py-2.5 px-3 rounded-md bg-[#0079bf] hover:bg-[#026aa7] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition">
        🎬 ตัดต่อเสร็จแล้ว ➡️ ส่งตรวจคลิป (ช่อง 5)
      </button>
    `;
  }

  if (card.status === 'edit_review') {
    const check = validateMoveCard(card, 'waiting_post');
    if (check.allowed) {
      container.innerHTML += `
        <button type="button" onclick="saveAndMoveCard('waiting_post')" class="w-full py-2.5 px-3 rounded-md bg-[#61bd4f] hover:bg-[#519839] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition">
          ⏰ คลิปผ่านแล้ว ➡️ ย้ายไป "6. รอลง"
        </button>
      `;
    } else {
      container.innerHTML += `
        <div class="p-2.5 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-800">${check.reason}</div>
      `;
    }
  }

  if (card.status === 'waiting_post') {
    container.innerHTML += `
      <button type="button" onclick="saveAndMoveCard('posted')" class="w-full py-2.5 px-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition">
        🚀 ลงโพสต์แล้ว ➡️ ย้ายไปเช็ค ช่อง 1, 2, 3...
      </button>
    `;
  }

  if (card.status === 'posted') {
    const targets = tempChannels.filter(c => c.target);
    const doneCount = targets.filter(c => c.posted).length;
    container.innerHTML += `
      <div class="p-2.5 rounded-md ${doneCount === targets.length ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-amber-50 border-amber-300 text-amber-900'} border text-xs font-bold text-center">
        📺 ลงโพสต์แล้ว ${doneCount}/${targets.length} ช่องทาง
      </div>
    `;
  }
}

function syncModalFieldsToCardObject() {
  if (!activeCardId) return;
  const card = cards.find(c => c.id === activeCardId);
  if (!card) return;

  card.title = document.getElementById('modal-title').value.trim() || 'ไม่มีชื่อหัวข้อ';
  card.assignee = document.getElementById('modal-assignee').value.trim() || 'ไม่ระบุ';
  card.contentType = document.getElementById('modal-content-type').value;
  card.draftDeadline = document.getElementById('modal-draft-deadline').value;
  card.publishTime = document.getElementById('modal-publish-time').value;
  card.script = document.getElementById('modal-script').value;
  card.scheduleLink = document.getElementById('modal-schedule-link').value.trim();
  card.feedback = document.getElementById('modal-feedback').value.trim();
  card.newsUrl = tempNewsData.url || document.getElementById('modal-news-url').value.trim();
  card.newsThumb = tempNewsData.thumb || '';
  card.newsTitle = tempNewsData.title || '';
  card.newsDomain = tempNewsData.domain || '';
  card.channels = tempChannels.map(ch => ({ ...ch }));
  card.checklist = tempChecklist.map(c => ({ ...c }));
  card.scheduleImage = tempProofImageData;
}

function saveCardModal(closeAfter = true) {
  syncModalFieldsToCardObject();
  saveState();
  renderCurrentView();
  if (closeAfter) {
    activeCardId = null;
    const modal = document.getElementById('card-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    showToast('💾 บันทึกการ์ดเรียบร้อยแล้ว');
  }
}

function saveAndMoveCard(targetStatus) {
  syncModalFieldsToCardObject();
  const id = activeCardId;
  saveState();
  attemptMoveCard(id, targetStatus);
  const updatedCard = cards.find(c => c.id === id);
  if (updatedCard && updatedCard.status === targetStatus) {
    closeCardModal();
  }
}

function rejectCardWithFeedback() {
  syncModalFieldsToCardObject();
  const card = cards.find(c => c.id === activeCardId);
  if (!card) return;

  if (!card.feedback) {
    card.feedback = 'มีจุดต้องปรับแก้เพิ่มเติม รบกวนดูตามคอมเมนต์ครับ';
  }
  card.status = 'writing';
  card.history.unshift({
    time: getNowShortTime(),
    text: `🔄 ส่งกลับไปปรับแก้บท: "${card.feedback}"`
  });
  saveState();
  renderCurrentView();
  closeCardModal();
  showToast('🔄 ส่งกลับไปช่อง "2. เขียนบท" เพื่อปรับแก้แล้ว');
}

function approveCardFromReview() {
  syncModalFieldsToCardObject();
  const card = cards.find(c => c.id === activeCardId);
  if (!card) return;

  const nextMap = {
    idea_review: 'writing',
    writing: 'script_review',
    script_review: 'script_done',
    script_done: 'edit_review',
    edit_review: 'waiting_post',
    waiting_post: 'posted'
  };
  const nextStatus = nextMap[card.status] || 'script_done';
  saveAndMoveCard(nextStatus);
}

function duplicateCurrentCard() {
  syncModalFieldsToCardObject();
  const card = cards.find(c => c.id === activeCardId);
  if (!card) return;
  const copy = JSON.parse(JSON.stringify(card));
  copy.id = 'card-' + Date.now();
  copy.title = card.title + ' (สำเนา)';
  copy.history.unshift({ time: getNowShortTime(), text: 'คัดลอกการ์ดใบใหม่' });
  cards.unshift(copy);
  saveState();
  renderCurrentView();
  closeCardModal();
  showToast('📋 คัดลอกการ์ดใบใหม่เรียบร้อยแล้ว');
}

function deleteCurrentCard() {
  if (!activeCardId) return;
  if (!confirm('ต้องการลบการ์ดงานนี้ใช่หรือไม่?')) return;
  cards = cards.filter(c => c.id !== activeCardId);
  activeCardId = null;
  saveState();
  renderCurrentView();
  const modal = document.getElementById('card-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  showToast('🗑️ ลบการ์ดเรียบร้อยแล้ว');
}

function renderHistoryLog(card) {
  const container = document.getElementById('modal-history');
  const list = card.history || [];
  container.innerHTML = list.map(item => `
    <div class="flex items-start gap-1.5 border-b border-slate-100 pb-1">
      <span class="text-[#0079bf] font-semibold shrink-0">[${escapeHtml(item.time)}]</span>
      <span class="text-slate-700">${escapeHtml(item.text)}</span>
    </div>
  `).join('');
}

function renderCalendarView() {
  const container = document.getElementById('calendar-agenda-list');
  container.innerHTML = '';

  const sorted = [...cards].sort((a, b) => new Date(a.publishTime || 0) - new Date(b.publishTime || 0));

  sorted.forEach(card => {
    const colObj = columns.find(c => c.id === card.status) || { title: card.status };
    const { draftState, pubState } = getDeadlineInfo(card);
    const targets = (card.channels || []).filter(c => c.target);
    const postedCnt = targets.filter(c => c.posted).length;

    const row = document.createElement('div');
    row.className = 'p-3.5 rounded-xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200 flex flex-wrap items-center justify-between gap-3 cursor-pointer transition';
    row.onclick = () => openCardModal(card.id);

    row.innerHTML = `
      <div class="flex items-center gap-3 flex-1 min-w-[240px]">
        ${card.newsThumb ? `<img src="${escapeHtml(card.newsThumb)}" class="w-16 h-12 object-cover rounded border border-slate-300 shrink-0" />` : ''}
        <div class="space-y-1">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">${escapeHtml(colObj.title)}</span>
            <span class="text-xs text-slate-500">👤 ${escapeHtml(card.assignee)}</span>
            <span class="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-semibold">📺 ลงแล้ว ${postedCnt}/${targets.length} ช่อง</span>
          </div>
          <div class="text-sm font-bold text-slate-900">${escapeHtml(card.title)}</div>
        </div>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs px-2.5 py-1 rounded ${draftState.trelloBadge}">🕒 ${draftState.shortLabel}</span>
        <span class="text-xs px-2.5 py-1 rounded ${pubState.trelloBadge}">📅 ${pubState.shortLabel}</span>
      </div>
    `;
    container.appendChild(row);
  });
}

function copyCardForTrelloOrLine() {
  syncModalFieldsToCardObject();
  const card = cards.find(c => c.id === activeCardId);
  if (!card) return;

  const colObj = columns.find(c => c.id === card.status) || { title: card.status };
  const chSummary = (card.channels || [])
    .filter(c => c.target)
    .map(c => `${c.posted ? '✅' : '⬜'} ${c.name}`)
    .join(' | ');

  const summary = [
    `📌 QC Board: ${card.title}`,
    `📍 สถานะปัจจุบัน: ${colObj.title}`,
    `📰 ลิงก์ข่าวอ้างอิง: ${card.newsUrl || '-'}`,
    `👤 ผู้รับผิดชอบ: ${card.assignee}`,
    `⏳ กำหนดส่งบท: ${card.draftDeadline ? formatThaiDateTime(new Date(card.draftDeadline)) : '-'}`,
    `⏰ เวลาลงโพสต์: ${card.publishTime ? formatThaiDateTime(new Date(card.publishTime)) : '-'}`,
    `📺 สถานะลงช่องทาง: ${chSummary}`,
    `💬 โน้ต/ปรับแก้: ${card.feedback || '-'}`,
    `-------------------------`,
    `📝 บท/แคปชั่น:`,
    card.script || '(ยังไม่ได้ใส่บท)'
  ].join('\n');

  navigator.clipboard.writeText(summary).then(() => {
    showToast('📋 คัดลอกสรุปงานพร้อมลิงก์ข่าวและสถานะช่อง 1, 2, 3 ส่งเข้า LINE ได้เลย!');
  });
}

function setRole(role) {
  currentRole = role;
  const btnWriter = document.getElementById('role-writer');
  const btnManager = document.getElementById('role-manager');

  if (role === 'writer') {
    btnWriter.className = 'px-2.5 py-1 rounded font-medium transition flex items-center gap-1 bg-amber-400 text-slate-950 shadow';
    btnManager.className = 'px-2.5 py-1 rounded font-medium transition flex items-center gap-1 text-white/80 hover:text-white';
    showToast('🧑‍💻 มุมมอง "น้องคนเขียน"');
  } else {
    btnManager.className = 'px-2.5 py-1 rounded font-medium transition flex items-center gap-1 bg-emerald-400 text-slate-950 shadow';
    btnWriter.className = 'px-2.5 py-1 rounded font-medium transition flex items-center gap-1 text-white/80 hover:text-white';
    showToast('🛡️ มุมมอง "หัวหน้าตรวจ"');
  }
}

function openDictModal() {
  renderDictList();
  const m = document.getElementById('dict-modal');
  m.classList.remove('hidden');
  m.classList.add('flex');
}

function closeDictModal() {
  const m = document.getElementById('dict-modal');
  m.classList.add('hidden');
  m.classList.remove('flex');
}

function openGuideModal() {
  const m = document.getElementById('guide-modal');
  if (!m) return;
  m.classList.remove('hidden');
  m.classList.add('flex');
  lucide.createIcons();
}

function closeGuideModal() {
  const m = document.getElementById('guide-modal');
  if (!m) return;
  m.classList.add('hidden');
  m.classList.remove('flex');
}

function renderDictList() {
  const container = document.getElementById('dict-list');
  container.innerHTML = '';
  typoDict.forEach((rule, index) => {
    const item = document.createElement('div');
    item.className = 'bg-slate-50 border border-slate-200 rounded px-3 py-2 flex items-center justify-between text-xs';
    item.innerHTML = `
      <div>
        <span class="text-rose-600 line-through font-bold">${escapeHtml(rule.wrong)}</span>
        <span class="text-slate-400 mx-1">➡️</span>
        <span class="text-emerald-700 font-bold">${escapeHtml(rule.right)}</span>
      </div>
      <button onclick="removeTypoRule(${index})" class="text-slate-400 hover:text-rose-600 text-xs">ลบ</button>
    `;
    container.appendChild(item);
  });
  document.getElementById('dict-count').textContent = typoDict.length;
}

function addCustomTypoRule() {
  const wrong = document.getElementById('new-typo-wrong').value.trim();
  const right = document.getElementById('new-typo-right').value.trim();
  if (!wrong || !right) return;
  typoDict.unshift({ wrong, right, note: 'คำเฉพาะของออฟฟิศ' });
  document.getElementById('new-typo-wrong').value = '';
  document.getElementById('new-typo-right').value = '';
  saveState();
  renderDictList();
  renderCurrentView();
}

function removeTypoRule(idx) {
  typoDict.splice(idx, 1);
  saveState();
  renderDictList();
  renderCurrentView();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}

function getNowShortTime() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `วันนี้ ${hh}:${mm}`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeQuotes(str) {
  return String(str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function startLiveClock() {
  const el = document.getElementById('current-clock');
  const tick = () => {
    const now = new Date();
    el.textContent = `🕒 ${formatThaiDateTime(now)} น.`;
  };
  tick();
  setInterval(tick, 30000);
}

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderCurrentView();
  startLiveClock();
  syncFromServerState(true);
  setInterval(() => syncFromServerState(false), 4000);
});
