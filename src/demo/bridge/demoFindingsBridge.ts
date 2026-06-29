import type {
  DemoAdminTargetPage,
  DemoInjectedFinding,
} from "../domain/demoFindings";

export function getFindingsForAdminPage(
  findings: DemoInjectedFinding[],
  targetPage: DemoAdminTargetPage,
): DemoInjectedFinding[] {
  return findings.filter((finding) => finding.adminTargetPage === targetPage);
}

export function hasDemoFindingsForAdminPage(
  findings: DemoInjectedFinding[],
  targetPage: DemoAdminTargetPage,
): boolean {
  return getFindingsForAdminPage(findings, targetPage).length > 0;
}

export function getPrimaryFindingForAdminPage(
  findings: DemoInjectedFinding[],
  targetPage: DemoAdminTargetPage,
): DemoInjectedFinding | null {
  return getFindingsForAdminPage(findings, targetPage)[0] ?? null;
}
