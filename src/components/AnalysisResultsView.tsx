import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  FileSearch,
  HelpCircle,
  Info,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';
import {
  AnalysisOutcomeType,
  AnalysisResult,
  Language,
  NavSection,
} from '../types/amanah';
import { HighlightRenderer } from './HighlightRenderer';

interface AnalysisResultsViewProps {
  lang: Language;
  result: AnalysisResult | null;
  onEditMessage: () => void;
  onClearAndRestart: () => void;
  onNavigate: (section: NavSection) => void;
  onHighlightChecklistItem: (itemId: string) => void;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({
  lang,
  result,
  onEditMessage,
  onClearAndRestart,
  onNavigate,
  onHighlightChecklistItem,
}) => {
  const [selectedCueId, setSelectedCueId] = useState<string | null>(null);

  if (!result) {
    return (
      <div className="bg-white rounded-2xl border border-[#D6D3C9] p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center mx-auto">
          <FileSearch className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-[#064E3B]">
          {lang === 'id'
            ? 'Belum Ada Hasil Analisis Aktif'
            : 'No Active Analysis Result'}
        </h1>
        <p className="text-sm text-[#4B5563] max-w-lg mx-auto leading-relaxed">
          {lang === 'id'
            ? 'Silakan masukkan teks pesan transaksi atau pilih salah satu contoh sintetis pada halaman Analisis Pesan untuk melihat penyorotan bukti teks dan penjelasan indikator.'
            : 'Please enter a transaction message or load a synthetic sample on the Analyze Message screen to view highlighted text evidence and warning explanations.'}
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onNavigate('analyze')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] text-[#FAF8F3] hover:bg-[#047857] text-sm font-semibold transition-colors cursor-pointer"
          >
            <FileSearch className="w-4 h-4" />
            <span>
              {lang === 'id'
                ? 'Buka Editor Analisis Pesan'
                : 'Go to Analyze Message'}
            </span>
          </button>
        </div>
      </div>
    );
  }

  const handleSelectCueFromText = (cueId: string) => {
    setSelectedCueId(cueId);
    const el = document.getElementById(`cue-card-${cueId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const getOutcomeBannerStyle = (outcome: AnalysisOutcomeType) => {
    switch (outcome) {
      case AnalysisOutcomeType.OUTCOME_A_CUES_FOUND:
        return {
          bg: 'bg-[#FFFBEB]',
          border: 'border-[#D97706]',
          icon: <AlertTriangle className="w-5 h-5 text-[#B45309] shrink-0" />,
          tag:
            lang === 'id'
              ? 'OUTCOME A · TANDA PERINGATAN DITEMUKAN'
              : 'OUTCOME A · WARNING CUES IDENTIFIED',
        };
      case AnalysisOutcomeType.OUTCOME_B_NO_CUES:
        return {
          bg: 'bg-[#FAF8F3]',
          border: 'border-[#047857]',
          icon: <Info className="w-5 h-5 text-[#047857] shrink-0" />,
          tag:
            lang === 'id'
              ? 'OUTCOME B · TIDAK ADA INDIKATOR TERKONFIGURASI (BUKAN JAMINAN AMAN)'
              : 'OUTCOME B · NO CONFIGURED CUES FOUND (NOT A GUARANTEE OF SAFETY)',
        };
      case AnalysisOutcomeType.OUTCOME_C_INSUFFICIENT_INFO:
        return {
          bg: 'bg-[#F9FAFB]',
          border: 'border-[#6B7280]',
          icon: <HelpCircle className="w-5 h-5 text-[#4B5563] shrink-0" />,
          tag:
            lang === 'id'
              ? 'OUTCOME C · INFORMASI TIDAK MENCUKUPI'
              : 'OUTCOME C · INSUFFICIENT INFORMATION',
        };
      case AnalysisOutcomeType.OUTCOME_D_INVALID_INPUT:
        return {
          bg: 'bg-[#FEF2F2]',
          border: 'border-[#DC2626]',
          icon: <ShieldAlert className="w-5 h-5 text-[#B91C1C] shrink-0" />,
          tag:
            lang === 'id'
              ? 'OUTCOME D · MASUKAN TIDAK VALID'
              : 'OUTCOME D · INVALID INPUT',
        };
    }
  };

  const banner = getOutcomeBannerStyle(result.outcome);

  return (
    <div className="space-y-6">
      {/* Top Action & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl border border-[#D6D3C9] px-5 py-3.5">
        <div className="flex items-center gap-3 text-xs text-[#4B5563] font-mono tabular-nums">
          <span>
            {lang === 'id' ? 'Waktu Analisis:' : 'Analyzed at:'}{' '}
            {result.timestamp}
          </span>
          <span>·</span>
          <span>
            {result.characterCount}{' '}
            {lang === 'id' ? 'karakter' : 'chars'}
          </span>
          <span>·</span>
          <span>
            {result.matchedCues.length}{' '}
            {lang === 'id' ? 'indikator cocok' : 'matched cues'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onEditMessage}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#ECFDF5] text-[#064E3B] border border-[#D6D3C9] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              {lang === 'id'
                ? 'Kembali & Edit Pesan'
                : 'Return & Edit Message'}
            </span>
          </button>
          <button
            type="button"
            onClick={onClearAndRestart}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#FEF2F2] text-[#991B1B] border border-[#D6D3C9] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>
              {lang === 'id'
                ? 'Hapus Analisis & Mulai Ulang'
                : 'Clear Analysis & Start Again'}
            </span>
          </button>
        </div>
      </div>

      {/* Outcome Summary Card */}
      <section
        className={`rounded-2xl border ${banner.border} ${banner.bg} p-6 space-y-4`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D6D3C9]/80 pb-3">
          <div className="flex items-center gap-2">
            {banner.icon}
            <span className="font-mono text-xs font-bold tracking-wide text-[#064E3B]">
              {banner.tag}
            </span>
          </div>
          <div className="font-mono text-xs font-semibold text-[#064E3B] tabular-nums">
            {lang === 'id'
              ? `Jumlah Indikator Terdeteksi: ${result.matchedCues.length}`
              : `Matched Warning Cues: ${result.matchedCues.length}`}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#064E3B]">
            {lang === 'id' ? result.summaryTitleId : result.summaryTitleEn}
          </h1>
          <p className="text-sm text-[#374151] leading-relaxed">
            {lang === 'id' ? result.summaryBodyId : result.summaryBodyEn}
          </p>
        </div>

        {/* Non-definitive heuristic notice */}
        <div className="bg-white/90 rounded-xl border border-[#D6D3C9] p-3.5 text-xs text-[#374151] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
          <p>
            {lang === 'id'
              ? 'Catatan Metodologi: Hasil ini dihitung dari pencocokan aturan teks deterministik, tanpa persentase probabilitas buatan. Sistem tidak pernah memberi label "terverifikasi aman" atau "terkonfirmasi penipuan".'
              : 'Methodological Note: This result is computed from deterministic text-rule matches without fabricated probability percentages. The system never labels a message "verified safe" or "confirmed fraudulent".'}
          </p>
        </div>
      </section>

      {/* Highlighted Original Message Evidence Viewer */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-[#064E3B]">
              {lang === 'id'
                ? 'Teks Pesan & Penyorotan Bukti (Indeks Karakter Presisi)'
                : 'Submitted Text & Highlighted Evidence (Exact Character Offsets)'}
            </h2>
            <p className="text-xs text-[#4B5563]">
              {lang === 'id'
                ? 'Klik bagian teks yang disorot untuk melompat ke kartu penjelasan indikator terkait di bawah.'
                : 'Click any highlighted span to jump to its detailed explanation card below.'}
            </p>
          </div>
          <span className="font-mono text-xs text-[#047857] tabular-nums">
            Plain-Text Safe Renderer
          </span>
        </div>

        <HighlightRenderer
          rawText={result.rawText}
          matchedCues={result.matchedCues}
          selectedCueId={selectedCueId}
          onSelectCue={handleSelectCueFromText}
          lang={lang}
        />
      </section>

      {/* Contextual Counterexamples / Negated Spans (if any were recognized) */}
      {result.contextualNotes.length > 0 && (
        <section className="bg-[#ECFDF5] rounded-2xl border border-[#047857] p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#064E3B]">
            <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
            <h2>
              {lang === 'id'
                ? 'Penanganan Konteks Negasi & Pengingat Wajar'
                : 'Contextual Negation & Benign Reminder Handling'}
            </h2>
          </div>
          <p className="text-xs text-[#064E3B] leading-relaxed">
            {lang === 'id'
              ? 'Mesin analisis mendeteksi frasa yang berkaitan dengan kata kunci sensitif, namun mengenali bahwa frasa tersebut berada dalam konteks edukasi anti-penipuan, kalimat larangan (negasi), atau pengingat akademik biasa:'
              : 'The analysis engine detected phrases related to sensitive keywords, but recognized that they appeared in an anti-scam educational, negated, or ordinary academic reminder context:'}
          </p>
          <div className="space-y-2">
            {result.contextualNotes.map((note, idx) => (
              <div
                key={`${note.cueId}-${idx}`}
                className="bg-white rounded-xl border border-[#047857]/30 p-3.5 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-[#047857]">
                  <span>{note.cueId}</span>
                  <span>
                    {lang === 'id'
                      ? 'Dikecualikan oleh Aturan Konteks'
                      : 'Excluded by Context Rule'}
                  </span>
                </div>
                <p className="text-[#0D2B22] font-medium">
                  {lang === 'id' ? note.reasonId : note.reasonEn}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Individual Explanation Cards for Every Matched Cue */}
      {result.matchedCues.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#064E3B]">
              {lang === 'id'
                ? `Rincian Penjelasan Tanda Peringatan (${result.matchedCues.length} Kartu Bukti)`
                : `Detailed Warning Cue Explanations (${result.matchedCues.length} Evidence Cards)`}
            </h2>
          </div>

          <div className="space-y-4">
            {result.matchedCues.map((cue, index) => {
              const isSelected = selectedCueId === cue.id;
              return (
                <article
                  id={`cue-card-${cue.id}`}
                  key={cue.id}
                  onClick={() => setSelectedCueId(cue.id)}
                  className={`bg-white rounded-2xl border transition-all p-6 space-y-5 cursor-pointer ${
                    isSelected
                      ? 'border-[#064E3B] ring-2 ring-[#047857]/25'
                      : 'border-[#D6D3C9] hover:border-[#047857]'
                  }`}
                >
                  {/* Card Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E7EB] pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#047857] tabular-nums">
                        #{index + 1} · {cue.cueId}
                      </span>
                      <span className="text-[#9CA3AF]">·</span>
                      <h3 className="text-base font-bold text-[#064E3B]">
                        {lang === 'id'
                          ? cue.categoryLabelId
                          : cue.categoryLabelEn}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[#4B5563] tabular-nums">
                      {lang === 'id' ? 'Indeks Karakter:' : 'Char Offset:'} [
                      {cue.startOffset}–{cue.endOffset}]
                    </span>
                  </div>

                  {/* Observed Text vs. Inferred Concern Comparison Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#FAF8F3] rounded-xl border border-[#D6D3C9] p-4 space-y-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#4B5563]">
                        {lang === 'id'
                          ? '1. TEKS YANG TERAMATI (OBSERVED TEXT)'
                          : '1. OBSERVED TEXT SPAN'}
                      </span>
                      <p className="text-sm font-mono font-semibold text-[#064E3B] break-words">
                        &ldquo;{cue.matchedText}&rdquo;
                      </p>
                      <p className="text-xs text-[#4B5563]">
                        {lang === 'id'
                          ? cue.observedSummaryId
                          : cue.observedSummaryEn}
                      </p>
                    </div>

                    <div className="bg-[#FFFBEB] rounded-xl border border-[#F59E0B]/40 p-4 space-y-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#92400E]">
                        {lang === 'id'
                          ? '2. KEKHAWATIRAN YANG DIINFERENSI (INFERRED CONCERN)'
                          : '2. INFERRED CONCERN'}
                      </span>
                      <p className="text-sm font-medium text-[#78350F] leading-relaxed">
                        {lang === 'id'
                          ? cue.inferredConcernId
                          : cue.inferredConcernEn}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Explanation in Indonesian (plus English when selected) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-[#064E3B]">
                        {lang === 'id'
                          ? 'Penjelasan Bahasa Lugas (Bahasa Indonesia)'
                          : 'Plain-Language Explanation (Indonesian & English)'}
                      </h4>
                      <p className="text-xs text-[#374151] leading-relaxed">
                        {cue.explanationId}
                      </p>
                      {lang === 'en' && (
                        <p className="text-xs text-[#4B5563] italic leading-relaxed pt-1 border-t border-[#E5E7EB]">
                          EN: {cue.explanationEn}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-[#064E3B]">
                        {lang === 'id'
                          ? 'Mengapa Perlu Diperhatikan'
                          : 'Why This Cue Deserves Attention'}
                      </h4>
                      <p className="text-xs text-[#374151] leading-relaxed">
                        {lang === 'id'
                          ? cue.whyAttentionId
                          : cue.whyAttentionEn}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-[#064E3B]">
                        {lang === 'id'
                          ? 'Keterbatasan & Interpretasi Wajar'
                          : 'Limitation & Benign Interpretation'}
                      </h4>
                      <p className="text-xs text-[#374151] leading-relaxed">
                        {lang === 'id' ? cue.limitationId : cue.limitationEn}
                      </p>
                    </div>
                  </div>

                  {/* Independent Verification Action Bar */}
                  <div className="bg-[#ECFDF5] rounded-xl border border-[#047857]/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-bold text-[#047857]">
                        {lang === 'id'
                          ? 'LANGKAH VERIFIKASI MANDIRI YANG DISARANKAN'
                          : 'RECOMMENDED INDEPENDENT VERIFICATION ACTION'}
                      </span>
                      <p className="text-xs font-semibold text-[#064E3B] leading-relaxed">
                        {lang === 'id'
                          ? cue.verificationActionId
                          : cue.verificationActionEn}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onHighlightChecklistItem(cue.relatedChecklistItemId);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#064E3B] text-[#FAF8F3] hover:bg-[#047857] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'id'
                          ? 'Buka di Daftar Periksa'
                          : 'Verify in Checklist'}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Mandatory Section: What the System Cannot Determine */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-4">
        <div className="flex items-center gap-2 text-[#064E3B]">
          <ShieldAlert className="w-5 h-5 text-[#B45309] shrink-0" />
          <h2 className="text-base font-bold">
            {lang === 'id'
              ? 'Apa yang TIDAK Dapat Ditentukan oleh Sistem Ini'
              : 'What This System Cannot Determine'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#374151] leading-relaxed">
          <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5E7EB] space-y-1">
            <p className="font-bold text-[#064E3B]">
              {lang === 'id'
                ? '1. Keaslian Identitas Pengirim'
                : '1. Sender Identity Authenticity'}
            </p>
            <p>
              {lang === 'id'
                ? 'AMANAH AI hanya memeriksa teks yang Anda tempelkan. Sistem tidak dapat memverifikasi apakah pengirim benar-benar pegawai bank, dosen, kurir, atau instansi resmi.'
                : 'AMANAH AI only inspects pasted text. It cannot verify whether a sender is genuinely a bank employee, lecturer, courier, or official agency.'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5E7EB] space-y-1">
            <p className="font-bold text-[#064E3B]">
              {lang === 'id'
                ? '2. Keamanan Tautan (URL) atau Situs Eksternal'
                : '2. External Link (URL) or Website Safety'}
            </p>
            <p>
              {lang === 'id'
                ? 'Demi keamanan dan privasi, prototipe ini tidak membuka, mengambil (fetch), atau memindai isi tautan web yang tercantum di dalam pesan.'
                : 'For security and privacy, this prototype never opens, fetches, or scans external web links contained in submitted messages.'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5E7EB] space-y-1">
            <p className="font-bold text-[#064E3B]">
              {lang === 'id'
                ? '3. Status Rekening Bank atau Transaksi Nyata'
                : '3. Real-Time Bank Account or Transaction Status'}
            </p>
            <p>
              {lang === 'id'
                ? 'Sistem tidak terhubung ke jaringan perbankan atau marketplace, sehingga tidak dapat memeriksa daftar hitam rekening maupun riwayat pesanan Anda.'
                : 'The system is not connected to banking or marketplace networks and cannot query account blacklists or order histories.'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5E7EB] space-y-1">
            <p className="font-bold text-[#064E3B]">
              {lang === 'id'
                ? '4. Kepastian Aman Ketika Tidak Ada Indikator'
                : '4. Safety Guarantee When Zero Cues Match'}
            </p>
            <p>
              {lang === 'id'
                ? 'Pesan penipuan yang dirancang rapi dapat menghindari kata kunci umum. Ketiadaan tanda peringatan tidak pernah berarti suatu transaksi dijamin aman.'
                : 'Carefully worded deceptive messages can avoid common trigger phrases. Zero matched cues never means a transaction is guaranteed safe.'}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Next-Steps Navigation Bar */}
      <section className="bg-[#064E3B] text-[#FAF8F3] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold">
            {lang === 'id'
              ? 'Langkah Selanjutnya: Verifikasi Mandiri & Literasi'
              : 'Next Steps: Independent Verification & Literacy'}
          </h3>
          <p className="text-xs text-[#D1FAE5]">
            {lang === 'id'
              ? 'Lanjutkan dengan meninjau Daftar Periksa Verifikasi atau pelajari modul literasi terkait.'
              : 'Proceed by reviewing the Verification Checklist or exploring related literacy modules.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('checklist')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F3] text-[#064E3B] hover:bg-[#ECFDF5] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
          >
            <CheckSquare className="w-4 h-4 text-[#047857]" />
            <span>
              {lang === 'id'
                ? 'Tinjau Daftar Periksa Verifikasi'
                : 'Review Verification Checklist'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('learning')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#047857] text-[#FAF8F3] hover:bg-[#059669] border border-[#A7F3D0]/30 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            <span>
              {lang === 'id' ? 'Lanjutkan Belajar' : 'Continue Learning'}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
