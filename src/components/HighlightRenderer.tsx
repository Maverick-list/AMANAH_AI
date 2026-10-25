import React from 'react';
import { Language, MatchedWarningCue } from '../types/amanah';

interface HighlightRendererProps {
  rawText: string;
  matchedCues: MatchedWarningCue[];
  selectedCueId: string | null;
  onSelectCue: (cueId: string) => void;
  lang: Language;
}

interface TextSegment {
  text: string;
  start: number;
  end: number;
  cue?: MatchedWarningCue;
}

export const HighlightRenderer: React.FC<HighlightRendererProps> = ({
  rawText,
  matchedCues,
  selectedCueId,
  onSelectCue,
  lang,
}) => {
  // Filter out the meta combination cue for inline span rendering so individual spans stay crisp
  const spanCues = matchedCues
    .filter((c) => c.category !== 'COMBINATION')
    .sort((a, b) => a.startOffset - b.startOffset);

  if (spanCues.length === 0) {
    return (
      <div className="font-sans text-[15px] leading-relaxed text-[#0D2B22] whitespace-pre-wrap break-words bg-[#FAF8F3] p-5 rounded-xl border border-[#D6D3C9]">
        {rawText}
      </div>
    );
  }

  const segments: TextSegment[] = [];
  let cursor = 0;

  for (const cue of spanCues) {
    const start = Math.max(cursor, cue.startOffset);
    const end = Math.min(rawText.length, cue.endOffset);

    if (start >= end) continue;

    if (start > cursor) {
      segments.push({
        text: rawText.slice(cursor, start),
        start: cursor,
        end: start,
      });
    }

    segments.push({
      text: rawText.slice(start, end),
      start,
      end,
      cue,
    });

    cursor = end;
  }

  if (cursor < rawText.length) {
    segments.push({
      text: rawText.slice(cursor),
      start: cursor,
      end: rawText.length,
    });
  }

  return (
    <div className="font-sans text-[15px] leading-relaxed text-[#0D2B22] whitespace-pre-wrap break-words bg-[#FAF8F3] p-5 rounded-xl border border-[#D6D3C9]">
      {segments.map((seg, idx) => {
        if (!seg.cue) {
          return <React.Fragment key={`txt-${idx}`}>{seg.text}</React.Fragment>;
        }

        const isSelected = selectedCueId === seg.cue.id;
        return (
          <button
            key={`cue-${seg.cue.id}-${idx}`}
            type="button"
            onClick={() => onSelectCue(seg.cue!.id)}
            title={
              lang === 'id'
                ? `${seg.cue.cueId}: ${seg.cue.categoryLabelId} (Klik untuk melihat penjelasan)`
                : `${seg.cue.cueId}: ${seg.cue.categoryLabelEn} (Click to view explanation)`
            }
            className={`inline text-left font-medium px-1.5 py-0.5 mx-0.5 rounded transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857] ${
              isSelected
                ? 'bg-[#064E3B] text-[#FAF8F3] underline decoration-[#A7F3D0] decoration-2 underline-offset-4'
                : 'bg-[#FEF3C7] text-[#78350F] hover:bg-[#FDE68A] border-b-2 border-[#D97706]'
            }`}
          >
            {seg.text}
            <span className="ml-1.5 font-mono text-[11px] opacity-85 tabular-nums">
              [{seg.start}–{seg.end}]
            </span>
          </button>
        );
      })}
    </div>
  );
};
