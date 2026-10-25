/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  CheckSquare,
  Cpu,
  FileSearch,
  Globe,
  LayoutDashboard,
  ListChecks,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  AnalysisOutcomeType,
  AnalysisResult,
  Language,
  NavSection,
} from './types/amanah';
import { analyzeMessageText } from './engine/analyzer';
import {
  LEARNING_MODULES,
  VERIFICATION_CHECKLIST_ITEMS,
} from './data/content';
import { DashboardView } from './components/DashboardView';
import { AnalyzeMessageView } from './components/AnalyzeMessageView';
import { AnalysisResultsView } from './components/AnalysisResultsView';
import { VerificationChecklistView } from './components/VerificationChecklistView';
import { LearningCenterView } from './components/LearningCenterView';
import { HowItWorksView } from './components/HowItWorksView';
import { PrivacyAboutView } from './components/PrivacyAboutView';

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Message Analyzer & Results State
  const [messageText, setMessageText] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(
    null
  );
  const [sessionHistory, setSessionHistory] = useState<AnalysisResult[]>([]);

  // Verification Checklist State
  const [checkedChecklistIds, setCheckedChecklistIds] = useState<
    Record<string, boolean>
  >({});
  const [checklistNotes, setChecklistNotes] = useState<Record<string, string>>(
    {}
  );
  const [highlightedChecklistItemId, setHighlightedChecklistItemId] = useState<
    string | null
  >(null);

  // Learning Center State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const navItems: {
    id: NavSection;
    labelId: string;
    labelEn: string;
    icon: React.ReactNode;
    badgeCount?: number;
  }[] = [
    {
      id: 'dashboard',
      labelId: 'Beranda Dashboard',
      labelEn: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'analyze',
      labelId: 'Analisis Pesan',
      labelEn: 'Analyze Message',
      icon: <FileSearch className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'results',
      labelId: 'Hasil Analisis',
      labelEn: 'Analysis Results',
      icon: <ListChecks className="w-4 h-4 shrink-0" />,
      badgeCount: currentResult ? currentResult.matchedCues.length : undefined,
    },
    {
      id: 'checklist',
      labelId: 'Daftar Periksa Verifikasi',
      labelEn: 'Verification Checklist',
      icon: <CheckSquare className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'learning',
      labelId: 'Pusat Pembelajaran',
      labelEn: 'Learning Center',
      icon: <BookOpen className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'how-it-works',
      labelId: 'Cara Kerja Sistem',
      labelEn: 'How It Works',
      icon: <Cpu className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'privacy-about',
      labelId: 'Privasi & Tentang',
      labelEn: 'Privacy & About',
      icon: <ShieldCheck className="w-4 h-4 shrink-0" />,
    },
  ];

  const handleNavigate = (section: NavSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAnalysis = () => {
    const result = analyzeMessageText(messageText);

    if (result.outcome === AnalysisOutcomeType.OUTCOME_D_INVALID_INPUT) {
      setValidationError(
        lang === 'id'
          ? result.validationMessageId || 'Masukan tidak valid.'
          : result.validationMessageEn || 'Invalid input.'
      );
      setCurrentResult(result);
      return;
    }

    setValidationError(null);
    setCurrentResult(result);
    setSessionHistory((prev) => [result, ...prev.slice(0, 9)]);
    handleNavigate('results');
  };

  const handleQuickAnalyzeExample = (sampleText: string) => {
    setMessageText(sampleText);
    setValidationError(null);
    const result = analyzeMessageText(sampleText);
    setCurrentResult(result);
    setSessionHistory((prev) => [result, ...prev.slice(0, 9)]);
    handleNavigate('results');
  };

  const handleClearMessageInput = () => {
    setMessageText('');
    setValidationError(null);
  };

  const handleClearAnalysisAndRestart = () => {
    setMessageText('');
    setValidationError(null);
    setCurrentResult(null);
    handleNavigate('analyze');
  };

  const handleToggleChecklistItem = (id: string) => {
    setCheckedChecklistIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleUpdateChecklistNote = (id: string, note: string) => {
    setChecklistNotes((prev) => ({
      ...prev,
      [id]: note,
    }));
  };

  const handleResetChecklist = () => {
    setCheckedChecklistIds({});
    setChecklistNotes({});
    setHighlightedChecklistItemId(null);
  };

  const handleHighlightChecklistItem = (itemId: string) => {
    setHighlightedChecklistItemId(itemId);
    handleNavigate('checklist');
  };

  const handleSelectQuizAnswer = (questionId: string, optionId: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleResetLearning = () => {
    setQuizAnswers({});
  };

  const handlePurgeAllSessionData = () => {
    setMessageText('');
    setValidationError(null);
    setCurrentResult(null);
    setSessionHistory([]);
    setCheckedChecklistIds({});
    setChecklistNotes({});
    setHighlightedChecklistItemId(null);
    setQuizAnswers({});
  };

  const completedChecklistCount = VERIFICATION_CHECKLIST_ITEMS.filter(
    (item) => Boolean(checkedChecklistIds[item.id])
  ).length;

  const completedModulesCount = LEARNING_MODULES.filter((mod) =>
    mod.quiz.every((q) => Boolean(quizAnswers[q.id]))
  ).length;

  const activeNavObj =
    navItems.find((item) => item.id === activeSection) || navItems[0];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF8F3] text-[#0D2B22]">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex lg:flex-col lg:w-68 lg:fixed lg:inset-y-0 bg-white border-r border-[#D6D3C9] z-20 justify-between">
        <div className="p-5 space-y-6">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNavigate('dashboard')}
            className="w-full text-left flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857] rounded-lg cursor-pointer"
          >
            <img
              src="/assets/brand-mark.svg"
              alt="AMANAH AI"
              referrerPolicy="no-referrer"
              className="h-11 w-auto"
            />
          </button>

          {/* Primary Navigation Links */}
          <nav
            aria-label={
              lang === 'id' ? 'Navigasi Utama' : 'Primary Navigation'
            }
            className="space-y-1"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#064E3B] text-[#FAF8F3]'
                      : 'text-[#374151] hover:bg-[#FAF8F3] hover:text-[#064E3B]'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    {item.icon}
                    <span className="truncate">
                      {lang === 'id' ? item.labelId : item.labelEn}
                    </span>
                  </span>

                  {typeof item.badgeCount === 'number' && (
                    <span
                      className={`font-mono text-[11px] px-1.5 py-0.5 rounded tabular-nums ${
                        isActive
                          ? 'bg-[#047857] text-[#FAF8F3]'
                          : 'bg-[#ECFDF5] text-[#047857]'
                      }`}
                    >
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Language Switcher & Trust Reminder */}
        <div className="p-5 border-t border-[#E5E7EB] space-y-4 bg-[#FAF8F3]/60">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-[#4B5563] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#047857]" />
              <span>
                {lang === 'id' ? 'Bahasa Antarmuka' : 'Interface Language'}
              </span>
            </span>
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#E5E7EB]/70 rounded-lg">
              <button
                type="button"
                onClick={() => setLang('id')}
                className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  lang === 'id'
                    ? 'bg-white text-[#064E3B] shadow-xs'
                    : 'text-[#4B5563] hover:text-[#064E3B]'
                }`}
              >
                Indonesia (ID)
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  lang === 'en'
                    ? 'bg-white text-[#064E3B] shadow-xs'
                    : 'text-[#4B5563] hover:text-[#064E3B]'
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>

          <p className="text-[11px] text-[#4B5563] leading-relaxed">
            {lang === 'id'
              ? 'Prototipe kesadaran & literasi transaksi digital. Bukan sertifikasi keamanan pengirim.'
              : 'Digital transaction awareness & literacy prototype. Does not certify sender safety.'}
          </p>
        </div>
      </aside>

      {/* Mobile Header (Compact <15% viewport height) */}
      <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-[#D6D3C9] px-4 py-2.5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleNavigate('dashboard')}
          className="flex items-center cursor-pointer"
        >
          <img
            src="/assets/brand-mark.svg"
            alt="AMANAH AI"
            referrerPolicy="no-referrer"
            className="h-9 w-auto"
          />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#D6D3C9] text-xs font-mono font-bold text-[#064E3B] cursor-pointer whitespace-nowrap"
          >
            {lang.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={lang === 'id' ? 'Buka Menu' : 'Toggle Menu'}
            className="p-2 rounded-lg bg-[#064E3B] text-[#FAF8F3] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[57px] z-30 bg-black/40">
          <div className="bg-white border-b border-[#D6D3C9] p-4 space-y-2 shadow-lg">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    isActive
                      ? 'bg-[#064E3B] text-[#FAF8F3]'
                      : 'text-[#374151] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon}
                    <span>
                      {lang === 'id' ? item.labelId : item.labelEn}
                    </span>
                  </span>
                  {typeof item.badgeCount === 'number' && (
                    <span className="font-mono text-xs tabular-nums">
                      ({item.badgeCount})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-68 flex flex-col min-h-screen">
        {/* Desktop Top Bar Contract: Breadcrumb on Left, Primary Action on Right */}
        <header className="hidden lg:flex items-center justify-between gap-8 px-8 py-4 bg-white border-b border-[#D6D3C9]">
          <div className="flex items-center gap-2 text-xs text-[#4B5563] whitespace-nowrap shrink-0">
            <span className="font-semibold text-[#064E3B]">AMANAH AI</span>
            <span>/</span>
            <span className="font-medium text-[#047857]">
              {lang === 'id' ? activeNavObj.labelId : activeNavObj.labelEn}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNavigate('analyze')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#064E3B] text-[#FAF8F3] hover:bg-[#047857] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>
                {lang === 'id' ? 'Analisis Pesan' : 'Analyze Message'}
              </span>
            </button>
          </div>
        </header>

        {/* Active View Container */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeSection === 'dashboard' && (
            <DashboardView
              lang={lang}
              onNavigate={handleNavigate}
              onQuickAnalyzeExample={handleQuickAnalyzeExample}
              sessionHistory={sessionHistory}
              onSelectResult={(res) => {
                setCurrentResult(res);
                setMessageText(res.rawText);
                handleNavigate('results');
              }}
              completedChecklistCount={completedChecklistCount}
              totalChecklistCount={VERIFICATION_CHECKLIST_ITEMS.length}
              completedModulesCount={completedModulesCount}
              totalModulesCount={LEARNING_MODULES.length}
            />
          )}

          {activeSection === 'analyze' && (
            <AnalyzeMessageView
              lang={lang}
              messageText={messageText}
              onChangeMessage={(text) => {
                setMessageText(text);
                if (validationError) setValidationError(null);
              }}
              onRunAnalysis={handleRunAnalysis}
              onClearMessage={handleClearMessageInput}
              validationError={validationError}
            />
          )}

          {activeSection === 'results' && (
            <AnalysisResultsView
              lang={lang}
              result={currentResult}
              onEditMessage={() => handleNavigate('analyze')}
              onClearAndRestart={handleClearAnalysisAndRestart}
              onNavigate={handleNavigate}
              onHighlightChecklistItem={handleHighlightChecklistItem}
            />
          )}

          {activeSection === 'checklist' && (
            <VerificationChecklistView
              lang={lang}
              checkedIds={checkedChecklistIds}
              notesById={checklistNotes}
              highlightedItemId={highlightedChecklistItemId}
              onToggleItem={handleToggleChecklistItem}
              onUpdateNote={handleUpdateChecklistNote}
              onResetChecklist={handleResetChecklist}
              onNavigate={handleNavigate}
            />
          )}

          {activeSection === 'learning' && (
            <LearningCenterView
              lang={lang}
              selectedAnswers={quizAnswers}
              onSelectAnswer={handleSelectQuizAnswer}
              onResetLearning={handleResetLearning}
              onTestModuleExample={handleQuickAnalyzeExample}
            />
          )}

          {activeSection === 'how-it-works' && (
            <HowItWorksView lang={lang} onNavigate={handleNavigate} />
          )}

          {activeSection === 'privacy-about' && (
            <PrivacyAboutView
              lang={lang}
              onPurgeAllSessionData={handlePurgeAllSessionData}
              sessionItemCount={sessionHistory.length}
            />
          )}
        </main>

        {/* Quiet, Honest Footer */}
        <footer className="mt-auto border-t border-[#D6D3C9] bg-white px-4 sm:px-8 py-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#4B5563]">
            <p>
              <strong className="text-[#064E3B]">AMANAH AI</strong> —{' '}
              {lang === 'id'
                ? 'Verifikasi Sebelum Percaya. Pahami Sebelum Bertransaksi.'
                : 'Verify Before You Trust. Understand Before You Transact.'}
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleNavigate('how-it-works')}
                className="hover:text-[#064E3B] underline cursor-pointer whitespace-nowrap"
              >
                {lang === 'id' ? 'Cara Kerja' : 'How It Works'}
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('privacy-about')}
                className="hover:text-[#064E3B] underline cursor-pointer whitespace-nowrap"
              >
                {lang === 'id' ? 'Privasi & Batasan' : 'Privacy & Limitations'}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
