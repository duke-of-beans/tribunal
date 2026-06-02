export type TribunalRole = 'prosecutor' | 'defense' | 'journalist' | 'academic';
export type Verdict = 'support' | 'oppose' | 'abstain';

export interface RoleEvaluation {
  role: TribunalRole;
  verdict: Verdict;
  confidence: number;
  reasoning: string;
  keyEvidence: string[];
  dissent?: string;
}

export interface TribunalResult {
  claim: string;
  evaluations: RoleEvaluation[];
  consensus: Verdict | 'split';
  consensusConfidence: number;
  dissentMap: Record<TribunalRole, string | null>;
  genuineDisagreements: string[];
}
