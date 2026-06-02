# Tribunal

**Multi-perspective deliberation protocol for AI reasoning.**

![Status](https://img.shields.io/badge/status-production-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

---

## The problem

When AI systems evaluate complex claims, they typically produce a single perspective — whatever the model's training data and RLHF tuning converge on. This creates blind spots. A claim might look solid from an evidence perspective but fall apart under adversarial scrutiny, or survive academic rigor but miss practical implications a journalist would catch.

## The pattern

The Tribunal assigns a claim to four structured roles, each with distinct evaluation criteria and adversarial incentives:

| Role | Mandate | Evaluates for | Adversarial bias |
|------|---------|---------------|-----------------|
| **Prosecutor** | Find flaws | Logical gaps, missing evidence, alternative explanations | Incentivized to reject |
| **Defense** | Find strengths | Supporting evidence, internal consistency, prior confirmation | Incentivized to accept |
| **Journalist** | Find story | Practical implications, who benefits, what's missing from the narrative | Incentivized toward novelty |
| **Academic** | Find rigor | Methodology, reproducibility, relationship to established knowledge | Incentivized toward conservatism |

### Deliberation protocol

```
1. CLAIM submitted
2. All four roles evaluate independently (no cross-contamination)
3. Each role produces: verdict (support/oppose/abstain), confidence, reasoning
4. SYNTHESIS phase: identify convergences and genuine disagreements
5. Output: verdict + dissent map + confidence by role
```

The key insight: **genuine disagreement between roles is signal, not noise.** If the Prosecutor and Defense agree, that's strong. If the Journalist sees something the Academic doesn't, that's a research lead. If all four agree, confidence is very high. If they split 2-2, the claim is genuinely contested and should be flagged as such.

### Role authority domains

Not all roles are equal on all questions:

- **Factual claims** → Prosecutor + Academic have higher authority
- **Strategic claims** → Journalist + Defense have higher authority  
- **Novel claims** → Academic + Prosecutor (rigor + skepticism)
- **Ethical claims** → All four roles equal weight

## TypeScript interfaces

```typescript
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
```

## Production status

In production since March 2026. Used for high-stakes claim evaluation in investigative research, architectural decisions, and epistemic health audits. The production implementation uses the Anthropic API to generate structurally independent role evaluations.

## Prior art

- **DEBATE** — Irving et al. (2018), AI safety via debate
- **A-HMAD** — heterogeneous multi-agent deliberation
- **Devil's advocate** — structured dissent in group decision-making (Schwenk 1990)
- **Red teaming** — adversarial evaluation methodology (Brundage et al. 2020)

## Part of the cognitive stack

- [Assertion Router](https://github.com/duke-of-beans/assertion-router) — routes INVESTIGATIVE outputs to Tribunal for deliberation
- [WHETSTONE](https://github.com/duke-of-beans/KERNL) — adversarial engine that can invoke Tribunal for structured challenge
- [Cognitive Stack](https://github.com/duke-of-beans/cognitive-stack) — the full 10-system architecture

---

*Built by [David Kirsch](https://github.com/duke-of-beans). MIT License.*
