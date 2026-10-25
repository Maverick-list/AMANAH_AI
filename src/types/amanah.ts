export type Language = 'id' | 'en';

export type NavSection =
  | 'dashboard'
  | 'analyze'
  | 'results'
  | 'checklist'
  | 'learning'
  | 'how-it-works'
  | 'privacy-about';

export enum AnalysisOutcomeType {
  OUTCOME_A_CUES_FOUND = 'OUTCOME_A_CUES_FOUND',
  OUTCOME_B_NO_CUES = 'OUTCOME_B_NO_CUES',
  OUTCOME_C_INSUFFICIENT_INFO = 'OUTCOME_C_INSUFFICIENT_INFO',
  OUTCOME_D_INVALID_INPUT = 'OUTCOME_D_INVALID_INPUT',
}

export type CueCategory =
  | 'URGENCY'
  | 'ADVANCE_FEE'
  | 'CREDENTIALS'
  | 'OFF_PLATFORM'
  | 'UNUSUAL_PAYMENT'
  | 'REWARD_JOB'
  | 'COMBINATION';

export interface MatchedWarningCue {
  id: string; // Instance ID in result
  cueId: string; // Stable rule ID e.g., CUE-CREDENTIALS-01
  category: CueCategory;
  categoryLabelId: string;
  categoryLabelEn: string;
  matchedText: string;
  startOffset: number;
  endOffset: number;
  observedSummaryId: string;
  observedSummaryEn: string;
  inferredConcernId: string;
  inferredConcernEn: string;
  explanationId: string; // Mandatory plain-language explanation in Indonesian
  explanationEn: string;
  whyAttentionId: string;
  whyAttentionEn: string;
  limitationId: string;
  limitationEn: string;
  verificationActionId: string;
  verificationActionEn: string;
  relatedChecklistItemId: string;
}

export interface ContextualCounterexampleNote {
  cueId: string;
  matchedText: string;
  contextWindow: string;
  reasonId: string;
  reasonEn: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  rawText: string;
  characterCount: number;
  wordCount: number;
  outcome: AnalysisOutcomeType;
  validationMessageId?: string;
  validationMessageEn?: string;
  summaryTitleId: string;
  summaryTitleEn: string;
  summaryBodyId: string;
  summaryBodyEn: string;
  matchedCues: MatchedWarningCue[];
  contextualNotes: ContextualCounterexampleNote[];
  distinctCategoryCount: number;
}

export interface SyntheticExample {
  id: string;
  labelId: string;
  labelEn: string;
  scenarioTagId: string;
  scenarioTagEn: string;
  expectedOutcomeLabelId: string;
  expectedOutcomeLabelEn: string;
  text: string;
}

export interface ChecklistItem {
  id: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  howToStepsId: string[];
  howToStepsEn: string[];
  cautionNoteId: string;
  cautionNoteEn: string;
}

export interface QuizQuestion {
  id: string;
  questionId: string;
  questionEn: string;
  options: {
    id: string;
    textId: string;
    textEn: string;
  }[];
  correctOptionId: string;
  feedbackCorrectId: string;
  feedbackCorrectEn: string;
  feedbackIncorrectId: string;
  feedbackIncorrectEn: string;
}

export interface LearningModule {
  id: string;
  number: string;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  readingTimeMinutes: number;
  explanationId: string[];
  explanationEn: string[];
  syntheticExample: {
    contextId: string;
    contextEn: string;
    messageText: string;
    analysisNoteId: string;
    analysisNoteEn: string;
  };
  keyLessonsId: string[];
  keyLessonsEn: string[];
  quiz: QuizQuestion[];
}
