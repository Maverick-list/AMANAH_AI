import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckSquare,
  FileSearch,
  Info,
  Lock,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  AnalysisOutcomeType,
  AnalysisResult,
  Language,
  NavSection,
} from '../types/amanah';
import { SYNTHETIC_EXAMPLES } from '../data/content';

interface DashboardViewProps {
  lang: Language;
  onNavigate: (section: NavSection) => void;
  onQuickAnalyzeExample: (text: string) => void;
  sessionHistory: AnalysisResult[];
  onSelectResult: (result: AnalysisResult) => void;
  completedChecklistCount: number;
  totalChecklistCount: number;
  completedModulesCount: number;
  totalModulesCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  lang,
  onNavigate,
  onQuickAnalyzeExample,
  sessionHistory,
  onSelectResult,
  completedChecklistCount,
  totalChecklistCount,
  completedModulesCount,
  totalModulesCount,
}) => {
  const t = {
    welcomeKicker:
      lang === 'id'
        ? 'Platform Kesadaran Kepercayaan & Literasi Transaksi Digital'
        : 'Digital Transaction Trust-Awareness & Literacy Platform',
    headline:
      lang === 'id'
        ? 'Verifikasi Sebelum Percaya. Pahami Sebelum Bertransaksi.'
        : 'Verify Before You Trust. Understand Before You Transact.',
    subheadline:
      lang === 'id'
        ? 'AMANAH AI membantu mahasiswa dan konsumen digital muda di Indonesia memeriksa pesan terkait transaksi yang mencurigakan, memahami tanda peringatan berbasis bukti teks, serta memilih langkah verifikasi mandiri melalui saluran resmi.'
        : 'AMANAH AI helps university students and young digital consumers in Indonesia inspect suspicious transaction messages, understand text-based warning signs, and choose independent verification actions.',
    primaryCta:
      lang === 'id' ? 'Analisis Pesan Sekarang' : 'Analyze a Message',
    secondaryCta:
      lang === 'id'
        ? 'Uji dengan Contoh Sintetis'
        : 'Try with Synthetic Example',
    threeStepTitle:
      lang === 'id'
        ? 'Panduan Tiga Langkah Penggunaan'
        : 'Three-Step Verification Guidance',
    step1Title: lang === 'id' ? '01. Periksa Pesan' : '01. Inspect the Message',
    step1Desc:
      lang === 'id'
        ? 'Tempel teks pesan transaksi setelah menghapus data pribadi (nama, nomor telepon, nomor rekening, atau OTP).'
        : 'Paste the transaction message text after removing personal data (names, phone numbers, account numbers, or OTPs).',
    step2Title:
      lang === 'id'
        ? '02. Pahami Tanda Peringatan'
        : '02. Understand Warning Signs',
    step2Desc:
      lang === 'id'
        ? 'Tinjau bagian teks yang disorot beserta alasan mengapa pola tersebut patut diperhatikan dan apa keterbatasan analisisnya.'
        : 'Review highlighted text spans along with plain-language explanations of why they deserve attention and their limitations.',
    step3Title:
      lang === 'id'
        ? '03. Verifikasi Secara Mandiri'
        : '03. Verify Independently',
    step3Desc:
      lang === 'id'
        ? 'Gunakan daftar periksa untuk mengonfirmasi klaim melalui situs web, aplikasi, atau kontak resmi yang Anda cari sendiri.'
        : 'Use the verification checklist to confirm claims through official websites, apps, or contacts you obtain independently.',
    quickAccessTitle:
      lang === 'id'
        ? 'Akses Cepat & Ringkasan Sesi Saat Ini'
        : 'Quick Access & Current Session Summary',
    sessionNotice:
      lang === 'id'
        ? 'Angka di bawah ini adalah hitungan nyata dari sesi peramban Anda saat ini (tidak disimpan ke server).'
        : 'Figures below reflect genuine counts from your current browser session only (never stored on a server).',
    recentCardTitle:
      lang === 'id' ? 'Analisis Sesi Terkini' : 'Recent Session Analysis',
    checklistCardTitle:
      lang === 'id' ? 'Panduan Daftar Periksa' : 'Verification Guidance',
    learningCardTitle:
      lang === 'id' ? 'Aktivitas Pembelajaran' : 'Learning Activities',
    privacyTitle:
      lang === 'id'
        ? 'Pengingat Privasi Sebelum Analisis'
        : 'Privacy Reminder Before Analysis',
    privacyDesc:
      lang === 'id'
        ? 'Selalu hapus nama pribadi, nomor telepon, nomor rekening bank, alamat rumah, kode OTP, PIN, dan kata sandi sebelum menempelkan pesan ke editor analisis. Seluruh pemrosesan prototipe ini berjalan secara lokal di peramban Anda.'
        : 'Always remove personal names, phone numbers, bank account numbers, physical addresses, OTP codes, PINs, and passwords before pasting messages. All baseline processing runs locally in your browser.',
    disclaimerTitle:
      lang === 'id'
        ? 'Batasan Penting Sistem (Bukan Sertifikasi Keamanan)'
        : 'Important System Limitation (Not a Safety Certification)',
    disclaimerDesc:
      lang === 'id'
        ? 'AMANAH AI adalah alat bantu kesadaran dan edukasi literasi, BUKAN layanan otorisasi keuangan atau pendeteksi penipuan mutlak. Platform ini tidak dapat mensertifikasi apakah seorang pengirim, situs web, atau transaksi benar-benar aman atau pasti penipuan.'
        : 'AMANAH AI is an awareness and literacy aid, NOT a financial authorization service or definitive fraud detector. This platform cannot certify whether a sender, website, or transaction is safe or fraudulent.',
  };

  const outcomeLabel = (outcome: AnalysisOutcomeType) => {
    switch (outcome) {
      case AnalysisOutcomeType.OUTCOME_A_CUES_FOUND:
        return lang === 'id'
          ? 'Tanda Peringatan Ditemukan'
          : 'Warning Cues Found';
      case AnalysisOutcomeType.OUTCOME_B_NO_CUES:
        return lang === 'id'
          ? 'Tidak Ada Indikator Terkonfigurasi'
          : 'No Configured Cues Found';
      case AnalysisOutcomeType.OUTCOME_C_INSUFFICIENT_INFO:
        return lang === 'id'
          ? 'Informasi Tidak Mencukupi'
          : 'Insufficient Information';
      case AnalysisOutcomeType.OUTCOME_D_INVALID_INPUT:
        return lang === 'id' ? 'Masukan Tidak Valid' : 'Invalid Input';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner recreating dashboard.png reference */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/brand-mark.svg"
                alt="AMANAH AI Logo"
                referrerPolicy="no-referrer"
                className="h-11 w-auto"
              />
            </div>
            <p className="text-xs font-medium text-[#047857] tracking-wide">
              {t.welcomeKicker}
            </p>
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#064E3B] tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.headline}
            </h1>
            <p className="text-[15px] leading-relaxed text-[#374151] max-w-2xl">
              {t.subheadline}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('analyze')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] text-[#FAF8F3] text-sm font-semibold hover:bg-[#047857] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
              >
                <FileSearch className="w-4 h-4" />
                <span>{t.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  onQuickAnalyzeExample(SYNTHETIC_EXAMPLES[0].text)
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F3] text-[#064E3B] border border-[#047857]/40 text-sm font-medium hover:bg-[#ECFDF5] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
              >
                <Sparkles className="w-4 h-4 text-[#047857]" />
                <span>{t.secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* Right side: Visual Summary Card */}
          <div className="lg:col-span-4 bg-[#FAF8F3] rounded-xl border border-[#D6D3C9] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#D6D3C9] pb-3">
              <span className="text-xs font-semibold text-[#064E3B]">
                {lang === 'id'
                  ? 'Prinsip Pemeriksaan Transparan'
                  : 'Transparent Inspection Principles'}
              </span>
              <span className="font-mono text-xs text-[#047857] tabular-nums">
                100% Client-Side
              </span>
            </div>
            <ul className="space-y-3 text-xs text-[#374151] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="font-mono font-semibold text-[#047857] tabular-nums">
                  01
                </span>
                <span>
                  {lang === 'id'
                    ? 'Membedakan teks yang teramati dengan kekhawatiran yang diinferensi.'
                    : 'Distinguishes observed text spans from inferred concerns.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono font-semibold text-[#047857] tabular-nums">
                  02
                </span>
                <span>
                  {lang === 'id'
                    ? 'Tidak menggunakan persentase skor kepalsuan yang dikarang.'
                    : 'Never displays fabricated fraud probability percentages.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono font-semibold text-[#047857] tabular-nums">
                  03
                </span>
                <span>
                  {lang === 'id'
                    ? 'Tidak membuka atau mengeksekusi tautan di dalam pesan.'
                    : 'Never opens, fetches, or executes URLs inside messages.'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Three-Step Guidance */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#064E3B]">
            {t.threeStepTitle}
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('how-it-works')}
            className="text-xs font-semibold text-[#047857] hover:underline cursor-pointer whitespace-nowrap shrink-0"
          >
            {lang === 'id'
              ? 'Lihat Cara Kerja Teknis →'
              : 'View Technical Workflow →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl border border-[#D6D3C9] p-5 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#047857] font-mono font-semibold">
                <span>STEP 01</span>
                <FileSearch className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#064E3B]">
                {t.step1Title}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {t.step1Desc}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => onNavigate('analyze')}
                className="text-xs font-semibold text-[#064E3B] hover:text-[#047857] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <span>
                  {lang === 'id' ? 'Buka Editor Pesan' : 'Open Message Editor'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#D6D3C9] p-5 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#047857] font-mono font-semibold">
                <span>STEP 02</span>
                <Info className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#064E3B]">
                {t.step2Title}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {t.step2Desc}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => onNavigate('results')}
                className="text-xs font-semibold text-[#064E3B] hover:text-[#047857] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <span>
                  {lang === 'id' ? 'Lihat Hasil Analisis' : 'View Analysis Results'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#D6D3C9] p-5 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#047857] font-mono font-semibold">
                <span>STEP 03</span>
                <CheckSquare className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#064E3B]">
                {t.step3Title}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {t.step3Desc}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => onNavigate('checklist')}
                className="text-xs font-semibold text-[#064E3B] hover:text-[#047857] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <span>
                  {lang === 'id'
                    ? 'Buka Daftar Periksa'
                    : 'Open Verification Checklist'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick-Access Session Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h2 className="text-lg font-bold text-[#064E3B]">
            {t.quickAccessTitle}
          </h2>
          <span className="text-xs text-[#4B5563]">{t.sessionNotice}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Card 1: Recent Analysis in Current Session */}
          <div className="bg-white rounded-xl border border-[#D6D3C9] p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#064E3B]">
                  {t.recentCardTitle}
                </h3>
                <span className="font-mono text-xs font-semibold text-[#047857] tabular-nums">
                  {sessionHistory.length}{' '}
                  {lang === 'id' ? 'pesan diuji' : 'analyzed'}
                </span>
              </div>

              {sessionHistory.length === 0 ? (
                <div className="py-4 text-xs text-[#4B5563] space-y-2 bg-[#FAF8F3] p-3.5 rounded-lg border border-[#E5E7EB]">
                  <p>
                    {lang === 'id'
                      ? 'Belum ada pesan yang dianalisis pada sesi ini.'
                      : 'No messages analyzed in the current session yet.'}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      onQuickAnalyzeExample(SYNTHETIC_EXAMPLES[0].text)
                    }
                    className="text-xs font-semibold text-[#047857] hover:underline cursor-pointer"
                  >
                    {lang === 'id'
                      ? '+ Jalankan contoh sintetis pertama'
                      : '+ Run first synthetic example'}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {sessionHistory.slice(0, 2).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectResult(item)}
                      className="w-full text-left p-3 rounded-lg bg-[#FAF8F3] hover:bg-[#ECFDF5] border border-[#E5E7EB] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#4B5563] font-mono tabular-nums">
                        <span>{outcomeLabel(item.outcome)}</span>
                        <span>
                          {item.matchedCues.length}{' '}
                          {lang === 'id' ? 'indikator' : 'cues'} ·{' '}
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-[#0D2B22] font-medium truncate mt-1">
                        {item.rawText}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => onNavigate('analyze')}
                className="w-full py-2 px-3 rounded-lg bg-[#FAF8F3] hover:bg-[#ECFDF5] text-xs font-semibold text-[#064E3B] border border-[#D6D3C9] transition-colors cursor-pointer whitespace-nowrap"
              >
                {lang === 'id'
                  ? 'Analisis Pesan Baru'
                  : 'Analyze New Message'}
              </button>
            </div>
          </div>

          {/* Card 2: Verification Checklist Progress */}
          <div className="bg-white rounded-xl border border-[#D6D3C9] p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#064E3B]">
                  {t.checklistCardTitle}
                </h3>
                <span className="font-mono text-xs font-semibold text-[#047857] tabular-nums">
                  {completedChecklistCount} / {totalChecklistCount}{' '}
                  {lang === 'id' ? 'langkah' : 'steps'}
                </span>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                {lang === 'id'
                  ? 'Gunakan daftar periksa interaktif untuk memastikan Anda memverifikasi situs resmi, kontak independen, dan instruksi pembayaran sebelum bertindak.'
                  : 'Use the interactive checklist to verify official websites, independent contacts, and payment instructions before taking action.'}
              </p>
              <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#047857] h-full transition-all duration-200"
                  style={{
                    width: `${Math.round(
                      (completedChecklistCount / totalChecklistCount) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => onNavigate('checklist')}
                className="w-full py-2 px-3 rounded-lg bg-[#FAF8F3] hover:bg-[#ECFDF5] text-xs font-semibold text-[#064E3B] border border-[#D6D3C9] transition-colors cursor-pointer whitespace-nowrap"
              >
                {lang === 'id'
                  ? 'Buka Daftar Periksa Verifikasi'
                  : 'Open Verification Checklist'}
              </button>
            </div>
          </div>

          {/* Card 3: Learning Center Progress */}
          <div className="bg-white rounded-xl border border-[#D6D3C9] p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#064E3B]">
                  {t.learningCardTitle}
                </h3>
                <span className="font-mono text-xs font-semibold text-[#047857] tabular-nums">
                  {completedModulesCount} / {totalModulesCount}{' '}
                  {lang === 'id' ? 'modul' : 'modules'}
                </span>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                {lang === 'id'
                  ? 'Pelajari 6 modul literasi singkat dengan contoh sintetis dan latihan pemahaman interaktif tentang urgensi, biaya di muka, OTP, dan klaim hadiah.'
                  : 'Explore 6 concise literacy modules with synthetic examples and interactive quizzes covering urgency, advance fees, OTPs, and reward claims.'}
              </p>
              <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#047857] h-full transition-all duration-200"
                  style={{
                    width: `${Math.round(
                      (completedModulesCount / totalModulesCount) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => onNavigate('learning')}
                className="w-full py-2 px-3 rounded-lg bg-[#FAF8F3] hover:bg-[#ECFDF5] text-xs font-semibold text-[#064E3B] border border-[#D6D3C9] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'id'
                      ? 'Mulai Belajar di Pusat Literasi'
                      : 'Explore Learning Center'}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Privacy Reminder & Non-Certification Disclaimer */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-[#D6D3C9] p-5 space-y-2">
          <div className="flex items-center gap-2 text-[#064E3B] font-bold text-sm">
            <Lock className="w-4 h-4 text-[#047857] shrink-0" />
            <h3>{t.privacyTitle}</h3>
          </div>
          <p className="text-xs text-[#374151] leading-relaxed">
            {t.privacyDesc}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#D6D3C9] p-5 space-y-2">
          <div className="flex items-center gap-2 text-[#064E3B] font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-[#B45309] shrink-0" />
            <h3>{t.disclaimerTitle}</h3>
          </div>
          <p className="text-xs text-[#374151] leading-relaxed">
            {t.disclaimerDesc}
          </p>
        </div>
      </section>
    </div>
  );
};
