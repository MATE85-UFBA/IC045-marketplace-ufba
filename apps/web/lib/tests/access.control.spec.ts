import {UserProfileType, UserRole} from '@/types/user';
import {hasAccess} from "@/lib/access.control";


describe('Access Control Functions', () => {
    describe('hasAccess', () => {
        it('should return true when user has access based on profile type and role', () => {
            const user = {
                id: '789e4567-e89b-12d3-a456-426614174000',
                name: 'Anakin Skywalker',
                utype: UserProfileType.COMPANY,
                role: UserRole.USER,
                img: '',
                access_token: ''
            }
            expect(hasAccess(user, '/cadastrar-demanda')).toBe(true);
        });

        it('should return false when user profile type is not allowed', () => {
            const user = {
                id: '789e4567-e89b-12d3-a456-426614174000',
                name: 'Anakin Skywalker',
                utype: UserProfileType.RESEARCHER,
                role: UserRole.ADMIN,
                img: '',
                access_token: ''
            }
            expect(hasAccess(user, '/cadastrar-demanda')).toBe(false);
        });

        it('should return false when user role is not allowed', () => {
            const user = {
                id: '789e4567-e89b-12d3-a456-426614174000',
                name: 'Anakin Skywalker',
                utype: UserProfileType.RESEARCHER,
                role: UserRole.USER,
                img: '',
                access_token: ''
            }
            const route = '/dashboard';
            expect(hasAccess(user, route)).toBe(false);
        });

        it('should return true when UserProfileType.ANY is allowed and role matches', () => {
            const user = {
                id: '789e4567-e89b-12d3-a456-426614174000',
                name: 'Anakin Skywalker',
                utype: UserProfileType.RESEARCHER,
                role: UserRole.USER,
                img: '',
                access_token: ''
            }
            const route = '/login';
            expect(hasAccess(user, route)).toBe(true);
        });
    });

});