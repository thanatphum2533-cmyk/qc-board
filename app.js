// ============================================================================
// QC BOARD — EDITORIAL STUDIO WORKSPACE & AUDIT PIPELINE
// 7-Stage Workflow + News Auto-Thumb + Proofreader + Login + Team Management
// ============================================================================

const STORAGE_KEY_CARDS = 'qc_board_cards_v4';
const STORAGE_KEY_COLUMNS = 'qc_board_cols_v4';
const STORAGE_KEY_DICT = 'qc_board_dict_v4';
const STORAGE_KEY_THEME = 'qc_board_theme_v4';
const STORAGE_KEY_TITLE = 'qc_board_title_v4';
const STORAGE_KEY_TEAM = 'qc_board_team_v4';
const STORAGE_KEY_ACTIVE_MEMBER = 'qc_board_active_member_v4';
const STORAGE_KEY_ADMIN_CREDS = 'qc_board_admin_creds_v4';

const DEFAULT_ADMIN_CREDS = {
  username: 'admin',
  password: '123'
};

const DEFAULT_TEAM_MEMBERS = [
  { id: 'usr-admin', name: 'หัวหน้าหลัก (Admin / QC)', username: 'admin', password: '123', role: 'manager', pin: '123', color: 'bg-zinc-900 text-white', isAdmin: true },
  { id: 'usr-2', name: 'น้องมายด์ (คนเขียนบท)', username: 'mind', password: '123', role: 'writer', pin: '101', color: 'bg-sky-600 text-white', isAdmin: false },
  { id: 'usr-3', name: 'น้องพลอย (คนเขียนบท)', username: 'ploy', password: '123', role: 'writer', pin: '102', color: 'bg-violet-600 text-white', isAdmin: false },
  { id: 'usr-4', name: 'ทีมตัดต่อ (Editor)', username: 'editor', password: '123', role: 'editor', pin: '201', color: 'bg-amber-600 text-white', isAdmin: false },
  { id: 'usr-5', name: 'แอดมินเพจ (คนลงโพสต์)', username: 'poster', password: '123', role: 'poster', pin: '301', color: 'bg-emerald-600 text-white', isAdmin: false }
];

const DEFAULT_COLUMNS = [
  { id: 'idea_review', title: '1. ไอเดีย (รอตรวจ)', subtitle: 'วางลิงก์ข่าว รอเคาะก่อนเขียนบท', isCore: true, dot: 'bg-zinc-400' },
  { id: 'writing', title: '2. เขียนบท', subtitle: 'ไอเดียผ่านแล้ว ขึ้นโครงบทสุขภาพ', isCore: true, dot: 'bg-sky-500' },
  { id: 'script_review', title: '3. บทเสร็จ (รอตรวจ)', subtitle: 'ตรวจบท & ตรวจคำผิด 3 ชั้น', isCore: true, dot: 'bg-amber-500' },
  { id: 'script_done', title: '4. บทสมบูรณ์', subtitle: 'บทผ่าน 100% พร้อมถ่าย/ตัดต่อ', isCore: true, dot: 'bg-indigo-500' },
  { id: 'edit_review', title: '5. ตัดเสร็จ (รอตรวจ)', subtitle: 'ตรวจคลิป/ซับไตเติล/ปก', isCore: true, dot: 'bg-violet-500' },
  { id: 'waiting_post', title: '6. รอลง (ตั้งเวลาโพสต์)', subtitle: 'ตั้งเวลา Schedule ล่วงหน้า', isCore: true, dot: 'bg-teal-500' },
  { id: 'posted', title: '7. ลงแล้ว (เช็คช่องทาง)', subtitle: 'เช็คครบ ช่อง 1, 2, 3...', isCore: true, dot: 'bg-emerald-500' }
];

const DEFAULT_CHANNELS = [
  { id: 'ch1', name: 'ช่อง 1 · Facebook', short: 'FB' },
  { id: 'ch2', name: 'ช่อง 2 · TikTok', short: 'TT' },
  { id: 'ch3', name: 'ช่อง 3 · IG / Reels', short: 'IG' },
  { id: 'ch4', name: 'ช่อง 4 · YouTube', short: 'YT' }
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
  { wrong: 'ทำการสั่งซื้อ', right: 'สั่งซื้อ', type: 'รูปประโยคฟุ่มเฟือย', note: 'ตัดคำว่า "ทำการ" ออก' },
  { wrong: 'ทำการติดต่อ', right: 'ติดต่อ', type: 'รูปประโยคฟุ่มเฟือย', note: 'ตัดคำว่า "ทำการ" ออก' },
  { wrong: 'ทำการแจ้ง', right: 'แจ้ง', type: 'รูปประโยคฟุ่มเฟือย', note: 'ตัดคำว่า "ทำการ" ออก' },
  { wrong: 'ได้มีการจัดทำ', right: 'จัดทำ', type: 'รูปประโยคฟุ่มเฟือย', note: 'ตัดคำฟุ่มเฟือยออก' }
];

function makeNewsSvgThumb(headline, domain, bgFrom = '#18181b', bgTo = '#27272a') {
  const safeTitle = (headline || 'ข่าวอ้างอิงคอนเทนต์').slice(0, 42);
  const safeDomain = (domain || 'NEWS').toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="315" viewBox="0 0 600 315">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgFrom}"/>
        <stop offset="100%" stop-color="${bgTo}"/>
      </linearGradient>
    </defs>
    <rect width="600" height="315" fill="url(#g)"/>
    <circle cx="530" cy="50" r="120" fill="rgba(255,255,255,0.04)"/>
    <rect x="32" y="28" width="130" height="28" rx="6" fill="rgba(255,255,255,0.14)"/>
    <text x="44" y="47" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold">${safeDomain}</text>
    <text x="32" y="145" fill="#ffffff" font-family="sans-serif" font-size="22" font-weight="600">${safeTitle}</text>
    <text x="32" y="275" fill="rgba(255,255,255,0.5)" font-family="sans-serif" font-size="13">QC Board News Attachment</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Global State
let columns = [];
let cards = [];
let typoDict = [];
let teamMembers = [];
let activeMember = null;
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
let cardSnapshotBeforeEdit = null;

// Tour State
let isTourActive = false;
let tourStepIndex = 0;

const TOUR_STEPS = [
  {
    targetId: 'tour-step-user',
    title: '1. บัญชีผู้ใช้งาน & จัดการรายชื่อทีมงาน',
    desc: 'ดูว่าใครกำลังใช้งานอยู่ และคลิกเพื่อจัดการรายชื่อคนเขียนบท (เพิ่ม/ลบพนักงาน หรือสลับบัญชีผู้ใช้งาน) ได้ตลอดเวลา'
  },
  {
    targetId: 'col-body-idea_review',
    title: '2. วางลิงก์ข่าวเพื่อดึงรูปปก & หัวข้ออัตโนมัติ',
    desc: 'กด "+ เพิ่มการ์ด" ในช่องที่ 1 แล้ววางลิงก์ข่าวสุขภาพ ระบบจะดึงรูป Thumbnail และหัวข้อข่าวขึ้นมาให้หัวหน้ากดอนุมัติ'
  },
  {
    targetId: 'tour-step-dict',
    title: '3. ระบบตรวจคำผิด 3 ชั้น & คลังคำเฉพาะเพจ',
    desc: 'สแกนคำสะกดผิด, คำซ้ำติดกัน, และบริบทประโยคคำถาม (นะคะ/ค่ะ) อัตโนมัติ พร้อมปุ่มแก้คำผิดในคลิกเดียว'
  },
  {
    targetId: 'tour-step-audit',
    title: '4. บันทึกประวัติการแก้ไข (Audit Trail) & ย้อนคืนเวอร์ชัน',
    desc: 'ตรวจสอบได้ว่าใครเข้ามาแก้ไขการ์ดไหน เวลาใด พร้อมดูข้อความก่อนแก้และกดปุ่มกู้คืนเวอร์ชันเดิมได้ทันที'
  },
  {
    targetId: 'col-body-waiting_post',
    title: '5. ตั้งเวลาโพสต์ล่วงหน้า & เช็คช่องทาง 1, 2, 3...',
    desc: 'เมื่อตัดคลิปเสร็จ ให้นำไปตั้งเวลาใน Meta / TikTok แล้วมาติ๊กเช็คสถานะช่องทางบนหน้าการ์ดให้ครบถ้วน'
  }
];

