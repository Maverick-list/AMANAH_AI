import {
  ChecklistItem,
  LearningModule,
  SyntheticExample,
} from '../types/amanah';

export const SYNTHETIC_EXAMPLES: SyntheticExample[] = [
  {
    id: 'ex-1-prize-admin',
    labelId: 'Contoh Sintetis 1: Klaim Undian & Biaya Pencairan Mendesak',
    labelEn: 'Synthetic Example 1: Prize Claim & Urgent Release Fee',
    scenarioTagId: 'Multi-Indikator (Outcome A)',
    scenarioTagEn: 'Multi-Cue (Outcome A)',
    expectedOutcomeLabelId: 'Menampilkan 4 tanda peringatan + kombinasi',
    expectedOutcomeLabelEn: 'Triggers 4 warning cues + combination cue',
    text: `[CONTOH SINTETIS EDUKASI]
Selamat! Nomor Anda terpilih memenangkan hadiah dana tunai Rp15.000.000 dari program undian apresiasi pengguna dompet digital tahun ini.
Untuk mencairkan dana ke saldo Anda, wajib melakukan transfer biaya administrasi pencairan sebesar Rp250.000 ke rekening tujuan atas nama pribadi bendahara panitia.
Harap konfirmasi sekarang juga karena batas waktu 15 menit sebelum kuota hadiah Anda hangus hari ini.`,
  },
  {
    id: 'ex-2-otp-offplatform',
    labelId: 'Contoh Sintetis 2: Permintaan OTP & Pengalihan ke Luar Aplikasi',
    labelEn: 'Synthetic Example 2: OTP Request & Off-Platform Redirection',
    scenarioTagId: 'Kredensial & Luar Platform (Outcome A)',
    scenarioTagEn: 'Credentials & Off-Platform (Outcome A)',
    expectedOutcomeLabelId: 'Menampilkan peringatan OTP, urgensi & luar aplikasi',
    expectedOutcomeLabelEn: 'Triggers OTP, urgency & off-platform cues',
    text: `[CONTOH SINTETIS EDUKASI]
Halo Kak, pesanan laptop di toko kami mengalami kendala sinkronisasi sistem. Agar akun Anda tidak diblokir otomatis hari ini, mohon segera sebutkan kode OTP 6 digit yang baru saja masuk ke SMS Anda.
Untuk mempercepat proses pengembalian dana, silakan lanjut di luar aplikasi lewat WA pribadi admin dan scan kode QRIS ini untuk menerima refund Anda.`,
  },
  {
    id: 'ex-3-parttime-job',
    labelId: 'Contoh Sintetis 3: Tawaran Kerja Paruh Waktu & Deposit Misi',
    labelEn: 'Synthetic Example 3: Part-Time Job Offer & Task Deposit',
    scenarioTagId: 'Kerja Instan & Deposit (Outcome A)',
    scenarioTagEn: 'Instant Job & Deposit (Outcome A)',
    expectedOutcomeLabelId: 'Menampilkan peringatan kerja instan & biaya di muka',
    expectedOutcomeLabelEn: 'Triggers job reward & advance fee cues',
    text: `[CONTOH SINTETIS EDUKASI]
Lowongan mahasiswa kerja paruh waktu cukup like dan subscribe toko mitra! Dapatkan komisi harian Rp500.000 per hari langsung cair.
Untuk membuka tugas VIP ke-3, peserta wajib melakukan top up deposit aktivasi terlebih dahulu ke rekening perorangan mentor dalam waktu 10 menit ke depan.`,
  },
  {
    id: 'ex-4-counterexample-negation',
    labelId: 'Contoh Sintetis 4: Imbauan Keamanan Resmi (Uji Negasi Kontekstual)',
    labelEn: 'Synthetic Example 4: Official Security Reminder (Contextual Negation Test)',
    scenarioTagId: 'Edukasi / Negasi (Outcome B)',
    scenarioTagEn: 'Educational / Negation (Outcome B)',
    expectedOutcomeLabelId: 'Mengenali konteks negasi tanpa alarm palsu',
    expectedOutcomeLabelEn: 'Recognizes negated context without false alarm',
    text: `[CONTOH SINTETIS EDUKASI — IMBAUAN KEAMANAN]
Peringatan keamanan resmi bagi mahasiswa: Jangan pernah berikan kode OTP, PIN, atau kata sandi kepada siapa pun. Pihak bank tidak pernah meminta biaya administrasi pencairan hadiah maupun mengajak transaksi di luar aplikasi resmi.`,
  },
  {
    id: 'ex-5-insufficient',
    labelId: 'Contoh Sintetis 5: Pesan Terlalu Singkat / Minim Konteks',
    labelEn: 'Synthetic Example 5: Too Brief / Insufficient Context',
    scenarioTagId: 'Minim Informasi (Outcome C)',
    scenarioTagEn: 'Insufficient Info (Outcome C)',
    expectedOutcomeLabelId: 'Menghasilkan status Informasi Tidak Mencukupi',
    expectedOutcomeLabelEn: 'Produces Insufficient Information outcome',
    text: `Cek ini kak`,
  },
];

