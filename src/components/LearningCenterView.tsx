import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileSearch,
  HelpCircle,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { Language } from '../types/amanah';
import { LEARNING_MODULES } from '../data/content';

interface LearningCenterViewProps {
  lang: Language;
  selectedAnswers: Record<string, string>; // questionId -> optionId
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onResetLearning: () => void;
  onTestModuleExample: (text: string) => void;
}

export const LearningCenterView: React.FC<LearningCenterViewProps> = ({
  lang,
  selectedAnswers,
  onSelectAnswer,
  onResetLearning,
  onTestModuleExample,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(
    LEARNING_MODULES[0].id
  );

  const activeModule =
    LEARNING_MODULES.find((m) => m.id === activeModuleId) ||
    LEARNING_MODULES[0];

  // Calculate genuine session quiz & module completion stats
  const totalModules = LEARNING_MODULES.length;
  const completedModulesCount = LEARNING_MODULES.filter((mod) =>
    mod.quiz.every((q) => Boolean(selectedAnswers[q.id]))
  ).length;

  const correctQuizCount = LEARNING_MODULES.reduce((acc, mod) => {
    const modCorrect = mod.quiz.filter(
      (q) => selectedAnswers[q.id] === q.correctOptionId
    ).length;
    return acc + modCorrect;
  }, 0);

  const totalQuizQuestions = LEARNING_MODULES.reduce(
    (acc, mod) => acc + mod.quiz.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header & Session Progress */}
      <section className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-[#064E3B]">
              {lang === 'id'
                ? 'Pusat Pembelajaran Literasi Transaksi Digital'
                : 'Digital Transaction Literacy Learning Center'}
            </h1>
            <p className="text-sm text-[#374151]">
              {lang === 'id'
                ? 'Enam modul terkurasi dengan contoh sintetis berlabel jelas dan evaluasi pemahaman interaktif untuk mahasiswa dan konsumen muda.'
                : 'Six reviewed literacy modules featuring clearly labeled synthetic examples and interactive knowledge checks.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onResetLearning}
            disabled={Object.keys(selectedAnswers).length === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F3] text-[#374151] border border-[#D6D3C9] hover:bg-[#FEF2F2] hover:text-[#991B1B] disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>
              {lang === 'id' ? 'Atur Ulang Skor Sesi' : 'Reset Session Progress'}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FAF8F3] rounded-xl border border-[#D6D3C9] p-4">
          <div>
            <span className="text-xs text-[#4B5563] block">
              {lang === 'id'
                ? 'Modul Selesai (Sesi Saat Ini)'
                : 'Completed Modules (Current Session)'}
            </span>
            <span className="font-mono text-lg font-bold text-[#064E3B] tabular-nums">
              {completedModulesCount} / {totalModules}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#4B5563] block">
              {lang === 'id'
                ? 'Skor Pemeriksaan Pemahaman'
                : 'Knowledge Check Score'}
            </span>
            <span className="font-mono text-lg font-bold text-[#047857] tabular-nums">
              {correctQuizCount} / {totalQuizQuestions}{' '}
              {lang === 'id' ? 'benar' : 'correct'}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#4B5563] block">
              {lang === 'id' ? 'Status Contoh Kasus' : 'Example Classification'}
            </span>
            <span className="text-xs font-semibold text-[#064E3B]">
              {lang === 'id'
                ? '100% Sintetis (Bukan Laporan Insiden Nyata)'
                : '100% Synthetic (Not Real Incident Reports)'}
            </span>
          </div>
        </div>
      </section>

      {/* Main Split: Module Selector List + Active Module Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 6 Module Cards */}
        <div className="lg:col-span-4 space-y-2.5">
          {LEARNING_MODULES.map((mod) => {
            const isSelected = mod.id === activeModule.id;
            const isCompleted = mod.quiz.every((q) =>
              Boolean(selectedAnswers[q.id])
            );
            const isCorrect = mod.quiz.every(
              (q) => selectedAnswers[q.id] === q.correctOptionId
            );

            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveModuleId(mod.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-[#064E3B] text-[#FAF8F3] border-[#064E3B]'
                    : 'bg-white text-[#0D2B22] border-[#D6D3C9] hover:border-[#047857]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span
                    className={
                      isSelected ? 'text-[#A7F3D0]' : 'text-[#047857] font-bold'
                    }
                  >
                    {mod.number} · {mod.readingTimeMinutes}{' '}
                    {lang === 'id' ? 'mnt baca' : 'min read'}
                  </span>
                  {isCompleted && (
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                        isSelected
                          ? 'text-[#A7F3D0]'
                          : isCorrect
                          ? 'text-[#047857]'
                          : 'text-[#B45309]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {isCorrect
                          ? lang === 'id'
                            ? 'Terjawab Benar'
                            : 'Passed'
                          : lang === 'id'
                          ? 'Sudah Dijawab'
                          : 'Attempted'}
                      </span>
                    </span>
                  )}
                </div>
                <h2 className="text-sm font-bold leading-snug">
                  {lang === 'id' ? mod.titleId : mod.titleEn}
                </h2>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Module Content */}
        <article className="lg:col-span-8 bg-white rounded-2xl border border-[#D6D3C9] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#E5E7EB] pb-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#047857]">
              <span>{activeModule.number}</span>
              <span>
                {lang === 'id'
                  ? `Estimasi Waktu Baca: ${activeModule.readingTimeMinutes} Menit`
                  : `Estimated Reading Time: ${activeModule.readingTimeMinutes} Minutes`}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#064E3B]">
              {lang === 'id' ? activeModule.titleId : activeModule.titleEn}
            </h2>
            <p className="text-sm text-[#4B5563]">
              {lang === 'id'
                ? activeModule.subtitleId
                : activeModule.subtitleEn}
            </p>
          </div>

          {/* 1. Short Explanation */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#064E3B] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#047857]" />
              <span>
                {lang === 'id'
                  ? '1. Penjelasan Materi'
                  : '1. Concept Explanation'}
              </span>
            </h3>
            <div className="space-y-3 text-sm text-[#374151] leading-relaxed">
              {(lang === 'id'
                ? activeModule.explanationId
                : activeModule.explanationEn
              ).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 2. Realistic Synthetic Example */}
          <div className="bg-[#FAF8F3] rounded-xl border border-[#D6D3C9] p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-[#047857]">
                {lang === 'id'
                  ? activeModule.syntheticExample.contextId
                  : activeModule.syntheticExample.contextEn}
              </span>
              <button
                type="button"
                onClick={() =>
                  onTestModuleExample(activeModule.syntheticExample.messageText)
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#064E3B] text-[#FAF8F3] hover:bg-[#047857] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <FileSearch className="w-3.5 h-3.5" />
                <span>
                  {lang === 'id'
                    ? 'Uji Contoh Ini di Mesin Analisis'
                    : 'Inspect This Example in Analyzer'}
                </span>
              </button>
            </div>

            <blockquote className="p-4 rounded-lg bg-white border border-[#E5E7EB] font-mono text-xs text-[#0D2B22] leading-relaxed">
              {activeModule.syntheticExample.messageText}
            </blockquote>

            <p className="text-xs text-[#374151] leading-relaxed">
              <strong className="text-[#064E3B]">
                {lang === 'id' ? 'Catatan Analisis: ' : 'Analysis Note: '}
              </strong>
              {lang === 'id'
                ? activeModule.syntheticExample.analysisNoteId
                : activeModule.syntheticExample.analysisNoteEn}
            </p>
          </div>

          {/* 3. Key Lessons */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#064E3B]">
              {lang === 'id'
                ? '3. Poin Pembelajaran Utama'
                : '3. Key Takeaways'}
            </h3>
            <ul className="space-y-2 text-sm text-[#374151]">
              {(lang === 'id'
                ? activeModule.keyLessonsId
                : activeModule.keyLessonsEn
              ).map((lesson, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 bg-[#ECFDF5]/60 p-3 rounded-xl border border-[#047857]/20"
                >
                  <span className="font-mono text-xs font-bold text-[#047857] mt-0.5 tabular-nums">
                    0{idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed">
                    {lesson}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4 & 5. Interactive Knowledge Check with Immediate Feedback */}
          <div className="border-t border-[#E5E7EB] pt-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#064E3B]">
              <HelpCircle className="w-4 h-4 text-[#047857]" />
              <h3>
                {lang === 'id'
                  ? '4. Evaluasi Pemahaman Interaktif'
                  : '4. Interactive Knowledge Check'}
              </h3>
            </div>

            {activeModule.quiz.map((q) => {
              const selectedOptionId = selectedAnswers[q.id];
              const isAnswered = Boolean(selectedOptionId);
              const isCorrect = selectedOptionId === q.correctOptionId;

              return (
                <div
                  key={q.id}
                  className="bg-[#FAF8F3] rounded-xl border border-[#D6D3C9] p-5 space-y-4"
                >
                  <p className="text-sm font-bold text-[#064E3B] leading-relaxed">
                    {lang === 'id' ? q.questionId : q.questionEn}
                  </p>

                  <div className="space-y-2.5">
                    {q.options.map((opt) => {
                      const isThisSelected = selectedOptionId === opt.id;
                      const isThisCorrect = opt.id === q.correctOptionId;

                      let btnStyle =
                        'bg-white border-[#D6D3C9] text-[#0D2B22] hover:border-[#047857]';
                      if (isAnswered) {
                        if (isThisCorrect) {
                          btnStyle =
                            'bg-[#ECFDF5] border-[#047857] text-[#064E3B] font-semibold';
                        } else if (isThisSelected && !isThisCorrect) {
                          btnStyle =
                            'bg-[#FEF2F2] border-[#DC2626] text-[#991B1B]';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => onSelectAnswer(q.id, opt.id)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-colors cursor-pointer flex items-start gap-3 ${btnStyle}`}
                        >
                          <span className="font-mono font-bold uppercase shrink-0 mt-0.5">
                            {opt.id}.
                          </span>
                          <span className="flex-1 leading-relaxed">
                            {lang === 'id' ? opt.textId : opt.textEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Feedback */}
                  {isAnswered && (
                    <div
                      role="status"
                      className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
                        isCorrect
                          ? 'bg-[#ECFDF5] border-[#047857] text-[#064E3B]'
                          : 'bg-[#FFFBEB] border-[#D97706] text-[#78350F]'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        <p className="font-bold">
                          {isCorrect
                            ? lang === 'id'
                              ? 'Jawaban Tepat'
                              : 'Correct Answer'
                            : lang === 'id'
                            ? 'Belum Tepat — Mari Pelajari Alasannya'
                            : 'Not Quite — Let’s Review Why'}
                        </p>
                        <p>
                          {isCorrect
                            ? lang === 'id'
                              ? q.feedbackCorrectId
                              : q.feedbackCorrectEn
                            : lang === 'id'
                            ? q.feedbackIncorrectId
                            : q.feedbackIncorrectEn}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next Module Navigation */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[#4B5563]">
              {lang === 'id'
                ? 'Seluruh contoh di atas dibuat khusus untuk tujuan pembelajaran.'
                : 'All examples above are synthetic for educational purposes.'}
            </span>
            {LEARNING_MODULES.findIndex((m) => m.id === activeModule.id) <
              LEARNING_MODULES.length - 1 && (
              <button
                type="button"
                onClick={() => {
                  const idx = LEARNING_MODULES.findIndex(
                    (m) => m.id === activeModule.id
                  );
                  setActiveModuleId(LEARNING_MODULES[idx + 1].id);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064E3B] text-[#FAF8F3] hover:bg-[#047857] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>
                  {lang === 'id' ? 'Modul Berikutnya' : 'Next Module'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};