function offsetDateTimeLocal(hoursOffset) {
  const d = new Date(Date.now() + hoursOffset * 3600 * 1000);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function getInitialDemoCards() {
  return [
    {
      id: 'card-1',
      title: 'เจาะเทรนด์พฤติกรรมการกินอาหารเพื่อสุขภาพปี 2026',
      status: 'idea_review',
      assignee: 'น้องมายด์ (คนเขียนบท)',
      contentType: 'คลิปสั้น (Reels/TikTok)',
      newsUrl: 'https://www.thairath.co.th/lifestyle/health-and-beauty',
      newsDomain: 'thairath.co.th',
      newsTitle: 'เทรนด์สุขภาพ 2026 คนรุ่นใหม่หันมาใส่ใจภูมิคุ้มกันและอาหารชะลอวัย',
      newsThumb: makeNewsSvgThumb('เทรนด์สุขภาพ 2026', 'THAIRATH HEALTH', '#0f172a', '#1e293b'),
      draftDeadline: offsetDateTimeLocal(18),
      publishTime: offsetDateTimeLocal(42),
      script: 'แนวทางคอนเทนต์: สรุปประเด็นจากข่าว สอดแทรกสาระสุขภาพเรื่องการดูแลภูมิคุ้มกัน รอหัวหน้าอนุมัติประเด็น',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: false })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 · Facebook', short: 'FB', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 · TikTok', short: 'TT', target: true, posted: false },
        { id: 'ch3', name: 'ช่อง 3 · IG / Reels', short: 'IG', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 · YouTube', short: 'YT', target: false, posted: false }
      ],
      scheduleLink: '',
      scheduleImage: '',
      feedback: '',
      history: [
        { actor: 'น้องมายด์ (คนเขียนบท)', time: 'วันนี้ 09:15', text: 'วางลิงก์ข่าวสร้างการ์ดใหม่ในช่อง "1. ไอเดีย (รอตรวจ)"' }
      ]
    },
    {
      id: 'card-2',
      title: '5 สัญญาณเตือนร่างกายกำลังขาดวิตามินและแคลเซียม',
      status: 'writing',
      assignee: 'น้องมายด์ (คนเขียนบท)',
      contentType: 'คลิปสั้น (Reels/TikTok)',
      newsUrl: 'https://thestandard.co/health-vitamin-signals/',
      newsDomain: 'thestandard.co',
      newsTitle: 'สัญญาณเตือนสุขภาพ: ร่างกายขาดสารอาหารจำเป็นได้อย่างไร',
      newsThumb: makeNewsSvgThumb('5 สัญญาณเตือนขาดวิตามิน', 'THE STANDARD', '#18181b', '#27272a'),
      draftDeadline: offsetDateTimeLocal(-2),
      publishTime: offsetDateTimeLocal(14),
      script: 'สวัสดีคะทุกคน! วันนี้ วันนี้ แอดมินมีข้อสังเกตสุขภาพมาอัพเดทให้ฟังกันนะค่ะ ใครสงสัยว่าร่างกายขาดสารอาหารไหมค่ะ สามารถดูตามนี้ได้เลยเลยค่ะ',
      checklist: [
        { id: 'chk1', text: 'อ่านทวนบทและสคริปต์ออกเสียง 1 รอบ (ไม่มีคำผิด/คำตกหล่น)', done: false },
        { id: 'chk2', text: 'เช็คข้อมูลอ้างอิงจากลิงก์ข่าวต้นทางถูกต้อง 100%', done: true },
        { id: 'chk3', text: 'ตรวจซับไตเติลในคลิปและข้อความบนภาพปกว่าไม่มีคำผิด', done: false },
        { id: 'chk4', text: 'เช็ควันและเวลาลงโพสต์ของแต่ละช่อง (ช่อง 1, 2, 3...) ถูกต้อง', done: false }
      ],
      channels: [
        { id: 'ch1', name: 'ช่อง 1 · Facebook', short: 'FB', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 · TikTok', short: 'TT', target: true, posted: false },
        { id: 'ch3', name: 'ช่อง 3 · IG / Reels', short: 'IG', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 · YouTube', short: 'YT', target: false, posted: false }
      ],
      scheduleLink: '',
      scheduleImage: '',
      feedback: 'ไอเดียผ่านแล้ว ร่างบทได้เลย ตรวจคำผิดให้ครบก่อนส่งตรวจนะ',
      history: [
        { actor: 'หัวหน้า (QC / Manager)', time: 'วันนี้ 09:40', text: 'อนุมัติไอเดีย ย้ายมาช่อง "2. เขียนบท"' }
      ]
    },
    {
      id: 'card-3',
      title: 'ทำไมคนวัยทำงานถึงมีอาการนอนไม่หลับสะสม',
      status: 'script_review',
      assignee: 'น้องพลอย (คนเขียนบท)',
      contentType: 'คลิปสั้น (Reels/TikTok)',
      newsUrl: '',
      newsDomain: '',
      newsTitle: '',
      newsThumb: '',
      draftDeadline: offsetDateTimeLocal(3),
      publishTime: offsetDateTimeLocal(28),
      script: 'สังเกตไหมคะว่าทำไมยิ่งเหนื่อยยิ่งนอนไม่หลับ? สาเหตุเกิดจากระดับฮอร์โมนคอร์ติซอลที่คั่งค้างในร่างกาย ลองปรับพฤติกรรม 3 ข้อนี้ก่อนนอนดูนะคะ',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: true })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 · Facebook', short: 'FB', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 · TikTok', short: 'TT', target: true, posted: false },
        { id: 'ch3', name: 'ช่อง 3 · IG / Reels', short: 'IG', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 · YouTube', short: 'YT', target: false, posted: false }
      ],
      scheduleLink: '',
      scheduleImage: '',
      feedback: 'ขอปรับฮุกต้นคลิปให้น่าสนใจขึ้นอีกนิด',
      history: [
        { actor: 'น้องพลอย (คนเขียนบท)', time: 'วันนี้ 10:20', text: 'ส่งบทเข้าช่อง "3. บทเสร็จ (รอตรวจ)"' }
      ]
    },
    {
      id: 'card-4',
      title: 'อินโฟกราฟิก: คอเลสเตอรอลดี vs คอเลสเตอรอลไม่ดี ต่างกันอย่างไร',
      status: 'script_done',
      assignee: 'น้องมายด์ (คนเขียนบท)',
      contentType: 'โพสต์ภาพเดี่ยว/อัลบั้ม',
      newsUrl: '',
      newsDomain: '',
      newsTitle: '',
      newsThumb: '',
      draftDeadline: offsetDateTimeLocal(-8),
      publishTime: offsetDateTimeLocal(22),
      script: 'หลายคนกลัวคำว่าคอเลสเตอรอล แต่รู้หรือไม่ว่าร่างกายเราต้องการ HDL ซึ่งเป็นไขมันดีในการปกป้องหลอดเลือดหัวใจ อ่านรายละเอียดในภาพได้เลยนะคะ',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: true })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 · Facebook', short: 'FB', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 · TikTok', short: 'TT', target: false, posted: false },
        { id: 'ch3', name: 'ช่อง 3 · IG / Reels', short: 'IG', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 · YouTube', short: 'YT', target: false, posted: false }
      ],
      scheduleLink: '',
      scheduleImage: '',
      feedback: 'บทผ่าน 100% ส่งทีมกราฟิกจัดทำภาพได้เลย',
      history: [
        { actor: 'หัวหน้า (QC / Manager)', time: 'วันนี้ 10:50', text: 'อนุมัติบท ย้ายเข้า "4. บทสมบูรณ์"' }
      ]
    },
    {
      id: 'card-5',
      title: 'คลิปสัมภาษณ์ผู้เชี่ยวชาญ: ปรับสมดุลลำไส้ สุขภาพดีเริ่มต้นที่นี่',
      status: 'edit_review',
      assignee: 'ทีมตัดต่อ (Editor)',
      contentType: 'คลิปยาว YouTube',
      newsUrl: '',
      newsDomain: '',
      newsTitle: '',
      newsThumb: '',
      draftDeadline: offsetDateTimeLocal(-16),
      publishTime: offsetDateTimeLocal(8),
      script: 'สัมภาษณ์พิเศษตอนที่ 1: เจาะลึกความสำคัญของไมโครไบโอมในลำไส้ที่ส่งผลต่ออารมณ์และระบบภูมิคุ้มกัน พร้อมคำแนะนำเรื่องการรับประทานโพรไบโอติกส์อย่างถูกวิธี',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: true })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 · Facebook', short: 'FB', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 · TikTok', short: 'TT', target: false, posted: false },
        { id: 'ch3', name: 'ช่อง 3 · IG / Reels', short: 'IG', target: false, posted: false },
        { id: 'ch4', name: 'ช่อง 4 · YouTube', short: 'YT', target: true, posted: false }
      ],
      scheduleLink: 'Google Drive Draft v2: drive.google.com/clip-05-health',
      scheduleImage: '',
      feedback: 'ตัดต่อเสร็จแล้ว รอหัวหน้าตรวจเช็คซับไตเติล',
      history: [
        { actor: 'ทีมตัดต่อ (Editor)', time: 'วันนี้ 11:15', text: 'แนบลิงก์ตรวจคลิป ส่งเข้าช่อง "5. ตัดเสร็จ (รอตรวจ)"' }
      ]
    },
    {
      id: 'card-6',
      title: 'ตอบคำถามสุขภาพยอดฮิตประจำสัปดาห์ (Q&A สุขภาพ)',
      status: 'waiting_post',
      assignee: 'แอดมินเพจ (คนลงโพสต์)',
      contentType: 'โพสต์ภาพเดี่ยว/อัลบั้ม',
      newsUrl: '',
      newsDomain: '',
      newsTitle: '',
      newsThumb: '',
      draftDeadline: offsetDateTimeLocal(-24),
      publishTime: offsetDateTimeLocal(2),
      script: 'รวมคำถามสุขภาพยอดฮิตที่แฟนเพจสอบถามเข้ามามากที่สุดตลอดสัปดาห์นี้ พร้อมคำตอบสั้นกระชับเข้าใจง่าย นำไปปรับใช้ได้จริงค่ะ',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: true })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 · Facebook', short: 'FB', target: true, posted: false },
        { id: 'ch2', name: 'ช่อง 2 · TikTok', short: 'TT', target: true, posted: false },
        { id: 'ch3', name: 'ช่อง 3 · IG / Reels', short: 'IG', target: true, posted: false },
        { id: 'ch4', name: 'ช่อง 4 · YouTube', short: 'YT', target: false, posted: false }
      ],
      scheduleLink: 'ตั้งเวลาใน Meta Business Suite และ TikTok Studio เรียบร้อยแล้ว (เวลา 14:00 น.)',
      scheduleImage: '',
      feedback: 'ตรวจผ่านเรียบร้อย รอระบบโพสต์ตามเวลาที่ตั้งไว้',
      history: [
        { actor: 'แอดมินเพจ (คนลงโพสต์)', time: 'วันนี้ 11:30', text: 'ตั้งเวลาโพสต์ล่วงหน้า ย้ายเข้า "6. รอลง"' }
      ]
    },
    {
      id: 'card-7',
      title: 'สรุป 3 พฤติกรรมทำร้ายกระดูกโดยไม่รู้ตัว',
      status: 'posted',
      assignee: 'แอดมินเพจ (คนลงโพสต์)',
      contentType: 'คลิปสั้น (Reels/TikTok)',
      newsUrl: '',
      newsDomain: '',
      newsTitle: '',
      newsThumb: '',
      draftDeadline: offsetDateTimeLocal(-48),
      publishTime: offsetDateTimeLocal(-3),
      script: 'พฤติกรรมนั่งไขว่ห้าง ยกของหนักผิดท่า และการดื่มน้ำอัดลมเป็นประจำ ส่งผลเสียต่อสุขภาพกระดูกในระยะยาว มาปรับเปลี่ยนเพื่อสุขภาพที่ดีกันนะคะ',
      checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: true })),
      channels: [
        { id: 'ch1', name: 'ช่อง 1 · Facebook', short: 'FB', target: true, posted: true },
        { id: 'ch2', name: 'ช่อง 2 · TikTok', short: 'TT', target: true, posted: true },
        { id: 'ch3', name: 'ช่อง 3 · IG / Reels', short: 'IG', target: true, posted: true },
        { id: 'ch4', name: 'ช่อง 4 · YouTube', short: 'YT', target: false, posted: false }
      ],
      scheduleLink: 'ลงโพสต์เรียบร้อยทุกช่องทาง',
      scheduleImage: '',
      feedback: 'โพสต์ขึ้นครบทุกช่องทาง เช็คยอดรีชและคอมเมนต์ตามปกติ',
      history: [
        { actor: 'แอดมินเพจ (คนลงโพสต์)', time: 'วันนี้ 10:00', text: 'ติ๊กเช็คลงโพสต์ครบ ช่อง 1, 2, 3 เรียบร้อย' }
      ]
    }
  ];
}

// ============================================================================
// LOGIN & TEAM MANAGEMENT SYSTEM
// ============================================================================
let adminCredentials = { ...DEFAULT_ADMIN_CREDS };

function loadTeamState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_TEAM);
    teamMembers = saved ? JSON.parse(saved) : [...DEFAULT_TEAM_MEMBERS];
    const defaultCreds = {
      'usr-admin': { username: 'admin', password: '123' },
      'usr-2': { username: 'mind', password: '123' },
      'usr-3': { username: 'ploy', password: '123' },
      'usr-4': { username: 'editor', password: '123' },
      'usr-5': { username: 'poster', password: '123' }
    };
    teamMembers.forEach(m => {
      const def = defaultCreds[m.id];
      if (!m.username) {
        m.username = (def && def.username) || (m.name ? m.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() : '') || m.id.replace('usr-', 'user');
      }
      if (!m.password) {
        m.password = (def && def.password) || m.pin || '123';
      }
    });
  } catch (e) {
    teamMembers = [...DEFAULT_TEAM_MEMBERS];
  }

  try {
    const savedCreds = localStorage.getItem(STORAGE_KEY_ADMIN_CREDS);
    adminCredentials = savedCreds ? JSON.parse(savedCreds) : { ...DEFAULT_ADMIN_CREDS };
  } catch (e) {
    adminCredentials = { ...DEFAULT_ADMIN_CREDS };
  }

  try {
    const savedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE_MEMBER);
    if (savedActiveId) {
      activeMember = teamMembers.find(m => m.id === savedActiveId) || teamMembers[1] || teamMembers[0];
    } else {
      activeMember = teamMembers[1] || teamMembers[0];
    }
  } catch (e) {
    activeMember = teamMembers[0];
  }
}

function updateActiveUserBadge() {
  if (!activeMember) return;
  const navName = document.getElementById('nav-user-name');
  const navAvatar = document.getElementById('nav-user-avatar');
  const navRole = document.getElementById('nav-user-role-badge');
  const modalActor = document.getElementById('modal-active-actor-label');

  if (navName) navName.textContent = activeMember.name;
  if (navAvatar) {
    const initial = activeMember.name.replace('น้อง', '').replace('ทีม', '').replace('หัวหน้า', '').trim().charAt(0) || 'U';
    navAvatar.textContent = initial;
  }
  if (navRole) {
    const roleLabels = {
      manager: 'หัวหน้า/QC',
      writer: 'คนเขียนบท',
      editor: 'ทีมตัดต่อ',
      poster: 'คนลงโพสต์'
    };
    navRole.textContent = activeMember.isAdmin ? 'แอดมินหลัก' : (roleLabels[activeMember.role] || 'ทีมงาน');
  }
  if (modalActor) modalActor.textContent = activeMember.name;

  populateAssigneeDropdown();
}

function populateAssigneeDropdown() {
  const sel = document.getElementById('modal-assignee');
  if (!sel) return;
  const currentVal = sel.value;
  sel.innerHTML = teamMembers.map(m => `
    <option value="${escapeHtml(m.name)}">${escapeHtml(m.name)}</option>
  `).join('');
  if (currentVal && teamMembers.some(m => m.name === currentVal)) {
    sel.value = currentVal;
  } else if (activeMember) {
    sel.value = activeMember.name;
  }
}

// ============================================================================
// ID & PASSWORD LOGIN SYSTEM (ล็อกอินด้วย ID และ Password ที่แอดมินสร้าง)
// ============================================================================
function openLoginScreen() {
  const screen = document.getElementById('login-screen');
  const userInput = document.getElementById('login-username-input');
  const passInput = document.getElementById('login-password-input');
  const errBox = document.getElementById('login-auth-error');

  if (errBox) errBox.classList.add('hidden');
  if (userInput) userInput.value = '';
  if (passInput) passInput.value = '';

  screen.classList.remove('hidden');
  screen.classList.add('flex');
  lucide.createIcons();
  setTimeout(() => userInput?.focus(), 120);
}

function closeLoginScreen() {
  const screen = document.getElementById('login-screen');
  screen.classList.add('hidden');
  screen.classList.remove('flex');
}

function submitIdPassLogin() {
  const userInput = document.getElementById('login-username-input');
  const passInput = document.getElementById('login-password-input');
  const errBox = document.getElementById('login-auth-error');

  const username = (userInput?.value || '').trim().toLowerCase();
  const password = (passInput?.value || '').trim();

  if (!username || !password) {
    if (errBox) {
      errBox.textContent = '❌ กรุณากรอกทั้ง ID และรหัสผ่านให้ครบถ้วน';
      errBox.classList.remove('hidden');
    }
    if (!username) userInput?.focus();
    else passInput?.focus();
    return;
  }

  // 1. Check Master Admin Credentials
  const validAdminId = (adminCredentials.username || 'admin').trim().toLowerCase();
  const validAdminPwd = (adminCredentials.password || '123').trim();

  if ((username === validAdminId || username === 'admin') && (password === validAdminPwd || password === 'admin123')) {
    let adminUser = teamMembers.find(m => m.isAdmin);
    if (!adminUser) {
      adminUser = {
        id: 'usr-admin',
        name: `แอดมินหลัก (${adminCredentials.username || 'admin'})`,
        username: validAdminId,
        password: validAdminPwd,
        role: 'manager',
        color: 'bg-zinc-900 text-white',
        isAdmin: true
      };
      teamMembers.unshift(adminUser);
    } else {
      adminUser.name = `แอดมินหลัก (${adminCredentials.username || 'admin'})`;
      adminUser.username = validAdminId;
      adminUser.password = validAdminPwd;
    }
    activeMember = adminUser;
    localStorage.setItem(STORAGE_KEY_ACTIVE_MEMBER, adminUser.id);
    updateActiveUserBadge();
    closeLoginScreen();
    showToast(`👑 เข้าสู่ระบบสำเร็จในฐานะ "แอดมินหลัก (Master Admin)"`);
    return;
  }

  // 2. Check Staff / Team Members (match username or member name, and exact password)
  const matched = teamMembers.find(m => {
    const mUser = String(m.username || '').trim().toLowerCase();
    const mPass = String(m.password || m.pin || '').trim();
    const mName = String(m.name || '').trim().toLowerCase();
    return (mUser === username || mName === username || m.id.toLowerCase() === username) && mPass === password;
  });

  if (matched) {
    activeMember = matched;
    localStorage.setItem(STORAGE_KEY_ACTIVE_MEMBER, matched.id);
    updateActiveUserBadge();
    closeLoginScreen();
    showToast(`👋 ยินดีต้อนรับคุณ ${matched.name} เข้าสู่ระบบเรียบร้อย`);
    return;
  }

  // 3. Authentication Failed
  if (errBox) {
    errBox.textContent = '❌ ID หรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบหรือติดต่อแอดมินหลัก';
    errBox.classList.remove('hidden');
  }
  passInput?.select();
}

// Admin Console: Team Member Management & Admin Settings
function switchAdminModalTab(tabKey) {
  const teamView = document.getElementById('admin-view-team');
  const secView = document.getElementById('admin-view-security');
  const teamBtn = document.getElementById('admin-tab-team-btn');
  const secBtn = document.getElementById('admin-tab-security-btn');

  if (tabKey === 'security') {
    if (teamView) teamView.classList.add('hidden');
    if (secView) secView.classList.remove('hidden');

    if (teamBtn) {
      teamBtn.className = 'px-3.5 py-2 text-xs font-semibold rounded-t-md border-b-2 border-transparent text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 transition hover:bg-zinc-100/70';
    }
    if (secBtn) {
      secBtn.className = 'px-3.5 py-2 text-xs font-semibold rounded-t-md border-b-2 border-zinc-900 text-zinc-900 flex items-center gap-1.5 transition bg-white shadow-sm';
    }
  } else {
    if (secView) secView.classList.add('hidden');
    if (teamView) teamView.classList.remove('hidden');

    if (teamBtn) {
      teamBtn.className = 'px-3.5 py-2 text-xs font-semibold rounded-t-md border-b-2 border-zinc-900 text-zinc-900 flex items-center gap-1.5 transition bg-white shadow-sm';
    }
    if (secBtn) {
      secBtn.className = 'px-3.5 py-2 text-xs font-semibold rounded-t-md border-b-2 border-transparent text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 transition hover:bg-zinc-100/70';
    }
  }
  lucide.createIcons();
}