export const VERIFICATION_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-official-website',
    titleId: '1. Cari situs web atau aplikasi resmi organisasi secara mandiri',
    titleEn: '1. Locate the organization’s official website or app independently',
    descriptionId:
      'Jangan mengeklik tautan yang dikirim di dalam pesan. Buka peramban (browser) baru dan ketik sendiri alamat situs resmi atau buka aplikasi resmi yang sudah terpasang di perangkat Anda.',
    descriptionEn:
      'Do not click links embedded in the suspicious message. Open a fresh browser tab and type the official domain yourself, or open the official mobile app directly.',
    howToStepsId: [
      'Tutup sementara ruang obrolan pesan yang mencurigakan.',
      'Buka aplikasi resmi (marketplace, mobile banking, atau portal kampus) langsung dari menu ponsel Anda.',
      'Periksa apakah ada notifikasi transaksi atau pengumuman yang sama di kotak masuk resmi di dalam aplikasi.',
    ],
    howToStepsEn: [
      'Temporarily step away from the suspicious chat window.',
      'Open the official app (marketplace, banking app, or campus portal) directly from your device home screen.',
      'Check whether the same notification or transaction appears inside the official in-app inbox.',
    ],
    cautionNoteId:
      'Nama tampilan pengirim atau tampilan situs tiruan dapat dibuat mirip dengan aslinya.',
    cautionNoteEn:
      'Sender display names and lookalike domains can easily imitate official branding.',
  },
  {
    id: 'chk-official-contact',
    titleId: '2. Hubungi organisasi melalui kontak resmi yang diperoleh secara mandiri',
    titleEn: '2. Contact the organization using an independently obtained official contact',
    descriptionId:
      'Gunakan nomor layanan pelanggan, pusat bantuan, atau akun resmi yang tercantum di situs web resmi atau bagian belakang kartu ATM/identitas resmi—bukan nomor telepon/WhatsApp yang diberikan di dalam pesan.',
    descriptionEn:
      'Use customer support numbers, help centers, or verified accounts listed on the official website or the back of your official card—never the phone/WhatsApp number supplied inside the message.',
    howToStepsId: [
      'Cari halaman "Hubungi Kami" atau "Pusat Bantuan" pada situs web resmi institusi.',
      'Bandingkan nomor pengirim pesan dengan daftar saluran komunikasi resmi milik institusi tersebut.',
      'Tanyakan langsung kepada layanan pelanggan resmi apakah benar ada pengiriman pesan tersebut.',
    ],
    howToStepsEn: [
      'Locate the "Contact Us" or "Help Center" page on the institution’s official website.',
      'Compare the message sender’s number against the institution’s published official channels.',
      'Ask official customer support directly whether the message was genuinely issued by them.',
    ],
    cautionNoteId:
      'AMANAH AI tidak mencari kontak eksternal secara otomatis; pastikan Anda mengambil kontak dari sumber primer.',
    cautionNoteEn:
      'AMANAH AI does not look up external contacts automatically; always retrieve contacts from primary official sources.',
  },
  {
    id: 'chk-confirm-identity',
    titleId: '3. Konfirmasi identitas pengirim dan tujuan permintaan secara terpisah',
    titleEn: '3. Confirm the identity and purpose of the request separately',
    descriptionId:
      'Jika pesan mengaku berasal dari teman, dosen, staf kampus, atau kurir, lakukan konfirmasi melalui saluran komunikasi lain yang sudah Anda kenal sebelumnya (misalnya menelepon langsung nomor lama yang tersimpan).',
    descriptionEn:
      'If the message claims to be from a friend, lecturer, campus staff member, or courier, confirm via a separate communication channel you already know and trust.',
    howToStepsId: [
      'Periksa apakah nomor pengirim merupakan nomor baru yang belum pernah berinteraksi dengan Anda.',
      'Hubungi orang atau unit terkait melalui saluran berbeda (misalnya telepon suara ke nomor yang sudah tersimpan lama atau bertanya di grup resmi kelas/himpunan).',
      'Pastikan alasan permintaan uang atau data masuk akal dan sesuai prosedur resmi.',
    ],
    howToStepsEn: [
      'Check whether the sender is messaging from an unfamiliar number.',
      'Reach out to the person or department via a separate trusted channel (such as calling a previously saved number).',
      'Verify that the stated reason for requesting funds or information follows standard procedures.',
    ],
    cautionNoteId:
      'Akun pesan instan milik rekan atau kenalan dapat saja sedang diambil alih oleh pihak lain.',
    cautionNoteEn:
      'A acquaintance’s messaging account could potentially be compromised or impersonated.',
  },
  {
    id: 'chk-verify-payment',
    titleId: '4. Verifikasi instruksi pembayaran melalui jalur independen',
    titleEn: '4. Verify payment instructions through an independent channel',
    descriptionId:
      'Periksa nama pemilik rekening tujuan, jenis metode pembayaran, dan pahami fungsi fitur (seperti QRIS atau Virtual Account) sebelum menyetujui transaksi.',
    descriptionEn:
      'Check the recipient account holder name, payment method, and exact feature behavior (such as QRIS or Virtual Account) before authorizing any transfer.',
    howToStepsId: [
      'Perhatikan nama pemilik rekening yang muncul di layar konfirmasi transfer: apakah atas nama institusi resmi atau nama perorangan?',
      'Ingat bahwa memindai kode QRIS dan memasukkan PIN adalah untuk MEMBAYAR (mengeluarkan uang), bukan untuk menerima hadiah atau pengembalian dana.',
      'Jangan melakukan pembayaran di luar sistem rekening bersama (escrow) marketplace.',
    ],
    howToStepsEn: [
      'Inspect the recipient name shown on the transfer confirmation screen: is it an official corporate account or an individual’s personal name?',
      'Remember that scanning a QRIS code and entering your PIN authorizes an OUTGOING payment, never an incoming refund or payout.',
      'Do not send payments outside a marketplace’s official escrow checkout.',
    ],
    cautionNoteId:
      'Transfer antarbank atau saldo digital yang sudah diotorisasi pengguna umumnya tidak dapat dibatalkan secara instan.',
    cautionNoteEn:
      'User-authorized bank transfers or e-wallet payments generally cannot be reversed instantaneously.',
  },
  {
    id: 'chk-official-announcements',
    titleId: '5. Tinjau pengumuman resmi atau panduan pelaporan yang relevan',
    titleEn: '5. Review relevant official announcements or reporting guidance',
    descriptionId:
      'Periksa apakah klaim undian, beasiswa, lowongan kerja, atau perubahan kebijakan akun memang diumumkan secara terbuka di kanal resmi penyelenggara.',
    descriptionEn:
      'Check whether the claimed giveaway, scholarship, job opening, or policy update is publicly announced on the organizer’s official channels.',
    howToStepsId: [
      'Cek halaman pengumuman resmi kampus, perusahaan, atau platform terkait untuk melihat daftar program yang sedang berjalan.',
      'Periksa apakah pola pesan tersebut pernah diperingatkan sebagai modus penipuan pada halaman edukasi keamanan layanan terkait.',
      'Jika menemukan indikasi penyalahgunaan merek, catat informasi untuk dilaporkan ke saluran pengaduan resmi milik institusi tersebut.',
    ],
    howToStepsEn: [
      'Check the official announcement board of the university, company, or platform for active programs.',
      'See if the message pattern matches known security advisories published by the service provider.',
      'If you suspect brand impersonation, note the details for reporting through the institution’s official complaint channel.',
    ],
    cautionNoteId:
      'Program resmi selalu memiliki jejak informasi yang konsisten di kanal publik penyelenggara.',
    cautionNoteEn:
      'Legitimate programs maintain consistent public documentation on the organizer’s official channels.',
  },
  {
    id: 'chk-pause-credentials',
    titleId: '6. Berhenti sejenak sebelum membagikan kredensial atau mengirim uang',
    titleEn: '6. Pause before sharing credentials or sending money',
    descriptionId:
      'Ambil jeda waktu minimal beberapa menit untuk meredakan tekanan urgensi. Jangan pernah membagikan kode OTP, PIN, CVV, atau kata sandi dalam kondisi apa pun.',
    descriptionEn:
      'Take a deliberate pause of several minutes to step out of urgency pressure. Never share OTP codes, PINs, CVVs, or passwords under any circumstances.',
    howToStepsId: [
      'Tarik napas dan jangan terpengaruh hitung mundur atau ancaman pemblokiran di dalam pesan.',
      'Pastikan tidak ada kode OTP, PIN, atau password yang Anda ketik atau teruskan ke lawan bicara.',
      'Diskusikan pesan tersebut dengan teman, keluarga, atau rekan tepercaya sebelum mengambil keputusan finansial.',
    ],
    howToStepsEn: [
      'Step back and refuse to be rushed by countdowns or suspension threats in the message.',
      'Ensure you never type, read aloud, or forward any OTP, PIN, or password to the sender.',
      'Discuss the message with a trusted peer or family member before making any financial decision.',
    ],
    cautionNoteId:
      'Menyelesaikan seluruh daftar periksa ini membantu pengambilan keputusan yang lebih hati-hati, namun tidak menggantikan kewaspadaan berkelanjutan.',
    cautionNoteEn:
      'Completing every item on this checklist supports safer decision-making, though it does not guarantee absolute transaction safety.',
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod-1-urgency',
    number: 'MODUL 01',
    titleId: 'Mengenali Taktik Urgensi dan Tekanan Psikologis',
    titleEn: 'Recognizing Urgency and Pressure Tactics',
    subtitleId:
      'Mengapa pesan manipulatif selalu menuntut tindakan dalam hitungan menit dan cara memutus respons panik.',
    subtitleEn:
      'Why deceptive messages demand action within minutes and how to break panic responses.',
    readingTimeMinutes: 4,
    explanationId: [
      'Salah satu pola paling umum dalam pesan transaksi mencurigakan adalah penciptaan kondisi darurat buatan. Pengirim menggunakan ancaman seperti "akun Anda akan diblokir permanen hari ini" atau "hadiah hangus dalam 15 menit" untuk memicu kepanikan atau rasa takut kehilangan kesempatan (FOMO).',
      'Secara psikologis, ketika seseorang merasa terdesak oleh waktu, perhatian mereka menyempit hanya pada instruksi yang diberikan di dalam pesan. Akibatnya, langkah sederhana seperti memeriksa alamat pengirim atau membuka aplikasi resmi sering terlewatkan.',
      'Mengenali kalimat bernada mendesak sebagai sinyal untuk justru BERHENTI SEJENAK adalah pertahanan pertama yang sangat efektif bagi konsumen digital.',
    ],
    explanationEn: [
      'One of the most common patterns in suspicious transaction messages is manufactured urgency. Senders use threats such as "your account will be permanently blocked today" or "prize expires in 15 minutes" to trigger panic or fear of missing out.',
      'Psychologically, intense time pressure narrows focus onto the immediate instructions inside the message, causing users to skip basic checks like verifying the sender or opening the official app.',
      'Treating high-pressure deadlines as a cue to PAUSE rather than rush is an essential habit for digital consumers.',
    ],
    syntheticExample: {
      contextId: 'Contoh Sintetis (Bukan Laporan Insiden Nyata):',
      contextEn: 'Synthetic Educational Example (Not a Real Incident Report):',
      messageText:
        '[CONTOH SINTETIS] PERINGATAN SISTEM: Terdeteksi aktivitas tidak wajar pada dompet digital Anda. Konfirmasi sekarang juga sebelum diblokir permanen dalam waktu 10 menit ke depan melalui tautan pemulihan berikut.',
      analysisNoteId:
        'Perhatikan frasa "sebelum diblokir permanen dalam waktu 10 menit ke depan". Frasa ini dirancang agar penerima langsung mengeklik tautan tanpa membuka aplikasi dompet digital resmi mereka terlebih dahulu.',
      analysisNoteEn:
        'Notice the phrase demanding confirmation within 10 minutes before permanent suspension. It is designed to push the recipient into clicking the link instead of checking their official wallet app directly.',
    },
    keyLessonsId: [
      'Tekanan waktu yang ekstrem adalah sinyal untuk memperlambat tindakan, bukan mempercepatnya.',
      'Lembaga keuangan resmi menyediakan jalur pemeriksaan status akun langsung di dalam aplikasi resmi mereka.',
      'Namun ingat: pesan pengingat yang sah (seperti masa berlaku OTP 2 menit saat Anda sendiri yang login) juga mencantumkan waktu—sehingga konteks tindakan Anda sendiri harus diperhitungkan.',
    ],
    keyLessonsEn: [
      'Extreme time pressure is a signal to slow down, not speed up.',
      'Official financial institutions allow you to verify account status directly inside their official application.',
      'Remember that legitimate notifications (like a 2-minute OTP window when you initiate a login) also mention time—so always consider whether you initiated the action.',
    ],
    quiz: [
      {
        id: 'q-mod1-1',
        questionId:
          'Anda menerima pesan bahwa akun bank Anda akan dibekukan dalam 15 menit kecuali Anda mengisi formulir melalui tautan di pesan tersebut. Apa langkah paling tepat?',
        questionEn:
          'You receive a message stating your bank account will be frozen in 15 minutes unless you fill out a form via the link in the message. What is the best action?',
        options: [
          {
            id: 'a',
            textId: 'Segera mengeklik tautan agar akun tidak sempat dibekukan.',
            textEn: 'Click the link immediately before the 15-minute deadline expires.',
          },
          {
            id: 'b',
            textId: 'Berhenti sejenak, abaikan tautan di pesan, dan periksa status akun melalui aplikasi resmi atau kontak resmi bank yang dicari secara mandiri.',
            textEn: 'Pause, ignore the link in the message, and check your account status via the official banking app or independently obtained official support.',
          },
          {
            id: 'c',
            textId: 'Membalas pesan tersebut dengan mengirimkan foto kartu identitas untuk membuktikan kepemilikan akun.',
            textEn: 'Reply to the message with a photo of your ID card to prove account ownership.',
          },
        ],
        correctOptionId: 'b',
        feedbackCorrectId:
          'Tepat! Mengambil jeda dan memeriksa langsung melalui aplikasi resmi atau kontak resmi yang Anda cari sendiri menghindarkan Anda dari jebakan urgensi buatan.',
        feedbackCorrectEn:
          'Correct! Pausing and checking directly through the official app or independently sourced official support protects you from manufactured urgency.',
        feedbackIncorrectId:
          'Kurang tepat. Mengikuti tautan atau membalas pesan saat terdesak waktu justru berisiko menyerahkan data ke pihak yang tidak terverifikasi. Selalu cek mandiri lewat aplikasi resmi.',
        feedbackIncorrectEn:
          'Not quite. Clicking links or replying with personal data under time pressure risks exposing your information to an unverified party. Always check independently via the official app.',
      },
    ],
  },
  {
    id: 'mod-2-advance-fee',
    number: 'MODUL 02',
    titleId: 'Memahami Permintaan Pembayaran di Muka yang Mencurigakan',
    titleEn: 'Understanding Suspicious Advance-Payment Requests',
    subtitleId:
      'Mengenali pola biaya admin pencairan, pajak hadiah manual, dan deposit pembuka akses.',
    subtitleEn:
      'Recognizing upfront release fees, manual prize taxes, and access-unlock deposits.',
    readingTimeMinutes: 4,
    explanationId: [
      'Permintaan pembayaran di muka (advance-fee request) terjadi ketika pengirim menjanjikan pencairan dana besar, hadiah undian, beasiswa, atau pengembalian dana, namun mengharuskan Anda mentransfer sejumlah uang terlebih dahulu.',
      'Alasan yang digunakan beragam: "biaya administrasi pencairan", "biaya materai/pajak pemenang", "uang jaminan sementara yang akan dikembalikan", atau "deposit aktivasi akun".',
      'Penting untuk memahami bahwa dalam transaksi resmi, biaya layanan atau pajak yang sah dipotong secara transparan melalui sistem resmi penyelenggara, bukan diminta melalui transfer manual ke rekening perorangan sebelum dana cair.',
    ],
    explanationEn: [
      'An advance-fee request occurs when a sender promises a large payout, prize, scholarship, or refund, but requires you to transfer a smaller sum of money first.',
      'Common pretexts include "disbursement admin fees", "winner tax clearance", "refundable security deposits", or "account activation deposits".',
      'In legitimate institutional programs, applicable fees or taxes are processed transparently through official billing systems rather than manual transfers to personal accounts.',
    ],
    syntheticExample: {
      contextId: 'Contoh Sintetis (Bukan Laporan Insiden Nyata):',
      contextEn: 'Synthetic Educational Example (Not a Real Incident Report):',
      messageText:
        '[CONTOH SINTETIS] Selamat, bantuan beasiswa mahasiswa sebesar Rp8.000.000 telah disetujui. Silakan transfer biaya administrasi pencairan sebesar Rp150.000 ke rekening tujuan atas nama pribadi staf keuangan agar dana langsung cair sore ini.',
      analysisNoteId:
        'Perhatikan adanya syarat "transfer biaya administrasi pencairan" ke "rekening tujuan atas nama pribadi". Ini adalah indikator kuat untuk melakukan verifikasi independen ke bagian kemahasiswaan kampus.',
      analysisNoteEn:
        'Notice the requirement to transfer an upfront "disbursement admin fee" to a "personal account". This is a key indicator to verify independently with your university student affairs office.',
    },
    keyLessonsId: [
      'Waspadai permintaan transfer uang pribadi sebagai syarat untuk menerima hadiah, beasiswa, atau pencairan dana.',
      'Periksa kesesuaian nama pemilik rekening tujuan—institusi resmi tidak menggunakan rekening pribadi staf untuk menampung biaya resmi.',
      'Konfirmasikan langsung ke pengumuman resmi penyelenggara sebelum mengirim dana sepeser pun.',
    ],
    keyLessonsEn: [
      'Be cautious of requests to transfer personal money as a prerequisite to receiving a prize, grant, or payout.',
      'Check the recipient account holder name—official institutions do not use staff personal accounts to collect institutional fees.',
      'Confirm directly against official public announcements before sending any funds.',
    ],
    quiz: [
      {
        id: 'q-mod2-1',
        questionId:
          'Mengapa permintaan "transfer biaya admin Rp150.000 ke rekening pribadi petugas untuk mencairkan hadiah Rp10.000.000" perlu diwaspadai secara serius?',
        questionEn:
          'Why does a request to "transfer a Rp150,000 admin fee to a staff member’s personal account to unlock a Rp10,000,000 prize" deserve serious attention?',
        options: [
          {
            id: 'a',
            textId: 'Karena jumlah biaya adminnya kurang dari 5% nilai hadiah.',
            textEn: 'Because the admin fee is less than 5% of the prize amount.',
          },
          {
            id: 'b',
            textId: 'Karena program resmi umumnya tidak meminta transfer manual di muka ke rekening pribadi untuk mencairkan hak pemenang.',
            textEn: 'Because legitimate programs generally do not require manual upfront transfers to personal accounts to release a prize.',
          },
          {
            id: 'c',
            textId: 'Karena transfer hanya boleh dilakukan pada jam kerja bank.',
            textEn: 'Because transfers are only permitted during standard banking hours.',
          },
        ],
        correctOptionId: 'b',
        feedbackCorrectId:
          'Benar! Permintaan transfer di muka ke rekening perorangan untuk mencairkan dana yang dijanjikan adalah pola utama yang harus diverifikasi secara independen.',
        feedbackCorrectEn:
          'Correct! Requesting upfront transfers to an individual account to unlock promised funds is a classic pattern requiring independent verification.',
        feedbackIncorrectId:
          'Belum tepat. Inti permasalahannya terletak pada permintaan transfer uang di awal ke rekening pribadi sebagai syarat pencairan hadiah.',
        feedbackIncorrectEn:
          'Incorrect. The core concern is the requirement to send upfront money to a personal account as a condition to receive promised funds.',
      },
    ],
  },
  {
    id: 'mod-3-credentials',
    number: 'MODUL 03',
    titleId: 'Melindungi OTP, Kata Sandi, PIN, dan Data Pribadi',
    titleEn: 'Protecting OTPs, Passwords, PINs, and Personal Information',
    subtitleId:
      'Membedakan antara menerima kode OTP saat login mandiri dengan permintaan menyerahkan kode OTP kepada pihak lain.',
    subtitleEn:
      'Distinguishing between receiving an OTP during self-initiated login and being asked to hand over an OTP to someone else.',
    readingTimeMinutes: 4,
    explanationId: [
      'Kode OTP (One-Time Password), PIN transaksi, kode CVV kartu, dan kata sandi adalah kunci otorisasi pribadi. Siapa pun yang memiliki kode tersebut dapat mengakses akun atau menyetujui perpindahan dana atas nama Anda.',
      'Pengirim pesan manipulatif sering menyamar sebagai petugas layanan pelanggan, kurir paket, atau tim keamanan aplikasi yang berdalih perlu "memverifikasi pembatalan transaksi" atau "mensinkronkan ulang akun" dengan meminta Anda menyebutkan kode 6 digit yang masuk ke SMS/WhatsApp.',
      'Perlu dibedakan secara jernih: menerima SMS berisi kode OTP beserta peringatan "Jangan berikan kode ini kepada siapa pun" adalah hal normal saat Anda sendiri sedang masuk ke akun. Yang berbahaya adalah ketika seseorang menghubungi Anda dan meminta Anda menyerahkan kode tersebut.',
    ],
    explanationEn: [
      'OTP (One-Time Password) codes, transaction PINs, card CVVs, and passwords are personal authorization keys. Anyone possessing them can access your account or authorize fund transfers.',
      'Deceptive senders often pose as customer service agents or security staff claiming they need the 6-digit SMS code to "cancel an unauthorized charge" or "resync your account".',
      'Always distinguish context: receiving an automated OTP with a warning "Never share this code" when you log in yourself is normal; someone asking you to tell them that code is a major warning cue.',
    ],
    syntheticExample: {
      contextId: 'Contoh Sintetis (Bukan Laporan Insiden Nyata):',
      contextEn: 'Synthetic Educational Example (Not a Real Incident Report):',
      messageText:
        '[CONTOH SINTETIS] Halo Kak, kami dari bagian kendali mutu aplikasi. Untuk membatalkan tagihan langganan otomatis di akun Kakak, mohon sebutkan kode OTP 6 digit yang baru saja dikirim ke SMS Kakak.',
      analysisNoteId:
        'Permintaan "mohon sebutkan kode OTP 6 digit" dengan alasan membatalkan tagihan adalah sinyal bahaya. Petugas resmi tidak pernah membutuhkan kode OTP pelanggan untuk melakukan pembatalan sistem.',
      analysisNoteEn:
        'Asking you to share a 6-digit OTP under the guise of canceling a subscription charge is a critical warning cue. Official staff never need your OTP.',
    },
    keyLessonsId: [
      'Jangan pernah menyebutkan, mengetikkan di tautan asing, atau meneruskan kode OTP, PIN, CVV, dan kata sandi kepada siapa pun.',
      'Sebelum menganalisis pesan di alat bantu seperti AMANAH AI, selalu hapus nomor telepon, nomor rekening, alamat, dan kode rahasia dari teks.',
      'Pesan edukasi yang berbunyi "Jangan pernah berikan kode OTP Anda" adalah imbauan keamanan yang positif, bukan ancaman.',
    ],
    keyLessonsEn: [
      'Never read aloud, type into unfamiliar links, or forward your OTP, PIN, CVV, or password to anyone.',
      'Before analyzing messages in tools like AMANAH AI, always remove phone numbers, account numbers, addresses, and secret codes.',
      'Educational reminders stating "Never share your OTP" are protective security notices, not active threats.',
    ],
    quiz: [
      {
        id: 'q-mod3-1',
        questionId:
          'Manakah pernyataan yang BENAR mengenai penggunaan kode OTP (One-Time Password)?',
        questionEn:
          'Which statement is TRUE regarding One-Time Password (OTP) codes?',
        options: [
          {
            id: 'a',
            textId: 'Kode OTP boleh diberikan kepada penelepon yang mengaku sebagai petugas resmi bank jika mereka menyebutkan nama lengkap kita.',
            textEn: 'You may share an OTP with a caller claiming to be bank staff if they already know your full name.',
          },
          {
            id: 'b',
            textId: 'Kode OTP bersifat rahasia penuh untuk otorisasi mandiri pengguna dan tidak pernah diminta oleh petugas resmi dalam situasi apa pun.',
            textEn: 'An OTP is strictly confidential for your own authorization and is never requested by official staff under any circumstances.',
          },
          {
            id: 'c',
            textId: 'Kode OTP diperlukan oleh kurir ekspedisi saat mengantar paket reguler ke rumah.',
            textEn: 'An OTP is required by delivery couriers when dropping off standard packages.',
          },
        ],
        correctOptionId: 'b',
        feedbackCorrectId:
          'Sangat tepat! Meskipun seseorang mengetahui nama atau alamat Anda, kode OTP dan PIN tetap rahasia mutlak dan tidak pernah diminta oleh petugas resmi.',
        feedbackCorrectEn:
          'Exactly right! Even if someone knows your name or address, OTPs and PINs remain strictly confidential and are never requested by official staff.',
        feedbackIncorrectId:
          'Kurang tepat. Mengetahui nama lengkap Anda bukan bukti bahwa penelepon berhak meminta kode OTP. Jangan pernah membagikan kode OTP kepada siapa pun.',
        feedbackIncorrectEn:
          'Incorrect. Knowing your name does not authorize anyone to ask for your OTP. Never share an OTP with anyone.',
      },
    ],
  },
  {
    id: 'mod-4-jobs-rewards',
    number: 'MODUL 04',
    titleId: 'Memverifikasi Tawaran Kerja Paruh Waktu dan Hadiah Digital',
    titleEn: 'Verifying Part-Time Job Offers and Digital Rewards',
    subtitleId:
      'Mengevaluasi janji komisi harian instan, tugas isi ulang saldo (top-up), dan klaim undian.',
    subtitleEn:
      'Evaluating instant daily commission promises, prepaid task missions, and prize claims.',
    readingTimeMinutes: 5,
    explanationId: [
      'Mahasiswa dan konsumen muda sering menjadi sasaran tawaran kerja paruh waktu fleksibel (seperti memberi like pada video, memberi ulasan bintang 5, atau menaikkan rating toko online) dengan janji komisi ratusan ribu rupiah per hari.',
      'Pada tahap awal, pengirim terkadang benar-benar mengirimkan imbalan kecil (misalnya Rp20.000) untuk membangun rasa percaya. Namun pada tugas berikutnya, peserta diwajibkan melakukan "top up saldo tugas" atau "deposit paket misi" dengan nilai yang terus membesar.',
      'Demikian pula dengan klaim hadiah atau giveaway: selalu periksa apakah Anda memang pernah mengikuti program tersebut dan apakah pengumumannya tercantum di saluran resmi penyelenggara.',
    ],
    explanationEn: [
      'University students and young consumers are frequently targeted with flexible part-time job offers (such as liking videos or boosting store ratings) promising high daily commissions.',
      'Initially, organizers may even pay out a small reward to build trust before requiring participants to pay increasingly large "task deposits" or "VIP mission top-ups" to unlock their balance.',
      'Similarly, with prize or giveaway claims, always verify whether you actually entered the program and whether the announcement appears on the organizer’s official channels.',
    ],
    syntheticExample: {
      contextId: 'Contoh Sintetis (Bukan Laporan Insiden Nyata):',
      contextEn: 'Synthetic Educational Example (Not a Real Incident Report):',
      messageText:
        '[CONTOH SINTETIS] Selamat bergabung di tim mitra digital! Kerja paruh waktu cukup like dan subscribe akun merchant dengan komisi harian Rp500.000 per hari. Untuk mencairkan komisi grup tugas ke-4, peserta wajib melakukan top up deposit sebesar Rp750.000 terlebih dahulu.',
      analysisNoteId:
        'Kombinasi antara imbalan tidak proporsional ("komisi harian Rp500.000" untuk tugas sederhana) dan kewajiban menyetor uang ("wajib melakukan top up deposit") merupakan tanda peringatan utama.',
      analysisNoteEn:
        'The combination of disproportionate rewards for trivial tasks and a requirement to pay a "top-up deposit" is a primary warning sign.',
    },
    keyLessonsId: [
      'Pekerjaan yang sah membayar Anda atas hasil kerja, bukan meminta Anda menyetorkan deposit berjenjang untuk membuka tugas.',
      'Pencairan komisi kecil di tahap awal tidak menjamin keamanan transaksi deposit bernilai besar berikutnya.',
      'Selalu periksa profil perusahaan, kontrak kerja resmi, dan saluran rekrutmen resmi universitas atau perusahaan.',
    ],
    keyLessonsEn: [
      'Legitimate employment pays you for work performed rather than requiring tiered deposits to unlock tasks.',
      'Receiving a small initial payout does not guarantee that subsequent larger deposit requests are safe.',
      'Always verify company profiles, official contracts, and official university or corporate recruitment portals.',
    ],
    quiz: [
      {
        id: 'q-mod4-1',
        questionId:
          'Dalam sebuah grup tugas paruh waktu online, Anda sudah pernah menerima komisi Rp30.000 di tugas pertama. Pada tugas berikutnya, admin meminta Anda mentransfer deposit Rp500.000 agar bisa menarik komisi Rp650.000. Bagaimana cara menilai situasi ini?',
        questionEn:
          'In an online part-time task group, you received Rp30,000 on your first task. For the next task, the admin asks you to transfer a Rp500,000 deposit to unlock a Rp650,000 commission. How should you evaluate this?',
        options: [
          {
            id: 'a',
            textId: 'Pasti aman karena tugas pertama tadi benar-benar membayar Rp30.000.',
            textEn: 'It is guaranteed safe because the first task genuinely paid Rp30,000.',
          },
          {
            id: 'b',
            textId: 'Permintaan deposit uang pribadi untuk membuka komisi tugas adalah tanda peringatan serius; imbalan awal kecil sering digunakan untuk memancing kepercayaan.',
            textEn: 'Requiring personal money deposits to unlock task commissions is a serious warning sign; small initial payouts are often used to build false trust.',
          },
          {
            id: 'c',
            textId: 'Aman selama transfer dilakukan ke rekening bendahara grup.',
            textEn: 'It is safe as long as the transfer goes to the group treasurer’s personal account.',
          },
        ],
        correctOptionId: 'b',
        feedbackCorrectId:
          'Benar! Pemberian komisi kecil di awal sering digunakan sebagai umpan kepercayaan sebelum meminta deposit yang jauh lebih besar. Hentikan penyetoran dana.',
        feedbackCorrectEn:
          'Correct! Small initial payouts are frequently used as trust bait before requesting much larger deposits. Pause and do not send funds.',
        feedbackIncorrectId:
          'Kurang tepat. Fakta bahwa imbalan kecil pertama dibayarkan tidak membuktikan skema deposit berikutnya aman. Waspadai setiap permintaan setoran dana untuk bekerja.',
        feedbackIncorrectEn:
          'Incorrect. A small initial payout does not prove subsequent deposit requests are safe. Be wary of any job requiring you to deposit money.',
      },
    ],
  },
  {
    id: 'mod-5-identity-claims',
    number: 'MODUL 05',
    titleId: 'Mengidentifikasi Klaim Identitas dan Instruksi Pembayaran Janggal',
    titleEn: 'Identifying Manipulated Identity Claims and Unusual Payment Instructions',
    subtitleId:
      'Memahami penyalahgunaan atribut resmi, nama rekening tujuan, dan fungsi sebenarnya dari fitur QRIS.',
    subtitleEn:
      'Understanding spoofed authority, recipient account names, and how QRIS actually works.',
    readingTimeMinutes: 4,
    explanationId: [
      'Pesan teks maupun profil aplikasi pesan dapat dengan mudah mencantumkan logo institusi, foto berseragam, atau nama "Layanan Bantuan Resmi". Oleh karena itu, tampilan profil atau klaim identitas di dalam teks tidak pernah cukup untuk membuktikan keaslian pengirim.',
      'Selain itu, perhatikan kejanggalan mekanisme pembayaran. Salah satu kesalahpahaman yang sering dimanfaatkan adalah meminta pengguna memindai (scan) kode QRIS lalu memasukkan PIN dengan klaim bahwa tindakan tersebut adalah untuk "menerima pencairan dana atau refund". Padahal, memindai QRIS dan memasukkan PIN adalah proses OTORISASI PEMBAYARAN KELUAR.',
      'Selalu periksa nama pemilik rekening yang tertera pada layar konfirmasi sebelum menekan tombol kirim.',
    ],
    explanationEn: [
      'Messaging profiles and text messages can easily display institutional logos or official-sounding names. Visual branding inside an unverified chat never proves sender authenticity.',
      'Also watch for unusual payment mechanics. A frequent tactic is asking users to scan a QRIS code and enter their PIN under the false claim that it will "receive a refund or prize". In reality, scanning a QRIS code and entering your PIN authorizes an OUTGOING payment from your balance.',
      'Always inspect the recipient account holder name on the confirmation screen before approving any transaction.',
    ],
    syntheticExample: {
      contextId: 'Contoh Sintetis (Bukan Laporan Insiden Nyata):',
      contextEn: 'Synthetic Educational Example (Not a Real Incident Report):',
      messageText:
        '[CONTOH SINTETIS] Halo Kak, untuk proses pengembalian dana pesanan yang batal, silakan lanjut di luar aplikasi dan scan kode QRIS ini untuk menerima dana refund sebesar Rp350.000 langsung ke saldo Kakak.',
      analysisNoteId:
        'Terdapat dua tanda peringatan sekaligus: ajakan "lanjut di luar aplikasi" dan instruksi "scan kode QRIS ini untuk menerima dana refund". Pindai QRIS digunakan untuk membayar, bukan menerima uang.',
      analysisNoteEn:
        'Two warning cues appear together: moving outside the official app and asking you to "scan this QRIS code to receive a refund". Scanning QRIS sends money out rather than receiving it.',
    },
    keyLessonsId: [
      'Logo atau nama profil di aplikasi pesan bukan bukti keaslian institusi.',
      'Memindai kode QRIS dan memasukkan PIN berfungsi untuk mengeluarkan/membayar dana, bukan untuk menerima transfer masuk.',
      'Pertahankan penyelesaian kendala transaksi di dalam pusat resolusi aplikasi resmi.',
    ],
    keyLessonsEn: [
      'Logos or display names on messaging apps do not authenticate an institution.',
      'Scanning a QRIS code and entering your PIN sends money out—it never receives incoming funds.',
      'Keep transaction dispute resolution strictly inside the official app’s resolution center.',
    ],
    quiz: [
      {
        id: 'q-mod5-1',
        questionId:
          'Seorang penjual menghubungi Anda di luar aplikasi marketplace dan mengirimkan gambar kode QRIS, lalu meminta Anda memindainya dan memasukkan PIN agar "uang refund masuk ke saldo Anda". Apa yang sebenarnya terjadi jika Anda melakukannya?',
        questionEn:
          'A seller contacts you outside the marketplace app, sends a QRIS code image, and asks you to scan it and enter your PIN so "your refund will be credited to your balance". What actually happens if you do this?',
        options: [
          {
            id: 'a',
            textId: 'Saldo Anda akan bertambah sesuai nominal refund.',
            textEn: 'Your balance will increase by the refund amount.',
          },
          {
            id: 'b',
            textId: 'Saldo Anda justru akan terpotong (membayar keluar) kepada pihak pembuat QRIS tersebut.',
            textEn: 'Your balance will actually be deducted (an outgoing payment) to the QRIS merchant.',
          },
          {
            id: 'c',
            textId: 'Aplikasi hanya akan menampilkan riwayat transaksi tanpa memindahkan uang.',
            textEn: 'The app will only display transaction history without moving funds.',
          },
        ],
        correctOptionId: 'b',
        feedbackCorrectId:
          'Benar! Memindai QRIS dan memasukkan PIN adalah otorisasi pembayaran keluar. Pengembalian dana (refund) marketplace yang sah dilakukan otomatis melalui sistem aplikasi resmi tanpa perlu memindai QRIS.',
        feedbackCorrectEn:
          'Correct! Scanning a QRIS code and entering your PIN authorizes an outgoing payment. Legitimate marketplace refunds are credited automatically without scanning QRIS.',
        feedbackIncorrectId:
          'Hati-hati! Memindai QRIS dan memasukkan PIN selalu berarti Anda melakukan pembayaran keluar, bukan menerima uang masuk.',
        feedbackIncorrectEn:
          'Be careful! Scanning a QRIS code and entering your PIN always authorizes an outgoing payment, never an incoming refund.',
      },
    ],
  },
  {
    id: 'mod-6-independent-channels',
    number: 'MODUL 06',
    titleId: 'Memilih Saluran Verifikasi Mandiri yang Independen',
    titleEn: 'Choosing Independent Verification Channels',
    subtitleId:
      'Cara memverifikasi informasi secara otonom dan memahami batas kemampuan alat analisis teks.',
    subtitleEn:
      'How to verify claims autonomously and understand the boundaries of text-analysis tools.',
    readingTimeMinutes: 4,
    explanationId: [
      'Verifikasi mandiri berarti memeriksa kebenaran suatu klaim menggunakan jalur informasi yang TIDAK bergantung pada tautan, nomor telepon, atau instruksi yang diberikan oleh pengirim pesan.',
      'Misalnya, jika sebuah pesan mengklaim ada tagihan kampus atau perubahan rekening pembayaran UKT, saluran verifikasi independen adalah membuka portal akademik resmi universitas yang biasa Anda akses atau mendatangi loket keuangan fakultas—bukan menelepon nomor kontak yang tertera di dalam pesan yang meragukan tersebut.',
      'Terakhir, pahami pula bahwa alat bantu berbasis aturan teks seperti AMANAH AI memiliki keterbatasan: ketiadaan kata kunci peringatan di dalam suatu pesan BUKAN jaminan bahwa pesan tersebut aman. Kewaspadaan dan verifikasi jalur resmi tetap menjadi kunci utama.',
    ],
    explanationEn: [
      'Independent verification means checking the truth of a claim using an information channel that does NOT rely on the links, phone numbers, or instructions supplied by the message sender.',
      'For instance, if a message claims your university tuition payment account has changed, an independent verification channel means logging into your known official campus portal or visiting the faculty finance desk—not calling the phone number printed inside the questionable message.',
      'Finally, understand the limits of text-based tools like AMANAH AI: finding zero configured warning cues in a message NEVER guarantees that the sender or transaction is safe.',
    ],
    syntheticExample: {
      contextId: 'Contoh Sintetis (Pesan Formal Tanpa Kata Kunci Mencolok):',
      contextEn: 'Synthetic Example (Formal Message Without Obvious Trigger Words):',
      messageText:
        '[CONTOH SINTETIS] Yth. Mahasiswa, berikut pembaruan nomor rekening pembayaran kegiatan semester ini. Mohon konfirmasi bukti pembayaran ke koordinator pada nomor yang tertera di surat ini.',
      analysisNoteId:
        'Pesan di atas ditulis dengan tenang tanpa kata "blokir", "OTP", atau "hadiah", sehingga mesin aturan mungkin tidak menemukan indikator peringatan (Outcome B). Namun, Anda tetap wajib memverifikasi perubahan nomor rekening tersebut melalui kanal resmi kampus.',
      analysisNoteEn:
        'The message above is written calmly without obvious trigger words like "blocked", "OTP", or "prize", so a rule engine may find no configured cues (Outcome B). Even so, you must still verify any account number change through official campus channels.',
    },
    keyLessonsId: [
      'Gunakan sumber kontak primer (aplikasi resmi, situs web resmi yang diketik sendiri, atau kantor layanan resmi) untuk memverifikasi klaim.',
      'Tidak ditemukannya tanda peringatan pada analisis teks TIDAK berarti pesan atau transaksi tersebut aman.',
      'Biasakan prinsip: Verifikasi Sebelum Percaya, Pahami Sebelum Bertransaksi.',
    ],
    keyLessonsEn: [
      'Use primary contact sources (official apps, self-typed official domains, or official service desks) to verify claims.',
      'Finding no configured warning cues in text analysis NEVER proves that a message or transaction is safe.',
      'Practice the core principle: Verify Before You Trust, Understand Before You Transact.',
    ],
    quiz: [
      {
        id: 'q-mod6-1',
        questionId:
          'Jika hasil analisis AMANAH AI pada suatu pesan menunjukkan "Tidak Ditemukan Tanda Peringatan Terkonfigurasi" (Outcome B), apa arti yang sebenarnya?',
        questionEn:
          'If AMANAH AI’s analysis of a message returns "No Configured Warning Cues Identified" (Outcome B), what does that actually mean?',
        options: [
          {
            id: 'a',
            textId: 'Pesan dan pengirimnya telah disertifikasi 100% aman untuk ditindaklanjuti.',
            textEn: 'The message and its sender are certified 100% safe to proceed with.',
          },
          {
            id: 'b',
            textId: 'Aturan teks saat ini tidak menemukan pola yang terkonfigurasi, namun hal ini TIDAK membuktikan pesan atau transaksi tersebut aman; verifikasi mandiri tetap diperlukan.',
            textEn: 'The current text rules did not match configured patterns, which does NOT prove the message or transaction is safe; independent verification is still required.',
          },
          {
            id: 'c',
            textId: 'Sistem telah menghubungi bank pengirim dan memastikan rekeningnya asli.',
            textEn: 'The system has contacted the sender’s bank and confirmed the account is genuine.',
          },
        ],
        correctOptionId: 'b',
        feedbackCorrectId:
          'Tepat sekali! Ketiadaan indikator teks yang terkonfigurasi tidak pernah membuktikan keamanan pengirim atau transaksi. Selalu lakukan verifikasi saluran independen.',
        feedbackCorrectEn:
          'Spot on! The absence of configured text indicators never proves a sender or transaction is safe. Always perform independent channel verification.',
        feedbackIncorrectId:
          'Kurang tepat. AMANAH AI tidak dapat mensertifikasi keamanan pengirim atau memverifikasi rekening bank. Ketiadaan tanda peringatan teks bukan jaminan keamanan.',
        feedbackIncorrectEn:
          'Incorrect. AMANAH AI cannot certify sender safety or verify bank accounts. The absence of text cues is never a guarantee of safety.',
      },
    ],
  },
];
