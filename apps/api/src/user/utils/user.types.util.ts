export const COMPANY = "company";
export const RESEARCHER = "researcher";
export const NONE = "none"

export function getUserType(user: any) {
    if (user.company) {
        return COMPANY;
    } else if (user.researcher) {
        return RESEARCHER;
    }
    return NONE;
}

