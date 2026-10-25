import React from 'react';
import {
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  FileSearch,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { Language, NavSection } from '../types/amanah';
import { CONFIGURED_RULES } from '../engine/analyzer';

interface HowItWorksViewProps {
  lang: Language;
  onNavigate: (section: NavSection) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  lang,
  onNavigate,
}) => {
  const workflowStages = [
    {
      step: '01',
      titleId: 'Pengguna Memasukkan Teks',
      titleEn: 'User Enters Text',
      descId:
        'Pengguna menempelkan teks pesan setelah menghapus data pribadi (PII) atau memilih contoh sintetis.',
      descEn:
        'User pastes message text after removing personal data (PII) or loads a clearly labeled synthetic sample.',
    },
    {
      step: '02',
      titleId: 'Validasi Masukan',
      titleEn: 'Input Validation',
      descId:
        'Memeriksa apakah teks kosong, melebihi batas 5.000 karakter (Outcome D), atau terlalu singkat untuk dinilai (Outcome C).',
      descEn:
        'Checks whether input is empty, exceeds 5,000 characters (Outcome D), or lacks sufficient substance (Outcome C).',
    },
    {
      step: '03',
      titleId: 'Mesin Aturan Deterministik',
      titleEn: 'Deterministic Rule Engine',
      descId:
        'Mencocokkan 7 kategori pola heuristik terkonfigurasi sekaligus memeriksa konteks negasi dan pengingat akademik.',
      descEn:
        'Evaluates 7 configured heuristic rule categories while checking for negated/educational and benign academic contexts.',
    },
    {
      step: '04',
      titleId: 'Ekstraksi Bukti Teks',
      titleEn: 'Evidence Extraction',
      descId:
        'Mencatat rentang indeks karakter presisi [startOffset..endOffset] agar bukti teks dapat disorot secara akurat.',
      descEn:
        'Records exact character offset spans [startOffset..endOffset] so matched evidence is highlighted accurately.',
    },
    {
      step: '05',
      titleId: 'Penjelasan Kontekstual',
      titleEn: 'Contextual Explanations',
      descId:
        'Menyajikan penjelasan bahasa Indonesia yang lugas, membedakan teks teramati vs. inferensi, serta mencantumkan keterbatasan.',
      descEn:
        'Presents plain-language explanations distinguishing observed text from inferred concern alongside explicit limitations.',
    },
    {
      step: '06',
      titleId: 'Panduan Verifikasi Mandiri',
      titleEn: 'Independent Verification Guidance',
      descId:
        'Menghubungkan setiap indikator peringatan ke langkah konkret pada Daftar Periksa Verifikasi Mandiri.',
      descEn:
        'Links each warning indicator directly to actionable steps in the Independent Verification Checklist.',
    },
    {
      step: '07',
      titleId: 'Aktivitas Pembelajaran Opsional',
      titleEn: 'Optional Learning Activity',
      descId:
        'Memperkuat literasi transaksi digital jangka panjang melalui 6 modul edukasi dan pemeriksaan pemahaman.',
      descEn:
        'Reinforces long-term digital transaction literacy through 6 educational modules and interactive quizzes.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#064E3B]">
            {lang === 'id'
              ? 'Cara Kerja & Transparansi Teknis'
              : 'How It Works & Technical Transparency'}
          </h1>
          <span className="font-mono text-xs text-[#047857]">
            Deterministic Baseline Engine · Zero Fabricated AI Claims
          </span>
        </div>
        <p className="text-sm text-[#374151] leading-relaxed">
          {lang === 'id'
            ? 'Halaman ini menjelaskan proses analisis 7 tahap AMANAH AI, arsitektur sistem secara jujur, serta batas antara komponen yang benar-benar diimplementasikan dalam prototipe ini dan arsitektur pengembangan masa depan.'
            : 'This section explains AMANAH AI’s 7-stage process, system architecture, and the honest distinction between components actively implemented in this prototype versus planned future extensions.'}
        </p>
      </section>

      {/* 1. Workflow Diagram & 7-Stage Pipeline */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-5">
        <div className="flex items-center gap-2 text-base font-bold text-[#064E3B]">
          <Cpu className="w-5 h-5 text-[#047857]" />
          <h2>
            {lang === 'id'
              ? '1. Alur Proses Analisis 7 Tahap (Workflow)'
              : '1. Seven-Stage Analysis Process (Workflow)'}
          </h2>
        </div>

        <div className="rounded-xl overflow-hidden border border-[#D6D3C9] bg-[#FAF8F3]">
          <img
            src="/assets/workflow.svg"
            alt="AMANAH AI 7-Stage Workflow Diagram"
            referrerPolicy="no-referrer"
            className="w-full h-auto block"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {workflowStages.map((st) => (
            <div
              key={st.step}
              className="p-4 rounded-xl bg-[#FAF8F3] border border-[#D6D3C9] space-y-1.5"
            >
              <span className="font-mono text-xs font-bold text-[#047857] tabular-nums">
                STAGE {st.step}
              </span>
              <h3 className="text-sm font-bold text-[#064E3B]">
                {lang === 'id' ? st.titleId : st.titleEn}
              </h3>
              <p className="text-xs text-[#374151] leading-relaxed">
                {lang === 'id' ? st.descId : st.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. System Architecture Diagram & Honest Prototype vs. Planned Matrix */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-5">
        <div className="flex items-center gap-2 text-base font-bold text-[#064E3B]">
          <Layers className="w-5 h-5 text-[#047857]" />
          <h2>
            {lang === 'id'
              ? '2. Arsitektur Sistem: Prototipe Aktif vs. Rencana Masa Depan'
              : '2. System Architecture: Implemented Prototype vs. Planned Extensions'}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
          {lang === 'id'
            ? 'Pernyataan Transparansi: Diagram arsitektur di bawah ini merepresentasikan rancangan sistem secara utuh. Prototipe kompetisi saat ini mengimplementasikan seluruh alur analisis secara lokal di peramban (client-side) menggunakan mesin aturan deterministik tanpa memerlukan server backend, database eksternal, atau pemanggilan API model AI generatif.'
            : 'Transparency Statement: The architecture diagram below illustrates the full system design. This competition prototype implements the complete baseline workflow locally inside the browser using a deterministic rules engine—requiring no deployed backend database or external generative AI API calls.'}
        </p>

        <div className="rounded-xl overflow-hidden border border-[#D6D3C9] bg-[#FAF8F3]">
          <img
            src="/assets/architecture.svg"
            alt="AMANAH AI System Architecture Diagram"
            referrerPolicy="no-referrer"
            className="w-full h-auto block"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Implemented in Prototype */}
          <div className="p-5 rounded-xl bg-[#ECFDF5] border border-[#047857] space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#064E3B]">
              <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
              <h3>
                {lang === 'id'
                  ? 'Benar-Benar Diimplementasikan dalam Prototipe Ini'
                  : 'Actively Implemented in This Prototype'}
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-[#064E3B] leading-relaxed">
              <li>
                •{' '}
                {lang === 'id'
                  ? 'Mesin aturan deterministik (TypeScript/RegExp) yang mengevaluasi teks masukan secara nyata (bukan animasi palsu).'
                  : 'Deterministic rules engine (TypeScript/RegExp) that genuinely evaluates user-entered text (no fake loading stubs).'}
              </li>
              <li>
                •{' '}
                {lang === 'id'
                  ? 'Pelacakan indeks karakter presisi [startOffset..endOffset] untuk menyorot bukti teks langsung pada pesan asli.'
                  : 'Exact character-offset tracking [startOffset..endOffset] to highlight matched evidence spans in the original message.'}
              </li>
              <li>
                •{' '}
                {lang === 'id'
                  ? 'Penanganan konteks negasi (misalnya kalimat "Jangan berikan kode OTP") dan pengecualian pengingat akademik wajar.'
                  : 'Contextual negation handling (e.g., "Never share your OTP") and ordinary academic deadline exceptions.'}
              </li>
              <li>
                •{' '}
                {lang === 'id'
                  ? 'Keempat hasil analisis wajib (Outcome A, Outcome B, Outcome C, dan Outcome D) beserta fitur samarkan PII lokal.'
                  : 'All four required outcomes (Outcome A, B, C, and D) plus a local PII masking helper.'}
              </li>
              <li>
                •{' '}
                {lang === 'id'
                  ? 'Daftar Periksa Verifikasi interaktif dan 6 modul Pusat Pembelajaran dengan pelacakan skor sesi sementara.'
                  : 'Interactive Verification Checklist and 6 Learning Center modules with temporary session progress tracking.'}
              </li>
            </ul>
          </div>

          {/* Planned / Proposed for Future Phases */}
          <div className="p-5 rounded-xl bg-[#FAF8F3] border border-[#D6D3C9] space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#374151]">
              <Clock className="w-4 h-4 text-[#6B7280] shrink-0" />
              <h3>
                {lang === 'id'
                  ? 'Masih Berupa Rencana Pengembangan (Belum Diaktifkan)'
                  : 'Planned for Future Iterations (Not Active in Prototype)'}
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-[#4B5563] leading-relaxed">
              <li>
                •{' '}
                {lang === 'id'
                  ? 'Sinkronisasi repositori aturan terkurasi dari server pusat untuk memperbarui pola modus terbaru secara berkala.'
                  : 'Curated rule-pack synchronization from a central repository to update emerging linguistic patterns.'}
              </li>
              <li>
                •{' '}
                {lang === 'id'
                  ? 'Integrasi model bahasa (NLP) opsional berbasis persetujuan eksplisit (opt-in) dengan perlindungan privasi ketat.'
                  : 'Optional opt-in NLP semantic assistance under strict privacy and redaction guardrails.'}
              </li>
              <li>
                •{' '}
                {lang === 'id'
                  ? 'Integrasi terverifikasi dengan direktori pengumuman keamanan resmi universitas dan lembaga perlindungan konsumen.'
                  : 'Verified integration with university security advisories and consumer protection portals.'}
              </li>
              <li>
                •{' '}
                {lang === 'id'
                  ? 'Penyimpanan progres belajar lintas perangkat menggunakan akun mahasiswa (saat ini murni lokal per sesi).'
                  : 'Cross-device learning progress sync for student accounts (currently strictly session-local).'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Data Flow & Privacy Boundary Diagram */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-[#064E3B]">
          <ShieldCheck className="w-5 h-5 text-[#047857]" />
          <h2>
            {lang === 'id'
              ? '3. Alur Data & Batas Kepercayaan Privasi (Data Flow)'
              : '3. Data Flow & Privacy Trust Boundary'}
          </h2>
        </div>

        <div className="rounded-xl overflow-hidden border border-[#D6D3C9] bg-[#FAF8F3]">
          <img
            src="/assets/data-flow.svg"
            alt="AMANAH AI Data Flow and Privacy Boundary Diagram"
            referrerPolicy="no-referrer"
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* 4. Transparent Rule Registry Inspector */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-base font-bold text-[#064E3B]">
            <Code2 className="w-5 h-5 text-[#047857]" />
            <h2>
              {lang === 'id'
                ? '4. Daftar Aturan Heuristik yang Terkonfigurasi Saat Ini'
                : '4. Currently Configured Heuristic Rule Registry'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('analyze')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#064E3B] text-[#FAF8F3] hover:bg-[#047857] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span>
              {lang === 'id' ? 'Uji Mesin Aturan' : 'Test Rule Engine'}
            </span>
          </button>
        </div>

        <div className="overflow-x-auto border border-[#D6D3C9] rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F3] border-b border-[#D6D3C9] text-[#064E3B]">
                <th className="py-3 px-4 font-mono font-bold">ID Aturan</th>
                <th className="py-3 px-4 font-bold">
                  {lang === 'id' ? 'Kategori Indikator' : 'Indicator Category'}
                </th>
                <th className="py-3 px-4 font-bold">
                  {lang === 'id'
                    ? 'Kekhawatiran yang Diinferensi'
                    : 'Inferred Concern'}
                </th>
                <th className="py-3 px-4 font-bold text-right">
                  {lang === 'id' ? 'Pola RegExp' : 'RegExp Patterns'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {CONFIGURED_RULES.map((rule) => (
                <tr key={rule.cueId} className="hover:bg-[#FAF8F3]/80">
                  <td className="py-3 px-4 font-mono font-semibold text-[#047857] whitespace-nowrap">
                    {rule.cueId}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#064E3B]">
                    {lang === 'id'
                      ? rule.categoryLabelId
                      : rule.categoryLabelEn}
                  </td>
                  <td className="py-3 px-4 text-[#374151]">
                    {lang === 'id'
                      ? rule.inferredConcernId
                      : rule.inferredConcernEn}
                  </td>
                  <td className="py-3 px-4 font-mono text-right text-[#4B5563] tabular-nums">
                    {rule.patterns.length}{' '}
                    {lang === 'id' ? 'pola aktif' : 'active patterns'}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#FAF8F3]/60">
                <td className="py-3 px-4 font-mono font-semibold text-[#047857] whitespace-nowrap">
                  CUE-COMBINATION-01
                </td>
                <td className="py-3 px-4 font-semibold text-[#064E3B]">
                  {lang === 'id'
                    ? 'Kombinasi Multi-Indikator'
                    : 'Multi-Cue Combination'}
                </td>
                <td className="py-3 px-4 text-[#374151]">
                  {lang === 'id'
                    ? 'Aktif otomatis apabila ≥ 2 kategori indikator berbeda ditemukan dalam satu pesan yang sama.'
                    : 'Automatically triggered when ≥ 2 distinct warning cue categories co-occur in the same message.'}
                </td>
                <td className="py-3 px-4 font-mono text-right text-[#4B5563] tabular-nums">
                  Meta-Rule
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