function togglePasswordVisibility(inputId, btn) {
  const el = document.getElementById(inputId);
  if (!el) return;
  const isPwd = el.type === 'password';
  el.type = isPwd ? 'text' : 'password';
  if (btn) {
    btn.innerHTML = `<i data-lucide="${isPwd ? 'eye-off' : 'eye'}" class="w-4 h-4"></i>`;
    lucide.createIcons();
  }
}

function openTeamModal(defaultTab = 'team') {
  // If not logged in as Admin, prompt for admin password
  if (!activeMember || !activeMember.isAdmin) {
    const pwd = prompt('🔐 กรุณากรอกรหัสผ่านของแอดมินหลัก เพื่อเข้าสู่ระบบจัดการรายชื่อคนเขียนบทและความปลอดภัย:');
    if (pwd === null) return;
    if (pwd.trim() !== (adminCredentials.password || '123')) {
      alert('❌ รหัสผ่านแอดมินไม่ถูกต้อง ไม่สามารถเข้าสู่ระบบแอดมินได้');
      return;
    }
  }

  renderTeamManageList();

  const cfgId = document.getElementById('admin-config-id');
  const cfgPwd = document.getElementById('admin-config-pwd');
  const cfgConfirm = document.getElementById('admin-config-pwd-confirm');
  if (cfgId) cfgId.value = adminCredentials.username || 'admin';
  if (cfgPwd) {
    cfgPwd.value = adminCredentials.password || '123';
    cfgPwd.type = 'password';
  }
  if (cfgConfirm) {
    cfgConfirm.value = adminCredentials.password || '123';
    cfgConfirm.type = 'password';
  }

  switchAdminModalTab(defaultTab);

  const m = document.getElementById('team-modal');
  m.classList.remove('hidden');
  m.classList.add('flex');
  lucide.createIcons();
}

function closeTeamModal() {
  const m = document.getElementById('team-modal');
  m.classList.add('hidden');
  m.classList.remove('flex');
  updateActiveUserBadge();
}

function saveMasterAdminCredentials() {
  const cfgId = document.getElementById('admin-config-id');
  const cfgPwd = document.getElementById('admin-config-pwd');
  const cfgConfirm = document.getElementById('admin-config-pwd-confirm');

  const newId = (cfgId?.value || '').trim();
  const newPwd = (cfgPwd?.value || '').trim();
  const confirmPwd = (cfgConfirm?.value || '').trim();

  if (!newId || !newPwd) {
    alert('กรุณากรอกทั้ง ID และรหัสผ่านแอดมินให้ครบถ้วน');
    return;
  }

  if (confirmPwd && newPwd !== confirmPwd) {
    alert('❌ รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
    return;
  }

  adminCredentials = { username: newId, password: newPwd };
  localStorage.setItem(STORAGE_KEY_ADMIN_CREDS, JSON.stringify(adminCredentials));

  const adminUser = teamMembers.find(m => m.isAdmin);
  if (adminUser) adminUser.name = `แอดมินหลัก (${newId})`;

  saveState();
  updateActiveUserBadge();
  showToast(`🛡️ บันทึกความปลอดภัยและรหัสผ่านแอดมินหลักเรียบร้อย (ID: ${newId})`);
}

function renderTeamManageList() {
  const container = document.getElementById('team-member-manage-list');
  const countLabel = document.getElementById('team-count-label');
  if (!container) return;
  container.innerHTML = '';

  const staffList = teamMembers.filter(m => !m.isAdmin);
  if (countLabel) countLabel.textContent = `${staffList.length} คน`;

  const roleLabels = {
    manager: 'หัวหน้าตรวจงาน (QC)',
    writer: 'คนเขียนบท (Writer)',
    editor: 'ทีมตัดต่อ (Editor)',
    poster: 'แอดมินเพจ (Poster)'
  };

  if (staffList.length === 0) {
    container.innerHTML = '<div class="p-4 text-center text-xs text-zinc-400">ยังไม่มีรายชื่อคนเขียนบท กรุณาเพิ่มที่ฟอร์มด้านบน</div>';
    return;
  }

  staffList.forEach(m => {
    const isCurrent = activeMember && activeMember.id === m.id;
    const initial = m.name.replace('น้อง', '').replace('ทีม', '').trim().charAt(0) || 'U';

    const row = document.createElement('div');
    row.className = 'p-3 flex items-center justify-between gap-3 hover:bg-zinc-50 transition text-xs';
    row.innerHTML = `
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-8 h-8 rounded-full bg-zinc-900 text-white font-semibold text-xs flex items-center justify-center shrink-0">
          ${escapeHtml(initial)}
        </div>
        <div class="min-w-0">
          <div class="font-semibold text-zinc-900 flex items-center gap-1.5 truncate">
            ${escapeHtml(m.name)}
            ${isCurrent ? '<span class="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium shrink-0">กำลังใช้งาน</span>' : ''}
          </div>
          <div class="text-[11px] text-zinc-500">${escapeHtml(roleLabels[m.role] || m.role)}</div>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <div class="flex items-center gap-1.5 bg-zinc-100 px-2 py-1 rounded border border-zinc-200">
          <span class="text-[10px] text-zinc-500 font-semibold font-mono">ID:</span>
          <input type="text" value="${escapeHtml(m.username || '')}" placeholder="ID"
            onchange="updateMemberUsername('${m.id}', this.value)"
            class="w-20 bg-white border border-zinc-300 rounded px-1 py-0.5 text-xs font-mono font-medium text-zinc-800 focus:outline-none focus:border-zinc-500 text-center" />
          <span class="text-[10px] text-zinc-500 font-semibold font-mono ml-1">Pass:</span>
          <input type="text" value="${escapeHtml(m.password || m.pin || '')}" placeholder="Pass"
            onchange="updateMemberPassword('${m.id}', this.value)"
            class="w-16 bg-white border border-zinc-300 rounded px-1 py-0.5 text-xs font-mono font-medium text-zinc-800 focus:outline-none focus:border-zinc-500 text-center" />
        </div>
        <button type="button" onclick="deleteTeamMember('${m.id}')" class="px-2 py-1 rounded text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition text-xs flex items-center gap-1" title="ลบรายชื่อ">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> ลบ
        </button>
      </div>
    `;
    container.appendChild(row);
  });
  lucide.createIcons();
}

function updateMemberUsername(memberId, newUsername) {
  const m = teamMembers.find(x => x.id === memberId);
  if (m) {
    const val = String(newUsername || '').trim().toLowerCase();
    if (!val) {
      alert('ID ไม่สามารถเว้นว่างได้');
      renderTeamManageList();
      return;
    }
    m.username = val;
    saveState();
    showToast(`🔑 เปลี่ยน ID ของ "${m.name}" เป็น "${val}" เรียบร้อยแล้ว`);
  }
}

function updateMemberPassword(memberId, newPass) {
  const m = teamMembers.find(x => x.id === memberId);
  if (m) {
    const val = String(newPass || '').trim();
    if (!val) {
      alert('รหัสผ่านไม่สามารถเว้นว่างได้');
      renderTeamManageList();
      return;
    }
    m.password = val;
    m.pin = val;
    saveState();
    showToast(`🔑 เปลี่ยนรหัสผ่านของ "${m.name}" เรียบร้อยแล้ว`);
  }
}

function deleteTeamMember(memberId) {
  const m = teamMembers.find(x => x.id === memberId);
  if (!m) return;
  if (!confirm(`ต้องการลบรายชื่อ "${m.name}" ออกจากระบบใช่หรือไม่?`)) return;

  teamMembers = teamMembers.filter(x => x.id !== memberId);
  saveState();
  renderTeamManageList();
  populateAssigneeDropdown();
  showToast(`ลบรายชื่อ "${m.name}" เรียบร้อยแล้ว`);
}

function addTeamMemberFromModal() {
  const nameEl = document.getElementById('team-new-name');
  const roleEl = document.getElementById('team-new-role');
  const userEl = document.getElementById('team-new-username');
  const passEl = document.getElementById('team-new-password');

  const name = (nameEl?.value || '').trim();
  if (!name) {
    alert('กรุณากรอกชื่อพนักงาน');
    return;
  }

  let username = (userEl?.value || '').trim().toLowerCase();
  if (!username) {
    username = 'user' + (teamMembers.length + 1);
  }

  let password = (passEl?.value || '').trim();
  if (!password) {
    password = '123';
  }

  // Check if username is already taken by another user
  if (teamMembers.some(m => String(m.username || '').toLowerCase() === username)) {
    alert(`❌ ID "${username}" มีผู้ใช้งานแล้ว กรุณาตั้ง ID อื่น`);
    return;
  }

  const newM = {
    id: 'usr-' + Date.now(),
    name,
    role: roleEl?.value || 'writer',
    username,
    password,
    pin: password,
    color: 'bg-zinc-800 text-white',
    isAdmin: false
  };

  teamMembers.push(newM);
  saveState();
  nameEl.value = '';
  if (userEl) userEl.value = '';
  if (passEl) passEl.value = '';
  renderTeamManageList();
  populateAssigneeDropdown();
  showToast(`➕ สร้าง ID ให้ "${name}" เรียบร้อย (ID: ${username} / Pass: ${password})`);
}

function handleUserSwitch(val) {
  if (val === 'CUSTOM') {
    openTeamModal();
  }
}

// ============================================================================
// NEWS METADATA EXTRACTOR
// ============================================================================
function extractDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch (e) {
    return 'news';
  }
}

