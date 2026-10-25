import {
  AnalysisOutcomeType,
  AnalysisResult,
  ContextualCounterexampleNote,
  CueCategory,
  MatchedWarningCue,
} from '../types/amanah';

export const MAX_MESSAGE_LENGTH = 5000;
export const MIN_MEANINGFUL_LENGTH = 15;
export const MIN_MEANINGFUL_WORDS = 3;

export interface RuleDefinition {
  cueId: string;
  category: CueCategory;
  categoryLabelId: string;
  categoryLabelEn: string;
  patterns: RegExp[];
  benignExceptionPatterns?: RegExp[];
  inferredConcernId: string;
  inferredConcernEn: string;
  explanationId: string;
  explanationEn: string;
  whyAttentionId: string;
  whyAttentionEn: string;
  limitationId: string;
  limitationEn: string;
  verificationActionId: string;
  verificationActionEn: string;
  relatedChecklistItemId: string;
}

// Patterns that indicate protective / educational / anti-scam negation context
// within an ~85-character window preceding or surrounding a matched span.
const NEGATION_AND_EDUCATIONAL_CONTEXT_PATTERNS: RegExp[] = [
  /\b(jangan\s+pernah|tidak\s+pernah|tak\s+pernah|jangan\s+sampai|hindari|waspada|waspadai|hati-hati\s+terhadap|tips\s+aman|edukasi|imbauan\s+resmi|peringatan\s+keamanan|modus\s+penipuan|ciri\s+penipuan)\b/i,
  /\b(bank\s+tidak\s+meminta|pihak\s+resmi\s+tidak\s+pernah|kami\s+tidak\s+pernah\s+meminta|abaikan\s+jika\s+ada\s+yang\s+meminta)\b/i,
  /\b(never\s+share|do\s+not\s+share|never\s+ask\s+for|beware\s+of|scam\s+alert|official\s+reminder\s+not\s+to)\b/i,
];

// Ordinary academic / workplace / non-transactional reminder exceptions for urgency
const ORDINARY_REMINDER_PATTERNS: RegExp[] = [
  /\b(tugas\s+kuliah|kumpul\s+makalah|portal\s+akademik|jadwal\s+ujian|praktikum|absensi\s+kelas|krs\s+semester|perpustakaan\s+kampus)\b/i,
];

