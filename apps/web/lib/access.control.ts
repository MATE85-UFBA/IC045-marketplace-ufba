import { loadUserFromLocalStorage } from '@/lib/user.storage';
import { User, UserProfileType, UserRole } from '@/types/user';
import { useRouter } from 'next/navigation';

const profileAccessControl: Record<string, UserProfileType[]> = {
    '/cadastro-demandas': [UserProfileType.COMPANY],
    '/minhas-demandas': [UserProfileType.COMPANY],
    '/dashboard': [UserProfileType.RESEARCHER],
    '/user-register': [UserProfileType.ANY],
    '/login': [UserProfileType.ANY]
};

const roleAccessControl: Record<string, UserRole[]> = {
    '/cadastro-demandas': [UserRole.ANY],
    '/minhas-demandas': [UserRole.ANY],
    '/dashboard': [UserRole.ADMIN],
    '/user-register': [UserRole.ANY],
    '/login': [UserRole.ANY],
};

export function hasAccess(user: User, route: string): boolean {
    const allowedProfiles = profileAccessControl[route] || [];
    const allowedRoles = roleAccessControl[route] || [];

    const profileCanAccess =
        allowedProfiles.includes(UserProfileType.ANY) ||
        allowedProfiles.includes(user.utype);

    const roleCanAccess =
        allowedRoles.includes(UserRole.ANY) ||
        allowedRoles.includes(user.role);

    return profileCanAccess && roleCanAccess;
}

export function checkAccessAndRedirect(router: ReturnType<typeof useRouter>, currentRoute: string) {
    try {
        const user = loadUserFromLocalStorage();
        if (!user || !hasAccess(user, currentRoute)) {
            router.push('/login');
        }
    } catch{
        return
    }

}