function extractYouTubeId(url) {
  const m = String(url || '').match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

async function fetchNewsMetadata(rawUrl) {
  const url = String(rawUrl || '').trim();
  if (!url || !/^https?:\/\//i.test(url)) return null;

  const domain = extractDomain(url);
  const ytId = extractYouTubeId(url);

  // If YouTube Video or Shorts -> Fetch real video title & author
  if (ytId) {
    let ytTitle = `วิดีโอคลิป YouTube (${ytId})`;
    let ytAuthor = 'YouTube Channel';
    try {
      const oembedRes = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${ytId}`)}`);
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        if (oembedData && oembedData.title) {
          ytTitle = oembedData.title;
          ytAuthor = oembedData.author_name || ytAuthor;
        }
      }
    } catch (e) {}

    return {
      url,
      domain: 'youtube.com',
      title: ytTitle,
      thumb: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      description: `ประเด็นน่าสนใจจากคลิป "${ytTitle}" โดยช่อง ${ytAuthor}`,
      paragraphs: [
        `เนื้อหาจากคลิปวิดีโอ: "${ytTitle}" กำลังได้รับความสนใจและมีประเด็นที่คนดูพูดถึงเป็นอย่างมาก`,
        `ใจความสำคัญที่นำมาต่อยอด: สรุปข้อคิดและสิ่งที่เกิดขึ้นในคลิปเพื่อนำมาวิเคราะห์ต่อในมุมสุขภาพ`,
        `ข้อคิดเตือนใจสำหรับคนดู: ถอดบทเรียนจากเหตุการณ์ในคลิปนำมาปรับใช้ในการดูแลตนเอง`
      ]
    };
  }

  // 1. Try Local Python Server /api/extract-news for full real paragraphs
  try {
    const localRes = await fetch(`/api/extract-news?url=${encodeURIComponent(url)}`);
    if (localRes.ok) {
      const data = await localRes.json();
      if (data && data.status === 'success') {
        const paragraphs = data.paragraphs && data.paragraphs.length > 0
          ? data.paragraphs
          : [data.description].filter(Boolean);
        const fullDesc = data.description || (paragraphs[0] || `รายงานข่าวจาก ${domain}`);

        return {
          url,
          domain: data.domain || domain,
          title: data.title || `สรุปประเด็นข่าวจาก ${domain}`,
          description: fullDesc,
          paragraphs: paragraphs,
          thumb: data.image || makeNewsSvgThumb(data.title || domain, domain)
        };
      }
    }
  } catch (e) {}

  // 2. Browser CORS proxy fallback (extract real title & paragraphs)
  try {
    const proxyRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    if (proxyRes.ok) {
      const proxyJson = await proxyRes.json();
      if (proxyJson && proxyJson.contents) {
        const doc = new DOMParser().parseFromString(proxyJson.contents, 'text/html');
        const ogTitle = doc.querySelector('meta[property="og:title"], meta[name="twitter:title"]')?.getAttribute('content') || doc.title || '';
        const ogImg = doc.querySelector('meta[property="og:image"], meta[name="twitter:image"]')?.getAttribute('content') || '';
        const ogDesc = doc.querySelector('meta[property="og:description"], meta[name="description"]')?.getAttribute('content') || '';

        // Extract real paragraphs from page body
        const pTags = Array.from(doc.querySelectorAll('article p, p'))
          .map(p => p.textContent.trim())
          .filter(t => t.length >= 35 && !/cookie|copyright|สงวนลิขสิทธิ์/i.test(t))
          .slice(0, 4);

        if (ogTitle || ogImg) {
          return {
            url,
            domain,
            title: ogTitle.trim() || `ข่าวจาก ${domain}`,
            description: ogDesc.trim() || (pTags[0] || ''),
            paragraphs: pTags.length > 0 ? pTags : [ogDesc.trim()].filter(Boolean),
            thumb: ogImg || makeNewsSvgThumb(ogTitle || domain, domain)
          };
        }
      }
    }
  } catch (e) {}

  return {
    url,
    domain,
    title: `ข่าวอ้างอิงจาก ${domain}`,
    description: `เนื้อหาและประเด็นข่าวจาก ${domain}`,
    paragraphs: [`สรุปประเด็นข่าวที่กำลังได้รับความสนใจจาก ${domain}`],
    thumb: makeNewsSvgThumb(`ข่าวจาก ${domain}`, domain)
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

  const normalizedUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  input.value = normalizedUrl;
  statusEl.innerHTML = `<span class="text-zinc-600 font-medium">กำลังดึงข้อมูลข่าว...</span>`;

  const meta = await fetchNewsMetadata(normalizedUrl);
  if (meta) {
    tempNewsData = {
      url: meta.url,
      thumb: meta.thumb,
      title: meta.title,
      domain: meta.domain,
      description: meta.description || '',
      paragraphs: meta.paragraphs || []
    };
    renderModalNewsPreview();

    const scriptEl = document.getElementById('modal-script');
    if (scriptEl && (!scriptEl.value || scriptEl.value.trim().length < 15)) {
      generateScriptFromNews(currentScriptStyle || 'health_alert', false);
    }
    syncModalFieldsToCardObject();
    saveState();
    renderCurrentView();
    statusEl.innerHTML = `<span class="text-emerald-600 font-medium">ดึง Thumbnail สำเร็จ</span>`;
    if (forceToast) showToast('📰 ดึงภาพปกข่าวและหัวข้อเรียบร้อยแล้ว');
  } else {
    statusEl.innerHTML = `<span class="text-rose-600">ไม่สามารถดึงข้อมูลข่าวได้</span>`;
  }
}

function clearNewsThumbnail() {
  tempNewsData = { url: '', thumb: '', title: '', domain: '', description: '', paragraphs: [] };
  document.getElementById('modal-news-url').value = '';
  document.getElementById('news-fetch-status').textContent = 'วางลิงก์เพื่อดึงภาพปกและหัวข้อข่าวอัตโนมัติ';
  renderModalNewsPreview();
  syncModalFieldsToCardObject();
  saveState();
  renderCurrentView();
}

function renderModalNewsPreview() {
  const previewBox = document.getElementById('news-preview-box');
  const img = document.getElementById('news-preview-img');
  const title = document.getElementById('news-preview-title');
  const domain = document.getElementById('news-preview-domain');
  const openLink = document.getElementById('news-preview-open');

  if (tempNewsData && tempNewsData.url) {
    img.src = tempNewsData.thumb || makeNewsSvgThumb(tempNewsData.title || tempNewsData.domain, tempNewsData.domain);
    title.textContent = tempNewsData.title || 'ไม่มีหัวข้อข่าว';
    domain.textContent = tempNewsData.domain || 'NEWS';
    openLink.href = tempNewsData.url;
    previewBox.classList.remove('hidden');
  } else {
    previewBox.classList.add('hidden');
  }
}

function useNewsTitleAsCardTitle() {
  if (tempNewsData && tempNewsData.title) {
    document.getElementById('modal-title').value = tempNewsData.title;
    syncModalFieldsToCardObject();
    saveState();
    renderCurrentView();
    showToast('ใช้หัวข้อข่าวเป็นชื่อการ์ดเรียบร้อย');
  }
}

function handleThumbImgError(img) {
  img.onerror = null;
  img.src = makeNewsSvgThumb(tempNewsData.title || 'ข่าวอ้างอิง', tempNewsData.domain || 'NEWS');
}

// ============================================================================
// HEALTH SCRIPT GENERATOR (5 HEALTH ANGLES × 5 EDITORIAL STYLES)
// Extracts and synthesizes real facts/paragraphs from news/video links
// ============================================================================
function buildHealthScriptContent({ title, domain, description, paragraphs = [], styleKey = 'health_alert', angleKey = 'general' }) {
  const safeTitle = (title || 'ประเด็นสุขภาพที่น่าสนใจ').trim();
  const safeDomain = (domain || 'แหล่งข่าวอ้างอิง').trim();
  const safeDesc = (description || (paragraphs && paragraphs[0]) || '').trim();

  const angleTemplates = {
    general: {
      healthFocus: 'การดูแลตนเองเชิงป้องกันและสร้างสมดุลร่างกายในระยะยาว',
      takeaway: 'เริ่มต้นปรับเปลี่ยนพฤติกรรมง่ายๆ วันละ 1 อย่าง เพื่อสุขภาพที่แข็งแรงอย่างยั่งยืน'
    },
    food: {
      healthFocus: 'โภชนาการที่ถูกต้องและการเลือกรับประทานอาหารที่มีสารอาหารสำคัญครบถ้วน',
      takeaway: 'เลือกทานอาหารที่มีสารต้านอนุมูลอิสระสูง หลีกเลี่ยงของทอด หวานจัด และเค็มจัด'
    },
    sleep_stress: {
      healthFocus: 'การฟื้นฟูร่างกายผ่านการนอนหลับที่มีคุณภาพและการผ่อนคลายความเครียดสะสม',
      takeaway: 'จัดตารางนอนให้ตรงเวลา งดจ้องหน้าจอก่อนนอน 30 นาที และฝึกการหายใจลึกเพื่อคลายสมอง'
    },
    immunity: {
      healthFocus: 'การเสริมสร้างภูมิคุ้มกันและชะลอความเสื่อมของเซลล์ในร่างกาย',
      takeaway: 'เติมสารอาหารที่จำเป็นต่อเม็ดเลือดขาว รับวิตามินจากแดดเช้า และออกกำลังกายสม่ำเสมอ'
    },
    product: {
      healthFocus: 'การเสริมสารอาหารสำคัญควบคู่กับการเลือกใช้ตัวช่วยที่ได้มาตรฐานความปลอดภัย',
      takeaway: 'หากสนใจแนวทางการฟื้นฟูร่างกายด้วยตัวช่วยที่ปลอดภัย สามารถทักสอบถามทีมผู้เชี่ยวชาญได้เลยนะคะ'
    }
  };

  const currentAngleInfo = angleTemplates[angleKey] || angleTemplates.general;

  // Extract substantive paragraphs / facts from news or video
  let cleanPoints = [];
  if (Array.isArray(paragraphs) && paragraphs.length > 0) {
    cleanPoints = paragraphs.map(p => String(p).trim()).filter(p => p.length >= 15);
  }
  if (cleanPoints.length === 0 && safeDesc) {
    cleanPoints = [safeDesc];
  }
  if (cleanPoints.length === 0) {
    cleanPoints = [`ติดตามสาระสำคัญและประเด็นที่น่าจับตามองจาก "${safeTitle}"`];
  }

  const p1 = cleanPoints[0] || safeTitle;
  const p2 = cleanPoints[1] || (cleanPoints.length > 1 ? cleanPoints[1] : `ประเด็นนี้สะท้อนให้เห็นถึงความสำคัญของ${currentAngleInfo.healthFocus} ที่ไม่ควรมองข้าม`);
  const p3 = cleanPoints[2] || `ควรสังเกตอาการผิดปกติและประเมินความเสี่ยงต่อสุขภาพอย่างสม่ำเสมอ`;

  const scriptStyles = {
    health_alert: `[เตือนภัยสุขภาพ: อุทาหรณ์ที่ทุกคนต้องระวัง]
📍 ข่าวอ้างอิง: ${safeTitle} (${safeDomain})

🚨 สาระสำคัญจากข่าว / ข้อเท็จจริงที่เกิดขึ้น:
• ${p1}
${cleanPoints.length > 1 ? `• ${p2}` : ''}

⚠️ มุมมองสุขภาพและสัญญาณเตือน:
จากกรณีนี้ พฤติกรรมหรือปัจจัยเสี่ยงดังกล่าวส่งผลโดยตรงต่อ "${currentAngleInfo.healthFocus}" หากปล่อยไว้นานอาจกลายเป็นภัยเงียบสะสมต่อร่างกาย

💡 คำแนะนำสำหรับแฟนเพจ:
• ${currentAngleInfo.takeaway}
• หมั่นสังเกตอาการผิดปกติของร่างกายและตรวจเช็คสุขภาพเป็นประจำ

ใครเคยเจอเหตุการณ์แบบนี้ หรือมีอาการใกล้เคียงกันบ้างคะ? คอมเมนต์มาคุยกันได้เลยนะคะ 👇`,

    wellness_tips: `[เคล็ดลับสุขภาพประจำวัน: How-to ดูแลตัวเองง่ายๆ ต่อยอดจากข่าว]
📍 ต่อยอดจากประเด็น: ${safeTitle} (${safeDomain})

📖 สรุปสาระสำคัญจากเนื้อหา:
• ${p1}
${cleanPoints.length > 1 ? `• ${p2}` : ''}

🌿 3 สเต็ปง่ายๆ ดูแลตัวเองเพื่อ ${currentAngleInfo.healthFocus}:
• สเต็ป 1: ทบทวนพฤติกรรมในชีวิตประจำวัน และหลีกเลี่ยงปัจจัยเสี่ยงตามที่ปรากฏในข่าว
• สเต็ป 2: ${currentAngleInfo.takeaway}
• สเต็ป 3: ดื่มน้ำสะอาดให้เพียงพอและพักผ่อนให้มีคุณภาพในทุกๆ วัน

เซฟโพสต์นี้เก็บไว้ลองทำตามและแชร์ต่อให้คนที่คุณรักกันนะคะ 📌`,

    myth_fact: `[ไขข้อข้องใจ: รู้หรือไม่? จริงหรือมั่วเกี่ยวกับสุขภาพ]
📍 ประเด็นจากข่าว: ${safeTitle}

❌ สิ่งที่หลายคนมักเข้าใจผิด:
"คิดว่าเป็นเรื่องไกลตัว หรือมองข้ามสัญญาณเตือนเล็กๆ น้อยๆ ในชีวิตประจำวัน"

✅ ข้อเท็จจริงทางการแพทย์ / สาระสำคัญจากเนื้อหา:
• ${p1}
${cleanPoints.length > 1 ? `• ${p2}` : ''}

🧠 สรุปแนวทางฟื้นฟูสุขภาพ:
ในระยะยาว ปัจจัยเหล่านี้จะส่งผลต่อ ${currentAngleInfo.healthFocus} โดยตรง
${currentAngleInfo.takeaway}

แชร์โพสต์นี้ไปเตือนเพื่อนๆ และคนในครอบครัวกันนะคะ ❤️`,

    soft_sell: `[เจาะลึกสุขภาพ: ดูแลตัวเองอย่างไรให้ตรงจุด]
📍 อ้างอิงประเด็นข่าว: ${safeTitle} (${safeDomain})

จากประเด็นข่าวที่กำลังได้รับความสนใจ:
"${p1}"
${cleanPoints.length > 1 ? `ทำให้เห็นได้ชัดเจนว่า: ${p2}` : ''}

เพราะ "${currentAngleInfo.healthFocus}" คือสิ่งสำคัญที่ควรรีบฟื้นฟูตั้งแต่เนิ่นๆ ก่อนที่จะสายเกินแก้

✨ แนวทางการดูแลตนเองอย่างถูกวิธี:
${currentAngleInfo.takeaway}

หากใครกำลังมองหาตัวช่วยดูแลสุขภาพที่ปลอดภัย ผ่านการรับรองมาตรฐาน สามารถทักสอบถามทีมงานได้ทางอินบ็อกซ์เลยนะคะ ยินดีให้คำแนะนำค่ะ 💬`,

    fb_infographic: `📌 [สรุปสาระสำคัญสำหรับโพสต์]
หัวข้อ: ${safeTitle}
แหล่งที่มา: ${safeDomain}

▪️ ประเด็นสำคัญจากเนื้อหาข่าว / คลิป:
• ${p1}
• ${p2}
${cleanPoints.length > 2 ? `• ${p3}` : ''}

▪️ มุมมองด้านสุขภาพ:
${currentAngleInfo.healthFocus}

▪️ ข้อควรระวังและแนวทางปฏิบัติ:
${currentAngleInfo.takeaway}

#สุขภาพดี #ดูแลตัวเอง #สาระสุขภาพ #เตือนภัยสุขภาพ`
  };

  return scriptStyles[styleKey] || scriptStyles.health_alert;
}

function syncHealthAngle(val) {
  currentHealthAngle = val;
  const inlineEl = document.getElementById('health-angle-select-inline');
  if (inlineEl && inlineEl.value !== val) inlineEl.value = val;
  generateScriptFromNews(currentScriptStyle, true);
}

function generateScriptFromNews(styleKey, notify = true) {
  currentScriptStyle = styleKey;
  const title = tempNewsData.title || document.getElementById('modal-title')?.value || 'ประเด็นสุขภาพที่น่าสนใจ';
  const domain = tempNewsData.domain || 'สำนักข่าว';
  const desc = tempNewsData.description || '';
  const paragraphs = tempNewsData.paragraphs || [];

  const generated = buildHealthScriptContent({
    title,
    domain,
    description: desc,
    paragraphs,
    styleKey: currentScriptStyle,
    angleKey: currentHealthAngle
  });

  const scriptEl = document.getElementById('modal-script');
  if (scriptEl) {
    scriptEl.value = generated;
    runTypoCheck();
    syncModalFieldsToCardObject();
    if (notify) showToast(`✨ ร่างบทสไตล์ "${styleKey}" เรียบร้อยแล้ว`);
  }
}

// ============================================================================
// 3-LAYER THAI PROOFREADING ENGINE
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

  // 1. Dictionary Rules
  typoDict.forEach(rule => {
    if (!rule.wrong) return;
    if (text.includes(rule.wrong)) {
      addIssue(rule.wrong, rule.right, rule.note || 'คำสะกดผิด', rule.type || 'คำสะกดผิด');
    }
  });

  // 2. Duplicate Words
  try {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
      const words = Array.from(segmenter.segment(text))
        .filter(s => s.isWordLike)
        .map(s => s.segment);

      for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i];
        const w2 = words[i + 1];
        if (w1 === w2 && w1.length >= 2 && !ALLOWED_DOUBLE_WORDS.has(w1)) {
          const doublePhrase = `${w1} ${w2}`;
          const gluedPhrase = `${w1}${w2}`;
          if (text.includes(doublePhrase)) {
            addIssue(doublePhrase, w1, 'พิมพ์คำซ้ำติดกัน', 'คำซ้ำติดกัน');
          } else if (text.includes(gluedPhrase)) {
            addIssue(gluedPhrase, w1, 'พิมพ์คำซ้ำติดกัน', 'คำซ้ำติดกัน');
          }
        }
      }
    }
  } catch (e) {}

  // 3. Question sentence ending with ค่ะ instead of คะ
  const questionWords = ['ไหม', 'มั้ย', 'หรือยัง', 'หรือเปล่า', 'ยังไง', 'อย่างไร', 'ที่ไหน', 'เมื่อไหร่', 'กี่บาท', 'เท่าไหร่', 'อะไร', 'ใคร'];
  questionWords.forEach(qw => {
    const regex = new RegExp(`(${qw}[^\\n.?!]{0,25}?)ค่ะ`, 'g');
    let m;
    while ((m = regex.exec(text)) !== null) {
      const wrongSnippet = m[0];
      const rightSnippet = wrongSnippet.slice(0, -3) + 'คะ';
      addIssue(wrongSnippet, rightSnippet, 'ประโยคคำถามควรลงท้ายด้วย "คะ"', 'บริบทประโยคคำถาม');
    }
  });

  return found;
}