export const CONFIGURED_RULES: RuleDefinition[] = [
  {
    cueId: 'CUE-URGENCY-01',
    category: 'URGENCY',
    categoryLabelId: 'Tekanan Waktu & Urgensi',
    categoryLabelEn: 'Urgency & Time Pressure',
    patterns: [
      /\b(segera\s+dalam\s+\d+\s*(menit|jam)|batas\s+waktu\s+\d+\s*(menit|jam)|dalam\s+waktu\s+\d+\s*(menit|jam)\s+ke\s+depan)/gi,
      /\b(akun\s+(anda\s+)?akan\s+(segera\s+)?(diblokir|dinonaktifkan|dibekukan)(\s+permanen)?|blokir\s+otomatis\s+hari\s+ini)/gi,
      /\b(hangus\s+hari\s+ini|kesempatan\s+terakhir\s+hari\s+ini|konfirmasi\s+sekarang\s+juga\s+sebelum\s+diblokir|wajib\s+diselesaikan\s+detik\s+ini)/gi,
      /\b(act\s+immediately\s+within\s+\d+\s*(minutes|hours)|account\s+will\s+be\s+permanently\s+suspended\s+today)/gi,
    ],
    benignExceptionPatterns: ORDINARY_REMINDER_PATTERNS,
    inferredConcernId:
      'Pesan menggunakan batas waktu sempit atau ancaman pembekuan akun untuk mendorong keputusan tergesa-gesa.',
    inferredConcernEn:
      'The message uses a tight deadline or account suspension threat to pressure a rushed decision.',
    explanationId:
      'Frasa ini menciptakan rasa mendesak atau ketakutan (seperti ancaman pemblokiran akun atau hangusnya klaim dalam hitungan menit/jam) agar penerima segera bertindak tanpa memeriksa kebenaran informasi.',
    explanationEn:
      'This phrase creates artificial urgency or fear (such as sudden account suspension or claim expiration within minutes) so the recipient acts before verifying the claim.',
    whyAttentionId:
      'Tekanan waktu sering digunakan untuk mempersempit ruang berpikir kritis sehingga pengguna melewatkan prosedur verifikasi ke saluran resmi.',
    whyAttentionEn:
      'Time pressure is commonly used to narrow critical thinking so users skip independent verification through official channels.',
    limitationId:
      'Notifikasi sistem yang sah (misalnya masa berlaku kode sesi atau pengingat tagihan jatuh tempo resmi) juga dapat mencantumkan batas waktu. Keberadaan batas waktu saja bukan bukti penipuan.',
    limitationEn:
      'Legitimate system notifications (such as session expiration or genuine billing reminders) may also state deadlines. A time limit alone does not prove fraud.',
    verificationActionId:
      'Berhenti sejenak. Jangan ikuti tautan atau nomor di dalam pesan; periksa status akun Anda langsung melalui aplikasi resmi atau situs web resmi yang Anda ketik sendiri.',
    verificationActionEn:
      'Pause before acting. Do not use the link or phone number in the message; check your account status directly inside the official app or website you navigate to independently.',
    relatedChecklistItemId: 'chk-pause-credentials',
  },
  {
    cueId: 'CUE-ADVANCE-FEE-01',
    category: 'ADVANCE_FEE',
    categoryLabelId: 'Permintaan Biaya di Muka',
    categoryLabelEn: 'Advance Fee or Unexpected Payment Request',
    patterns: [
      /\b(biaya\s+(admin|administrasi|pencairan|aktivasi|verifikasi|pajak\s+hadiah|materai\s+pencairan|jaminan|tebusan)(\s+sebesar)?)/gi,
      /\b(transfer\s+(uang\s+)?(jaminan|deposit|biaya\s+admin|dana\s+aktivasi|dana\s+pancingan)\s*(terlebih\s+dahulu|di\s+awal|sekarang)?)/gi,
      /\b(wajib\s+melakukan\s+top\s*up\s+(deposit|saldo\s+tugas)|setor\s+dana\s+awal\s+untuk\s+mencairkan)/gi,
      /\b(pay\s+an?\s+(advance\s+fee|processing\s+fee|activation\s+deposit|clearance\s+tax)\s+before)/gi,
    ],
    inferredConcernId:
      'Terdapat permintaan pembayaran atau transfer sejumlah dana di awal sebagai syarat pencairan uang, hadiah, atau pembukaan akses.',
    inferredConcernEn:
      'There is a request for an upfront payment or deposit as a condition to release funds, prizes, or account access.',
    explanationId:
      'Pesan meminta penerima mengirimkan uang terlebih dahulu (disebut biaya administrasi, pajak hadiah, deposit tugas, atau biaya aktivasi) dengan janji dana yang lebih besar akan cair setelahnya.',
    explanationEn:
      'The message asks the recipient to send money upfront (labeled as an admin fee, prize tax, task deposit, or activation fee) with the promise of receiving a larger payout afterward.',
    whyAttentionId:
      'Lembaga resmi, pemberi kerja yang sah, dan penyelenggara beasiswa/undian tepercaya umumnya tidak meminta pemenang atau pelamar mentransfer uang pribadi terlebih dahulu untuk mencairkan hak mereka.',
    whyAttentionEn:
      'Reputable institutions, employers, and official programs generally do not ask recipients to transfer personal funds upfront to unlock a payout or job.',
    limitationId:
      'Transaksi komersial biasa memang memiliki biaya layanan atau administrasi resmi, namun biaya tersebut dipotong otomatis di dalam sistem resmi—bukan ditransfer manual ke rekening perorangan.',
    limitationEn:
      'Standard commercial transactions may involve official service fees, but those are deducted transparently inside the platform rather than transferred manually to an individual account.',
    verificationActionId:
      'Konfirmasi kebijakan biaya secara mandiri melalui saluran resmi organisasi yang bersangkutan sebelum melakukan transfer apa pun.',
    verificationActionEn:
      'Confirm fee policies independently via the organization’s official channels before making any transfer.',
    relatedChecklistItemId: 'chk-verify-payment',
  },
  {
    cueId: 'CUE-CREDENTIALS-01',
    category: 'CREDENTIALS',
    categoryLabelId: 'Permintaan OTP, PIN, atau Kredensial',
    categoryLabelEn: 'Request for OTP, PIN, or Credentials',
    patterns: [
      /\b((kirim|kirimkan|sebutkan|berikan|masukkan|ketik|balas|konfirmasi|informasikan)\s+(kode\s+)?(otp|pin|password|kata\s+sandi|cvv|kode\s+rahasia|kode\s+verifikasi(\s+\d+\s*digit)?))/gi,
      /\b(kode\s+(otp|verifikasi|rahasia)\s+yang\s+(baru\s+saja\s+)?(masuk|dikirim)\s+ke\s+(sms|whatsapp|wa|nomor\s+anda)\s+(mohon\s+)?(dikirimkan|disebutkan|diberikan))/gi,
      /\b(share\s+your\s+(otp|pin|password|verification\s+code)|send\s+the\s+6-digit\s+code\s+sent\s+to\s+your\s+phone)/gi,
    ],
    inferredConcernId:
      'Pesan secara eksplisit meminta kode autentikasi rahasia (OTP/PIN/kata sandi) yang seharusnya hanya diketahui oleh pemilik akun.',
    inferredConcernEn:
      'The message explicitly asks for secret authentication credentials (OTP/PIN/password) meant only for the account owner.',
    explanationId:
      'Pesan ini meminta Anda menyerahkan kode OTP (One-Time Password), PIN, CVV, atau kata sandi. Kode tersebut adalah kunci otorisasi transaksi atau pengambilalihan akun.',
    explanationEn:
      'This message asks you to hand over an OTP (One-Time Password), PIN, CVV, or password. These codes act as direct authorization keys for transactions or account login.',
    whyAttentionId:
      'Petugas bank, dompet digital, maupun layanan pelanggan resmi tidak memerlukan kode OTP atau PIN Anda untuk membantu menyelesaikan kendala atau membatalkan transaksi.',
    whyAttentionEn:
      'Official bank staff, e-wallet providers, and customer support never need your OTP or PIN to resolve an issue or cancel a transaction.',
    limitationId:
      'Sistem otomatis yang sah memang mengirimkan SMS berisi kode OTP saat Anda sendiri yang sedang login, tetapi pesan resmi selalu disertai peringatan "JANGAN BERIKAN kode ini kepada siapa pun".',
    limitationEn:
      'Legitimate automated systems do send OTP codes when you initiate a login yourself, but official messages warn you NEVER to share that code with anyone.',
    verificationActionId:
      'Jangan pernah menyebutkan, meneruskan, atau mengetikkan kode OTP, PIN, atau kata sandi kepada pihak mana pun, termasuk yang mengaku sebagai petugas resmi.',
    verificationActionEn:
      'Never share, forward, or type your OTP, PIN, or password to anyone, even someone claiming to be an official representative.',
    relatedChecklistItemId: 'chk-pause-credentials',
  },
  {
    cueId: 'CUE-OFF-PLATFORM-01',
    category: 'OFF_PLATFORM',
    categoryLabelId: 'Pengalihan Transaksi ke Luar Platform Resmi',
    categoryLabelEn: 'Moving Transaction Outside Official Platform',
    patterns: [
      /\b((lanjut|chat|hubungi|transaksi|bayar|transfer)\s+(langsung\s+)?(di\s+luar\s+aplikasi|lewat\s+wa\s+pribadi|tanpa\s+aplikasi|tanpa\s+rekening\s+bersama|tanpa\s+rekber|di\s+luar\s+marketplace))/gi,
      /\b(jangan\s+(checkout|bayar|transaksi)\s+di\s+(aplikasi|marketplace|sistem\s+resmi)|klik\s+link\s+wa\.me\s+untuk\s+pembayaran\s+langsung)/gi,
      /\b(pembayaran\s+langsung\s+ke\s+rekening\s+kurir|selesaikan\s+pesanan\s+di\s+luar\s+sistem\s+toko)/gi,
      /\b(pay\s+directly\s+outside\s+the\s+(app|platform|marketplace)|continue\s+payment\s+on\s+private\s+whatsapp)/gi,
    ],
    inferredConcernId:
      'Pesan mengarahkan pengguna untuk meninggalkan jalur perlindungan transaksi resmi (escrow/marketplace) menuju komunikasi atau transfer pribadi.',
    inferredConcernEn:
      'The message directs the user to leave official platform protections (escrow/marketplace) for private chat or direct transfer.',
    explanationId:
      'Pengirim mengajak Anda menyelesaikan pembayaran atau komunikasi di luar aplikasi resmi (misalnya beralih ke chat pribadi atau transfer langsung tanpa rekening bersama/escrow platform).',
    explanationEn:
      'The sender asks you to complete payment or communication outside the official application (for example, moving to private chat or direct bank transfer bypassing platform escrow).',
    whyAttentionId:
      'Ketika transaksi dilakukan di luar sistem resmi marketplace atau platform layanan, mekanisme garansi uang kembali dan pemantauan sengketa resmi menjadi tidak berlaku.',
    whyAttentionEn:
      'When a transaction moves outside an official marketplace or service platform, built-in buyer protection, escrow, and dispute resolution no longer apply.',
    limitationId:
      'Penjual UMKM lokal atau transaksi COD (Cash on Delivery) yang memang sejak awal tidak menggunakan marketplace dapat berkomunikasi melalui aplikasi pesan, sehingga konteks saluran awal perlu diperhatikan.',
    limitationEn:
      'Direct local sellers not operating on a marketplace naturally use messaging apps, so consider whether the transaction started on an official platform.',
    verificationActionId:
      'Pertahankan seluruh komunikasi dan pembayaran di dalam aplikasi atau situs web resmi tempat transaksi dimulai.',
    verificationActionEn:
      'Keep all communication and payment strictly inside the official app or website where the transaction originated.',
    relatedChecklistItemId: 'chk-official-website',
  },
  {
    cueId: 'CUE-UNUSUAL-PAYMENT-01',
    category: 'UNUSUAL_PAYMENT',
    categoryLabelId: 'Instruksi Pembayaran Tidak Lazim',
    categoryLabelEn: 'Unusual Payment Instruction',
    patterns: [
      /\b(rekening\s+(tujuan\s+)?atas\s+nama\s+pribadi(\s+bendahara|\s+petugas|\s+admin)?|transfer\s+ke\s+rekening\s+perorangan)/gi,
      /\b((scan|pindai)\s+(kode\s+)?qris\s+(ini\s+)?untuk\s+(menerima|mencairkan|klaim)\s+(dana|uang|hadiah|refund|pengembalian))/gi,
      /\b(bayar\s+menggunakan\s+(voucher\s+game|pulsa\s+elektrik|kode\s+gift\s+card)|format\s+virtual\s+account\s+pengembalian\s+dana)/gi,
      /\b(scan\s+this\s+qris\s+to\s+receive\s+(funds|refund|money)|transfer\s+to\s+personal\s+staff\s+account)/gi,
    ],
    inferredConcernId:
      'Metode pembayaran yang diminta menyimpang dari prosedur standar institusi (misalnya klaim pindai QRIS untuk menerima uang, atau rekening pribadi untuk tagihan institusi).',
    inferredConcernEn:
      'The requested payment method deviates from standard institutional practice (e.g., scanning QRIS to receive funds, or paying an institution via a personal bank account).',
    explanationId:
      'Pesan memuat instruksi pembayaran yang tidak lazim, seperti meminta Anda memindai kode QRIS dengan alasan "untuk menerima pencairan dana/refund" (padahal pindai QRIS berfungsi untuk mengirim/membayar dana), atau meminta pembayaran resmi ke rekening atas nama perorangan.',
    explanationEn:
      'The message contains unusual payment instructions, such as asking you to scan a QRIS code "to receive a refund/payout" (scanning QRIS authorizes outgoing payment, not incoming funds), or paying an institutional fee to a personal bank account.',
    whyAttentionId:
      'Ketidaksesuaian antara nama rekening tujuan dan nama institusi resmi, atau penyalahgunaan fungsi QRIS/Virtual Account, sering kali mengindikasikan upaya pengalihan dana.',
    whyAttentionEn:
      'Mismatches between account holder names and official institutions, or misrepresenting how QRIS/Virtual Accounts work, often indicate unauthorized fund redirection.',
    limitationId:
      'Usaha mikro atau penjual perorangan yang sah memang menggunakan rekening atas nama pribadi pemilik usaha; namun mereka tidak mengaku sebagai instansi pemerintah, bank, atau korporasi besar.',
    limitationEn:
      'Legitimate micro-businesses or individual sellers do use personal bank accounts, but they do not claim to represent government agencies, banks, or major corporations.',
    verificationActionId:
      'Periksa kesesuaian nama pemilik rekening tujuan dan pahami fungsi fitur pembayaran sebelum menekan tombol konfirmasi atau memasukkan PIN.',
    verificationActionEn:
      'Verify the recipient account holder name and understand the exact payment mechanism before confirming or entering your PIN.',
    relatedChecklistItemId: 'chk-verify-payment',
  },
  {
    cueId: 'CUE-REWARD-JOB-01',
    category: 'REWARD_JOB',
    categoryLabelId: 'Klaim Hadiah, Undian, atau Tawaran Kerja Instan',
    categoryLabelEn: 'Reward, Prize, or Instant Job Claim',
    patterns: [
      /\b(selamat\s*(!!?)?\s*(nomor|akun|nama)\s+anda\s+(terpilih|beruntung|memenangkan)\s+(hadiah|undian|giveaway|bantuan|dana\s+tunai))/gi,
      /\b(komisi\s+(harian|instan)\s+rp\s*[\d.,]+\s*(ribu|juta)?\s*(per\s+hari|hanya\s+dengan)?|kerja\s+paruh\s+waktu\s+(cukup\s+)?(like\s+dan\s+subscribe|misi\s+harian|rating\s+toko))/gi,
      /\b(lulus\s+seleksi\s+(kerja|rekrutmen)\s+tanpa\s+tes|undangan\s+interview\s+dengan\s+biaya\s+reservasi\s+tiket)/gi,
      /\b(congratulations\s+your\s+(number|account)\s+won\s+a\s+prize|earn\s+instant\s+daily\s+commission\s+by\s+liking)/gi,
    ],
    inferredConcernId:
      'Pesan menawarkan keuntungan finansial tinggi, hadiah undian, atau pekerjaan mudah dengan imbalan tidak proporsional yang memerlukan verifikasi independen.',
    inferredConcernEn:
      'The message offers high financial rewards, lottery prizes, or effortless work with disproportionate returns requiring independent verification.',
    explanationId:
      'Pesan mengklaim bahwa Anda memenangkan hadiah undian, bantuan dana, atau tawaran pekerjaan paruh waktu dengan komisi instan yang sangat besar untuk tugas sederhana (seperti memberikan like/rating atau menyelesaikan misi deposit).',
    explanationEn:
      'The message claims you won a prize, grant, or part-time job offering unusually high instant commissions for trivial tasks (such as liking posts or completing prepaid task missions).',
    whyAttentionId:
      'Janji keuntungan cepat atau hadiah yang tidak pernah diikuti sebelumnya sering digunakan sebagai daya tarik awal sebelum pengirim meminta data pribadi atau deposit berjenjang.',
    whyAttentionEn:
      'Promises of effortless earnings or prizes for contests you never entered are frequently used as initial hooks before requesting personal data or tiered deposits.',
    limitationId:
      'Pengumuman program promosi resmi atau panggilan rekrutmen yang memang pernah Anda lamar secara langsung dapat memiliki kalimat ucapan selamat, namun selalu dapat diverifikasi pada portal resmi penyelenggara.',
    limitationEn:
      'Official promotional announcements or recruitment calls for positions you actually applied to may include congratulatory wording, but can always be verified on the organizer’s official portal.',
    verificationActionId:
      'Cek pengumuman pemenang atau lowongan kerja langsung di situs web resmi dan akun terverifikasi penyelenggara, bukan melalui kontak yang tertera di pesan.',
    verificationActionEn:
      'Check winner announcements or job listings directly on the organizer’s official website and verified channels, not via the contact details inside the message.',
    relatedChecklistItemId: 'chk-official-announcements',
  },
];

