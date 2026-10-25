import React, { useState } from 'react';
import {
  CheckCircle2,
  Lock,
  ShieldAlert,
  Trash2,
  Users,
} from 'lucide-react';
import { Language } from '../types/amanah';

interface PrivacyAboutViewProps {
  lang: Language;
  onPurgeAllSessionData: () => void;
  sessionItemCount: number;
}

export const PrivacyAboutView: React.FC<PrivacyAboutViewProps> = ({
  lang,
  onPurgeAllSessionData,
  sessionItemCount,
}) => {
  const [purgedConfirmation, setPurgedConfirmation] = useState(false);

  const handlePurge = () => {
    onPurgeAllSessionData();
    setPurgedConfirmation(true);
  };

  const commitments = [
    {
      titleId: '1. Alat Bantu Kesadaran & Edukasi, Bukan Otorisasi Keuangan',
      titleEn: '1. Awareness & Education Aid, Not a Financial Authorization Service',
      descId:
        'AMANAH AI dirancang sebagai sarana literasi dan kewaspadaan transaksi digital bagi mahasiswa serta konsumen muda di Indonesia. Platform ini bukan lembaga kliring, otoritas perbankan, atau pemberi sertifikasi kelayakan transaksi.',
      descEn:
        'AMANAH AI is built as a digital transaction trust-awareness and literacy platform for university students and young consumers in Indonesia. It is not a financial clearinghouse, banking authority, or transaction certification service.',
    },
    {
      titleId: '2. Prototipe Tidak Mengautentikasi Identitas Pengirim',
      titleEn: '2. The Prototype Does Not Authenticate Senders',
      descId:
        'Sistem hanya menganalisis pola kalimat pada teks yang dimasukkan pengguna. Sistem tidak dapat memverifikasi siapa pengirim sebenarnya, apakah nomor telepon pengirim resmi, atau apakah akun pengirim sedang diretas.',
      descEn:
        'The system only inspects linguistic patterns in user-submitted text. It cannot verify who actually sent a message, whether a phone number is official, or whether an account has been compromised.',
    },
    {
      titleId: '3. Indikator Berbasis Teks Bukan Bukti Mutlak Penipuan',
      titleEn: '3. Text-Based Indicators Do Not Prove Fraud',
      descId:
        'Tanda peringatan yang ditemukan oleh mesin aturan merupakan heuristik awal untuk mendorong pemeriksaan lebih lanjut. Pesan resmi terkadang juga memiliki batas waktu atau instruksi pembayaran yang sah.',
      descEn:
        'Warning cues identified by the rule engine are preliminary heuristics meant to prompt closer inspection. Legitimate messages may occasionally contain deadlines or payment instructions.',
    },
    {
      titleId: '4. Ketiadaan Indikator Tidak Membuktikan Keamanan',
      titleEn: '4. No Configured Warning Cues Do Not Prove Safety',
      descId:
        'Apabila tidak ada aturan yang cocok (Outcome B), hal tersebut sama sekali TIDAK menjamin bahwa pesan, pengirim, tautan situs web, atau transaksi tersebut aman. Tetap gunakan Daftar Periksa Verifikasi Mandiri.',
      descEn:
        'When zero configured warning cues match (Outcome B), that NEVER guarantees the message, sender, website link, or transaction is safe. Always apply independent verification.',
    },
    {
      titleId: '5. Hapus Informasi Pribadi Sensitif Sebelum Analisis',
      titleEn: '5. Remove Sensitive Personal Information Before Analysis',
      descId:
        'Pengguna sangat disarankan menghapus nama lengkap, nomor telepon, nomor rekening, alamat rumah, kode OTP, PIN, dan kata sandi sebelum menempelkan teks ke editor.',
      descEn:
        'Users are strongly advised to remove full names, phone numbers, account numbers, physical addresses, OTPs, PINs, and passwords before pasting text into the editor.',
    },
    {
      titleId: '6. Tidak Ada Penyimpanan Default atau Pengiriman ke Pihak Ketiga',
      titleEn: '6. No Default Storage or Third-Party Transmission',
      descId:
        'Pesan mentah yang Anda periksa diproses langsung di memori peramban (client-side) dan secara default tidak disimpan ke database eksternal maupun dikirim ke pihak ketiga.',
      descEn:
        'Raw messages you inspect are processed directly in browser memory and are never stored in external databases or transmitted to third parties by default.',
    },
    {
      titleId: '7. Penghapusan Analisis Membersihkan State Aplikasi',
      titleEn: '7. Clearing Analysis Removes Message & Results from State',
      descId:
        'Menekan tombol "Hapus Analisis" atau "Hapus Seluruh Data Sesi" akan langsung menghapus teks pesan dan hasil analisis dari state aplikasi saat ini.',
      descEn:
        'Clicking "Clear Analysis" or "Purge All Session Data" immediately removes the message text and analysis results from current application state.',
    },
    {
      titleId: '8. Riwayat Sesi Bersifat Sementara & Transparan',
      titleEn: '8. Session History Is Temporary and Explicitly Disclosed',
      descId:
        'Daftar analisis terkini, centang daftar periksa, dan skor kuis hanya disimpan sementara di memori sesi peramban yang sedang terbuka dan hilang saat Anda meresetnya atau menutup sesi.',
      descEn:
        'Recent analyses, checklist ticks, and quiz scores exist solely in temporary in-memory browser session state and are cleared when reset or when the session ends.',
    },
    {
      titleId: '9. Tanpa Pelaporan Otomatis, Pencarian Kontak, atau Eksekusi Transaksi',
      titleEn: '9. No Automated Reporting, External Contact Lookup, or Transaction Execution',
      descId:
        'Prototipe ini tidak melakukan pemblokiran rekening otomatis, tidak mencari nomor kontak di internet secara otomatis, dan tidak pernah mengeksekusi transaksi keuangan atau membuka URL di dalam pesan.',
      descEn:
        'This prototype does not perform automated reporting, does not look up external contacts automatically, and never executes financial transactions or opens URLs inside messages.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* About Header with Brand Mark */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
          <img
            src="/assets/brand-mark.svg"
            alt="AMANAH AI Brand Mark"
            referrerPolicy="no-referrer"
            className="h-12 w-auto"
          />
          <span className="font-mono text-xs text-[#047857]">
            Responsible AI &amp; Privacy-by-Design Prototype
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#064E3B]">
            {lang === 'id'
              ? 'Privasi, Prinsip Desain Bertanggung Jawab & Tentang AMANAH AI'
              : 'Privacy, Responsible Design Principles & About AMANAH AI'}
          </h1>
          <p className="text-sm text-[#374151] leading-relaxed max-w-3xl">
            {lang === 'id'
              ? 'AMANAH AI dirancang untuk menjawab tantangan meningkatnya pesan transaksi manipulatif yang menyasar mahasiswa dan konsumen digital muda di Indonesia. Fokus kami adalah membangun kebiasaan berpikir kritis dan verifikasi mandiri—bukan menggantikan keputusan pengguna dengan klaim otomatis yang berlebihan.'
              : 'AMANAH AI addresses the challenge of deceptive transactional messages targeting university students and young digital consumers in Indonesia. Our goal is to cultivate critical thinking and independent verification habits rather than replacing human judgment with overconfident automated claims.'}
          </p>
        </div>
      </section>

      {/* Problem Mechanism Diagram */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-[#064E3B]">
          <Users className="w-5 h-5 text-[#047857]" />
          <h2>
            {lang === 'id'
              ? 'Mekanisme Masalah & Titik Intervensi Edukatif'
              : 'Problem Mechanism & Educational Intervention Point'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
          {lang === 'id'
            ? 'Diagram berikut memetakan bagaimana paparan pesan manipulatif dan tekanan waktu sering kali mendorong tindakan reaktif tanpa verifikasi, serta bagaimana AMANAH AI menghadirkan jeda reflektif berbasis bukti teks.'
            : 'The diagram below maps how exposure to manipulative messages and time pressure often triggers reactive decisions without verification, and how AMANAH AI introduces an evidence-based reflective pause.'}
        </p>
        <div className="rounded-xl overflow-hidden border border-[#D6D3C9] bg-[#FAF8F3]">
          <img
            src="/assets/problem-mechanism.svg"
            alt="AMANAH AI Problem Mechanism Diagram"
            referrerPolicy="no-referrer"
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* Impact Logic Model Diagram */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-[#064E3B]">
          <ShieldAlert className="w-5 h-5 text-[#047857]" />
          <h2>
            {lang === 'id'
              ? 'Model Logika Dampak (Impact Logic Model)'
              : 'Impact Logic Model'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
          {lang === 'id'
            ? 'Alur logika dampak dari penyediaan alat bantu analisis transparan menuju penguatan ketahanan literasi transaksi digital jangka panjang.'
            : 'The impact logic connecting transparent inspection tools to long-term digital transaction literacy and consumer resilience.'}
        </p>
        <div className="rounded-xl overflow-hidden border border-[#D6D3C9] bg-[#FAF8F3]">
          <img
            src="/assets/impact-logic.svg"
            alt="AMANAH AI Impact Logic Model Diagram"
            referrerPolicy="no-referrer"
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* 9 Responsible Design & Privacy Commitments */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-5">
        <div className="flex items-center gap-2 text-base font-bold text-[#064E3B]">
          <Lock className="w-5 h-5 text-[#047857]" />
          <h2>
            {lang === 'id'
              ? '9 Komitmen Privasi & Batasan Desain Bertanggung Jawab'
              : '9 Privacy & Responsible Design Commitments'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {commitments.map((c, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#FAF8F3] border border-[#D6D3C9] space-y-1.5"
            >
              <h3 className="text-xs font-bold text-[#064E3B] leading-snug">
                {lang === 'id' ? c.titleId : c.titleEn}
              </h3>
              <p className="text-xs text-[#374151] leading-relaxed">
                {lang === 'id' ? c.descId : c.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Immediate Session State Purge Control */}
      <section className="bg-[#FAF8F3] rounded-2xl border border-[#047857] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-[#064E3B]">
            {lang === 'id'
              ? 'Kendali Penghapusan Penuh State Sesi Saat Ini'
              : 'Full Current Session State Purge Control'}
          </h2>
          <p className="text-xs text-[#374151] leading-relaxed">
            {lang === 'id'
              ? `Saat ini terdapat ${sessionItemCount} riwayat analisis sementara di memori sesi peramban ini. Anda dapat menghapus seluruh teks pesan, hasil analisis, centang daftar periksa, dan progres kuis kapan saja.`
              : `There are currently ${sessionItemCount} temporary analysis records in this browser session’s memory. You can purge all message text, analysis results, checklist selections, and quiz progress at any time.`}
          </p>
          {purgedConfirmation && (
            <p className="text-xs font-bold text-[#047857] flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {lang === 'id'
                  ? 'Seluruh data sesi sementara telah berhasil dihapus dari memori aplikasi.'
                  : 'All temporary session state has been purged from application memory.'}
              </span>
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handlePurge}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#991B1B] text-white hover:bg-[#7F1D1D] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <Trash2 className="w-4 h-4" />
          <span>
            {lang === 'id'
              ? 'Hapus Seluruh Data Sesi Sekarang'
              : 'Purge All Session Data Now'}
          </span>
        </button>
      </section>
    </div>
  );
};
