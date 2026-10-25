import React from 'react';
import {
  BookOpen,
  Check,
  FileSearch,
  Info,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';
import { Language, NavSection } from '../types/amanah';
import { VERIFICATION_CHECKLIST_ITEMS } from '../data/content';

interface VerificationChecklistViewProps {
  lang: Language;
  checkedIds: Record<string, boolean>;
  notesById: Record<string, string>;
  highlightedItemId: string | null;
  onToggleItem: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onResetChecklist: () => void;
  onNavigate: (section: NavSection) => void;
}

export const VerificationChecklistView: React.FC<
  VerificationChecklistViewProps
> = ({
  lang,
  checkedIds,
  notesById,
  highlightedItemId,
  onToggleItem,
  onUpdateNote,
  onResetChecklist,
  onNavigate,
}) => {
  const totalCount = VERIFICATION_CHECKLIST_ITEMS.length;
  const completedCount = VERIFICATION_CHECKLIST_ITEMS.filter(
    (item) => Boolean(checkedIds[item.id])
  ).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Header & Progress Bar */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-[#064E3B]">
              {lang === 'id'
                ? 'Daftar Periksa Verifikasi Mandiri'
                : 'Independent Verification Checklist'}
            </h1>
            <p className="text-sm text-[#374151]">
              {lang === 'id'
                ? 'Gunakan daftar periksa ini untuk memandu langkah pengecekan di luar jalur pesan yang mencurigakan.'
                : 'Use this interactive checklist to guide verification actions outside the suspicious message channel.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onResetChecklist}
            disabled={
              completedCount === 0 &&
              Object.values(notesById).every((v) => !v?.trim())
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF8F3] text-[#374151] border border-[#D6D3C9] hover:bg-[#FEF2F2] hover:text-[#991B1B] disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>
              {lang === 'id'
                ? 'Atur Ulang Daftar Periksa'
                : 'Reset Checklist'}
            </span>
          </button>
        </div>

        {/* Genuine Calculated Progress Bar */}
        <div className="bg-[#FAF8F3] rounded-xl border border-[#D6D3C9] p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#064E3B]">
            <span>
              {lang === 'id'
                ? 'Progres Verifikasi Mandiri Anda (Sesi Saat Ini)'
                : 'Your Independent Verification Progress (Current Session)'}
            </span>
            <span className="font-mono text-[#047857] tabular-nums">
              {completedCount} / {totalCount}{' '}
              {lang === 'id' ? 'langkah selesai' : 'steps completed'} (
              {progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#047857] transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-[#4B5563]">
            {lang === 'id'
              ? 'Catatan Penting: Menandai seluruh item membantu memastikan kehati-hatian Anda, namun tidak menjamin bahwa transaksi pasti aman dan tidak melakukan verifikasi otomatis ke pihak ketiga.'
              : 'Important Note: Completing every item supports careful decision-making, but does not guarantee safety or perform automated external verification.'}
          </p>
        </div>
      </section>

      {/* Checklist Items */}
      <section className="space-y-4">
        {VERIFICATION_CHECKLIST_ITEMS.map((item) => {
          const isChecked = Boolean(checkedIds[item.id]);
          const isHighlighted = highlightedItemId === item.id;
          const steps = lang === 'id' ? item.howToStepsId : item.howToStepsEn;

          return (
            <div
              key={item.id}
              id={`checklist-item-${item.id}`}
              className={`bg-white rounded-2xl border transition-all p-5 sm:p-6 space-y-4 ${
                isHighlighted
                  ? 'border-[#047857] ring-2 ring-[#047857]/25'
                  : isChecked
                  ? 'border-[#047857]/60 bg-[#FAF8F3]/60'
                  : 'border-[#D6D3C9]'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={isChecked}
                  onClick={() => onToggleItem(item.id)}
                  className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857] ${
                    isChecked
                      ? 'bg-[#047857] border-[#047857] text-[#FAF8F3]'
                      : 'bg-white border-[#6B7280] hover:border-[#047857]'
                  }`}
                >
                  {isChecked && <Check className="w-4 h-4 stroke-[2.5]" />}
                </button>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label
                      onClick={() => onToggleItem(item.id)}
                      className={`text-base font-bold cursor-pointer select-none ${
                        isChecked
                          ? 'text-[#047857] line-through'
                          : 'text-[#064E3B]'
                      }`}
                    >
                      {lang === 'id' ? item.titleId : item.titleEn}
                    </label>
                    <span className="font-mono text-xs text-[#4B5563]">
                      {isChecked
                        ? lang === 'id'
                          ? 'Selesai Diperiksa'
                          : 'Completed'
                        : lang === 'id'
                        ? 'Belum Ditandai'
                        : 'Pending'}
                    </span>
                  </div>

                  <p className="text-sm text-[#374151] leading-relaxed">
                    {lang === 'id' ? item.descriptionId : item.descriptionEn}
                  </p>

                  {/* Practical Steps */}
                  <div className="bg-[#FAF8F3] rounded-xl border border-[#E5E7EB] p-4 space-y-2">
                    <span className="text-xs font-bold text-[#064E3B]">
                      {lang === 'id'
                        ? 'Cara Melakukan Verifikasi Ini:'
                        : 'How to Perform This Check:'}
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#374151]">
                      {steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-mono font-semibold text-[#047857] tabular-nums">
                            {i + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Optional Local Verification Note */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`note-${item.id}`}
                      className="text-xs font-medium text-[#4B5563] block"
                    >
                      {lang === 'id'
                        ? 'Catatan Pribadi Sementara (Opsional, Hanya di Memori Sesi Ini):'
                        : 'Temporary Personal Verification Note (Optional, Session-Only):'}
                    </label>
                    <input
                      id={`note-${item.id}`}
                      type="text"
                      value={notesById[item.id] || ''}
                      onChange={(e) => onUpdateNote(item.id, e.target.value)}
                      placeholder={
                        lang === 'id'
                          ? 'Contoh: Sudah cek aplikasi resmi, tidak ada tagihan tersebut...'
                          : 'E.g.: Checked official app directly, no such billing notice exists...'
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-[#FAF8F3] border border-[#D6D3C9] text-xs text-[#0D2B22] placeholder:text-[#6B7280] focus:outline-none focus:border-[#047857]"
                    />
                  </div>

                  {/* Caution Note */}
                  <div className="flex items-center gap-2 text-xs text-[#4B5563] pt-1">
                    <Info className="w-3.5 h-3.5 text-[#047857] shrink-0" />
                    <span>
                      {lang === 'id' ? item.cautionNoteId : item.cautionNoteEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Non-fabrication & Independent Verification Reminder */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-[#374151]">
            <p className="font-bold text-[#064E3B]">
              {lang === 'id'
                ? 'Mengapa AMANAH AI Tidak Menampilkan Nomor Kontak Instansi Secara Otomatis?'
                : 'Why Doesn’t AMANAH AI Display External Contact Numbers Automatically?'}
            </p>
            <p className="leading-relaxed">
              {lang === 'id'
                ? 'Demi akurasi dan keamanan, prototipe ini tidak mengarang atau menebak rincian kontak resmi. Selalu peroleh kontak layanan pelanggan langsung dari situs web resmi, aplikasi resmi, atau dokumen resmi yang Anda miliki.'
                : 'For accuracy and safety, this prototype never invents or guesses official contact details. Always obtain customer service contacts directly from official websites, official apps, or physical cards in your possession.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('analyze')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF8F3] text-[#064E3B] border border-[#D6D3C9] hover:bg-[#ECFDF5] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span>
              {lang === 'id' ? 'Kembali ke Analisis' : 'Back to Analyzer'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('learning')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064E3B] text-[#FAF8F3] hover:bg-[#047857] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>
              {lang === 'id' ? 'Pusat Pembelajaran' : 'Learning Center'}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