/**
 * Helper to check if a matched character span occurs inside an educational or negated context
 */
function checkContextualNegation(
  fullText: string,
  startOffset: number,
  endOffset: number
): string | null {
  const windowStart = Math.max(0, startOffset - 85);
  const windowEnd = Math.min(fullText.length, endOffset + 60);
  const surroundingText = fullText.slice(windowStart, windowEnd);

  for (const negPattern of NEGATION_AND_EDUCATIONAL_CONTEXT_PATTERNS) {
    if (negPattern.test(surroundingText)) {
      return surroundingText.trim();
    }
  }
  return null;
}

/**
 * Helper to check if a matched span belongs to an ordinary academic/benign reminder
 */
function checkBenignException(
  fullText: string,
   rule: RuleDefinition
): boolean {
  if (!rule.benignExceptionPatterns) return false;
  return rule.benignExceptionPatterns.some((pat) => pat.test(fullText));
}

/**
 * Redacts common Indonesian PII patterns locally in the browser before analysis
 */
export function redactSensitiveText(input: string): {
  redactedText: string;
  redactionCount: number;
} {
  let count = 0;
  let text = input;

  // Indonesian phone numbers (+62, 62, 08xx)
  text = text.replace(
    /(\+62|62|0)8[1-9][0-9]{6,10}\b/g,
    () => {
      count++;
      return '[NOMOR-TELEPON-DIHAPUS]';
    }
  );

  // Email addresses
  text = text.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    () => {
      count++;
      return '[EMAIL-DIHAPUS]';
    }
  );

  // Bank account numbers (10 to 16 contiguous digits)
  text = text.replace(/\b\d{10,16}\b/g, () => {
    count++;
    return '[NOMOR-REKENING-DIHAPUS]';
  });

  // Explicit 6-digit OTP codes preceded by OTP/PIN/Kode
  text = text.replace(
    /\b(otp|pin|kode\s+rahasia|kode\s+verifikasi)\s*[:=-]?\s*\d{4,6}\b/gi,
    (match) => {
      count++;
      const prefix = match.split(/[:=-\s]+/)[0];
      return `${prefix}: [KODE-RAHASIA-DIHAPUS]`;
    }
  );

  return { redactedText: text, redactionCount: count };
}

