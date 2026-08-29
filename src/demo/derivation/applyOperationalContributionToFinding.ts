import type { DemoInjectedFinding, OperationalContribution } from "../domain/demoFindings";

export function applyOperationalContributionToFinding(
  finding: DemoInjectedFinding,
  contribution: OperationalContribution,
): DemoInjectedFinding {
  const sameIdentity = finding.demoPurpose === contribution.demoPurpose &&
    finding.demoRunId === contribution.demoRunId &&
    finding.reservationId === contribution.reservationId &&
    finding.expedienteId === contribution.expedienteId &&
    finding.id === contribution.findingId;
  if (!sameIdentity || contribution.status !== "accepted") return finding;

  if (finding.evidenceIds?.includes(contribution.contributionId) ||
      finding.associatedEvidence.some((evidence) => evidence.id === contribution.contributionId)) {
    return finding;
  }

  const evidence = {
    id: contribution.contributionId,
    label: `Aporte operativo · ${contribution.authorLabel}`,
    summary: contribution.text,
    source: "operational_messaging" as const,
    demoRunId: contribution.demoRunId,
    sourceType: "operational_messaging",
    sourceEntityId: contribution.contributionId,
    operationalCaseId: contribution.operationalCaseId,
    findingId: contribution.findingId,
    expedienteId: contribution.expedienteId,
    sourceCreatedAt: contribution.createdAt,
    actors: [contribution.authorLabel],
    facts: [`Tipo de aporte: ${contribution.contributionType}`],
    provenance: `Mensajería Operacional · ${contribution.operationalCaseId}`,
  };

  return {
    ...finding,
    evidenceIds: [...new Set([...(finding.evidenceIds || []), contribution.contributionId])],
    associatedEvidence: [...finding.associatedEvidence, evidence],
    operationalState: "updated",
    updatedAt: contribution.createdAt,
  };
}
