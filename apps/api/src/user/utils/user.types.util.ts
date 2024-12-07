export const COMPANY = 'COMPANY';
export const RESEARCHER = 'RESEARCHER';
export const NONE = 'NONE';

export function getUserType(user: any) {
  if (user.company && user?.company?.contactEmail) {
    return COMPANY;
  } else if (user.researcher && user.researcher?.researcherType) {
    return RESEARCHER;
  }
  return NONE;
}