/**
 * Deterministic, transparent baseline text analyzer
 */
export function analyzeMessageText(rawInput: string): AnalysisResult {
  const timestamp = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const id = `anl-${Date.now()}`;
  const trimmed = rawInput.trim();
  const characterCount = rawInput.length;
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  // Outcome D: Invalid input (empty or exceeds 5,000 characters)
  if (trimmed.length === 0) {
    return {
      id,
      timestamp,
      rawText: rawInput,
      characterCount,
      wordCount: 0,
      outcome: AnalysisOutcomeType.OUTCOME_D_INVALID_INPUT,
      validationMessageId:
        'Pesan masih kosong. Silakan tempel atau ketik teks pesan transaksi yang ingin Anda periksa (maksimal 5.000 karakter).',
      validationMessageEn:
        'The message input is empty. Please paste or type the transaction message you want to inspect (up to 5,000 characters).',
      summaryTitleId: 'Masukan Tidak Valid: Teks Kosong',
      summaryTitleEn: 'Invalid Input: Empty Message',
      summaryBodyId:
        'Tidak ada teks yang dapat dianalisis. Masukkan isi pesan setelah menghapus informasi pribadi sensitif.',
      summaryBodyEn:
        'There is no text to analyze. Please enter a message after removing sensitive personal information.',
      matchedCues: [],
      contextualNotes: [],
      distinctCategoryCount: 0,
    };
  }

  if (characterCount > MAX_MESSAGE_LENGTH) {
    return {
      id,
      timestamp,
      rawText: rawInput,
      characterCount,
      wordCount,
      outcome: AnalysisOutcomeType.OUTCOME_D_INVALID_INPUT,
      validationMessageId: `Panjang pesan (${characterCount.toLocaleString('id-ID')} karakter) melebihi batas maksimum sementara yaitu ${MAX_MESSAGE_LENGTH.toLocaleString('id-ID')} karakter. Silakan pangkas teks Anda.`,
      validationMessageEn: `Message length (${characterCount.toLocaleString('en-US')} characters) exceeds the provisional maximum of ${MAX_MESSAGE_LENGTH.toLocaleString('en-US')} characters. Please shorten the text.`,
      summaryTitleId: 'Masukan Tidak Valid: Melebihi Batas 5.000 Karakter',
      summaryTitleEn: 'Invalid Input: Exceeds 5,000 Character Limit',
      summaryBodyId:
        'Silakan kurangi panjang pesan agar dapat diproses secara akurat oleh mesin aturan lokal.',
      summaryBodyEn:
        'Please shorten the message so it can be processed accurately by the local rule engine.',
      matchedCues: [],
      contextualNotes: [],
      distinctCategoryCount: 0,
    };
  }

  // Check if message has sufficient linguistic substance for Outcome C
  const alphaCharacters = (trimmed.match(/[a-zA-Z]/g) || []).length;
  if (
    trimmed.length < MIN_MEANINGFUL_LENGTH ||
    wordCount < MIN_MEANINGFUL_WORDS ||
    alphaCharacters < 8
  ) {
    return {
      id,
      timestamp,
      rawText: rawInput,
      characterCount,
      wordCount,
      outcome: AnalysisOutcomeType.OUTCOME_C_INSUFFICIENT_INFO,
      summaryTitleId: 'Informasi Tidak Mencukupi untuk Penilaian Berbasis Teks',
      summaryTitleEn: 'Insufficient Information for Text-Based Assessment',
      summaryBodyId:
        'Teks yang dimasukkan terlalu singkat atau minim konteks kalimat (kurang dari 3 kata bermakna atau hanya berisi angka/tautan tunggal) sehingga sistem tidak dapat mengevaluasi pola komunikasi secara memadai. Anda tetap disarankan melakukan verifikasi mandiri melalui saluran resmi.',
      summaryBodyEn:
        'The submitted text is too brief or lacks sentence context (fewer than 3 meaningful words or only numbers/single link) to support a useful heuristic assessment. You should still verify the sender and request independently through official channels.',
      matchedCues: [],
      contextualNotes: [],
      distinctCategoryCount: 0,
    };
  }

  // Evaluate deterministic rules with exact character offsets
  const matchedCues: MatchedWarningCue[] = [];
  const contextualNotes: ContextualCounterexampleNote[] = [];

  for (const rule of CONFIGURED_RULES) {
    // Check if the entire message is an ordinary academic/campus reminder for urgency rules
    if (checkBenignException(rawInput, rule)) {
      contextualNotes.push({
        cueId: rule.cueId,
        matchedText: 'Konteks Pengingat Akademik / Umum',
        contextWindow: rawInput.slice(0, 120),
        reasonId:
          'Pesan dikenali mengandung konteks pengingat akademik/perkuliahan biasa, sehingga batas waktu tidak ditandai sebagai urgensi transaksi.',
        reasonEn:
          'The message was recognized as an ordinary academic/class reminder, so the deadline was not flagged as transactional urgency.',
      });
      continue;
    }

    for (const pattern of rule.patterns) {
      const regex = new RegExp(pattern.source, pattern.flags);
      let match: RegExpExecArray | null;

      while ((match = regex.exec(rawInput)) !== null) {
        const matchedText = match[0];
        const startOffset = match.index;
        const endOffset = startOffset + matchedText.length;

        // Avoid duplicate overlapping spans for the same category
        const isOverlappingSameCategory = matchedCues.some(
          (existing) =>
            existing.category === rule.category &&
            Math.max(existing.startOffset, startOffset) <
              Math.min(existing.endOffset, endOffset)
        );
        if (isOverlappingSameCategory) {
          continue;
        }

        // Check contextual negation / anti-scam educational reminder
        const negatedContext = checkContextualNegation(
          rawInput,
          startOffset,
          endOffset
        );
        if (negatedContext) {
          contextualNotes.push({
            cueId: rule.cueId,
            matchedText,
            contextWindow: negatedContext,
            reasonId: `Frasa "${matchedText}" ditemukan di dalam konteks negasi atau imbauan edukasi keamanan ("...${negatedContext}..."), sehingga tidak dihitung sebagai tanda peringatan aktif.`,
            reasonEn: `The phrase "${matchedText}" appeared within a negated or security-education context ("...${negatedContext}..."), so it was not counted as an active warning cue.`,
          });
          continue;
        }

        matchedCues.push({
          id: `${rule.cueId}-${startOffset}-${endOffset}`,
          cueId: rule.cueId,
          category: rule.category,
          categoryLabelId: rule.categoryLabelId,
          categoryLabelEn: rule.categoryLabelEn,
          matchedText,
          startOffset,
          endOffset,
          observedSummaryId: `Ditemukan teks "${matchedText}" pada indeks karakter ${startOffset}–${endOffset}.`,
          observedSummaryEn: `Observed text "${matchedText}" at character offset ${startOffset}–${endOffset}.`,
          inferredConcernId: rule.inferredConcernId,
          inferredConcernEn: rule.inferredConcernEn,
          explanationId: rule.explanationId,
          explanationEn: rule.explanationEn,
          whyAttentionId: rule.whyAttentionId,
          whyAttentionEn: rule.whyAttentionEn,
          limitationId: rule.limitationId,
          limitationEn: rule.limitationEn,
          verificationActionId: rule.verificationActionId,
          verificationActionEn: rule.verificationActionEn,
          relatedChecklistItemId: rule.relatedChecklistItemId,
        });
      }
    }
  }

  // Sort matched cues by startOffset ascending
  matchedCues.sort((a, b) => a.startOffset - b.startOffset);

  // Check for suspicious combination of multiple distinct warning cue categories
  const distinctCategories = Array.from(
    new Set(matchedCues.map((c) => c.category))
  );

  if (distinctCategories.length >= 2 && matchedCues.length >= 2) {
    const firstCue = matchedCues[0];
    const secondCue = matchedCues.find((c) => c.category !== firstCue.category) || matchedCues[1];
    const catLabelsId = distinctCategories
      .map(
        (cat) =>
          matchedCues.find((c) => c.category === cat)?.categoryLabelId || cat
      )
      .join(' + ');
    const catLabelsEn = distinctCategories
      .map(
        (cat) =>
          matchedCues.find((c) => c.category === cat)?.categoryLabelEn || cat
      )
      .join(' + ');

    matchedCues.push({
      id: `CUE-COMBINATION-01-${firstCue.startOffset}`,
      cueId: 'CUE-COMBINATION-01',
      category: 'COMBINATION',
      categoryLabelId: 'Kombinasi Beberapa Indikator Peringatan',
      categoryLabelEn: 'Combination of Multiple Warning Indicators',
      matchedText: `${firstCue.matchedText} ... ${secondCue.matchedText}`,
      startOffset: firstCue.startOffset,
      endOffset: firstCue.endOffset,
      observedSummaryId: `Kemunculan bersamaan ${distinctCategories.length} kategori indikator berbeda dalam satu pesan (${catLabelsId}).`,
      observedSummaryEn: `Co-occurrence of ${distinctCategories.length} distinct indicator categories in a single message (${catLabelsEn}).`,
      inferredConcernId:
        'Penggabungan beberapa taktik sekaligus (misalnya tekanan waktu ditambah permintaan biaya atau kredensial) meningkatkan kebutuhan akan verifikasi independen.',
      inferredConcernEn:
        'Combining multiple tactics at once (such as time pressure paired with a fee or credential request) heightens the need for independent verification.',
      explanationId:
        'Pesan ini menggabungkan lebih dari satu jenis tanda peringatan. Dalam komunikasi manipulatif, klaim hadiah atau ancaman pemblokiran sering dipadukan dengan batas waktu sempit dan instruksi transfer/OTP agar penerima tidak sempat melakukan pengecekan silang.',
      explanationEn:
        'This message combines more than one category of warning indicator. Manipulative messages frequently pair prize claims or account threats with tight deadlines and payment/OTP requests to discourage cross-checking.',
      whyAttentionId:
        'Kombinasi beberapa indikator sekaligus merupakan sinyal kuat untuk menghentikan interaksi sementara dan melakukan verifikasi di luar jalur komunikasi pesan tersebut.',
      whyAttentionEn:
        'The co-occurrence of multiple indicators is a strong prompt to pause interaction and verify entirely outside the communication channel of the message.',
      limitationId:
        'Mesin aturan ini tetap hanya mengevaluasi pola teks dan tidak dapat memastikan niat pengirim maupun keaslian organisasi secara otomatis.',
      limitationEn:
        'This rule engine still only evaluates text patterns and cannot automatically confirm sender intent or organizational authenticity.',
      verificationActionId:
        'Gunakan Daftar Periksa Verifikasi secara menyeluruh: cari situs resmi secara mandiri, hubungi kontak resmi, dan tunda pengiriman uang atau data rahasia.',
      verificationActionEn:
        'Use the full Verification Checklist: locate the official website independently, contact official support, and pause before sending money or credentials.',
      relatedChecklistItemId: 'chk-confirm-identity',
    });
  }

  // Outcome A: Warning cues found
  if (matchedCues.length > 0) {
    return {
      id,
      timestamp,
      rawText: rawInput,
      characterCount,
      wordCount,
      outcome: AnalysisOutcomeType.OUTCOME_A_CUES_FOUND,
      summaryTitleId: `Ditemukan ${matchedCues.length} Tanda Peringatan (${distinctCategories.length} Kategori Aturan)`,
      summaryTitleEn: `Found ${matchedCues.length} Warning Cues (${distinctCategories.length} Rule Categories)`,
      summaryBodyId:
        'Mesin aturan deterministik mengidentifikasi bagian teks yang mengandung pola peringatan transaksi. Indikator ini adalah heuristik awal untuk membantu Anda memeriksa lebih teliti—bukan vonis otomatis bahwa pesan ini pasti penipuan. Tinjau bukti teks dan lakukan langkah verifikasi mandiri di bawah ini.',
      summaryBodyEn:
        'The deterministic rule engine identified text spans matching configured transactional warning cues. These indicators are preliminary heuristics to support careful inspection—not a definitive verdict of fraud. Review the highlighted evidence and complete the independent verification steps below.',
      matchedCues,
      contextualNotes,
      distinctCategoryCount: distinctCategories.length,
    };
  }

  // Outcome B: No configured warning cues found
  return {
    id,
    timestamp,
    rawText: rawInput,
    characterCount,
    wordCount,
    outcome: AnalysisOutcomeType.OUTCOME_B_NO_CUES,
    summaryTitleId: 'Tidak Ditemukan Tanda Peringatan Terkonfigurasi',
    summaryTitleEn: 'No Configured Warning Cues Identified',
    summaryBodyId:
      'Aturan deterministik saat ini tidak menemukan pola kata kunci peringatan yang terkonfigurasi di dalam teks ini. PENTING: Hasil ini TIDAK berarti pesan, pengirim, tautan situs web, atau transaksi tersebut dijamin aman. Pesan manipulatif dapat ditulis dengan bahasa formal yang tampak wajar.',
    summaryBodyEn:
      'The current deterministic rules did not identify configured warning cues in this text. IMPORTANT: This does NOT mean the message, sender, website link, or transaction is safe. Sophisticated deceptive messages can be written in calm, formal language without obvious trigger phrases.',
    matchedCues: [],
    contextualNotes,
    distinctCategoryCount: 0,
  };
}