function runTypoCheck() {
  const text = document.getElementById('modal-script')?.value || '';
  const counter = document.getElementById('char-counter');
  if (counter) counter.textContent = `${text.length} ตัวอักษร`;

  const typos = scanTextForTypos(text);
  const alertBox = document.getElementById('typo-alert-box');
  const btnAutoFix = document.getElementById('btn-autofix');
  if (!alertBox) return;

  if (!text.trim()) {
    if (btnAutoFix) btnAutoFix.classList.add('hidden');
    alertBox.className = 'rounded-md p-3 border border-zinc-200 bg-zinc-50 text-xs text-zinc-400';
    alertBox.textContent = 'พิมพ์หรือวางบทคอนเทนต์ด้านบน ระบบจะตรวจสอบคำสะกดผิดภาษาไทยอัตโนมัติ';
  } else if (typos.length > 0) {
    if (btnAutoFix) btnAutoFix.classList.remove('hidden');
    alertBox.className = 'rounded-md p-3 border border-rose-200 bg-rose-50/70 text-xs text-rose-900 space-y-2';

    const itemsHtml = typos.map(t => `
      <div class="flex items-center justify-between bg-white px-2.5 py-1.5 rounded border border-rose-200 gap-2">
        <div class="flex items-center flex-wrap gap-1.5">
          <span class="text-[10px] font-medium px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">${escapeHtml(t.category || 'คำผิด')}</span>
          <span class="line-through text-rose-600 font-medium">"${escapeHtml(t.wrong)}"</span>
          <span class="text-zinc-400">→</span>
          <span class="text-emerald-700 font-semibold">"${escapeHtml(t.right)}"</span>
          ${t.note ? `<span class="text-zinc-400 text-[11px]">(${escapeHtml(t.note)})</span>` : ''}
        </div>
        <button type="button" onclick="replaceSingleTypo('${escapeQuotes(t.wrong)}', '${escapeQuotes(t.right)}')" class="bg-zinc-900 hover:bg-zinc-800 text-white px-2 py-0.5 rounded text-[11px] font-medium transition">
          แก้คำนี้
        </button>
      </div>
    `).join('');

    alertBox.innerHTML = `
      <div class="font-semibold text-rose-800 flex items-center justify-between">
        <span>พบจุดสะกดผิด ${typos.length} จุด (กรุณาแก้ไขก่อนส่งตรวจบท)</span>
      </div>
      <div class="space-y-1.5">${itemsHtml}</div>
    `;
  } else {
    if (btnAutoFix) btnAutoFix.classList.add('hidden');
    alertBox.className = 'rounded-md p-2.5 border border-emerald-200 bg-emerald-50/70 text-xs text-emerald-800 flex items-center gap-2';
    alertBox.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span> <span><b>ตรวจคำผิดผ่าน 100%</b> ไม่พบคำสะกดผิดในคลัง</span>`;
  }

  if (activeCardId) syncAndRefreshActions();
}

function replaceSingleTypo(wrongWord, rightWord) {
  const scriptEl = document.getElementById('modal-script');
  scriptEl.value = scriptEl.value.split(wrongWord).join(rightWord);
  runTypoCheck();
  showToast(`แก้คำว่า "${wrongWord}" เรียบร้อยแล้ว`);
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
  showToast('✨ แก้ไขคำผิดทั้งหมดในบทให้อัตโนมัติแล้ว');
}

// ============================================================================
// DEADLINE & WORKFLOW VALIDATION
// ============================================================================
function getDeadlineInfo(card) {
  const now = new Date();
  const draftDate = card.draftDeadline ? new Date(card.draftDeadline) : null;
  const pubDate = card.publishTime ? new Date(card.publishTime) : null;

  let draftState = {
    label: 'ไม่ระบุเวลาส่งบท',
    shortLabel: '-',
    badge: 'bg-zinc-100 text-zinc-600 border border-zinc-200',
    isOverdue: false
  };

  if (draftDate && !isNaN(draftDate)) {
    const diffHours = (draftDate - now) / (1000 * 3600);
    const formatted = formatThaiDateTime(draftDate);
    if (card.status === 'idea_review' || card.status === 'writing') {
      if (diffHours < 0) {
        draftState = {
          label: `ส่งบทช้า ${Math.abs(Math.round(diffHours))} ชม. (${formatted})`,
          shortLabel: `ดราฟต์: ${formatted} (ช้า)`,
          badge: 'bg-rose-50 text-rose-700 border border-rose-200 font-medium',
          isOverdue: true
        };
      } else if (diffHours <= 5) {
        draftState = {
          label: `ใกล้ส่งบท (${formatted})`,
          shortLabel: `ดราฟต์: ${formatted}`,
          badge: 'bg-amber-50 text-amber-800 border border-amber-200 font-medium',
          isOverdue: false
        };
      } else {
        draftState = {
          label: `กำหนดส่ง: ${formatted}`,
          shortLabel: `ดราฟต์: ${formatted}`,
          badge: 'bg-zinc-100 text-zinc-700 border border-zinc-200',
          isOverdue: false
        };
      }
    } else {
      draftState = {
        label: `ส่งบทแล้ว (${formatted})`,
        shortLabel: `บทเสร็จแล้ว`,
        badge: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
        isOverdue: false
      };
    }
  }

  let pubState = {
    label: 'ไม่ระบุเวลาโพสต์',
    shortLabel: '-',
    badge: 'bg-zinc-100 text-zinc-600 border border-zinc-200',
    isMissed: false
  };

  if (pubDate && !isNaN(pubDate)) {
    const diffPub = (pubDate - now) / (1000 * 3600);
    const formattedPub = formatThaiDateTime(pubDate);
    if (card.status !== 'posted' && card.status !== 'waiting_post' && diffPub < 0) {
      pubState = {
        label: `เลยเวลาโพสต์ (${formattedPub})`,
        shortLabel: `โพสต์: ${formattedPub} (เลยเวลา)`,
        badge: 'bg-rose-50 text-rose-700 border border-rose-200 font-medium',
        isMissed: true
      };
    } else if (card.status === 'waiting_post' || card.status === 'posted') {
      pubState = {
        label: `เวลาโพสต์: ${formattedPub}`,
        shortLabel: `โพสต์: ${formattedPub}`,
        badge: 'bg-zinc-100 text-zinc-800 border border-zinc-200',
        isMissed: false
      };
    } else {
      pubState = {
        label: `เวลาโพสต์: ${formattedPub}`,
        shortLabel: `โพสต์: ${formattedPub}`,
        badge: 'bg-zinc-50 text-zinc-600 border border-zinc-200',
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
      return { allowed: false, reason: 'กรุณาพิมพ์บทคอนเทนต์ก่อนส่งตรวจบท' };
    }
    if (typos.length > 0) {
      return { allowed: false, reason: `พบคำผิดในบท ${typos.length} จุด กรุณาแก้ไขก่อนส่งตรวจ` };
    }
  }

  if (targetStatus === 'waiting_post') {
    if (typos.length > 0) {
      return { allowed: false, reason: 'พบคำผิดในบท กรุณาแก้ไขก่อนนำไปตั้งเวลาโพสต์' };
    }
    if (doneCheck < totalCheck) {
      return { allowed: false, reason: `ต้องติ๊ก Checklist ตรวจทานให้ครบทุกข้อก่อน (${doneCheck}/${totalCheck})` };
    }
  }

  return { allowed: true, reason: '' };
}

// ============================================================================
// AUDIT LOG & REVISION HISTORY
// ============================================================================
function recordCardChanges(card, actionDesc, prevScript = null, newScript = null) {
  card.history = card.history || [];
  const actorName = activeMember ? activeMember.name : 'ทีมงาน';
  const entry = {
    actor: actorName,
    time: getNowShortTime(),
    text: actionDesc,
    prevScript: prevScript !== null ? prevScript : undefined,
    newScript: newScript !== null ? newScript : undefined
  };
  card.history.unshift(entry);
}

function renderHistoryLog(card) {
  const container = document.getElementById('modal-history');
  const countBadge = document.getElementById('modal-history-count');
  const list = card.history || [];

  if (countBadge) countBadge.textContent = `${list.length} รายการ`;
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = '<div class="text-zinc-400 text-xs py-2">ยังไม่มีประวัติการแก้ไข</div>';
    return;
  }

  container.innerHTML = list.map((item, idx) => `
    <div class="p-2 rounded border border-zinc-100 bg-zinc-50/60 space-y-1">
      <div class="flex items-center justify-between text-[10px] text-zinc-400">
        <span class="font-medium text-zinc-700">${escapeHtml(item.actor || 'ทีมงาน')}</span>
        <span>${escapeHtml(item.time)}</span>
      </div>
      <div class="text-xs text-zinc-800">${escapeHtml(item.text)}</div>
      ${item.prevScript ? `
        <div class="pt-1 flex justify-end">
          <button type="button" onclick="restoreScriptFromModal('${card.id}', ${idx})" class="text-[10px] font-medium text-sky-600 hover:text-sky-800 hover:underline">
            ⏪ กู้คืนบทเวอร์ชันนี้
          </button>
        </div>
      ` : ''}
    </div>
  `).join('');
}

function restoreScriptFromModal(cardId, historyIndex) {
  const card = cards.find(c => c.id === cardId);
  if (!card || !card.history || !card.history[historyIndex]) return;
  const targetScript = card.history[historyIndex].prevScript;
  if (!targetScript) return;

  if (!confirm('ต้องการกู้คืนบทคอนเทนต์กลับไปเป็นเวอร์ชันก่อนหน้านี้ใช่หรือไม่?')) return;

  const currentScript = document.getElementById('modal-script').value;
  recordCardChanges(card, 'กู้คืนบทกลับสู่เวอร์ชันก่อนหน้า', currentScript, targetScript);
  document.getElementById('modal-script').value = targetScript;
  syncModalFieldsToCardObject();
  runTypoCheck();
  saveState();
  renderHistoryLog(card);
  showToast('⏪ กู้คืนบทเวอร์ชันที่เลือกเรียบร้อยแล้ว');
}

function openAuditLogModal() {
  populateAuditActorFilter();
  renderAuditLogList();
  const m = document.getElementById('audit-modal');
  m.classList.remove('hidden');
  m.classList.add('flex');
  lucide.createIcons();
}

function closeAuditLogModal() {
  const m = document.getElementById('audit-modal');
  m.classList.add('hidden');
  m.classList.remove('flex');
}

function populateAuditActorFilter() {
  const sel = document.getElementById('audit-filter-actor');
  if (!sel) return;
  const currentVal = sel.value || 'ALL';
  const actors = new Set();
  cards.forEach(c => {
    (c.history || []).forEach(h => {
      if (h.actor) actors.add(h.actor);
    });
  });

  sel.innerHTML = '<option value="ALL">ทุกคนในทีม</option>' +
    Array.from(actors).map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join('');
  sel.value = currentVal;
}

function renderAuditLogList() {
  const container = document.getElementById('audit-log-list');
  const filterActor = document.getElementById('audit-filter-actor')?.value || 'ALL';
  const totalLabel = document.getElementById('audit-total-label');
  if (!container) return;
  container.innerHTML = '';

  const allLogs = [];
  cards.forEach(c => {
    (c.history || []).forEach((h, idx) => {
      if (filterActor === 'ALL' || h.actor === filterActor) {
        allLogs.push({ ...h, cardId: c.id, cardTitle: c.title, cardStatus: c.status, historyIdx: idx });
      }
    });
  });

  if (totalLabel) totalLabel.textContent = `${allLogs.length} รายการ`;

  if (allLogs.length === 0) {
    container.innerHTML = '<div class="text-center py-8 text-xs text-zinc-400">ไม่พบประวัติการแก้ไขตามเงื่อนไขที่เลือก</div>';
    return;
  }

  allLogs.forEach(log => {
    const colObj = columns.find(c => c.id === log.cardStatus) || { title: log.cardStatus };
    const row = document.createElement('div');
    row.className = 'p-3 rounded-lg border border-zinc-200 bg-white space-y-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]';

    row.innerHTML = `
      <div class="flex items-center justify-between text-xs">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-zinc-900">${escapeHtml(log.actor || 'ทีมงาน')}</span>
          <span class="text-zinc-300">·</span>
          <span class="text-zinc-500 font-mono text-[11px]">${escapeHtml(log.time)}</span>
        </div>
        <span class="text-[11px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium">${escapeHtml(colObj.title)}</span>
      </div>
      <div class="text-xs text-zinc-700 font-medium">
        การ์ด: <span class="text-zinc-900 font-semibold cursor-pointer hover:underline" onclick="closeAuditLogModal();openCardModal('${log.cardId}')">${escapeHtml(log.cardTitle)}</span>
      </div>
      <div class="text-xs text-zinc-600 bg-zinc-50 p-2 rounded border border-zinc-100">${escapeHtml(log.text)}</div>
      ${log.prevScript ? `
        <div class="pt-1 flex justify-end">
          <button type="button" onclick="restoreScriptFromAudit('${log.cardId}', ${log.historyIdx})" class="text-xs font-medium text-sky-600 hover:text-sky-800 underline">
            กู้คืนบทเวอร์ชันนี้ →
          </button>
        </div>
      ` : ''}
    `;
    container.appendChild(row);
  });
}

function restoreScriptFromAudit(cardId, historyIdx) {
  const card = cards.find(c => c.id === cardId);
  if (!card || !card.history || !card.history[historyIdx]) return;
  const targetScript = card.history[historyIdx].prevScript;
  if (!targetScript) return;

  if (!confirm(`ต้องการกู้คืนบทของการ์ด "${card.title}" กลับสู่เวอร์ชันนี้ใช่หรือไม่?`)) return;

  const currentScript = card.script || '';
  recordCardChanges(card, 'กู้คืนบทผ่านหน้าประวัติการแก้ไข', currentScript, targetScript);
  card.script = targetScript;
  saveState();
  renderCurrentView();
  renderAuditLogList();
  showToast('กู้คืนบทเวอร์ชันเดิมเรียบร้อยแล้ว');
}

// ============================================================================
// INTERACTIVE STEP-BY-STEP GUIDE TOUR
// ============================================================================
function startInteractiveTour() {
  isTourActive = true;
  tourStepIndex = 0;
  const banner = document.getElementById('tour-banner');
  banner.classList.remove('hidden');
  renderTourStep();
}

function stopInteractiveTour() {
  isTourActive = false;
  const banner = document.getElementById('tour-banner');
  banner.classList.add('hidden');
  clearTourHighlights();
}

function nextTourStep() {
  if (tourStepIndex < TOUR_STEPS.length - 1) {
    tourStepIndex++;
    renderTourStep();
  } else {
    stopInteractiveTour();
    showToast('🎉 สิ้นสุดไกด์แนะนำการใช้งานเรียบร้อยแล้ว');
  }
}

function prevTourStep() {
  if (tourStepIndex > 0) {
    tourStepIndex--;
    renderTourStep();
  }
}

function clearTourHighlights() {
  document.querySelectorAll('.tour-highlight-target').forEach(el => {
    el.classList.remove('tour-highlight-target');
  });
}

function renderTourStep() {
  clearTourHighlights();
  const step = TOUR_STEPS[tourStepIndex];
  if (!step) return;

  document.getElementById('tour-step-badge').textContent = `Step ${tourStepIndex + 1} / ${TOUR_STEPS.length}`;
  document.getElementById('tour-step-title').textContent = step.title;
  document.getElementById('tour-step-desc').textContent = step.desc;

  const prevBtn = document.getElementById('tour-prev-btn');
  const nextBtn = document.getElementById('tour-next-btn');

  if (prevBtn) prevBtn.style.visibility = tourStepIndex === 0 ? 'hidden' : 'visible';
  if (nextBtn) nextBtn.textContent = tourStepIndex === TOUR_STEPS.length - 1 ? 'เสร็จสิ้น ✓' : 'ถัดไป →';

  const targetEl = document.getElementById(step.targetId);
  if (targetEl) {
    targetEl.classList.add('tour-highlight-target');
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }
}

// ============================================================================
// KANBAN BOARD RENDERING (STUDIO NOTION / LINEAR STYLE)
// ============================================================================
function renderBoard() {
  const boardEl = document.getElementById('kanban-board');
  const filterPlatform = document.getElementById('filter-platform')?.value || 'ALL';
  const searchQuery = (document.getElementById('search-input')?.value || '').trim().toLowerCase();

  boardEl.innerHTML = '';

  columns.forEach(col => {
    const colCards = cards.filter(c => {
      if (c.status !== col.id) return false;
      if (filterPlatform !== 'ALL') {
        const hasCh = (c.channels || []).some(ch => ch.target && (ch.name.includes(filterPlatform) || ch.short.includes(filterPlatform)));
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
      if (draggedCardId) attemptMoveCard(draggedCardId, col.id);
    });

    listEl.innerHTML = `
      <div class="px-3 pt-3 pb-2 border-b border-zinc-200/80">
        <div class="flex items-center justify-between gap-1.5">
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <span class="w-2 h-2 rounded-full ${col.dot || 'bg-zinc-400'} shrink-0"></span>
            <input type="text" value="${escapeHtml(col.title)}"
              onchange="renameColumn('${col.id}', this.value)"
              class="bg-transparent focus:bg-white font-semibold text-xs text-zinc-900 px-1 py-0.5 rounded w-full focus:outline-none focus:ring-1 focus:ring-zinc-300 truncate" />
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <span class="font-mono text-[11px] font-medium px-1.5 py-0.5 rounded bg-zinc-200/70 text-zinc-700">${colCards.length}</span>
            <div class="relative group">
              <button type="button" class="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200/60 transition" title="ตัวเลือกคอลัมน์">
                <i data-lucide="more-horizontal" class="w-3.5 h-3.5"></i>
              </button>
              <div class="hidden group-hover:block hover:block absolute right-0 top-6 z-30 w-44 bg-white rounded-lg shadow-xl border border-zinc-200 py-1 text-xs">
                <button type="button" onclick="clearColumnCards('${col.id}')" class="w-full text-left px-3 py-1.5 hover:bg-zinc-50 text-zinc-700 flex items-center gap-2">
                  <i data-lucide="archive" class="w-3.5 h-3.5 text-zinc-400"></i> ล้างการ์ดในช่องนี้
                </button>
                <button type="button" onclick="deleteColumn('${col.id}')" class="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-600 flex items-center gap-2">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5 text-rose-500"></i> ลบช่องนี้ทิ้ง
                </button>
              </div>
            </div>
          </div>
        </div>
        ${col.subtitle ? `<p class="text-[10px] text-zinc-500 px-1 mt-0.5">${escapeHtml(col.subtitle)}</p>` : ''}
      </div>

      <div class="trello-list-cards p-2 space-y-2 overflow-y-auto flex-1" id="col-body-${col.id}"></div>
      <div class="p-2 pt-1 border-t border-zinc-200/50" id="col-footer-${col.id}"></div>
    `;

    const bodyEl = listEl.querySelector(`#col-body-${col.id}`);
    colCards.forEach(card => {
      bodyEl.appendChild(createTrelloCardElement(card));
    });

    const footerEl = listEl.querySelector(`#col-footer-${col.id}`);
    if (activeQuickComposerColId === col.id) {
      footerEl.innerHTML = `
        <div class="space-y-1.5 bg-white p-2 rounded-lg border border-zinc-200 shadow-sm">
          <textarea id="quick-card-title-${col.id}" rows="2" placeholder="พิมพ์หัวข้อ หรือวางลิงก์ข่าว (https://...)"
            onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();submitQuickAddCard('${col.id}');}"
            class="w-full bg-zinc-50 focus:bg-white rounded p-1.5 text-xs text-zinc-900 border border-zinc-200 focus:outline-none focus:border-zinc-400 select-text"></textarea>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1">
              <button onclick="submitQuickAddCard('${col.id}')" class="bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-medium px-2.5 py-1 rounded transition">
                เพิ่มการ์ด
              </button>
              <button onclick="closeQuickComposer()" class="text-zinc-400 hover:text-zinc-700 p-1">
                <i data-lucide="x" class="w-3.5 h-3.5"></i>
              </button>
            </div>
            <button onclick="openCreateModal('${col.id}')" class="text-[11px] text-zinc-500 hover:text-zinc-900 underline">
              เปิดฟอร์มเต็ม
            </button>
          </div>
        </div>
      `;
    } else {
      footerEl.innerHTML = `
        <button onclick="openQuickComposer('${col.id}')" class="w-full py-1.5 px-2 rounded-md text-xs font-medium text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-900 transition flex items-center gap-1.5">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> เพิ่มการ์ด / วางลิงก์ข่าว
        </button>
      `;
    }

    boardEl.appendChild(listEl);
  });

  const addColWrap = document.createElement('div');
  addColWrap.className = 'w-[250px] min-w-[250px] shrink-0';
  addColWrap.innerHTML = `
    <button onclick="promptAddColumn()" class="w-full bg-white/70 hover:bg-white border border-zinc-200 text-zinc-700 font-medium text-xs px-3 py-2.5 rounded-lg flex items-center gap-2 transition shadow-sm">
      <i data-lucide="plus" class="w-3.5 h-3.5 text-zinc-500"></i> เพิ่มขั้นตอนอื่น
    </button>
  `;
  boardEl.appendChild(addColWrap);

  updateStats();
  const dictEl = document.getElementById('dict-count');
  if (dictEl) dictEl.textContent = typoDict.length;
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

  const urgentRing = draftState.isOverdue || pubState.isMissed
    ? 'border-rose-400 ring-1 ring-rose-400'
    : '';

  cardEl.className = `trello-card overflow-hidden cursor-pointer ${urgentRing}`;
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

  // News Cover
  let newsCoverHtml = '';
  if (card.newsThumb) {
    const fallbackSvg = makeNewsSvgThumb(card.newsTitle || card.title, card.newsDomain || 'NEWS');
    newsCoverHtml = `
      <div class="relative h-28 w-full bg-zinc-900 overflow-hidden border-b border-zinc-100 group">
        <img src="${escapeHtml(card.newsThumb)}" alt="News Thumbnail"
          onerror="this.onerror=null;this.src='${fallbackSvg}';"
          class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div class="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white">
          <span class="font-mono text-[9px] font-semibold bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded truncate">
            ${escapeHtml(card.newsDomain || 'NEWS')}
          </span>
          ${card.newsUrl ? `
            <a href="${escapeHtml(card.newsUrl)}" target="_blank" rel="noopener"
              class="news-ext-link text-[10px] font-medium bg-white/90 hover:bg-white text-zinc-900 px-1.5 py-0.2 rounded shadow-sm">
              เปิดข่าว ↗
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }

  // Channels Pills
  const targetChannels = (card.channels || []).filter(ch => ch.target);
  const postedCount = targetChannels.filter(ch => ch.posted).length;

  const channelPillsHtml = targetChannels.map(ch => {
    if (card.status === 'waiting_post' || card.status === 'posted') {
      return `
        <button type="button" onclick="toggleChannelPosted('${card.id}', '${ch.id}', event)"
          class="quick-ch-toggle text-[10px] font-semibold px-1.5 py-0.2 rounded border transition flex items-center gap-1 ${
            ch.posted
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
          }">
          ${ch.posted ? '✓' : '○'} ${escapeHtml(ch.short || ch.name)}
        </button>
      `;
    } else {
      return `<span class="text-[9px] font-mono font-medium px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">${escapeHtml(ch.short || ch.name)}</span>`;
    }
  }).join('');

  // Typo Badge
  let typoBadgeHtml = '';
  if (!card.script || card.script.trim().length === 0) {
    typoBadgeHtml = `<span class="text-[10px] text-zinc-400">ดราฟต์ว่าง</span>`;
  } else if (typos.length > 0) {
    typoBadgeHtml = `<span class="text-[10px] font-medium text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded">${typos.length} คำผิด</span>`;
  } else {
    typoBadgeHtml = `<span class="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">ผ่านตรวจคำผิด</span>`;
  }

  const assigneeName = card.assignee || 'ไม่ระบุ';
  const initial = assigneeName.replace('น้อง', '').replace('ทีม', '').trim().charAt(0) || 'U';

  cardEl.innerHTML = `
    ${newsCoverHtml}
    <div class="p-3 space-y-2">
      ${channelPillsHtml ? `<div class="flex flex-wrap gap-1">${channelPillsHtml}</div>` : ''}
      <div class="text-[13px] font-medium text-zinc-900 leading-snug tracking-tight">${escapeHtml(card.title)}</div>
      ${card.feedback ? `<div class="text-[11px] bg-amber-50/80 border border-amber-200/80 text-amber-900 px-2 py-1 rounded">💬 ${escapeHtml(card.feedback)}</div>` : ''}
      <div class="flex flex-wrap gap-1 pt-0.5">
        <span class="text-[10px] px-1.5 py-0.5 rounded ${draftState.badge}">${draftState.shortLabel}</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded ${pubState.badge}">${pubState.shortLabel}</span>
      </div>
      <div class="pt-2 flex items-center justify-between gap-1 border-t border-zinc-100">
        <div class="flex items-center gap-1.5 flex-wrap">
          ${typoBadgeHtml}
          <span class="font-mono text-[10px] px-1 py-0.2 rounded ${doneCheck === totalCheck && totalCheck > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold' : 'text-zinc-500'}">
            ${doneCheck}/${totalCheck}
          </span>
          ${targetChannels.length > 0 ? `<span class="font-mono text-[10px] text-zinc-500">${postedCount}/${targetChannels.length} ช่อง</span>` : ''}
        </div>
        <div class="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] font-semibold flex items-center justify-center shrink-0" title="ผู้รับผิดชอบ: ${escapeHtml(assigneeName)}">
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
  recordCardChanges(card, `${ch.posted ? 'ติ๊กเช็คลงโพสต์' : 'ยกเลิกสถานะลงโพสต์'} "${ch.name}"`);
  saveState();
  renderCurrentView();
  showToast(`${ch.name}: ${ch.posted ? 'ลงโพสต์แล้ว' : 'รอลง'}`);
}

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
  const defaultAssignee = activeMember ? activeMember.name : 'น้องมายด์ (คนเขียนบท)';

  const newCard = {
    id: 'card-' + Date.now(),
    title: isUrl ? `กำลังดึงหัวข้อข่าวจาก ${extractDomain(normalizedUrl)}...` : rawVal,
    status: colId,
    assignee: defaultAssignee,
    contentType: 'คลิปสั้น (Reels/TikTok)',
    newsUrl: normalizedUrl,
    newsDomain: normalizedUrl ? extractDomain(normalizedUrl) : '',
    newsTitle: '',
    newsThumb: normalizedUrl ? makeNewsSvgThumb('กำลังดึงรูปปก...', extractDomain(normalizedUrl)) : '',
    draftDeadline: offsetDateTimeLocal(18),
    publishTime: offsetDateTimeLocal(42),
    script: '',
    checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: false })),
    channels: DEFAULT_CHANNELS.map((c, idx) => ({ id: c.id, name: c.name, short: c.short, target: idx < 3, posted: false })),
    scheduleLink: '',
    scheduleImage: '',
    feedback: '',
    history: []
  };

  recordCardChanges(newCard, isUrl ? `วางลิงก์ข่าวสร้างการ์ดใหม่ (${normalizedUrl})` : `เพิ่มการ์ดใหม่ในคอลัมน์ "${colId}"`);
  cards.push(newCard);
  activeQuickComposerColId = null;
  saveState();
  renderBoard();

  if (normalizedUrl) {
    showToast('กำลังดึงรูปปกและหัวข้อข่าว...');
    const meta = await fetchNewsMetadata(normalizedUrl);
    if (meta) {
      newCard.newsThumb = meta.thumb;
      newCard.newsTitle = meta.title;
      newCard.newsDomain = meta.domain;
      if (newCard.title.startsWith('กำลังดึงหัวข้อข่าว')) newCard.title = meta.title;
      saveState();
      renderCurrentView();
      showToast('📰 ดึงรูปปกและหัวข้อข่าวสำเร็จแล้ว');
    }
  } else {
    showToast('เพิ่มการ์ดใหม่เรียบร้อยแล้ว');
  }
}

function renameColumn(colId, newTitle) {
  const col = columns.find(c => c.id === colId);
  if (col && newTitle.trim()) {
    col.title = newTitle.trim();
    saveState();
    showToast('เปลี่ยนชื่อขั้นตอนเรียบร้อย');
  }
}

function promptAddColumn() {
  const title = prompt('ตั้งชื่อขั้นตอนใหม่:');
  if (!title || !title.trim()) return;
  columns.push({
    id: 'col-' + Date.now(),
    title: title.trim(),
    subtitle: 'ขั้นตอนเพิ่มเติม',
    isCore: false,
    dot: 'bg-zinc-400'
  });
  saveState();
  renderBoard();
}

function deleteColumn(colId) {
  const col = columns.find(c => c.id === colId);
  if (!col) return;

  const count = cards.filter(c => c.status === colId).length;
  const msg = count > 0
    ? `⚠️ ช่อง "${col.title}" มีการ์ดงานอยู่ ${count} ใบ\nหากลบช่องนี้ การ์ดงานทั้ง ${count} ใบจะถูกลบไปด้วย คุณต้องการลบใช่หรือไม่?`
    : `ต้องการลบช่อง "${col.title}" ใช่หรือไม่?`;

  if (!confirm(msg)) return;

  columns = columns.filter(c => c.id !== colId);
  cards = cards.filter(c => c.status !== colId);
  saveState();
  renderBoard();
  showToast(`ลบช่อง "${col.title}" เรียบร้อยแล้ว`);
}

function clearColumnCards(colId) {
  const col = columns.find(c => c.id === colId);
  if (!col) return;

  const count = cards.filter(c => c.status === colId).length;
  if (count === 0) {
    showToast('ช่องนี้ยังไม่มีการ์ดงาน');
    return;
  }

  if (!confirm(`ต้องการลบการ์ดงานทั้งหมด ${count} ใบในช่อง "${col.title}" ใช่หรือไม่?`)) return;

  cards = cards.filter(c => c.status !== colId);
  saveState();
  renderBoard();
  showToast(`ลบการ์ดทั้งหมดในช่อง "${col.title}" เรียบร้อย`);
}

function clearEntireBoard() {
  if (cards.length === 0) {
    showToast('กระดานว่างอยู่แล้ว ไม่มีงานค้าง');
    return;
  }

  const ans = confirm(`⚠️ ต้องการล้างกระดานและลบการ์ดงานทั้งหมด ${cards.length} ใบใช่หรือไม่?\n\n(กดตกลงเพื่อเคลียร์งานตัวอย่างออกทั้งหมด และเริ่มทำงานจริงจากกระดานเปล่า)`);
  if (!ans) return;

  cards = [];
  saveState();
  renderCurrentView();
  showToast('🧹 ล้างกระดานเรียบร้อยแล้ว บอร์ดว่างพร้อมใช้งาน');
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

  const elOverdue = document.getElementById('stat-overdue');
  const elReview = document.getElementById('stat-review');
  const elScheduled = document.getElementById('stat-scheduled');
  const auditBadge = document.getElementById('audit-count-badge');

  if (elOverdue) elOverdue.textContent = overdue;
  if (elReview) elReview.textContent = review;
  if (elScheduled) elScheduled.textContent = scheduled;

  let totalLogs = 0;
  cards.forEach(c => { totalLogs += (c.history || []).length; });
  if (auditBadge) auditBadge.textContent = totalLogs;
}

function attemptMoveCard(cardId, targetStatus) {
  const card = cards.find(c => c.id === cardId);
  if (!card || card.status === targetStatus) return;

  const check = validateMoveCard(card, targetStatus);
  if (!check.allowed) {
    openCardModal(cardId);
    const warnBox = document.getElementById('gatekeeper-warning');
    if (warnBox) {
      warnBox.classList.remove('hidden');
      warnBox.innerHTML = `
        <div class="font-semibold text-rose-800">ระบบล็อกการส่งงานข้ามขั้นตอน:</div>
        <div class="text-[11px] text-rose-700">${check.reason}</div>
      `;
    }
    showToast(check.reason);
    return;
  }

  const colObj = columns.find(col => col.id === targetStatus);
  const oldCol = columns.find(col => col.id === card.status);
  card.status = targetStatus;

  // If card arrives in writing stage, automatically draft health script if card has news info
  if (targetStatus === 'writing' && (!card.script || card.script.trim().length < 50) && (card.newsUrl || card.newsTitle || (card.newsParagraphs && card.newsParagraphs.length > 0))) {
    const autoScript = buildHealthScriptContent({
      title: card.newsTitle || card.title,
      domain: card.newsDomain || 'ข่าวอ้างอิง',
      description: card.newsDescription || '',
      paragraphs: card.newsParagraphs || [],
      styleKey: currentScriptStyle || 'health_alert',
      angleKey: currentHealthAngle || 'general'
    });
    if (autoScript) {
      card.script = autoScript;
      recordCardChanges(card, `ย้ายขั้นตอนจาก "${oldCol ? oldCol.title : card.status}" ไปที่ "${colObj ? colObj.title : targetStatus}" พร้อมระบบดึงเนื้อหาจากลิงก์ข่าว/คลิปร่างบทให้อัตโนมัติ`);
    } else {
      recordCardChanges(card, `ย้ายขั้นตอนจาก "${oldCol ? oldCol.title : card.status}" ไปที่ "${colObj ? colObj.title : targetStatus}"`);
    }
  } else {
    recordCardChanges(card, `ย้ายขั้นตอนจาก "${oldCol ? oldCol.title : card.status}" ไปที่ "${colObj ? colObj.title : targetStatus}"`);
  }
  saveState();
  renderCurrentView();
  showToast(`ย้ายไปที่ "${colObj ? colObj.title : targetStatus}" เรียบร้อยแล้ว`);
}

// ============================================================================
// CARD MODAL (NOTION / LINEAR 2-PANE STUDIO)
// ============================================================================
function handleModalBackdropClick(e) {
  if (e.target.id === 'card-modal') closeCardModal();
}

function openCreateModal(defaultStatus = 'idea_review') {
  const defaultAssignee = activeMember ? activeMember.name : 'น้องมายด์ (คนเขียนบท)';
  const newCard = {
    id: 'card-' + Date.now(),
    title: 'หัวข้อคอนเทนต์ใหม่',
    status: defaultStatus,
    assignee: defaultAssignee,
    contentType: 'คลิปสั้น (Reels/TikTok)',
    newsUrl: '',
    newsDomain: '',
    newsTitle: '',
    newsThumb: '',
    draftDeadline: offsetDateTimeLocal(18),
    publishTime: offsetDateTimeLocal(42),
    script: '',
    checklist: DEFAULT_CHECKLIST.map(c => ({ ...c, done: false })),
    channels: DEFAULT_CHANNELS.map((c, idx) => ({ id: c.id, name: c.name, short: c.short, target: idx < 3, posted: false })),
    scheduleLink: '',
    scheduleImage: '',
    feedback: '',
    history: []
  };
  recordCardChanges(newCard, 'สร้างการ์ดงานใหม่');
  cards.unshift(newCard);
  saveState();
  renderCurrentView();
  openCardModal(newCard.id);
}

function openCardModal(cardId) {
  const card = cards.find(c => c.id === cardId);
  if (!card) return;
  activeCardId = cardId;

  // Snapshot before editing so we know what changed when saving
  cardSnapshotBeforeEdit = {
    title: card.title || '',
    script: card.script || '',
    assignee: card.assignee || '',
    draftDeadline: card.draftDeadline || '',
    publishTime: card.publishTime || '',
    feedback: card.feedback || '',
    newsUrl: card.newsUrl || '',
    status: card.status
  };

  const colObj = columns.find(c => c.id === card.status) || columns[0];
  const { draftState } = getDeadlineInfo(card);

  document.getElementById('modal-status-badge').textContent = colObj.title;
  document.getElementById('modal-list-name-inline').textContent = colObj.title;
  document.getElementById('modal-deadline-badge').textContent = draftState.label;

  document.getElementById('modal-title').value = card.title || '';
  populateAssigneeDropdown();
  document.getElementById('modal-assignee').value = card.assignee || (activeMember ? activeMember.name : '');
  document.getElementById('modal-content-type').value = card.contentType || 'คลิปสั้น (Reels/TikTok)';
  document.getElementById('modal-draft-deadline').value = card.draftDeadline || '';
  document.getElementById('modal-publish-time').value = card.publishTime || '';
  document.getElementById('modal-script').value = card.script || '';
  document.getElementById('modal-schedule-link').value = card.scheduleLink || '';
  document.getElementById('modal-feedback').value = card.feedback || '';
  document.getElementById('modal-news-url').value = card.newsUrl || '';
  document.getElementById('news-fetch-status').textContent = card.newsThumb ? 'แสดง Thumbnail ข่าวอยู่' : 'วางลิงก์เพื่อดึงภาพปกและหัวข้อข่าวอัตโนมัติ';

  tempNewsData = {
    url: card.newsUrl || '',
    thumb: card.newsThumb || '',
    title: card.newsTitle || '',
    domain: card.newsDomain || '',
    description: card.newsDescription || '',
    paragraphs: card.newsParagraphs || []
  };

  // If card is in writing stage and has no script (or placeholder script), auto-generate script from attached news/video
  if (card.status === 'writing' && (!card.script || card.script.trim().length < 50) && (card.newsUrl || card.newsTitle || (card.newsParagraphs && card.newsParagraphs.length > 0))) {
    const autoScript = buildHealthScriptContent({
      title: card.newsTitle || card.title,
      domain: card.newsDomain || 'ข่าวอ้างอิง',
      description: card.newsDescription || '',
      paragraphs: card.newsParagraphs || [],
      styleKey: currentScriptStyle || 'health_alert',
      angleKey: currentHealthAngle || 'general'
    });
    if (autoScript) {
      card.script = autoScript;
      document.getElementById('modal-script').value = autoScript;
      recordCardChanges(card, 'ระบบดึงเนื้อหาจากลิงก์ข่าว/คลิป และร่างบทสุขภาพให้อัตโนมัติในขั้นตอนเขียนบท');
    }
  }

  if (!card.channels || card.channels.length === 0) {
    card.channels = DEFAULT_CHANNELS.map((c, idx) => ({ id: c.id, name: c.name, short: c.short, target: idx < 3, posted: false }));
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
  updateActiveUserBadge();

  const warn = document.getElementById('gatekeeper-warning');
  if (warn) warn.classList.add('hidden');

  const modal = document.getElementById('card-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  lucide.createIcons();
}

function closeCardModal() {
  if (activeCardId) saveCardModal(false);
  activeCardId = null;
  cardSnapshotBeforeEdit = null;
  const modal = document.getElementById('card-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function renderModalChannels() {
  const container = document.getElementById('modal-platforms');
  if (!container) return;
  container.innerHTML = '';

  tempChannels.forEach((ch, idx) => {
    const row = document.createElement('div');
    row.className = `flex items-center justify-between p-2 rounded-md border text-xs transition ${
      ch.target ? 'bg-zinc-50 border-zinc-200 text-zinc-900' : 'bg-white border-zinc-100 text-zinc-400'
    }`;

    row.innerHTML = `
      <label class="flex items-center gap-2 cursor-pointer font-medium">
        <input type="checkbox" ${ch.target ? 'checked' : ''} class="rounded text-zinc-900 focus:ring-0 cursor-pointer" />
        <span>${escapeHtml(ch.name)}</span>
      </label>
      ${ch.target ? `
        <button type="button" class="px-2 py-0.5 rounded text-[11px] font-medium transition ${
          ch.posted ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
        }">
          ${ch.posted ? '✓ ลงแล้ว' : '○ รอลง'}
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
}

function renderModalChecklist() {
  const container = document.getElementById('modal-checklist');
  if (!container) return;
  container.innerHTML = '';

  const total = tempChecklist.length;
  const done = tempChecklist.filter(c => c.done).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  document.getElementById('checklist-progress-text').textContent = `${done}/${total} (${pct}%)`;
  const bar = document.getElementById('checklist-progress-bar');
  if (bar) bar.style.width = `${pct}%`;

  tempChecklist.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = `flex items-center justify-between gap-2 p-2 rounded-md border text-xs transition ${
      item.done ? 'bg-emerald-50/50 border-emerald-200 text-zinc-400 line-through' : 'bg-zinc-50 border-zinc-200 text-zinc-800'
    }`;
    row.innerHTML = `
      <label class="flex items-start gap-2 cursor-pointer flex-1">
        <input type="checkbox" ${item.done ? 'checked' : ''} class="mt-0.5 rounded text-zinc-900 focus:ring-0 cursor-pointer" />
        <span>${escapeHtml(item.text)}</span>
      </label>
      <button type="button" onclick="removeChecklistItem(${idx})" class="text-zinc-400 hover:text-rose-600 text-[11px] px-1">ลบ</button>
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
  const text = (input?.value || '').trim();
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
      <button type="button" onclick="saveAndMoveCard('writing')" class="w-full py-2 px-3 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
        อนุมัติไอเดีย → ไปเขียนบทต่อ
      </button>
    `;
  } else if (card.status === 'writing') {
    const check = validateMoveCard(card, 'script_review');
    if (check.allowed) {
      container.innerHTML += `
        <button type="button" onclick="saveAndMoveCard('script_review')" class="w-full py-2 px-3 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
          ส่งบทเสร็จแล้ว → รอตรวจ/ปรับแก้
        </button>
      `;
    } else {
      container.innerHTML += `
        <div class="p-2 rounded border border-rose-200 bg-rose-50 text-[11px] text-rose-800">
          🔒 ยังส่งไม่ได้: ${check.reason}
        </div>
      `;
    }
  } else if (card.status === 'script_review') {
    const check = validateMoveCard(card, 'script_done');
    if (check.allowed) {
      container.innerHTML += `
        <button type="button" onclick="saveAndMoveCard('script_done')" class="w-full py-2 px-3 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
          ตรวจผ่าน → ย้ายเข้า "4. บทสมบูรณ์"
        </button>
        <button type="button" onclick="rejectCardWithFeedback()" class="w-full py-1.5 px-3 rounded-md bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-medium flex items-center justify-center gap-1 transition">
          มีจุดต้องปรับแก้ (ส่งกลับไปเขียนบท)
        </button>
      `;
    } else {
      container.innerHTML += `
        <div class="p-2 rounded border border-rose-200 bg-rose-50 text-[11px] text-rose-800">${check.reason}</div>
      `;
    }
  } else if (card.status === 'script_done') {
    container.innerHTML += `
      <button type="button" onclick="saveAndMoveCard('edit_review')" class="w-full py-2 px-3 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
        ตัดต่อเสร็จแล้ว → ส่งตรวจคลิป
      </button>
    `;
  } else if (card.status === 'edit_review') {
    const check = validateMoveCard(card, 'waiting_post');
    if (check.allowed) {
      container.innerHTML += `
        <button type="button" onclick="saveAndMoveCard('waiting_post')" class="w-full py-2 px-3 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
          คลิปผ่านแล้ว → ย้ายไป "6. รอลง"
        </button>
      `;
    } else {
      container.innerHTML += `
        <div class="p-2 rounded border border-rose-200 bg-rose-50 text-[11px] text-rose-800">${check.reason}</div>
      `;
    }
  } else if (card.status === 'waiting_post') {
    container.innerHTML += `
      <button type="button" onclick="saveAndMoveCard('posted')" class="w-full py-2 px-3 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
        โพสต์ขึ้นแล้ว → ย้ายไปเช็คช่องทาง
      </button>
    `;
  } else if (card.status === 'posted') {
    const targets = tempChannels.filter(c => c.target);
    const doneCount = targets.filter(c => c.posted).length;
    container.innerHTML += `
      <div class="p-2 rounded border border-zinc-200 bg-zinc-50 text-xs font-medium text-center text-zinc-700">
        ลงโพสต์แล้ว ${doneCount}/${targets.length} ช่องทาง
      </div>
    `;
  }
}

function syncAndRefreshActions() {
  syncModalFieldsToCardObject();
  const card = cards.find(c => c.id === activeCardId);
  if (card) renderWorkflowActionButtons(card);
}

function syncModalFieldsToCardObject() {
  if (!activeCardId) return;
  const card = cards.find(c => c.id === activeCardId);
  if (!card) return;

  const newTitle = document.getElementById('modal-title').value.trim() || 'ไม่มีชื่อหัวข้อ';
  const newAssignee = document.getElementById('modal-assignee').value.trim() || 'ไม่ระบุ';
  const newScript = document.getElementById('modal-script').value;
  const newDraftDl = document.getElementById('modal-draft-deadline').value;
  const newPubTime = document.getElementById('modal-publish-time').value;
  const newFeedback = document.getElementById('modal-feedback').value.trim();
  const newNewsUrl = tempNewsData.url || document.getElementById('modal-news-url').value.trim();

  // Detect script changes for audit history snapshot
  if (cardSnapshotBeforeEdit && cardSnapshotBeforeEdit.script !== newScript && newScript.trim()) {
    recordCardChanges(card, 'แก้ไขเนื้อหาบทคอนเทนต์', cardSnapshotBeforeEdit.script, newScript);
    cardSnapshotBeforeEdit.script = newScript;
  }

  card.title = newTitle;
  card.assignee = newAssignee;
  card.contentType = document.getElementById('modal-content-type').value;
  card.draftDeadline = newDraftDl;
  card.publishTime = newPubTime;
  card.script = newScript;
  card.scheduleLink = document.getElementById('modal-schedule-link').value.trim();
  card.feedback = newFeedback;
  card.newsUrl = newNewsUrl;
  card.newsThumb = tempNewsData.thumb || '';
  card.newsTitle = tempNewsData.title || '';
  card.newsDomain = tempNewsData.domain || '';
  card.newsDescription = tempNewsData.description || '';
  card.newsParagraphs = Array.isArray(tempNewsData.paragraphs) ? [...tempNewsData.paragraphs] : [];
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
    cardSnapshotBeforeEdit = null;
    const modal = document.getElementById('card-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    showToast('💾 บันทึกข้อมูลการ์ดเรียบร้อย');
  }
}

function saveAndMoveCard(targetStatus) {
  syncModalFieldsToCardObject();
  const id = activeCardId;
  saveState();
  attemptMoveCard(id, targetStatus);
  const updated = cards.find(c => c.id === id);
  if (updated && updated.status === targetStatus) {
    closeCardModal();
  }
}

function rejectCardWithFeedback() {
  syncModalFieldsToCardObject();
  const card = cards.find(c => c.id === activeCardId);
  if (!card) return;

  if (!card.feedback) card.feedback = 'มีจุดที่ต้องปรับแก้เพิ่มเติม รบกวนตรวจตามคอมเมนต์ครับ';
  card.status = 'writing';
  recordCardChanges(card, `ส่งกลับไปปรับแก้บท: "${card.feedback}"`);
  saveState();
  renderCurrentView();
  closeCardModal();
  showToast('ส่งกลับไปขั้นตอน "2. เขียนบท" แล้ว');
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
  copy.history = [];
  recordCardChanges(copy, 'ทำสำเนาการ์ดใหม่');
  cards.unshift(copy);
  saveState();
  renderCurrentView();
  closeCardModal();
  showToast('ทำสำเนาการ์ดเรียบร้อยแล้ว');
}

function deleteCurrentCard() {
  if (!activeCardId) return;
  if (!confirm('ต้องการลบการ์ดงานนี้ใช่หรือไม่?')) return;
  cards = cards.filter(c => c.id !== activeCardId);
  activeCardId = null;
  cardSnapshotBeforeEdit = null;
  saveState();
  renderCurrentView();
  const modal = document.getElementById('card-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  showToast('ลบการ์ดเรียบร้อยแล้ว');
}

function copyCardForTrelloOrLine() {
  syncModalFieldsToCardObject();
  const card = cards.find(c => c.id === activeCardId);
  if (!card) return;

  const colObj = columns.find(c => c.id === card.status) || { title: card.status };
  const chSummary = (card.channels || [])
    .filter(c => c.target)
    .map(c => `${c.posted ? '✓' : '○'} ${c.name}`)
    .join(' | ');

  const summary = [
    `📌 QC Board: ${card.title}`,
    `📍 ขั้นตอน: ${colObj.title}`,
    `👤 ผู้รับผิดชอบ: ${card.assignee}`,
    `📰 ลิงก์ข่าวอ้างอิง: ${card.newsUrl || '-'}`,
    `🕒 กำหนดส่งดราฟต์: ${card.draftDeadline ? formatThaiDateTime(new Date(card.draftDeadline)) : '-'}`,
    `⏰ เวลาโพสต์จริง: ${card.publishTime ? formatThaiDateTime(new Date(card.publishTime)) : '-'}`,
    `📺 สถานะช่องทาง: ${chSummary}`,
    `💬 คอมเมนต์: ${card.feedback || '-'}`,
    `-------------------------`,
    `📝 สคริปต์/แคปชั่น:`,
    card.script || '(ยังไม่ได้ใส่บท)'
  ].join('\n');

  navigator.clipboard.writeText(summary).then(() => {
    showToast('คัดลอกสรุปส่งเข้า LINE กลุ่มเรียบร้อยแล้ว');
  });
}

// ============================================================================
// CALENDAR AGENDA VIEW
// ============================================================================
function renderCalendarView() {
  const container = document.getElementById('calendar-agenda-list');
  if (!container) return;
  container.innerHTML = '';

  const sorted = [...cards].sort((a, b) => new Date(a.publishTime || 0) - new Date(b.publishTime || 0));

  sorted.forEach(card => {
    const colObj = columns.find(c => c.id === card.status) || { title: card.status };
    const { draftState, pubState } = getDeadlineInfo(card);
    const targets = (card.channels || []).filter(c => c.target);
    const postedCnt = targets.filter(c => c.posted).length;

    const row = document.createElement('div');
    row.className = 'p-3 rounded-lg bg-zinc-50/70 hover:bg-zinc-100/80 border border-zinc-200 flex flex-wrap items-center justify-between gap-3 cursor-pointer transition';
    row.onclick = () => openCardModal(card.id);

    row.innerHTML = `
      <div class="flex items-center gap-3 flex-1 min-w-[240px]">
        ${card.newsThumb ? `<img src="${escapeHtml(card.newsThumb)}" class="w-14 h-11 object-cover rounded border border-zinc-200 shrink-0" />` : ''}
        <div class="space-y-1">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-zinc-200 text-zinc-800">${escapeHtml(colObj.title)}</span>
            <span class="text-xs text-zinc-500">${escapeHtml(card.assignee)}</span>
            <span class="font-mono text-[11px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700">ช่องทาง: ${postedCnt}/${targets.length}</span>
          </div>
          <div class="text-xs font-semibold text-zinc-900">${escapeHtml(card.title)}</div>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs px-2 py-0.5 rounded ${draftState.badge}">${draftState.shortLabel}</span>
        <span class="text-xs px-2 py-0.5 rounded ${pubState.badge}">${pubState.shortLabel}</span>
      </div>
    `;
    container.appendChild(row);
  });
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
    btnBoard.className = 'px-2.5 py-1 rounded-md font-medium bg-white text-zinc-900 shadow-sm flex items-center gap-1.5 transition';
    btnCal.className = 'px-2.5 py-1 rounded-md font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 transition';
  } else {
    boardContainer.classList.add('hidden');
    calContainer.classList.remove('hidden');
    btnCal.className = 'px-2.5 py-1 rounded-md font-medium bg-white text-zinc-900 shadow-sm flex items-center gap-1.5 transition';
    btnBoard.className = 'px-2.5 py-1 rounded-md font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 transition';
  }
  renderCurrentView();
}

function renderCurrentView() {
  if (currentView === 'board') renderBoard();
  else renderCalendarView();
}

// ============================================================================
// DICTIONARY & GUIDE MODALS
// ============================================================================
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

function renderDictList() {
  const container = document.getElementById('dict-list');
  if (!container) return;
  container.innerHTML = '';
  typoDict.forEach((rule, index) => {
    const item = document.createElement('div');
    item.className = 'bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1.5 flex items-center justify-between text-xs';
    item.innerHTML = `
      <div>
        <span class="text-rose-600 line-through font-medium">${escapeHtml(rule.wrong)}</span>
        <span class="text-zinc-400 mx-1">→</span>
        <span class="text-emerald-700 font-semibold">${escapeHtml(rule.right)}</span>
      </div>
      <button onclick="removeTypoRule(${index})" class="text-zinc-400 hover:text-rose-600 text-xs">ลบ</button>
    `;
    container.appendChild(item);
  });
  const dictCount = document.getElementById('dict-count');
  if (dictCount) dictCount.textContent = typoDict.length;
}

function addCustomTypoRule() {
  const wrong = document.getElementById('new-typo-wrong').value.trim();
  const right = document.getElementById('new-typo-right').value.trim();
  if (!wrong || !right) return;
  typoDict.unshift({ wrong, right, note: 'คำเฉพาะของเพจ' });
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

// ============================================================================
// STORAGE & SERVER SYNCHRONIZATION
// ============================================================================
let officeLanUrl = '';
let lastSyncedUpdatedAt = 0;

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

  loadTeamState();

  const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
  if (savedTheme) setBoardTheme(savedTheme, false);

  const savedTitle = localStorage.getItem(STORAGE_KEY_TITLE);
  if (savedTitle && document.getElementById('board-title-input')) {
    document.getElementById('board-title-input').value = savedTitle;
  }
}

function saveState() {
  const nowTs = Date.now();
  lastSyncedUpdatedAt = nowTs;
  localStorage.setItem(STORAGE_KEY_COLUMNS, JSON.stringify(columns));
  localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(cards));
  localStorage.setItem(STORAGE_KEY_DICT, JSON.stringify(typoDict));
  localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(teamMembers));
  localStorage.setItem(STORAGE_KEY_ADMIN_CREDS, JSON.stringify(adminCredentials));
  updateStats();

  fetch('/api/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      updatedAt: nowTs,
      columns,
      cards,
      typoDict,
      teamMembers,
      adminCredentials,
      boardTitle: document.getElementById('board-title-input')?.value || '',
      boardTheme: localStorage.getItem(STORAGE_KEY_THEME) || 'trello-bg-blue'
    })
  })
    .then(r => r.json())
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
      const localTs = lastSyncedUpdatedAt;

      if (remoteTs > localTs && !activeCardId) {
        lastSyncedUpdatedAt = remoteTs;
        if (Array.isArray(remote.columns) && remote.columns.length > 0) columns = remote.columns;
        if (Array.isArray(remote.cards)) cards = remote.cards;
        if (Array.isArray(remote.typoDict) && remote.typoDict.length > 0) typoDict = remote.typoDict;
        if (Array.isArray(remote.teamMembers) && remote.teamMembers.length > 0) {
          teamMembers = remote.teamMembers;
          updateActiveUserBadge();
        }
        if (remote.adminCredentials && remote.adminCredentials.username) {
          adminCredentials = remote.adminCredentials;
          localStorage.setItem(STORAGE_KEY_ADMIN_CREDS, JSON.stringify(adminCredentials));
        }
        if (remote.boardTitle && document.getElementById('board-title-input')) {
          document.getElementById('board-title-input').value = remote.boardTitle;
        }
        renderCurrentView();
      }
    } else if (isInitial) {
      saveState();
    }
  } catch (e) {}
}

function copyLanUrl() {
  if (!officeLanUrl) return;
  navigator.clipboard.writeText(officeLanUrl).then(() => {
    showToast(`คัดลอกลิงก์ LAN แล้ว: ${officeLanUrl}`);
  });
}

function saveBoardTitle(val) {
  localStorage.setItem(STORAGE_KEY_TITLE, val);
  saveState();
  showToast('บันทึกชื่อบอร์ดเรียบร้อย');
}

function setBoardTheme(themeClass, notify = true) {
  const body = document.getElementById('board-bg');
  body.className = `${themeClass} min-h-screen flex flex-col font-sans select-none text-zinc-900 overflow-hidden antialiased`;
  localStorage.setItem(STORAGE_KEY_THEME, themeClass);
  if (notify) showToast('เปลี่ยนรูปแบบพื้นหลังเรียบร้อย');
}

function resetDemoData() {
  if (!confirm('ต้องการรีเซ็ตข้อมูลตัวอย่างกลับสู่ค่าเริ่มต้นใช่หรือไม่?')) return;
  columns = [...DEFAULT_COLUMNS];
  cards = getInitialDemoCards();
  typoDict = [...DEFAULT_TYPO_DICT];
  teamMembers = [...DEFAULT_TEAM_MEMBERS];
  activeMember = teamMembers[1] || teamMembers[0];
  saveState();
  renderCurrentView();
  updateActiveUserBadge();
  showToast('รีเซ็ตข้อมูลตัวอย่างเรียบร้อยแล้ว');
}

// Utilities
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
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
    el.textContent = `${formatThaiDateTime(now)} น.`;
  };
  tick();
  setInterval(tick, 30000);
}

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateActiveUserBadge();
  renderCurrentView();
  startLiveClock();
  syncFromServerState(true);
  setInterval(() => syncFromServerState(false), 4000);
});
