import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Eraser,
  EyeOff,
  FileSearch,
  Lock,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types/amanah';
import { SYNTHETIC_EXAMPLES } from '../data/content';
import {
  MAX_MESSAGE_LENGTH,
  redactSensitiveText,
} from '../engine/analyzer';

interface AnalyzeMessageViewProps {
  lang: Language;
  messageText: string;
  onChangeMessage: (text: string) => void;
  onRunAnalysis: () => void;
  onClearMessage: () => void;
  validationError: string | null;
}

export const AnalyzeMessageView: React.FC<AnalyzeMessageViewProps> = ({
  lang,
  messageText,
  onChangeMessage,
  onRunAnalysis,
  onClearMessage,
  validationError,
}) => {
  const [redactionNotice, setRedactionNotice] = useState<string | null>(null);

  const charCount = messageText.length;
  const isOverLimit = charCount > MAX_MESSAGE_LENGTH;
  const wordCount = messageText.trim()
    ? messageText.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleLoadExample = (text: string) => {
    setRedactionNotice(null);
    onChangeMessage(text);
  };

  const handleAutoRedact = () => {
    if (!messageText.trim()) return;
    const { redactedText, redactionCount } = redactSensitiveText(messageText);
    onChangeMessage(redactedText);
    if (redactionCount > 0) {
      setRedactionNotice(
        lang === 'id'
          ? `${redactionCount} pola data sensitif (nomor telepon/rekening/email/OTP) telah disamarkan secara lokal.`
          : `${redactionCount} sensitive data pattern(s) (phone/account/email/OTP) were masked locally.`
      );
    } else {
      setRedactionNotice(
        lang === 'id'
          ? 'Tidak ditemukan pola nomor telepon/rekening standar. Pastikan Anda tetap memeriksa dan menghapus nama atau data pribadi secara manual.'
          : 'No standard phone/account patterns detected. Please still manually review and remove personal names or sensitive data.'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#064E3B]">
            {lang === 'id'
              ? 'Analisis Pesan Transaksi'
              : 'Analyze Transaction Message'}
          </h1>
          <span className="font-mono text-xs text-[#047857] tabular-nums">
            {lang === 'id'
              ? 'Pemrosesan Plain-Text Lokal · Maks. 5.000 Karakter'
              : 'Local Plain-Text Processing · Max 5,000 Chars'}
          </span>
        </div>
        <p className="text-sm text-[#374151] leading-relaxed">
          {lang === 'id'
            ? 'Tempelkan isi pesan SMS, chat marketplace, atau email transaksi yang mencurigakan di bawah ini. Sistem akan memeriksa pola tanda peringatan secara deterministik tanpa mengeksekusi tautan atau mengirim teks ke server.'
            : 'Paste the suspicious SMS, marketplace chat, or transaction message below. The system deterministically inspects warning patterns without executing links or sending text to any server.'}
        </p>
      </div>

      {/* Mandatory Sensitive Info Reminder Banner */}
      <div className="bg-[#FAF8F3] rounded-xl border border-[#047857]/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B]">
            <Lock className="w-4 h-4 text-[#047857] shrink-0" />
            <span>
              {lang === 'id'
                ? 'Penting: Hapus Informasi Pribadi & Rahasia Sebelum Analisis'
                : 'Important: Remove Personal & Secret Information Before Analysis'}
            </span>
          </div>
          <p className="text-xs text-[#374151] leading-relaxed">
            {lang === 'id'
              ? 'Hapus nama lengkap, nomor telepon, nomor rekening bank, alamat rumah, kode OTP, PIN, dan kata sandi dari teks Anda. Semua teks diperlakukan sebagai teks biasa (plain text) dan tautan di dalamnya tidak akan dibuka.'
              : 'Remove full names, phone numbers, bank account numbers, physical addresses, OTP codes, PINs, and passwords from your text. All input is treated strictly as untrusted plain text and embedded URLs are never fetched.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutoRedact}
          disabled={!messageText.trim()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#064E3B] border border-[#D6D3C9] hover:bg-[#ECFDF5] disabled:opacity-50 disabled:pointer-events-none text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <EyeOff className="w-3.5 h-3.5 text-[#047857]" />
          <span>
            {lang === 'id'
              ? 'Samarkan Nomor & OTP Otomatis'
              : 'Auto-Mask Numbers & OTP'}
          </span>
        </button>
      </div>

      {redactionNotice && (
        <div className="bg-[#ECFDF5] border border-[#047857] rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-xs text-[#064E3B]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
            <span>{redactionNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setRedactionNotice(null)}
            className="text-xs font-semibold underline cursor-pointer whitespace-nowrap"
          >
            {lang === 'id' ? 'Tutup' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Main Editor Card recreating message-input.png */}
      <div className="bg-white rounded-2xl border border-[#D6D3C9] p-6 space-y-5">
        {/* Load Synthetic Example Selector */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#047857]" />
              <span>
                {lang === 'id'
                  ? 'Muat Contoh Sintetis (Teks Sampel Berlabel Jelas untuk Pengujian):'
                  : 'Load Synthetic Example (Clearly Labeled Sample Text for Testing):'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {SYNTHETIC_EXAMPLES.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => handleLoadExample(ex.text)}
                className="text-left p-3 rounded-xl bg-[#FAF8F3] hover:bg-[#ECFDF5] border border-[#D6D3C9] hover:border-[#047857] transition-colors cursor-pointer flex flex-col justify-between gap-1.5"
              >
                <span className="text-xs font-bold text-[#064E3B] line-clamp-1">
                  {lang === 'id' ? ex.labelId : ex.labelEn}
                </span>
                <span className="text-[11px] text-[#4B5563] font-mono">
                  {lang === 'id' ? ex.scenarioTagId : ex.scenarioTagEn} ·{' '}
                  {lang === 'id'
                    ? ex.expectedOutcomeLabelId
                    : ex.expectedOutcomeLabelEn}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Textarea Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="amanah-message-input"
              className="text-sm font-bold text-[#064E3B]"
            >
              {lang === 'id'
                ? 'Teks Pesan yang Akan Diperiksa'
                : 'Message Text to Inspect'}
            </label>
            <div
              className={`font-mono text-xs tabular-nums ${
                isOverLimit
                  ? 'text-[#B91C1C] font-bold'
                  : 'text-[#4B5563]'
              }`}
            >
              <span>
                {charCount.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')} /{' '}
                {MAX_MESSAGE_LENGTH.toLocaleString(
                  lang === 'id' ? 'id-ID' : 'en-US'
                )}{' '}
                {lang === 'id' ? 'karakter' : 'characters'}
              </span>
              <span className="mx-1.5">·</span>
              <span>
                {wordCount} {lang === 'id' ? 'kata' : 'words'}
              </span>
            </div>
          </div>

          <textarea
            id="amanah-message-input"
            rows={8}
            value={messageText}
            onChange={(e) => {
              setRedactionNotice(null);
              onChangeMessage(e.target.value);
            }}
            placeholder={
              lang === 'id'
                ? 'Tempelkan atau ketik teks pesan transaksi di sini (setelah menghapus nama, nomor telepon, rekening, atau kode OTP)...'
                : 'Paste or type the transaction message text here (after removing names, phone numbers, account numbers, or OTP codes)...'
            }
            className={`w-full rounded-xl p-4 text-[15px] leading-relaxed bg-[#FAF8F3] text-[#0D2B22] placeholder:text-[#6B7280] border focus:outline-none focus:ring-2 transition-all ${
              isOverLimit || validationError
                ? 'border-[#DC2626] focus:ring-[#DC2626]/30'
                : 'border-[#D6D3C9] focus:border-[#047857] focus:ring-[#047857]/20'
            }`}
          />
        </div>

        {/* Validation Error Display (Outcome D / Input validation) */}
        {(validationError || isOverLimit) && (
          <div
            role="alert"
            className="bg-[#FEF2F2] border border-[#DC2626]/40 rounded-xl p-4 flex items-start gap-3 text-xs text-[#991B1B]"
          >
            <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                {lang === 'id'
                  ? 'Pesan Tidak Dapat Diproses (Validasi Masukan)'
                  : 'Message Cannot Be Processed (Input Validation)'}
              </p>
              <p>
                {validationError ||
                  (lang === 'id'
                    ? `Panjang pesan melebihi batas maksimum ${MAX_MESSAGE_LENGTH.toLocaleString('id-ID')} karakter. Silakan kurangi ${charCount - MAX_MESSAGE_LENGTH} karakter.`
                    : `Message exceeds the maximum length of ${MAX_MESSAGE_LENGTH.toLocaleString('en-US')} characters. Please remove ${charCount - MAX_MESSAGE_LENGTH} characters.`)}
              </p>
            </div>
          </div>
        )}

        {/* Concise Pre-Analysis Privacy Notice & Action Bar */}
        <div className="pt-2 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-[#4B5563]">
            {lang === 'id'
              ? 'Pemberitahuan Privasi: Analisis dilakukan oleh mesin aturan lokal di peramban Anda. Teks tidak dikirim ke server atau pihak ketiga.'
              : 'Privacy Notice: Analysis is performed locally in your browser by a deterministic rule engine. Text is never sent to external servers.'}
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setRedactionNotice(null);
                onClearMessage();
              }}
              disabled={messageText.length === 0 && !validationError}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF8F3] text-[#374151] border border-[#D6D3C9] hover:bg-[#E5E7EB]/60 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Eraser className="w-4 h-4" />
              <span>{lang === 'id' ? 'Hapus Teks' : 'Clear Input'}</span>
            </button>

            <button
              type="button"
              onClick={onRunAnalysis}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] text-[#FAF8F3] hover:bg-[#047857] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
            >
              <FileSearch className="w-4 h-4" />
              <span>
                {lang === 'id' ? 'Analisis Pesan' : 'Analyze Message'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
